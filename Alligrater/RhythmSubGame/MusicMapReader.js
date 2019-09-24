var BeatMap = [];
var BeatIndex = 0;




var music;
var BeatSpeed;
var FirstBeatCountdown;
var hit_sound;

var musicLength = 0;



function loadinRhythmMap(jsonpath){
    clearRhythmMapStatus();

    var fs = require('fs');
    var content = fs.readFileSync(jsonpath);

    //Parsing
    var JSONContent = JSON.parse(content);
    //This needs to be modified to fit the current style

    for(var x of JSONContent.map){
        BeatMap.push(x);
        musicLength = x.start;
        if(x.until){
            musicLength = x.until;
        }
    }

    musicLength += MUSIC_OFFSET * 2

    BeatSpeed = JSONContent.timepernote;
    FirstBeatCountdown = JSONContent.map[0].start;

    music = sounds[JSONContent.path];
    music.volume = 0.5;

    if(JSONContent.hitsound != null){
        hit_sound = sounds[JSONContent.hitsound];
    }
    else{
        hit_sound = sounds["Resources/SE/hit.wav"];
        hit_sound.volume = 0.0;
    }
}


function clearRhythmMapStatus(){
    CUR_SUSHI_INDEX = 0;
    pause = true;
    TICK_TIME = 0;
    BeatMap = [];
    BeatIndex = 0;
    musicLength = 0;
    fishstage.setVariables();
    sushistage.setVariables();
    resetCombo();

}
