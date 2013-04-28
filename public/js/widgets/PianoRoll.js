require(["dojo/_base/declare", "dojo/dom-construct", "dojo/dom-class", "dojo/dom-attr", "dojo/dom-geometry", "dojo/dom-style", "dojo/on", "dojo/window", "dojo/ready", "dojo/number", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./js/widgets/templates/PianoRoll.html"],
    function (declare, domConstruct, domClass, domAttr, domGeo, domStyle, on, window, ready, number, _WidgetBase, _TemplatedMixin, _PianoRollTemplate) {

        declare("widgets.PianoRoll", [_WidgetBase, _TemplatedMixin], {
            templateString: _PianoRollTemplate,
            timeStep: 20,
            numOctaves: 3,  // how many octaves to show (starting at middle C)
            numSteps: 40,

            _notesArray: null,

            buildRendering: function () {
                if (!this._notesArray) {
                    this._notesArray = new Array();
                }

                this._audiolet = new Audiolet();

                domClass.add(this.srcNodeRef, "piano-grid");
                var titleClass = "noteSpan_TitleLight";
                var altRow = false;

                var start = 4 - Math.floor(this.numOctaves / 2);

                var base = 67;
                for (var i = 0; i < (this.numOctaves * 12); i++) {
                    note = (i + 3) % 12;
                    if (note == 0) {
                        base = 65;
                        note = 1;
                    } else if (note == 1) {
                        base = 65;
                        note = 2;
                    } else if (note == 2) {
                        base = 66;
                        note = 3;
                    } else if (note == 3) {
                        base = 67;
                    } else if (note == 8) {
                        base = 70;
                        note = 7;
                    } else if (note == 9) {
                        base = 70;
                        note = 8;
                    } else if (note == 10) {
                        base = 71;
                        note = 9;
                    } else if (note == 11) {
                        base = 71;
                        note = 10;
                    }

                    if (note % 2 == 1) {
                        out = String.fromCharCode(base) + (start + Math.floor(i / 12));
                    } else {
                        out = String.fromCharCode(base) + "#" + (start + Math.floor(i / 12));
                        base++;
                    }

                    var row = domConstruct.create("div", { class: "row show-piano-grid", id: ("octave_" + (start + Math.floor(i / 12)) + "_note_" + i % 12) });

                    domAttr.set(row, "note", out);

                    domConstruct.place(row, this.srcNodeRef);
                    var div;

                    for (var j = 0; j < this.numSteps; j++) {
                        var col = domConstruct.create("div", { class: "noteSpan", id: row.id + "_timeStep_" + j });
                        domAttr.set(col, "step", j);

                        var id = col.id;

                        if (j == 0) {
                            if (i % 2 == 1) {
                                titleClass = "noteSpan_TitleDark";
                                altRow = true;
                            } else {
                                titleClass = "noteSpan_TitleLight";
                                altRow = false;
                            }
                            domClass.add(col, titleClass);
                            col.innerHTML = "<span>" + out + "</span>";

                            div = domConstruct.create("div", { class: "notesDiv" });
                            domConstruct.place(col, row);
                            domConstruct.place(div, row);
                            (function () {
                                var tid = id;
                                on(dojo.byId(tid), "click", function () {
                                    var note = Note.fromLatin(domAttr.get(this.parentNode, "note"));
                                    this.audioletApp = new AudioletAppNote(note);
                                });
                            })();

                        } else {
                            domStyle.set(col, "width", this.timeStep + "px");

                            if (altRow) {
                                domClass.add(col, "altRow");
                            }

                            if (div) {
                                domConstruct.place(col, div);
                            }
                            _this = this;
                            (function () {
                                var tid = id;
                                on(dojo.byId(tid), "click", function () {
                                    var item = dojo.byId(tid);
                                    var note = Note.fromLatin(domAttr.get(this.parentNode.parentNode, "note"));
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
                }
            },

            createNote: function (position, note, id) {
                div = domConstruct.create("div", { id: id, class: "note" });
                domConstruct.place(div, this.srcNodeRef);
                var _this = this;
                $(function () {
                    var gridWidth = _this.timeStep + 1;
                    noteNode = $("#" + id)[0];

                    $("#" + id).resizable({
                        grid: gridWidth,
                        handles: "e, w"
                    });

                    $("#" + id).draggable({
                        grid: [gridWidth, 41],
                        ghost: true,
                        containment: "parent"
                    });

                    domStyle.set(noteNode, "left", position.x + "px");
                    domStyle.set(noteNode, "top", position.y + "px");
                    domStyle.set(noteNode, "width", (_this.timeStep - 2) + "px");
                    //noteNode.innerHTML = "<span style: margin:5px>" + note.latin() + "</span>";
                });

                return div;
            },

            playAll: function () {
                for (var i = 1; i < _this._notesArray.length; i++) {

                    (function () {
                        var chord = _this._notesArray[i];

                        _this._audiolet.scheduler.addRelative(i, function () {
                            if(chord) {
                                for (var j = 0; j <chord.length; j++) {
                                    (function() {
                                        var div = chord[j][0];
                                        var note = chord[j][1];
                                        note.step = parseInt(domAttr.get(div, "step"));

                                        domClass.replace(div, "notePlay", "note");

                                        var synth = new Synth(_this._audiolet, note.frequency());
                                        console.log("Playing: " + note.frequency());
                                        synth.connect(_this._audiolet.output);

                                        setTimeout(dojo.hitch(this, function() { domClass.replace(div, "note", "notePlay") }), 500);
                                    })();

                                }
                            }
                        } .bind(_this));
                    })();
                }
            },
        });
    });