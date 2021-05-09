import * as dat from 'dat.gui'
import utils from './utils'

// const gui = new dat.GUI;
const gui = new dat.GUI()


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

var width = canvas.width = innerWidth
var height = canvas.height = innerHeight

const mouse = {
  x: undefined,
  y: undefined
}

const colors = ['#F2935C', '#150773', '#A60F46', '#F27289', 'white']

// Event Listeners

addEventListener('resize', () => {
   width = canvas.width = innerWidth
   height = canvas.height = innerHeight
   
})
addEventListener('click', (e) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
  init();
  
})

// properties

const controls ={
  particlesCount: 300,
  speedRange: 12,
  gravity: 0.1,
  friction: -0.005,
  angle: 2,
  timer: 2
}

  setInterval(() => {
  mouse.x = utils.randomIntFromRange(0,width)
  mouse.y = utils.randomIntFromRange(0,0.75*height/2)
  init();
}, controls.timer*1000);


// Objects

class Object {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  
  }

  draw(lastPoint) {
    c.beginPath()
    c.strokeStyle = this.color
    c.lineWidth = this.radius
    c.moveTo(lastPoint.x,lastPoint.y)
    c.lineTo(this.x,this.y)
    c.stroke()
    c.closePath() 
  }

  update() {
    const lastPoint = {x: this.x , y: this.y}
    this.x += this.velocity.x
    this.y += this.velocity.y
    if(this.velocity.x > 0 && this.velocity.x > 1){
      this.velocity.x += controls.friction
    }
    else if(this.velocity.x<-1){
      this.velocity.x -= controls.friction
    }
    this.velocity.y += controls.friction
    this.velocity.y += controls.gravity
    
    if(this.x > 1.25*width || this.x < -0.25*width ){
       objects.splice(this, 1)
    }
    this.draw(lastPoint)
    
  }
}

// Implementation
let objects = []

function init() {
  
  for (let i = 0; i < controls.particlesCount; i++) {
    
    const speedFactor = Math.random()*controls.speedRange

    const color = `hsl(${i*360/controls.particlesCount}, 100%, 80%)`

    const angle = Math.random()*Math.PI*controls.angle

    const radius = Math.random()*4 + 1

    var velocity = {

      x: Math.cos(angle)*speedFactor,
      y: -Math.sin(angle)*speedFactor

    }

    objects.push(new Object(mouse.x,mouse.y,radius,color, velocity,))

  }
}


// Animation Loop
function animate() {
  
  requestAnimationFrame(animate)
  
  c.fillStyle = 'rgba(0,0,0,0.4)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  
  objects.forEach(object => {
    object.update()
    
  })
  
}


gui.add(controls, 'particlesCount', 0, 5000)
gui.add(controls, 'speedRange', 0, 100)
gui.add(controls, 'gravity', -3, 3)
gui.add(controls, 'angle', -2, 2)

init()
animate()

