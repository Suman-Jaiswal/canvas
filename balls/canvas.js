var canvas = document.querySelector('canvas');
const width = canvas.width = window.innerWidth - 4
const height = canvas.height = window.innerHeight - 7.2

var c = canvas.getContext('2d');

// -------------------------<balls>---------------------------->
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = 'skyBlue';
    c.stroke();
    c.fill();
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
  }

}

var circleArray = [];

for (let i = 0; i < 100; i++) {
  var radius = 30;
  var x = Math.random() * (width - 2 * radius) + radius;
  var y = Math.random() * (height - 2 * radius) + radius;
  var dx = (Math.random() - 0.5) * 3;
  var dy = (Math.random() - 0.5) * 3;

  circleArray.push(new Circle(x, y, dx, dy, radius))
}


// -------------------------</balls>--------------------------->


function animate() {
  
 
    requestAnimationFrame(animate);

    // c.clearRect(0, 0, width, height);
    for (let i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }

}

const click1 = () => {
  animate();
}
const click2 = () => {
  location.reload();
}

