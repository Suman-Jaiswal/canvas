import utils from './utils'
import * as dat from 'dat.gui'

const gui = new dat.GUI;

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
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
   width = canvas.width = innerWidth
   height = canvas.height = innerHeight

  init()
})

//GUI objects
 const wave = {
   Y: height/2,
   Wavelength: 100,
   Amplitude: 100,
   Frequency: 0.01,
   AmpFactor: 50
 }
 const strokeColor = {
   h:200,
   s:50,
   l:50
 }

const bgColor = {
  r:0,
  g:0,
  b:0,
  a:0.01
}

 // GUI ------->
 const waveFolder = gui.addFolder('Wave')
 waveFolder.add(wave, 'Y' , 0, height)
 waveFolder.add(wave, 'Wavelength' , 0, 200)
 waveFolder.add(wave, 'Frequency' , -1, 1)
 waveFolder.add(wave, 'Amplitude' , -300, 300)
 waveFolder.add(wave, 'AmpFactor' , 1, 1000)
 waveFolder.open()

const strokeFolder = gui.addFolder('Stroke')
 strokeFolder.add(strokeColor, 'h', 0 , 255)
 strokeFolder.add(strokeColor, 's', 0 , 100)
 strokeFolder.add(strokeColor, 'l', 0 , 100)
 strokeFolder.open()

const bgFolder = gui.addFolder('Background')
 bgFolder.add(bgColor, 'r', 0 , 255)
 bgFolder.add(bgColor, 'g', 0 , 255)
 bgFolder.add(bgColor, 'b', 0 , 255)
 bgFolder.add(bgColor, 'a', 0 , 0.1)
 


// Objects
class Object {
  constructor(color) {
    
    this.color = color
    this.increment = wave.Frequency
    this.hue = 0
  }
  
  draw() {

    c.beginPath()
    c.moveTo(0,wave.Y)
    for (let i = 0; i < width; i++) {
      c.lineTo(i, wave.Y + Math.sin(i/wave.Wavelength + this.increment) * wave.Amplitude * wave.AmpFactor/ i  )  
    }
    c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(this.increment))},${strokeColor.s}%,${strokeColor.l}%)`
    c.stroke()
    c.closePath()
  }

  update() {
    this.draw()
    this.increment += wave.Frequency
    
  }
}

// Implementation
let objects
function init() {
  objects = []

  for (let i = 0; i < 1; i++) {
    objects.push(new Object('black'))
  }
  
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = `rgba(${bgColor.r},${bgColor.g},${bgColor.b},${bgColor.a})`
  c.fillRect(0, 0, canvas.width, canvas.height)

  objects.forEach(object => {
    object.update()
   })
  
}


init()
animate()
