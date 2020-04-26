

let histSound=[];

let c1;
let c2;
let amp1 = new p5.Amplitude();
let amp2 = new p5.Amplitude();
let r;
let inter;
let c;
let x;
let y;
let angle;

function setColor(cp1,cp2){
  c1 = cp1.color();
  c2 = cp2.color();
}

function volumeLine(){
  let vol = amp1.getLevel();
  histSound.push(vol);

  for(let i = 0; i < histSound.length; i++){
    y = map(histSound[i], 0,1,0,windowHeight/2);
    inter = map(i, 0, histSound.length,0,1);
    c = lerpColor(c1,c2,inter);
    fill(c);
    rect(i,windowHeight/2,-2,-y);
    rect(i,windowHeight/2, -2,y);
  }
  if(histSound.length > windowWidth) {
    histSound.splice(0,1);
  }

}

function volumeCircle(){

  translate(windowWidth/2,windowHeight/2);
  let vol = amp1.getLevel();
  histSound.push(vol);
  for(let i = 0; i < 360; i++){
    r = map(histSound[i], 0,1,100,windowHeight/2);
    inter = map(i, 0, histSound.length,0,1);
    c = lerpColor(c1,c2,inter);
    x = r * cos(i);
    y = r * sin(i);
    stroke(c);
    line(0,0,x,y);

    if(histSound.length > 360){
      histSound.splice(0,1);
    }
  }
}


function frequencyLine(spect,w){

  for(let i = 0; i < spect.length; i++){
    amp2 = spect[i];
    inter = map(i, 0, spect.length,0,1);
    c = lerpColor(c1,c2,inter);
    y = map(amp2,0,250,0,windowHeight/2-40);
    fill(c);
    rect(i*w,windowHeight/2,w-2,-y);
    rect(i*w,windowHeight/2,w-2,y);
  }
}

function frequencyCircle(spect){
  translate(windowWidth/2,windowHeight/2);
      for(let i = 0; i < spect.length; i++){
        amp2 = spect[i];
        inter = map(i, 0, spect.length,0,1);
        c = lerpColor(c1,c2,inter);
        angle = map(i,0,spect.length,0,360);
        r = map(amp2,0,250,100,450);
        x = r * cos(angle);
        y = r * sin(angle);
         stroke(c);
         line(0,0,x,y);
      }
}
