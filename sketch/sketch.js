let circles = []
let curedTime = 800
let colors = ['#0ddbff', '#40E9FF', '#F2F2F2', '#74C9F2', '#57A5FF']
let diaCircle = 10
let numb_infected = 1;
let numb_was_infected = 0;
let numb_circles = 80
let textsize = 25
let velocity = 1

let sliderNumberCircles
let sliderDiaCircles
let sliderCuredTime
let sliderVelocity

// let p = []
// let amountParticles = 5
// let speedParticles = 1

function setup() {
  createCanvas(600, 400);
  resetAll();
  // for (let i = 0; i < numb_circles; i++)
  //   circles[i] = new Circle(random(0 + diaCircle / 2, width - diaCircle / 2), random(0 + diaCircle / 2, height - diaCircle / 2), diaCircle, random(-1, 1), random(-1, 1), random(colors), i == 1);
  var button = createButton("RESET")
  button.mousePressed(resetAll)

  sliderNumberCircles = createSlider(0, 200, 40, 1);
  sliderDiaCircles = createSlider(2, 100, 10, 1);
  sliderCuredTime = createSlider(0, 1000, 800, 1);
  sliderVelocity = createSlider(0, 10, 1, 0.1);

  sliderNumberCircles.position(0, 430);
  sliderDiaCircles.position(0, 460);
  sliderCuredTime.position(0, 490);
  sliderVelocity.position(0, 520);

  sliderNumberCircles.style('width', '200px');
  sliderDiaCircles.style('width', '200px');
  sliderCuredTime.style('width', '200px');
  sliderVelocity.style('width', '200px');
}

// function mouseDragged() {
//   for (let i = 0; i < amountParticles; i++) {
//     p[i]= new Particle(mouseX, mouseY, 3, 0, 3/speedParticles);
//     for(let par of p) 
//       particles.push(par)
//   }
// }

function draw() {
  background(45);
  // fill(255);
  // textSize(20);
  // text('Amount:', 12, 365);
  // text('Speed:', 103, 365);

  //use slider
  numb_circles = sliderNumberCircles.value()
  diaCircle = sliderDiaCircles.value()
  curedTime = sliderCuredTime.value()
  velocity = sliderVelocity.value()
  
  
  
  fill(255);
  noStroke()
  textFont('Roboto')
  textSize(16);
  text('Circles: ' + numb_circles, 490, 20);
  
  fill(255);
  noStroke()
  textFont('Roboto')
  textSize(16);
  text('Curetime: ' + curedTime, 490, 60);
  
  fill(255);
  noStroke()
  textFont('Roboto')
  textSize(16);
  text('Circle size: ' + diaCircle, 490, 40);
  
  fill(255);
  noStroke()
  textFont('Roboto')
  textSize(16);
  text('Velocity: ' + velocity, 490, 80);
  
  fill(255);
  noStroke()
  textFont('Roboto')
  textSize(textsize);
  text('Infected: ' + numb_infected, 10, 30);
  numb_infected = 0

  fill(255);
  noStroke()
  textFont('Roboto')
  textSize(textsize);
  text('Cured: ' + numb_was_infected, 10, 60);
  numb_was_infected = 0


  for (let b of circles) {
    b.show();
    b.move();

    for (let other of circles) {
      if (b.infected == true) {
        if (b.intersect(other)) {
          other.infected = true
        }
      }
    }
    if (b.infected) {
      numb_infected++
    }
    if (b.was_infected) {
      numb_was_infected++
    }
    //bounce 
  }
  //print(numb_infected)
}

function resetAll() {
  circles = []
  for (let i = 0; i < numb_circles; i++)
    circles[i] = new Circle(random(0 + diaCircle / 2, width - diaCircle / 2), random(0 + diaCircle / 2, height - diaCircle / 2), diaCircle, random(-1, 1) * velocity, random(-1, 1) * velocity, random(colors), i == 1, this.cured_time);
}

class Circle {
  constructor(_x, _y, _d, _xv, _yv, _c, _inf, _cureTime) {
    //values particles
    this.x = _x;
    this.y = _y;
    this.d = _d;

    this.xv = _xv;
    this.yv = _yv;
    this.c = _c
    this.min_d = _d
    this.max_d = 50
    this.grow_speed = 3
    this.was_infected = false
    this.infected = _inf
    this.infected_time = 0
    this.cured_time = 800
  }

  move() {
    //movement particles
    this.x = this.x + this.xv
    this.y = this.y + this.yv

    if (this.y < this.d / 2 || this.y > height - this.d / 2) {
      this.yv = this.yv * -1
    }

    if (this.x < this.d / 2 || this.x > width - this.d / 2) {
      this.xv = this.xv * -1
    }

    if (this.infected == true) {
      if (this.was_infected == false) {
        this.c = [255, 0, 0]
        this.infected_time++
      }
    }

    if (this.infected_time == this.cured_time) {
      this.c = [0, 255, 0]
      this.infected = false
      this.was_infected = true
    }
    //     if (dist(mouseX, mouseY, this.x, this.y) < 50) {
    //       if (this.d < this.max_d) {
    //         this.d = this.d + this.grow_speed
    //       }

    //     } else {
    //       if (this.d > this.min_d) {
    //         this.d = this.d - this.grow_speed
    //       }
    //     }
  }
  show() {
    strokeWeight(2)
    stroke(this.c)
    noFill()
    rectMode(CENTER);
    circle(this.x, this.y, this.d)
  }

  intersect(other) {
    let dis = dist(this.x, this.y, other.x, other.y)
    // print(dis)
    // print(this.d + other.d)
    if (dis < this.d / 2 + other.d / 2 && dis != 0) {
      // print("true")
      return true;
    } else {
      // print("false")
      return false;
    }
  }
}