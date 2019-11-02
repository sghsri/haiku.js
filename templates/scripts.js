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
