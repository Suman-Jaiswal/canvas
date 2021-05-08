import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

var width = canvas.width = innerWidth
var height = canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = [ 
    'green',
    '#900C3E',
    'blue',
    '#FF5733',
    '#FFC300'
  ]

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
   width = canvas.width = innerWidth
   height = canvas.height = innerHeight

  init()
})

// Objects
function Object(x, y, radius, color) {
  
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = Math.random() * Math.PI * 2
    this.velocity = 0.04
    this.amplitude = utils.randomIntFromRange(50,120)
    this.lastMouse = {x: x, y: y}
 

  this.draw = (lastPoint) => {
    c.beginPath()
    c.strokeStyle = this.color
    c.lineWidth = this.radius
    c.moveTo(lastPoint.x,lastPoint.y)
    c.lineTo(this.x,this.y)
    c.stroke()
    c.closePath() 
  }

  this.update = () => {  
    const lastPoint = {x: this.x, y: this.y}
    this.radians += this.velocity
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
    this.x = this.lastMouse.x + Math.cos(this.radians) * this.amplitude
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.amplitude
    this.draw(lastPoint)
  }
}

// Implementation
let objects
function init() {
  objects = []

  for (let i = 0; i < 100; i++) {
    const radius = Math.random()*3 + 1;
    const color = utils.randomColor(colors)
    objects.push(new Object(width/2, height/2, radius, color))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(255,255,255,0.07)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  
  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  objects.forEach(object => {
   object.update()
  })
}

init()
animate()
