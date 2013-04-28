window.onload = function(){
    var canvas = document.getElementById('sheetCanvas');
    var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);

    //HACK Very route dependant
    var url = window.location.href
    var id = url.substring(url.lastIndexOf('/')+1)
    
    $.get("/composition/"+id+"/full", function(data) {
        render_tracks(renderer, data.tracks);
    });
};

function render_tracks(renderer, tracks)
{
    var staveOffset = 80;
    var staveLength = 800;
    var ctx = renderer.getContext();
    for (var i = 0; i < tracks.length; i++) {
        var stave = new Vex.Flow.Stave(10, i*staveOffset, staveLength);
        stave.addClef("treble").setContext(ctx).draw();
        render_notes(renderer, stave, tracks[i].note_groups);
    };
}

function render_notes(renderer, stave, noteGroups)
{

    for (var i = 0; i < 1; i++) {
         var group = noteGroups[i];
         var voice = createVoice(group);
         var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 800);

        voice.draw(renderer.getContext(), stave);
     };
}

function createVoice(noteGroup)
{
    
    var notes = []
    beats = 0
    for (var i = 0; i < noteGroup.notes.length; i++) {
        var note = noteGroup.notes[i];
        notes.push(createNote(note));
        beats += note.durationNumerator / note.durationDenominator
    };
    var voice = new Vex.Flow.Voice({
        num_beats: beats,
        beat_value: 4,
        resolution: Vex.Flow.RESOLUTION
    });

    voice.addTickables(notes);
    return voice;
}

function createNote(note)
{
    var let = note_map[note.pitch % 12];
    var octave = Math.floor(note.pitch / 12) - 1;
    var dur = dur_map[note.durationDenominator-1][note.durationNumerator-1];
    return new Vex.Flow.StaveNote({keys: [let+"/"+octave], duration:dur})    
}
// midi value 24-35
var note_map = [ 
'c','c#','d','eb', 'e','f','f#','g','g#','a','bb', 'b'
];
var dur_map = [
/*         1   2    3   4     */
/* 1 */  ['q','h','hd','w'],
/* 2 */  ['8','q','qd','h'],
/* 3 */  ['q','q','q','q'],
/* 4 */  ['16','8','8d','q'],
]
