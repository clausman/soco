/**
 *  This file seeds the database with initial values when init.js is called
 */

var Composition = require('../models/composition');
var Track = require('../models/track');
var NoteGroup = require('../models/noteGroup');
var Note = require('../models/note');

var compositions = [
    Composition.create('Cool Song', {id:'cs', creator:'Josh', tracks:['cs_t1', 'cs_t2']}),
    Composition.create('Lame Song', {id:'ls', creator:'Jonny', tracks:['ls_t1', 'ls_t2']}),
];

var tracks = [
    Track.create('track one', {id:'cs_t1', instrument:'piano', noteGroups:['cs_to_1']}), 
    Track.create('track two', {id:'cs_t2', instrument:'drums', noteGroups:['cs_tt_1']}),
    Track.create('track one', {id:'ls_t1', instrument:'spoons', noteGroups:['ls_to_1']}),
    Track.create('track two', {id:'ls_t2', instrument:'banjo', noteGroups:['ls_tt_1']}),
];

var notes = [
    NoteGroup.create(0, {id:'cs_to_1', notes: [
        Note.create(69, 1, 2, 1, 10, 10),
        Note.create(73, 1, 4, 1, 10, 10),
        Note.create(74, 4, 4, 1, 10, 10)]}),
    NoteGroup.create(0, {id:'cs_tt_1', notes: [
        Note.create(69, 1, 1, 1, 10, 10),
        Note.create(73, 1, 3, 1, 10, 10),
        Note.create(74, 4, 2, 1, 10, 10)]}),
    NoteGroup.create(0, {id:'ls_to_1', notes: [
        Note.create(69, 1, 1, 1, 10, 10),
        Note.create(73, 1, 3, 1, 10, 10),
        Note.create(74, 4, 2, 1, 10, 10)]}),
    NoteGroup.create(0, {id: 'ls_tt_1', notes: [
        Note.create(69, 1, 1, 1, 10, 10),
        Note.create(73, 1, 3, 1, 10, 10),
        Note.create(74, 4, 2, 1, 10, 10)]}),
];

 module.exports = {
    compositions:compositions,
    tracks:tracks,
    notes:notes
 };
