// import utils from './utils'
const gameOverSound = new Audio('./media/gameover.mp3');
const moveSound = new Audio('./media/move.mp3');
const musicSound = new Audio('./media/music.mp3');

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

var width = canvas.width = 320
var height = canvas.height = Math.floor(innerHeight*0.9)

const mouse = {
  x: width / 2,
  y: height / 2
}

const colors = ['#F3FEB0', '#FEA443', '#705E78', '#A5AAA3', '#812F33']

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
   width = canvas.width = 320
   height = canvas.height = Math.floor(innerHeight*0.9)
   
  })
  var levelval = 1;
  var score = 0
  var speed=3
  var inputDir = {x:1}
  setInterval(() => {
    levelval += 1
    level.innerHTML = "Level: "+ levelval;
  }, 60000);


  var hiscoreval = localStorage.getItem("hiscore");
  if(hiscoreval ===null){
    var value = 0
  }
  else{
    value = hiscoreval
  }
  high.innerHTML = "High Score: " + value;
  // Objects
class Object {
  constructor(x, y, speed, color) {
    this.x = x
    this.y = y
    this.speed = speed
    this.color = color
    
  }
  
  draw() {
    c.beginPath()
    c.rect(this.x, this.y, 30,50)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }
  
  update() {
    this.draw()
    this.y += this.speed
    this.speed = speed
    
    if( this.y > car.y-50 && this.y < car.y+50 && this.x === car.x){
      gameOverSound.play();
      alert('Game Over!');
      this.y = -250
      score = 0
      levelval =1
      objects = [];
       current.innerHTML = "Score: " + score;
    }
    else if( this.y === height){
      score +=1
      if(score>hiscoreval){
        hiscoreval = score;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        high.innerHTML = "High Score: " + hiscoreval;
    }
    current.innerHTML = "Score: " + score;
    }
   
  }
  updateCar(){
    this.draw()
     this.x = inputDir.x
     
  }
  
  
}

// Implementation
const car = new Object(inputDir.x,height-50,0,'green')
console.log(car)
let objects
objects = []
function init() {
  for (let i = 0; i < 25; i++) {
    x = randomIntFromRange(0,width/32)*32 +1
    y = randomIntFromRange(-25,0)*50 
    color = randomColor(colors)
    objects.push(new Object(x,y,speed,color))
  }


}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  car.updateCar()
  objects.forEach(object => {
   object.update(object.index)
  })
}

const btn =document.querySelector('.btn').addEventListener('click', () => {
  init()
  animate()
  int()
  musicSound.play();
  document.getElementById('btn').style.display = 'none'
})



function int(){
  setInterval(init,8000)
function Delete(){
  objects=[];
}
setInterval(Delete,60000)
}


addEventListener('keydown',(e) => {
   console.log(e.key)
   switch (e.key) {
     case 'ArrowLeft':
       if(inputDir.x>2){

         inputDir.x -= 32
       }
       break;

     case 'ArrowRight':
       if(inputDir.x<285)
        inputDir.x += 32
       break;

     
   
     default:
       break;
   }
})

addEventListener('keydown', e => {
    if(e.key === 'ArrowUp' && speed <4){
      speed +=1
    }
    else if(e.key ==='ArrowDown' && speed >3){
      speed -=1
    }
  
})