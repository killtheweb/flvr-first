let img, TILES_X = 100, TILES_Y = 100, BOLDD, CHARS = "FLVR", string = "imgs/seed1.jpg", laranja, cinza;
var dropzone;
var slid;
let vid;
let cnv;
var resizeButton;

let gradient = true;
let c1, c2;

let pg;

function preload() {
  img = loadImage(string);
  BOLDD = loadFont("CarbonaTest-MonoBold.otf");
}

function setup() {
  cnv = createCanvas(1080, 1080);
  cnv.parent(output);
  pixelDensity(displayDensity);
  pg = createGraphics(1080,1080);

  c1 = color(11,11,11);
  c2 = color(200);

  img.resize(TILES_X, TILES_Y);
  TILE_W = width / TILES_X;
  TILE_H = height / TILES_Y;
  textFont(BOLDD);
  textAlign(CENTER, CENTER);
  laranja = color('#F84C01');
  cinza = color('#A3A3A3');

  dropzone = select('#dropzone');
  dropzone.drop(gotFile);

  resizeButton = select('#resizeButton');
  resizeButton.mousePressed(resizeC);

  slid = createSlider(0,110,0);
  slid.id('pixelP');
  // slid.position('400', '600');
}

function draw() {

  if(gradient == false){  
    background("#000000");
  }else if(gradient == true){
    for(let y=0; y<height; y++){
      n = map(y,0,height,0,1);
      let newc = lerpColor(c1,c2,n);
      stroke(newc);
      line(0,y,width, y);
        }
      }

  noStroke();
  pg.clear();
  // pg.translate(TILE_W / 2, TILE_H / 2);
  for (let x = 0; x < TILES_X; x++) {
    for (let y = 0; y < TILES_Y; y++) {
      let c = img.get(x, y), b = brightness(c), selector = int(map(b, 0, 100, 0, CHARS.length) - 1);
      pg.textFont(BOLDD);
      // if (b < map(sin(radians(frameCount)),-1,1,0,122)) {
        if (b < slid.value()) {

          pg.fill(laranja);
      } else {
        pg.fill(cinza);
      }
      pg.push();
      pg.textSize(b / 12);
      pg.translate(x * TILE_W, y * TILE_H);
      pg.text(CHARS.charAt(map(sin(radians(frameCount + x * y)), -1, 1, 0, CHARS.length - 1)), 0, 0);
      pg.pop();
    }
  }
  image(pg,0,0);
}


function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    laranja = color('#A3A3A3');
    cinza = color('#F84C01');
  } else if (keyCode === RIGHT_ARROW) {
    laranja = color('#F84C01');
    cinza = color('#A3A3A3');

  }else if(keyCode === 83){
  save(pg, "flvr-alpha.png");  
  }else if(keyCode === 65){
  save(cnv, "flvr.png");
  }else if(keyCode === 68){
    filter(THRESHOLD,0.1);
    save(cnv, "flvr-mask.png");  }
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
      vid.size(TILES_X/2,TILES_Y/2);
      vid.loop();
      vid.hide(); 
    img = vid;
    });
  }
}

function resizeC(){
  resizeCanvas(1920,1080);
}

// function mousePressed(){
//   gradient = !gradient;
// }
