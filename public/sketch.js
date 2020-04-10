//created by Simone and Yiting 2019 
// ITP NYU - ICM 
// Check out our YouTube Documentation: https://youtu.be/G78Wx54mVwA

let video;
let poseNet;
let chordsSize = 14;
let poses = [];
let nose;
let counter = 0;

let flowers = [];
let chords = [];
let bg;

let bee;
let flowerImg = [];

function preload() {

  bee = loadImage('../Asset/bumble bee.png');
  bg = loadImage('../Asset/bg.jpg');

  //load flower images 
  let flower1 = loadImage('../Asset/flower1.png');
  let flower2 = loadImage('../Asset/flower2.png');
  let flower3 = loadImage('../Asset/flower3.png');
  let flower4 = loadImage('../Asset/flower4.png');
  let flower5 = loadImage('../Asset/flower5.png');
  let flower6 = loadImage('../Asset/flower6.png');
  let flower7 = loadImage('../Asset/flower7.png');
  let flower8 = loadImage('../Asset/flower8.png');

  flowerImg = [flower1, flower2, flower3, flower4, flower5, flower6, flower7, flower8];

  chords[0] = loadSound('../chords/chord1.wav');
  chords[1] = loadSound('../chords/chord2.wav');
  chords[2] = loadSound('../chords/chord3.wav');
  chords[3] = loadSound('../chords/chord4.wav');
  chords[4] = loadSound('../chords/chord5.wav');
  chords[5] = loadSound('../chords/chord6.wav');
  chords[6] = loadSound('../chords/chord7.wav');
  chords[7] = loadSound('../chords/chord8.wav');
  chords[8] = loadSound('../chords/chord9.wav');
  chords[9] = loadSound('../chords/chord10.wav');
  chords[10] = loadSound('../chords/chord11.wav');
  chords[11] = loadSound('../chords/chord12.wav');
  chords[12] = loadSound('../chords/chord13.wav');
  chords[13] = loadSound('../chords/chord14.wav');

}

function setup() {

  image(bg, 0, 0);
  createCanvas(windowWidth, windowHeight);

  video = createCapture(VIDEO);
  video.size(width, height);

  poseNet = ml5.poseNet(video, 'single', modelReady); 
  poseNet.on('pose', gotPose);
  video.hide();

  colorMode(HSB, 360, 100, 100);

  //create flower positions 
  flowers[0] = new Flower(chords[0], flowerImg[0], windowWidth / 5, windowHeight / 5);
  flowers[1] = new Flower(chords[1], flowerImg[1], windowWidth / 5, windowHeight * 2 / 5);
  flowers[2] = new Flower(chords[2], flowerImg[2], windowWidth * 2 / 5, windowHeight * 2 / 7);
  flowers[3] = new Flower(chords[3], flowerImg[3], windowWidth * 2 / 6, windowHeight * 3 / 5);
  flowers[4] = new Flower(chords[4], flowerImg[4], windowWidth / 2, windowHeight / 2);
  flowers[5] = new Flower(chords[5], flowerImg[5], windowWidth * 4 / 6, windowHeight / 5);
  flowers[6] = new Flower(chords[6], flowerImg[6], windowWidth * 4 / 5, windowHeight * 4 / 5);
  flowers[7] = new Flower(chords[7], flowerImg[7], windowWidth/5, windowHeight*5/6);

}

function gotPose(results) {
  poses = results;
  for (let people = 0; people < poses.length; people++) {
    nose = poses[people].pose.nose;

  }
}

function modelReady() {
  console.log('model ready');
}

class Flower {
  constructor(sound, img, xPos, yPos) {
    this.s = sound;
    this.img = img;
    this.xPos = xPos;
    this.yPos = yPos;
    this.w = 150;
    this.h = 150;
    this.intersectornot = false;

  }

  //randomize the flowerimgs on display 
  display() {
    fill(255, 0, 0);
    image(this.img, this.xPos, this.yPos, this.w, this.h);

  }

  intersect(other) {
    let d = dist(this.xPos, this.yPos, other.xPos, other.yPos);
    if (d < this.w / 2 + other.w / 2) {
      return true;
    } else {
      return false;
    }
  }

  contains(x, y) {
    let d2 = dist(this.xPos, this.yPos, x, y);
    if (d2 < this.w / 2) {
      //increase the radius from 150 to 300
      this.w = 300;
      this.h = 300;
      if (!this.s.isPlaying()) {
        this.s.play();
      }
    } else {
      this.s.stop();
      this.w = 150;
      this.h = 150;
    }
  }
}

function draw() {
  image(bg, 0, 0,width,height);
  translate(video.width, 0);
  scale(-1, 1);

  if (!nose) return; 

  fill(240, 100, 100);
  image(bee, nose.x, nose.y, 100);

  for (let m = 0; m < flowers.length; m++) {
    for (let n = 0; n < flowers.length; n++) {
      if (m != n && flowers[m].intersect(flowers[n]) == false) {
        flowers[m].display();
        flowers[m].contains(nose.x, nose.y);
      }
    }
  }
}