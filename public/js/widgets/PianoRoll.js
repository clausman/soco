require(["dojo/_base/declare", "dojo/dom-construct", "dojo/dom-class", "dojo/dom-attr", "dojo/on", "dojo/window", "dojo/ready", "dojo/number", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojo/text!./js/widgets/templates/PianoRoll.html"],
    function (declare, domConstruct, domClass, domAttr, on, window, ready, number, _WidgetBase, _TemplatedMixin, _PianoRollTemplate) {

        declare("widgets.PianoRoll", [_WidgetBase, _TemplatedMixin], {
            templateString: _PianoRollTemplate,
            timeStep: 0.25, // the breakdown of tempo - 1/16, 1/8, 1/4, 1/2, 1 step
            numOctaves: 4,  // how many octaves to show (starting at middle C)

            _notesArray: null,

            buildRendering: function () {
                if (!this._notesArray) {
                    this._notesArray = {};
                }

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

                    for (var j = 0; j < 100; j++) {
                        var col = domConstruct.create("div", { class: "noteSpan1_8", id: row.id + "_timeStep_" + j });
                        var id = col.id;

                        if (j == 0) {
                            if (i % 2 == 1) {
                                titleClass = "noteSpan_TitleDark";
                                altRow = true;
                            } else {
                                titleClass = "noteSpan_TitleLight";
                                altRow = false;
                            }
                            domClass.replace(col, titleClass, "noteSpan1_4");
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

                            if (altRow) {
                                domClass.add(col, "altRow");
                            }

                            if (div) {
                                domConstruct.place(col, div);
                            }
                            (function () {
                                var tid = id;
                                on(dojo.byId(tid), "click", function () {

                                    domClass.replace(dojo.byId(tid), "selectedNote", "altRow");
                                    var note = Note.fromLatin(domAttr.get(this.parentNode.parentNode, "note"));
                                    this.audioletApp = new AudioletAppNote(note);
                                });
                            })();
                        }
                    }
                }
                console.log("Hello WOrld");
                window.getBox();
            }
        });
    });