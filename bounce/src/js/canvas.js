import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

var width = canvas.width = innerWidth
var height = canvas.height = innerHeight

const mouse = {
  x: undefined,
  y: undefined
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66', 'yellow']

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
console.log('console working');
// Objects
class Object {
  constructor(x, y, radius, color,mass) {
    this.x = x
    this.y = y
    this.velocity = {
      x: (Math.random()-0.5) * 6,
      y: (Math.random()-0.5) * 6
    }
    this.radius = radius
    this.color = color
    this.mass = mass
    this.opacity =0.1
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.save()
    c.globalAlpha = this.opacity
    c.fillStyle= this.color
    c.fill()
    c.restore()
    c.strokeStyle = this.color
    c.stroke();
    c.closePath();
  }

  update = objects => {
    this.draw()
   
    for (let i = 0; i < objects.length; i++) {
      if (this === objects[i]) continue;
      if(utils.distance(this.x, this.y, objects[i].x, objects[i].y) - 2*this.radius < 0){    
          utils.resolveCollision(this, objects[i], this.mass)
        }
      }
      this.x += this.velocity.x
      this.y += this.velocity.y
      if(this.x + this.radius > width || this.x - this.radius < 0 ){
        this.velocity.x = -this.velocity.x
      }
      if(this.y + this.radius > height || this.y - this.radius < 0 ){
        this.velocity.y = -this.velocity.y
      }
      if(utils.distance(mouse.x,mouse.y,this.x,this.y) < 100){
        this.opacity = 0.4;
      }
      else{
        this.opacity = 0;
      }
  }
}

// Implementation
let objects
function init() {
  objects = []

  for (let i = 0; i < 250; i++) {
    var x ;
    var y ; 
    var radius = 15;
    const color = utils.randomColor(colors)
    
    if(i!== 0){
       for (let j = 0; j < objects.length; j++) {
                if(utils.distance(objects[j].x, objects[j].y, x, y) < 2*radius){
                   x = utils.randomIntFromRange(radius, width - radius)
                   y = utils.randomIntFromRange(radius, height - radius)
                   j = -1;
                }
       }
    }else{
      x = utils.randomIntFromRange(radius, width - radius)
      y = utils.randomIntFromRange(radius, height - radius)
    }
    objects.push(new Object(x,y,radius,color,1))
  }
 
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  objects.forEach(object => {
   object.update(objects)
  })
}

init()
animate()
