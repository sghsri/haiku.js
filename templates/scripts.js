
const base = 'http://localhost:5000/';
function resolve_input(){
    let url = document.getElementById('github_input').value;
    if(url){
        return base+'haiku/github/?url='+url;
    }
}
function get_line_end_char(){
    let chars = [' ? ', ' ! '];
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
var player;
const colors = ["#F7CED9", "#D1FFD4", "#FCCFEB", "#E6E6E6", "#ACD0CB"]

document.addEventListener("DOMContentLoaded", function(){
  let picIndex = Math.ceil(Math.random() * 5);
  $('#hero').css("background-image", "url(images/bg" + picIndex + ".gif)");
  $('#hero-title').css("color", colors[picIndex - 1]);
  $('#hero-subtitle').css("color", colors[picIndex - 1]);

  window.setInterval(function(){
    player.playVideo();
  }, 100);

  window.setInterval(function(){
    $('#hero').css("background-image", "url(images/bg" + picIndex + ".gif)");
    $('#hero-title').css("color", colors[picIndex - 1]);
    $('#hero-subtitle').css("color", colors[picIndex - 1]);
    picIndex = picIndex % 5 + 1;
  }, 10000);
});

window.addEventListener("click", addBlossoms);

let width = $(document.body).width()
let height = $(document.body).height()

const body = document.body;
const elWrapper = document.querySelector(".blossom-wrapper");

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const blossoms = [];
const radius = 20;

const Cd = 0.47; // Dimensionless
const rho = 1.22; // kg / m^3
const A = Math.PI * radius * radius / 10000; // m^2
const ag = 9.81; // m / s^2
const frameRate = 1 / 60;

function createblossom(e) /* create a blossom */ {
  const vx = getRandomArbitrary(-10, 10); // x velocity
  const vy = getRandomArbitrary(-10, 1);  // y velocity

  const el = document.createElement("div");
  el.className = "blossom";

  elWrapper.append(el);

  const lifetime = getRandomArbitrary(2000, 3000);

  el.style.setProperty("--lifetime", lifetime);

  const blossom = {
    el,
    absolutePosition: { x: width / 2, y: 0 },
    position: { x: e.pageX, y: e.pageY },
    velocity: { x: vx, y: vy },
    mass: 0.1, //kg
    radius: el.offsetWidth, // 1px = 1cm

    lifetime,

    animating: true,

    remove() {
      this.animating = false;
      this.el.parentNode.removeChild(this.el);
    },

    animate() {
      const blossom = this;
      let Fx =
        -0.5 *
        Cd *
        A *
        rho *
        blossom.velocity.x *
        blossom.velocity.x *
        blossom.velocity.x /
        Math.abs(blossom.velocity.x);
      let Fy =
        -0.5 *
        Cd *
        A *
        rho *
        blossom.velocity.y *
        blossom.velocity.y *
        blossom.velocity.y /
        Math.abs(blossom.velocity.y);

      Fx = isNaN(Fx) ? 0 : Fx;
      Fy = isNaN(Fy) ? 0 : Fy;

      // Calculate acceleration ( F = ma )
      var ax = Fx / blossom.mass;
      var ay = ag + Fy / blossom.mass;
      // Integrate to get velocity
      blossom.velocity.x += ax * frameRate;
      blossom.velocity.y += ay * frameRate;

      // Integrate to get position
      blossom.position.x += blossom.velocity.x * frameRate * 100;
      blossom.position.y += blossom.velocity.y * frameRate * 100;

      blossom.checkBounds();
      blossom.update();
    },

    checkBounds() {

      if (blossom.position.y > height) {
        blossom.remove();
      }
      if (blossom.position.x > width) {
        blossom.remove();
      }
      if (blossom.position.x + blossom.radius < 0) {
        blossom.remove();
      }
    },

    update() {
      const relX = this.position.x - this.absolutePosition.x;
      const relY = this.position.y - this.absolutePosition.y;

      this.el.style.setProperty("--x", relX);
      this.el.style.setProperty("--y", relY);
      this.el.style.setProperty("--direction", this.direction);
    }
  };

  return blossom;
}


function animationLoop() {
  var i = blossoms.length;
  while (i--) {
    blossoms[i].animate();

    if (!blossoms[i].animating) {
      blossoms.splice(i, 1);
    }
  }

  requestAnimationFrame(animationLoop);
}

animationLoop();

function addBlossoms(e) {
  if(blossoms.length > 40) {
    return;
  }
  //cancelAnimationFrame(frame);
  for (let i = 0; i < 20; i++) {
    blossoms.push(createblossom(e));
  }
}

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
