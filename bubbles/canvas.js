var canvas = document.querySelector('canvas');
var width = canvas.width = window.innerWidth 
var height = canvas.height = window.innerHeight 

var c = canvas.getContext('2d');

var mouse = {
  x: undefined,
  y: undefined
}
var colorArray = [
  '#FA7482',
  '#FF81BC',
  '#FFF674',
  '#12D6BE',
  '#7383C8'
  
]

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function(){
   width = canvas.width = window.innerWidth;
   height = canvas.height = window.innerHeight;
   init();
})

var maxR = 40;
// var minR = 6;
// -------------------------<balls>---------------------------->
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius
  this.minR = radius;
  this.color = Math.floor(Math.random()* colorArray.length)
  
  
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = colorArray[this.color];
    c.fillStyle = colorArray[this.color];
    c.stroke();
    
  }

  this.update = function () {

    this.draw();

    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.radius > width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    if(Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50 ) {
      if(this.radius < maxR){
        this.radius +=1;
      }
    }else if(this.radius > this.minR){
        this.radius -=1;
    } 
    if(this.radius > 3){
      c.fill();
    }
  }

}


var circleArray = [];

function init(){
  
  circleArray = [];

for (let i = 0; i < 500; i++) {
  var radius = Math.random() * 4 + 1;
  var x = Math.random() * (width - 2 * radius) + radius;
  var y = Math.random() * (height - 2 * radius) + radius;
  var dx = (Math.random() - 0.5) * 2;
  var dy = (Math.random() - 0.5) * 2;

  circleArray.push(new Circle(x, y, dx, dy, radius))
}

}

// -------------------------</balls>--------------------------->


function animate() {
    
  
 
    requestAnimationFrame(animate);

    c.clearRect(0, 0, width, height);
    for (let i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }
  
}

init();
animate();

