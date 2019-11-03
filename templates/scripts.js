
const base = 'http://localhost:5000/';
function resolve_input(){
    let url = document.getElementById('github_input').value;
    if(url){
        return base+'haiku/github/?url='+url;
    }
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

function put_in_output(haiku){
    document.getElementById('output').value = "// Output\n"+haiku.join('\n');
}

function query_backend_using_url(url, pause=true){
     fetch(url).then(response => {
        return response.json();
    }).then(haiku => {
        put_in_output(haiku);
        if(pause)
            haiku = add_random_pause(haiku);
        else
            haiku = haiku.join(' ');
        play_haiku(haiku);
    }).catch(err => {
        return err;
    })
}

function fill_input_from_url(url, pause=true){
    let api_url = base+'github/?url='+url;
     fetch(api_url).then(response => {
        return response.json();
    }).then(code => {
        console.log(code);
        document.getElementById('input').value = code;
        document.getElementById('github_input').value = '';
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
    if(url){
        query_backend_using_url(url);
    } else {
        let input_text = document.getElementById('input').value.replace(/\r?\n|\r/g, "");
        let url = base+'haiku/text/?text='+input_text;
        query_backend_using_url(url);
    }

});

document.getElementById('input_button').addEventListener("click", function(){
    let url = document.getElementById('github_input').value;
    fill_input_from_url(url);
});


document.addEventListener("DOMContentLoaded", function(){
  let picIndex = Math.ceil(Math.random() * 5);
  $('#hero').css("background-image", "url(images/bg" + picIndex + ".gif)");

  window.setInterval(function(){
    $('#hero').css("background-image", "url(images/bg" + picIndex + ".gif)");
    picIndex = picIndex % 5 + 1;
  }, 10000);
});
