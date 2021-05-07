import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

var mouse = {
  x: 100,
  y: 100
}


const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.x
  mouse.y = event.y
  
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Object {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
    
  }
}

// Implementation
// let objects
let c1;
let c2;
function init() {

   c1 = new Object(canvas.width/2, canvas.height/2, 70, 'black')
   c2 = new Object(undefined, undefined,30, 'red')
  // objects = []

  // for (let i = 0; i < 400; i++) {
  //   // objects.push()
  // }
  
}

// Animation Loop

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  
  c1.update();
  c2.x = mouse.x
  c2.y = mouse.y
  c2.update();
  
  var distanceBTW = utils.distance(c1.x, c1.y, c2.x, c2.y)
  if(distanceBTW < c1.radius + c2.radius){
    c1.color = 'red'
  }
  else{
    c1.color = 'black'
  }
  // objects.forEach(object => {
  //  object.update()
  // })
}

init()
animate()
