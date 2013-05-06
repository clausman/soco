require(["dojo/_base/declare", "dojo/dom-construct", "dojo/dom-class", "dojo/dom-attr", "dojo/dom-geometry", "dojo/dom-style", "dojo/on", "dojo/window", "dojo/ready", "dojo/number", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./js/widgets/templates/PianoRoll.html"],
    function (declare, domConstruct, domClass, domAttr, domGeo, domStyle, on, window, ready, number, _WidgetBase, _TemplatedMixin, _PianoRollTemplate) {

        declare("widgets.PianoRoll", [_WidgetBase, _TemplatedMixin], {
            templateString: _PianoRollTemplate,
            timeStep: 20,
            numOctaves: 3,  // how many octaves to show (starting at middle C)
            numSteps: 40,

            _notesArray: null,
            _colArray: null,

            postCreate: function () {
                this.inherited(arguments);
                if (!this._notesArray) {
                    this._notesArray = new Array();
                }

                this._audiolet = new Audiolet();

                var titleClass = "noteSpan_TitleLight";
                var altRow = false;

                var start = 4 - Math.floor(this.numOctaves / 2);

                var base = 67;

                if (!this._colArray) {
                    this._colArray = [];
                }

                for (var i = 0; i < (this.numOctaves * 12); i++) {
                    if (i % 2 == 1) {
                        titleClass = "noteSpan_TitleDark";
                        altRow = true;
                    } else {
                        titleClass = "noteSpan_TitleLight";
                        altRow = false;
                    }

                    note = (i + 3) % 12;
                    if (note == 0) {
                        base = 65;
                        note = 1;
                        titleClass = "noteSpan_TitleLight";
                    } else if (note == 1) {
                        base = 65;
                        note = 2;
                        titleClass = "noteSpan_TitleDark";
                    } else if (note == 2) {
                        base = 66;
                        note = 3;
                        titleClass = "noteSpan_TitleLight";
                    } else if (note == 3) {
                        base = 67;
                    } else if (note == 8) {
                        base = 70;
                        note = 7;
                        titleClass = "noteSpan_TitleLight";
                    } else if (note == 9) {
                        base = 70;
                        note = 8;
                        titleClass = "noteSpan_TitleDark";
                    } else if (note == 10) {
                        base = 71;
                        note = 9;
                        titleClass = "noteSpan_TitleLight";
                    } else if (note == 11) {
                        base = 71;
                        note = 10;
                        titleClass = "noteSpan_TitleDark";
                    }



                    if (note % 2 == 1) {
                        out = String.fromCharCode(base) + (start + Math.floor(i / 12));
                    } else {
                        out = String.fromCharCode(base) + "#" + (start + Math.floor(i / 12));
                        base++;
                    }

                    var row = domConstruct.create("div", { class: "row show-piano-grid", id: ("octave_" + (start + Math.floor(i / 12)) + "_note_" + i % 12) });

                    var col = domConstruct.create("div", { class: "noteSpan", id: row.id + "_timeStep_" + j });

                    domClass.add(col, titleClass);
                    col.innerHTML = "<span>" + out + "</span>";
                    domConstruct.place(col, this.pianoKeys);

                    domAttr.set(row, "note", out);

                    domConstruct.place(row, this.pianoGrid);
                    for (var j = 0; j < this.numSteps; j++) {
                        var col = domConstruct.create("div", { class: "noteSpan", id: row.id + "_timeStep_" + j });
                        if (!this._colArray[j]) {
                            this._colArray[j] = dojo.NodeList();
                        }
                        this._colArray[j][i] = col;
                        domAttr.set(col, "step", j);

                        var id = col.id;
                        domStyle.set(col, "width", this.timeStep + "px");

                        if (altRow) {
                            domClass.add(col, "altRow");
                        }

                        domConstruct.place(col, row);

                        _this = this;
                        (function () {
                            var tid = id;
                            on(col, "click", function () {
                                var item = dojo.byId(tid);
                                var note = Note.fromLatin(domAttr.get(this.parentNode, "note"));
                                note.step = parseInt(domAttr.get(item, "step"));

                                _this._audiolet.scheduler.addRelative(0, function () {
                                    console.log("Playing: " + note.frequency());
                                    var synth = new Synth(_this._audiolet, note.frequency());
                                    synth.connect(_this._audiolet.output);
                                } .bind(_this));

                                var addedNote = _this.createNote(domGeo.position(item, true), note, tid + "_Note");
                                if (!_this._notesArray[note.step]) {
                                    _this._notesArray[note.step] = [];
                                }

                                _this._notesArray[note.step].push([addedNote, note]);
                            });
                        })();
                    }
                }
            },

            createNote: function (position, note, id) {
                div = domConstruct.create("div", { id: id, class: "note" });
                domConstruct.place(div, this.pianoPlacedNotes);
                var _this = this;
                $(function () {
                    var gridWidth = _this.timeStep + 1;
                    noteNode = $("#" + id)[0];

                    $("#" + id).resizable({
                        grid: 10.25,
                        minWidth: 5,
                        handles: "e, w"
                    });

                    $("#" + id).draggable({
                        grid: [gridWidth, 41],
                        ghost: true,
                        containment: _this.pianoGrid
                    });

                    var gridPos = domGeo.position(_this.pianoGrid, true);
                    domStyle.set(noteNode, "marginLeft", (position.x - gridPos.x + 1) + "px");
                    domStyle.set(noteNode, "marginTop", (position.y - gridPos.y + 1 ) + "px");
                    domStyle.set(noteNode, "width", (_this.timeStep - 2) + "px");
                    //noteNode.innerHTML = "<span style: margin:5px>" + note.latin() + "</span>";
                });

                return div;
            },

            playAll: function () {
                for (var i = 0; i < _this._notesArray.length; i++) {

                    (function () {
                        var chord = _this._notesArray[i];
                        var items = _this._colArray[i];
                        var freqArray = new Array();
                        var durationArray = new Array();
                        var converted = null;
                        var removed = null;

                        _this._audiolet.scheduler.addRelative(i, function () {
                            if (chord) {
                                for (var j = 0; j < chord.length; j++) {
                                    (function () {
                                        var div = chord[j][0];
                                        var note = chord[j][1];
                                        note.step = parseInt(domAttr.get(div, "step"));

                                        domClass.replace(div, "notePlay", "note");
                                        converted = dojo.query(items).replaceClass("noteSpanActive", "noteSpan");
                                        removed = dojo.query(items).removeClass("altRow");

                                        var synth = new Synth(_this._audiolet, note.frequency());
                                        console.log("Playing: " + note.frequency());
                                        synth.connect(_this._audiolet.output);

                                        setTimeout(dojo.hitch(this, function () {
                                            domClass.replace(div, "note", "notePlay");

                                            items.forEach(function (item, i) {
                                                if (i % 2 == 1) {
                                                    item.addClass("altRow");
                                                }
                                            });
                                            converted = dojo.query(converted).replaceClass("noteSpan", "noteSpanActive");
                                        }), 480);
                                    })();

                                }
                            }
                        } .bind(_this));

                        setTimeout(dojo.hitch(this, function () {
                        }), 480);
                    })();
                }
            }
        });
    });