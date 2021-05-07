import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

let width = canvas.width = innerWidth
let height = canvas.height = innerHeight 

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth 
  canvas.height = innerHeight 

  init()
})
var gravity = 0.5;
var friction = 0.99;

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.friction = friction
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
  }

  update() {
    this.draw();
    this.x += this.dx;
    this.y += this.dy;
    
    if(this.x + this.radius > width || this.x - this.radius < 0 ){
      this.dx = -this.dx;
      
    }
    if(this.y + this.radius + this.dy > height){
      this.dy = -this.dy * friction;
      
    }
    else{
      this.dy+= gravity;
    }
    
  }
   
}

// Implementation

let balls
let colorArray = [
  '#FA7482',
  '#FF81BC',
  '#FFF674',
  '#12D6BE',
  '#7383C8'
]
function init() {
  balls = [];

  for (let i = 0; i < 200; i++) {
    var x = utils.randomIntFromRange(0,width)
    var y = utils.randomIntFromRange(0,height/2)
    var dx = utils.randomIntFromRange(-5,5)
    var radius = utils.randomIntFromRange(6,25)
    var color = utils.randomColor(colorArray)
    balls.push(new Ball(x, y, dx, 0, radius, color))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  balls.forEach(ball => {
   ball.update()
  })
  
}

init()
animate()
