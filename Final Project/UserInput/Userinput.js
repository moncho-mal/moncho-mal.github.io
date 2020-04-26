//variables
let song, analyzer;

//terrain
var cols, rows;
var scl = 60;
var w = 500;
var h = 900;
var zoff = -200;
var inc = 0.1;
var zinc = 0.01;
var start = 100;
var minVal = 200;
var maxVal = 400;
var startInc = 0;
//
//
let angle = 100;

function preload() {
  song = loadSound('Ghost.mp3');
}

function setup() {
  song.loop();
  analyzer = new p5.Amplitude();
  analyzer . setInput(song);
  createCanvas(windowWidth, windowHeight, WEBGL);
  cols = w / scl;
  rows = h / scl;
}
//start and stop function
function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
    background(0);
  } else {
    song.play();
    background(0);
  }
}




function draw() {

  background(0);

  let rms = analyzer.getLevel();

  //terrain
  stroke(144, 182, 249);
  rotateX(PI/1.9);
  rotateY(PI/1);
  rotateZ(PI/3.4);

  let yoff = start;
  for (let y = -100; y < rows - 1.9; y++) {
    let xoff = -80;
    beginShape(TRIANGLE_STRIP);
    for (let x = -35; x < cols; x++) {
      vertex(x*scl, y*scl, map(noise(xoff,yoff,zoff), 0, 1, minVal, maxVal));
      vertex(x*scl, (y+1)*scl, map(noise(xoff,yoff,zoff), 0, 1, minVal, maxVal));
      xoff += inc;
    }
    yoff += inc;
    endShape();
  }
  zoff += zinc;
  start += startInc;


//sphere element

  noFill();
  translate(-230, -10, -120)
  push();
  rotateX(angle,frameCount * .15);
  rotateY(angle,frameCount * .5);
  rotateZ(angle,frameCount * .5);
  stroke(255);
  sphere(200 * rms + 220 )
  pop();
  angle += 0.04;





  //sine cosine

rotateY(frameCount * .02);
  for (let j = 0.02; j < 10; j++) {
    push();
    for (let i = 0.02; i < 100; i++) {
      translate(
        //sin(frameCount * .02 - j) *  10,
        sin(frameCount * .02 - j) * rms ,100,
        i *  0.002
      );

      rotateZ(frameCount * 0.02);
      sphere(0 * rms , 10);
      push();
      stroke(144, 182, 249)
      sphere(80 * rms , 20);
      pop();
    }
    pop();
  }


  //orbit control
  orbitControl();
  let radius = width * 1.2;

}
