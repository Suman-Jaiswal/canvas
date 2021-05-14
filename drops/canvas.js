const canvas = document.querySelector('canvas')
var width = canvas.width = innerWidth
var height = canvas.height = innerHeight

const c = canvas.getContext('2d')
let circleCount = 4
var mouse ={
  x: undefined,
  y: undefined
}
function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}
  let interval = setInterval(() => {
   mouse.x = Math.random() * width
   mouse.y = Math.random() * height
   init()
}, 100)
addEventListener('mousemove', (e) => {
  mouse.x = e.x
  mouse.y = e.y
  init()
})
addEventListener('resize' , function() {
    width = canvas.width = innerWidth
    height = canvas.height = innerHeight
    
})

class Circle {
   constructor(x, y, radius, color, velocity){
       this.x = x
       this.y = y
       this.radius = radius
       this.color = color
       this.velocity = velocity
   }
   draw(){
       c.beginPath()
       c.arc(this.x, this.y, this.radius, 0, Math.PI *2)
       c.fillStyle = this.color
       c.fill()
       c.closePath()
   }
   update(index){
     this.draw() 
     this.x += this.velocity.x
     this.y += this.velocity.y
     this.radius -= 0.03
    if(this.radius < 1){
      circles.splice(index,1)
    }
    for (let i = 0; i < circles.length; i++) {
       if (this === circles[i]) continue;
       if (distance(this.x, this.y, circles[i].x, circles[i].y) < 200 && this.radius === circles[i].radius && this.radius < 4 ){
         c.beginPath()
         c.moveTo(this.x, this.y)
         c.lineTo(circles[i].x, circles[i].y)
         c.strokeStyle = this.color
         c.lineWidth = this.radius/4
         c.stroke()
        //  c.closePath()
       }
      
    }
   }
 
}
let circles =[] ;
function init(){
   for (let i = 0; i < circleCount; i++) {
     var velocity = {
       y: (Math.random()-0.5) * 8 ,
       x: (Math.random()-0.5) * 8 
     }
     var color = `hsl(${360*Math.random()}, 100%, 50%)`
     circles.push(new Circle(mouse.x, mouse.y, 4, color , velocity))
     
   }
  }
  
  function animate(){
    c.fillStyle = 'rgba(0,0,0,0.7)'
    c.fillRect(0,0,width,height)
  
    requestAnimationFrame(animate)
     
    circles.map((circle, index) => {
      circle.update(index)
    })
      
    

}

init()
animate()
 


