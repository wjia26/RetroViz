var t=0;
const NUM_LINES=20;

function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  background(20);
  translate(width/2,height/2);
  stroke(255);
  strokeWeight(5);
  for (i=0;i<NUM_LINES;i++) {
    line(x(t+i),y(t+i),x2(t+i),y2(t+i)); 
  }
  t++
}

function x(t) {
  return sin(t/10) * 100 + sin(t/5) * 50
}

function y(t) {
  return cos(t/10) * 100
}
function x2(t) {
  return sin(t/10)*100 + sin(t) * 2
}

function y2(t) {
  return cos(t/20)*100 + cos(t/12) * 20
}

function mousePressed() {
  loop();
}

function mouseReleased() {
  noLoop();
}