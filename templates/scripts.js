
function resolve_input(){
    return 'http://localhost:5000/haiku/github/?url=https://github.com/sghsri/UT-Registration-Plus/blob/master/js/import.js';
}

function get_line_end_char(){
    let chars = [' ? ', ' ! '];
    console.log(chars);
    return chars[Math.floor(Math.random()*chars.length)];
}
function random_pauses(){
    let periods = "";
    let num_periods = Math.random() * (3 - 1) + 1;
    let line_end_char = get_line_end_char();
    for(let i = 0; i<num_periods;i++){
        periods += line_end_char;
    }
    return periods;
}

function add_random_pause(code){
    let code_string = ""
    code.forEach((line)=>{
        code_string += remove_extraneous(line);
        code_string += random_pauses();
    });
    return code_string;
}

function remove_extraneous(haiku){
    return haiku.replace(/[.,\/#!$%\^&\*\"\';:{}=\-_`~()+-><]/g, "");
}

function query_backend(url, pause=true){
     fetch(url).then(response => {
        return response.json();
    }).then(haiku => {
        console.log(haiku);
        // haiku = haiku.replace(/[.,\/#!$%\^&\*\"\';:{}=\-_`~()+-><]/g, "");
        if(pause)
            haiku = add_random_pause(haiku);
        else
            haiku = haiku.join(' ');
        play_haiku(haiku);
    }).catch(err => {
        return err;
    })
}

function play_haiku(haiku){
    console.log(haiku);
    var player = new SpeechSynthesisUtterance(haiku);
    window.speechSynthesis.speak(player);
}

document.getElementById('convert_button').addEventListener("click", function(){
    let url = resolve_input();
    query_backend(url);
});

var player;

document.addEventListener("DOMContentLoaded", function(){
  let picIndex = Math.ceil(Math.random() * 5);
  $('#hero').css("background-image", "url(images/bg" + picIndex + ".gif)");

  window.setInterval(function(){
    player.playVideo();
  }, 100);

  window.setInterval(function(){
    $('#hero').css("background-image", "url(images/bg" + picIndex + ".gif)");
    picIndex = picIndex % 5 + 1;
  }, 10000);
});

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        width: 1,
        height: 1,
        videoId: 'hHW1oY26kxQ',
        playerVars: {
            color: 'white',
            playlist: 'taJ60kskkns,FG0fTKAqZ5g'
        }
    });
}

function play () {
  player.playVideo();
}
