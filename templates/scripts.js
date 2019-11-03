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

document.addEventListener("DOMContentLoaded", function(){


  let picIndex = Math.ceil(Math.random() * 5);
  $('#hero').css("background-image", "url(images/bg" + picIndex + ".gif)");

  window.setInterval(function(){
    $('#hero').css("background-image", "url(images/bg" + picIndex + ".gif)");
    picIndex = picIndex % 5 + 1;
  }, 10000);
});

document.body.addEventListener("click", addTreats);

let width = $(window).width()
let height = $(window).height()
console.log(height)
const body = document.body;
const elWrapper = document.querySelector(".blossom-wrapper");

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const treats = [];
const radius = 20;

const Cd = 0.47; // Dimensionless
const rho = 1.22; // kg / m^3
const A = Math.PI * radius * radius / 10000; // m^2
const ag = 9.81; // m / s^2
const frameRate = 1 / 60;

function createTreat(e) /* create a treat */ {
  const vx = getRandomArbitrary(-10, 10); // x velocity
  const vy = getRandomArbitrary(-10, 1);  // y velocity

  const el = document.createElement("div");
  el.className = "blossom";

  elWrapper.append(el);

  const lifetime = getRandomArbitrary(2000, 3000);

  el.style.setProperty("--lifetime", lifetime);

  const treat = {
    el,
    absolutePosition: { x: width / 2, y: 0 },
    position: { x: e.clientX, y: e.clientY },
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
      const treat = this;
      let Fx =
        -0.5 *
        Cd *
        A *
        rho *
        treat.velocity.x *
        treat.velocity.x *
        treat.velocity.x /
        Math.abs(treat.velocity.x);
      let Fy =
        -0.5 *
        Cd *
        A *
        rho *
        treat.velocity.y *
        treat.velocity.y *
        treat.velocity.y /
        Math.abs(treat.velocity.y);

      Fx = isNaN(Fx) ? 0 : Fx;
      Fy = isNaN(Fy) ? 0 : Fy;

      // Calculate acceleration ( F = ma )
      var ax = Fx / treat.mass;
      var ay = ag + Fy / treat.mass;
      // Integrate to get velocity
      treat.velocity.x += ax * frameRate;
      treat.velocity.y += ay * frameRate;

      // Integrate to get position
      treat.position.x += treat.velocity.x * frameRate * 100;
      treat.position.y += treat.velocity.y * frameRate * 100;

      treat.checkBounds();
      treat.update();
    },

    checkBounds() {

      if (treat.position.y > height) {
        treat.remove();
      }
      if (treat.position.x > width) {
        treat.remove();
      }
      if (treat.position.x + treat.radius < 0) {
        treat.remove();
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

  return treat;
}


function animationLoop() {
  var i = treats.length;
  while (i--) {
    treats[i].animate();

    if (!treats[i].animating) {
      treats.splice(i, 1);
    }
  }

  requestAnimationFrame(animationLoop);
}

animationLoop();

function addTreats(e) {
  //cancelAnimationFrame(frame);
  if (treats.length > 40) {
    return;
  }
  for (let i = 0; i < 20; i++) {
    treats.push(createTreat(e));
  }
}
