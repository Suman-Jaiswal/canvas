import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
var width = canvas.width = innerWidth
var height = canvas.height = innerHeight


const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
let mouseDown = false;
addEventListener('mousedown', (event) => {
  mouseDown = true;
})
addEventListener('mouseup', (event) => {
  mouseDown = false;
})

addEventListener('resize', () => {
   width = canvas.width = innerWidth
   height = canvas.height = innerHeight

  init()
})

// stars
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
    c.shadowColor = this.color
    c.shadowBlur = 50
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }
  
  update() {
    this.draw()
  }
}

// Implementation
let stars
function init() {
  stars = []
  for (let i = 0; i < 800; i++) {
    const canwidth = width +300
    const canheight = width +300
    const x = (Math.random()-0.5) * canwidth
    const y = (Math.random()-0.5) * canheight
    const radius = Math.random()  * 2 
    const color = colors[Math.floor(Math.random() * colors.length)]
    stars.push(new Object(x, y, radius, color))
  }
}

// Animation Loop
let angle = 0;
let alpha = 1;
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = `rgba(0,0,0,${alpha})`
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.save()
  c.translate(width/2, height/2)
  c.rotate(angle)
  stars.forEach(object => {
    object.update()
  })
  c.restore()
  angle += 0.005
  if(mouseDown && alpha >= 0.05){
    alpha -= 0.05;
  }
  else if (!mouseDown && alpha < 1){
    alpha += 0.05
  }
}
init()
animate()
