//WORKING TRAILS
let sketchMovement = function (p) {

let buttonVid1;
let buttonVid2;
let buttonVid3;
let buttonVid4;

let buttonVideo;
let buttonBoth;
let buttonMvt;

let visuels;

let threshold;
let dist_threshold;

let track_color;

let blobs = [];

let hist = [];
let histStroke = [];

let video1;
let video2;
let video3;
let video4;

let video;
let img;
let count;

let trail;

let showing;

let avgX;
let avgY;

let loc;

let lerpX;
let lerpY;

let pLerpX;
let pLerpY;

let translateX;
let translateY;

let buttonSizeX;
let buttonSizeY;
let buttonTop;
let buttonBottom;

let myFont;
let myText;
let myText1;
let can;

p.setup = function() {
    myFont = p.loadFont("font/SpaceMono-Bold.ttf")
 


myText = p.createDiv("Explore différentes vidéos...")
myText.id("myText");
myText.parent("topText");

myText1 = p.createDiv("... et différents modes.")
myText1.id("myText1");
myText1.parent("bottomText");

 can = p.createCanvas(640,480);
  can.parent("can");



  showing = "both"
  visuels = false;

  video1 = p.createVideo("fan.webm");
  video1.size(640, 480);
  video1.volume(0);
  video1.hide();


  video2 = p.createVideo("gloves.webm");
  video2.size(640, 480);
  video2.volume(0);
  video2.hide();

  video3 = p.createVideo("fans.webm");
  video3.size(640, 480);
  video3.volume(0);
  video3.hide();

  video = video1;
  video.loop();


   p.stroke(255, 0, 255,90);


threshold = 15;
track_color = [255, 136, 147,255];
dist_threshold = 350;
trail = 35;



buttonVideo = p.createButton("Vidéo seulement");
buttonVideo.mousePressed(p.funcVideo);
buttonVideo.id("buttonVideo");
buttonVideo.parent("bottomButtons");

buttonBoth = p.createButton("Visualiser le mouvement");
buttonBoth.mousePressed(p.funcBoth);
buttonBoth.parent("bottomButtons");

buttonMvt = p.createButton("Mouvement seulement");
buttonMvt.mousePressed(p.funcMvt);
buttonMvt.parent("bottomButtons");

buttonVid1 = p.createButton("Vidéo 1");
buttonVid1.mousePressed(p.funcVid1);
buttonVid1.parent("topButtons");

buttonVid2 = p.createButton("Vidéo 2");
buttonVid2.mousePressed(p.funcVid2);
buttonVid2.parent("topButtons");

buttonVid3 = p.createButton("Vidéo 3");
buttonVid3.mousePressed(p.funcVid3);
buttonVid3.parent("topButtons");

}


p.draw = function() { 
  p.background(0);

   img = video.get();
 
   
if(showing === "video"){
p.image(img, 0,0);
visuels = false;
}
 if(showing === "both"){
  p.image(img, 0,0);
  visuels = true;
}
 if(showing === "mvt"){
  p.background(0);
  visuels = true;
}


  blobs = [];
  
  let matchR = track_color[0];
  let matchG = track_color[1];
  let matchB = track_color[2];

 count = 0;
 avgX = 0;
 avgY = 0;


  img.loadPixels();
  for (let y=0; y<img.height; y++) {
    for (let x=0; x<img.width; x++) {
 
      
      let index = (y * img.width + x) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index+1];
      let b = img.pixels[index+2];

     
      if (r >= matchR-threshold && r <= matchR+threshold &&
          g >= matchG-threshold && g <= matchG+threshold &&
          b >= matchB-threshold && b <= matchB+threshold) {



          let found = false;

          for (let b = 0; b<blobs.length;b++){
            if (blobs[b].isNear(x,y)){
              blobs[b].add(x,y);
              found = true;
              break;
            }
          }

          if (!found){
            b = new Blob(x,y);
            blobs.push(b);
          }
      }
    }
  }

for (let b = 0; b<blobs.length;b++){
blobs[b].show();

if(hist.length > 3){
 for(let i=2; i<hist.length; i++){
     p.strokeWeight(histStroke[i]);




if(visuels){

if(video === video2 || video === video3){
  //magic(gloves)
p.line(hist[i-2].x,hist[i].y,hist[i-2].x, hist[i].y)

}

if(video === video1){
  //fan
p.line(hist[i-1].x,hist[i-1].y,hist[i].x, hist[i].y)
}

}
}
}

if(hist.length>trail){

  hist.splice(0,1);
if(video === video3 || video === video1){
  histStroke.splice(0,1);
}
}
}
}

 

class Blob{

 
  constructor(x,y){
    this.minx = x;
    this.miny = y;
    this.maxx = x;
    this.maxy = y;
  }

isNear = function(x,y){
this.cx = (this.minx + this.maxx)/2;
this.cy = (this.miny + this.maxy)/2;

this.dis = p.distSq(this.cx,this.cy,x,y);

if(this.dis<dist_threshold*dist_threshold){
  return true;
}else{
  return false;
}
}

add = function(x,y){
  this.minx = p.min(this.minx,x);
  this.miny = p.min(this.miny, y);
  this.maxx = p.max(this.maxx, x);
  this.maxy = p.max(this.maxy, y);
}

show = function(){
this.cx = (this.minx + this.maxx)/2;
this.cy = (this.miny + this.maxy)/2;

this.vect = p.createVector(this.cx,this.cy);

hist.push(this.vect);
histStroke.push(p.random(2,20));
}
  // p.noStroke();
  // p.fill(255,0,255);
  // p.ellipse(this.lerpX,this.lerpY,20,20);
}

p.funcVideo = function(){
showing = "video";
}

p.funcBoth = function(){
showing = "both";
}

p.funcMvt = function(){
showing = "mvt";
}

p.funcVid1 = function() {
  hist = [];
  histStroke = [];
video = video1;
video.loop();
threshold = 15;
track_color = [255, 136, 147,255];
dist_threshold = 350;
trail = 35;

}

p.funcVid2 = function() {
  hist = [];
  histStroke = [];
video = video2;
track_color = [255, 102, 142,255]
dist_threshold = 145;
threshold = 20;
trail = 75;
video.loop();



 //gloves1
// track_color = [255, 124, 148,255];
// threshold = 20;
// dist_threshold = 100;

//poi (CHECK FOR histStroke splice)
// trail = 100;
// threshold = 20;
// track_color = [255, 138, 150,255];
// dist_threshold = 15;
}

p.funcVid3 = function() {
  hist = [];
  histStroke = [];
video = video3;
video.loop();
threshold = 18;
track_color = [255, 138, 150,255];
dist_threshold = 50;
trail = 75;

}


p.distSq = function(x0,y0,x1,y1){
  let d = (x1 - x0)*(x1 - x0) + (y1 - y0)*(y1 - y0);
  return d;
}




};

let myMovement = new p5(sketchMovement);
