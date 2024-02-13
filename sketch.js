let img, TILES_X = 100, TILES_Y = 100, BOLD, CHARS = "FLVR", string = "imgs/seed1.jpg", laranja, cinza;
var dropzone;
let vid;

function preload() {
  img = loadImage(string);
  BOLD = loadFont("CarbonaTest-MonoBold.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(displayDensity);
  img.resize(TILES_X, TILES_Y);
  TILE_W = width / TILES_X;
  TILE_H = height / TILES_Y;
  textFont(BOLD);
  textAlign(CENTER, CENTER);
  laranja = color('#F84C01');
  cinza = color('#A3A3A3');

  dropzone = select('#dropzone');
  dropzone.drop(gotFile);

}

function draw() {
  background("#000000");

  noStroke();
  translate(TILE_W / 2, TILE_H / 2);
  for (let x = 0; x < TILES_X; x++) {
    for (let y = 0; y < TILES_Y; y++) {
      let c = img.get(x, y), b = brightness(c), selector = int(map(b, 0, 100, 0, CHARS.length) - 1);
      textFont(BOLD);
      if (b < map(sin(radians(frameCount)),-1,1,0,122)) {
        fill(laranja);
      } else {
        fill(cinza);
      }
      push();
      textSize(b / 12);
      translate(x * TILE_W, y * TILE_H);
      text(CHARS.charAt(map(sin(radians(frameCount + x * y)), -1, 1, 0, CHARS.length - 1)), 0, 0);
      pop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  location.reload();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    laranja = color('#A3A3A3');
    cinza = color('#F84C01');
  } else if (keyCode === RIGHT_ARROW) {
    laranja = color('#F84C01');
    cinza = color('#A3A3A3');

  }
}



function gotFile(file){
  img = loadImage(file.data, () => {
    img.resize(TILES_X, TILES_Y);
  });
}

function gotFile(file) {
  if (file.type === 'image') {
    img = loadImage(file.data, () => {
      img.resize(TILES_X, TILES_Y);
    });
  }else if (file.type === 'video') {
      vid = createVideo(file.data, () => {
      vid.size(TILES_X,TILES_Y);
      vid.loop();
      vid.hide(); 
    img = vid;
    });
  }
}