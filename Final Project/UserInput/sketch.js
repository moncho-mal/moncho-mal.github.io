let soundFile;
let colorPicker1;
let colorPicker2;
let circleBool = false;
let lineBool = true;
let frequencyBool = false;
let volumeBool = true;
let amp;
let fft = new p5.FFT(0.95,1024);
let canvas;


function togglePlay() {
  if (soundFile.isPlaying()) {
    soundFile.pause();
  } else {
    soundFile.loop();

  }
}


function gotFile(file) {
  if((!soundFile) && (file.type == "audio")) { // if don't already have sound && is audio
		background(0);
    soundFile = new p5.SoundFile(file.data);
    canvas.mouseClicked(togglePlay); // listen for mouse click to play sound
  }
}


function changeToLine(){
    lineBool = true;
    circleBool = false;
}

function changeToCircle(){
  lineBool = false;
  circleBool = true;
  radialbool = false;
}

function changeToFrequency(){
  frequencyBool = true;
  volumeBool = false;
  radialbool = false;
}

function changeToVolume(){
  frequencyBool = false;
  volumeBool = true;
  radialbool = false;
}




function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.drop(gotFile);
  angleMode(DEGREES);
  background(0);

  BasicView = createButton("Line Visual");
  CircleView = createButton("Circle Visual");
  FrequencyView = createButton("To watch frequency change");
  VolumeView=  createButton("To watch the volume change");

  colorPicker1 = createColorPicker('#00ffd9');
  colorPicker2 = createColorPicker('#ff5964');


  VolumeView.mousePressed(changeToVolume);
  FrequencyView.mousePressed(changeToFrequency);
  BasicView.mousePressed(changeToLine);
  CircleView.mousePressed(changeToCircle);

  w = windowWidth/1024;
  textAlign(CENTER); // welcome text
  fill(255);
  text("Drop MP3 here, then click the canvas to play when uploaded.", windowWidth/2, windowHeight/2);


}


function draw(){
  spect = fft.analyze();


  if(soundFile){
    setColor(colorPicker1,colorPicker2);
    background(0);
    noStroke();

    if(soundFile.isPlaying()){
      if(volumeBool == true){
        if(lineBool == true){
        volumeLine();
        }

        if(circleBool == true){
        volumeCircle();
        }

      }

      if(frequencyBool == true){
        if(lineBool == true){
        frequencyLine(spect,w);
        }

        if(circleBool == true){
          frequencyCircle(spect);
        }
      }
    }

    }

}





function windowResized() {
  canvas = resizeCanvas(windowWidth, windowHeight);
}
