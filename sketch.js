//Constants
const Y_AXIS = 1;
const X_AXIS = 2;
let buttonSave;
let buttonRefresh;

function isNumeric(num){
  return !isNaN(num)
}

function savefunction(c){
  saveCanvas(c, 'PerlinMountains', 'png');
  gtag('event', 'saveImage', {
    'event_category': 'buttonPress',
    'event_label': 'buttonPress'
  });
}

function refreshfunction(c){
  redraw();
  noiseSeed(random(0,10000));
  gtag('event', 'refresh', {
    'event_category': 'buttonPress',
    'event_label': 'buttonPress'
  });
}

function myInputEventX() {
  console.log('you are typing: ', isNumeric(this.value()));
}

function myInputEventY() {
  console.log('you are typing: ', this.value());
}

function resize(x,y){
  if (isNumeric(x) && isNumeric(y)){
      resizeCanvas(x,y);
  } 
  gtag('event', 'resizeCanvas', {
    'event_category': 'buttonPress',
    'event_label': 'buttonPress'
  });

}

function setup() {
  greeting = createElement('p1', 'W');
  greeting.position(230, 20);
  greeting = createElement('p1', 'H');
  greeting.position(300, 20);
  link= createA('https://www.iamwilliamj.com/projects/2020-10-05-p5jsMountainGenerator.html', 'William Jiang ','_blank');
  link.style('font-style','italic');
  link= createA('https://github.com/wjia26/MountainPerlinCreator/blob/main/sketch.js', '| Code','_blank');
  link.style('font-style','italic');

  let inpX = createInput('800');
  let inpY = createInput('600');
  inpX.position(250, 19);
  inpY.position(320, 19);
  inpX.size(45)
  inpY.size(45)
  inpX.input(myInputEventX);
  inpY.input(myInputEventY);
  inpX.style('opacity',0.8);
  inpY.style('opacity',0.8);

  c=createCanvas(int(inpX.value()), int(inpY.value()));
  noiseDetail(10, 0.45);
  buttonSave = createButton('Save As');
  buttonSave.position(19, 19);
  buttonSave.mousePressed(function(){savefunction(c)});
  
  buttonRefresh = createButton('Refresh');
  buttonRefresh.position(90, 19);
  buttonRefresh.mousePressed(refreshfunction);

  buttonRefresh = createButton('Resize');
  buttonRefresh.position(160, 19);
  buttonRefresh.mousePressed(function(){resize(int(inpX.value()), int(inpY.value()))});

  xoff = 0
  
}

function draw() {
  var numberOfMountains = 6;
  var yadj = 0;
  var palettedeviation=30
  var gradientdev=50
  var c1_array=[128+random(-1,1)*palettedeviation,128+random(-1,1)*palettedeviation,128+random(-1,1)*palettedeviation];
  c2_array_pre=[c1_array[0]+gradientdev*random(-1,1),c1_array[1]+gradientdev*random(-1,1),c1_array[2]+gradientdev*random(-1,1)];
  // console.log(c2_array_pre)
  var c2_array=c2_array_pre.map(x => x +30)
  var c1 = color(c1_array)
  var c2 = color(c2_array)
  console.log()
  background(c2);

  
  setGradient(0, height/2, width, height, c2, c1, Y_AXIS);
  // makeRainbow();
  colourMoon=color(c2_array.map(x => x +15)) //make brighter by unit of 10.
  drawMoon(colourMoon);

  //painting the mountains backwards from background to foreground
  for (i = numberOfMountains; i > 0; i--) {
    // colour.setAlpha(200);
    if (i>numberOfMountains-2){
      //Background mountain configuration
      increment=0.0045
      c1_adj=color(c1_array.map(x => x +50));
      colour = lerpColor(c1_adj, c2, i / (numberOfMountains+1));
    } else {
      //Foreground mountain configuration

      c2_adj=color(c2_array.map(x => x - 100));
      colour = lerpColor(c2_adj, c1, i / numberOfMountains);
      console.log(i)
      console.log(colour)
      increment=0.005
    }
    makeMountain(i, xoff + i * 1000, yadj, colour, numberOfMountains,increment);
    yadj += height / (3.5 * numberOfMountains);
  };


}

//Below function is not used atm - might try to implement at some point.
// function makeRainbow(){
//   push();
//   var X=50;

//   ellipseMode(CENTER);
//   noStroke()
//   //violet
//   fill(100,0,200,X)
//   ellipse(200,200,320,320)  
//   //indigo
//   fill(150,0,200,X)
//   ellipse(200,200,310,310)
//   //blue
//   fill(0,150,250,X)
//   ellipse(200,200,300,300)
//   //green
//   fill(20,250,20,X)
//   ellipse(200,200,290,290)  
//   //yellow
//   fill(250,250,0,X)
//   ellipse(200,200,280,280)
//   //orange
//   fill(250,150,40,X)
//   ellipse(200,200,270,270)
//   //red
//   fill(240,20,20,X)
//   ellipse(200,200,260,260)  
//   pop();

// }

function makeMountain(i, xoff, yadj, colour, numberOfMountains,increment) {
  console.log(yadj)
  noStroke();
  fill(colour);
  beginShape();
  deviation=(1+numberOfMountains-i)* height/25
  for (x = 0; x <= width; x++) {
    y = map(noise(xoff), 0, 1, 2* height / 3 - deviation, 2*height / 3+deviation);
    vertex(x, y + yadj);
    xoff += increment ;
  }
  vertex(width, height);
  vertex(0, height);
  endShape();
  noLoop();

}

function drawMoon(colourMoon){
  push();
 
  var angle = random()*2*PI;	// initialize angle variable
  var radiusx = width/3;  // set the radius of circle
  var radiusy = height/3;  // set the radius of circle
  var startX = width/2;	// set the x-coordinate for the circle center
  var startY = height/2;	// set the y-coordinate for the circle center
  var x = startX + radiusx * cos(angle);
  var y = startY + radiusy * sin(angle);
  var radiusofMoon=random(50,70);
  noStroke();  
  fill(colourMoon);
  circle(x, y, radiusofMoon);
  pop();
;
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
