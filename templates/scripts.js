function random_pauses(){
    let periods = "";
    let num_periods = Math.random() * (3 - 1) + 1;
    for(let i = 0; i<num_periods;i++){
        periods += " ! "
    }
    return periods;
}

function add_random_pause(code){
    let code_string = ""
    code.forEach((line)=>{
        code_string += line
        code_string += random_pauses();
    });
    return code_string

}
function get_code(pause=true){
    let code = ['function potato','( input , seeds , dude ) { if ( ) { ( ) } return', 'input + seeds + dude ; }'];
    if(pause)
        return add_random_pause(code);
    return code
}

document.getElementById('button').addEventListener("click", function(){
    let code = get_code()
    console.log(code);
    var msg = new SpeechSynthesisUtterance(code);
    window.speechSynthesis.speak(msg);
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
