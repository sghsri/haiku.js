// Change if working on locally
// const base = "http://localhost:5000/";
const base = "https://haiku-js.herokuapp.com/";
function resolve_input() {
  let url = document.getElementById("github_input").value;
  if (url) {
    return base + "haiku/github/?url=" + url;
  }
}
function get_line_end_char() {
  let chars = [" ? ", " ! "];
  return chars[Math.floor(Math.random() * chars.length)];
}

function long_pause() {
  let periods = "";
  for (let i = 0; i < 3; i++) {
    periods += " ! ";
  }
  return periods;
}

function random_pauses() {
  let periods = "";
  let num_periods = Math.random() * (5 - 2) + 1;
  let line_end_char = get_line_end_char();
  for (let i = 0; i < num_periods; i++) {
    periods += line_end_char;
  }
  return periods;
}

function add_random_pause(code) {
  let code_string = "";
  code.forEach((line) => {
    code_string += remove_extraneous(line);
    code_string += random_pauses();
  });
  return code_string;
}

function add_reading_to_all_haikus(haikus) {
  let out_string = "";
  haikus.forEach((haiku) => {
    out_string += add_random_pause(haiku);
    out_string += long_pause();
  });
  return out_string;
}

function remove_extraneous(haiku) {
  return haiku.replace(/[.,\/#!$%\^&\*\"\';:{}=\-`~()+-><]/g, "");
}

function put_in_output(haikus) {
  document.getElementById("output").value = "// Output\n";
  haikus.forEach((haiku) => {
    document.getElementById("output").value += haiku.join("\n");
    document.getElementById("output").value += "\n\n";
  });
}

function query_backend_using_url(url) {
  console.log("querying backend");
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((haikus) => {
      put_in_output(haikus);
      let read_haiku = add_reading_to_all_haikus(haikus);
      play_haiku(read_haiku);
    })
    .catch((err) => {
      console.log("ERROR");
      console.log(err);
      return err;
    });
}

function fill_input_from_url(url) {
  let api_url = base + "github/?url=" + url;
  fetch(api_url)
    .then((response) => {
      return response.json();
    })
    .then((code) => {
      console.log(code);
      document.getElementById("input").value = code;
      document.getElementById("github_input").value = "";
    })
    .catch((err) => {
      return err;
    });
}

function play_haiku(haiku) {
  window.speechSynthesis.cancel();
  var speaker = new SpeechSynthesisUtterance(haiku);
  speaker.rate = 0.85;
  speaker.pitch = 0.75;
  window.speechSynthesis.speak(speaker);

  speaker.addEventListener("end", function (event) {
    $("#old-man").animate({ right: "-300px" }, 1000);
  });
}

document
  .getElementById("convert_button")
  .addEventListener("click", function () {
    $("#old-man").animate({ right: "25px" }, 1000);

    let foo = "0 0";

    window.setInterval(function () {
      $("#old-man").css("background-position", foo);

      if (foo === "0 0") {
        foo = "250px 250px";
      } else {
        foo = "0 0";
      }
    }, Math.random() * 100 + Math.random() * 500);

    let url = resolve_input();
    if (url) {
      query_backend_using_url(url);
    } else {
      let input_text = document
        .getElementById("input")
        .value.replace("// Input", "")
        .replace(/\r?\n|\r/g, "\n");
      let url = base + "haiku/text/?text=" + input_text;
      query_backend_using_url(url);
    }
  });

document
  .getElementById("execute_button")
  .addEventListener("click", function () {
    let code = document
      .getElementById("output")
      .value.replace("// Output", "")
      .replace(/\r?\n|\r/g, "");
    console.log(code);
    try {
      eval(code);
    } catch (error) {
      alert(error);
    }
  });

document.getElementById("input_button").addEventListener("click", function () {
  let url = document.getElementById("github_input").value;
  fill_input_from_url(url);
});
var player;
const colors = ["#F7CED9", "#D1FFD4", "#FCCFEB", "#E6E6E6", "#ACD0CB"];

document.addEventListener("DOMContentLoaded", function () {
  let picIndex = Math.ceil(Math.random() * 5);
  $("#hero").css("background-image", "url(images/bg" + picIndex + ".gif)");
  $("#hero-title").css("color", colors[picIndex - 1]);
  $("#hero-subtitle").css("color", colors[picIndex - 1]);

  let video_loop = window.setInterval(function () {
    player.playVideo();
  }, 500);

  window.setInterval(function () {
    $("#hero").css("background-image", "url(images/bg" + picIndex + ".gif)");
    $("#hero-title").css("color", colors[picIndex - 1]);
    $("#hero-subtitle").css("color", colors[picIndex - 1]);
    picIndex = (picIndex % 5) + 1;
  }, 10000);
});

window.addEventListener("click", addBlossoms);

let width = $(document.body).width();
let height = $(document.body).height();

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
const A = (Math.PI * radius * radius) / 10000; // m^2
const ag = 9.81; // m / s^2
const frameRate = 1 / 60;

function createblossom(e) /* create a blossom */ {
  const vx = getRandomArbitrary(-10, 10); // x velocity
  const vy = getRandomArbitrary(-10, 1); // y velocity

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
        (-0.5 *
          Cd *
          A *
          rho *
          blossom.velocity.x *
          blossom.velocity.x *
          blossom.velocity.x) /
        Math.abs(blossom.velocity.x);
      let Fy =
        (-0.5 *
          Cd *
          A *
          rho *
          blossom.velocity.y *
          blossom.velocity.y *
          blossom.velocity.y) /
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
      if (blossom.position.y + blossom.radius / 2 > height) {
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
    },
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
  if (blossoms.length > 40) {
    return;
  }
  //cancelAnimationFrame(frame);
  for (let i = 0; i < 20; i++) {
    blossoms.push(createblossom(e));
  }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("video-placeholder", {
    width: 1,
    height: 1,
    videoId: "5qap5aO4i9A",
    playerVars: {
      color: "white",
    },
  });
}

function play() {
  player.playVideo();
}
