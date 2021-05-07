var canvas = document.querySelector('canvas');
const width = canvas.width = window.innerWidth -4
const height = canvas.height = window.innerHeight - 7.2

var c = canvas.getContext('2d');

//rectangle
// c.fillStyle='red'
// c.fillRect(300, 300, 50, 50)
// c.fillStyle='blue'
// c.fillRect(300, 200, 50, 50)
// c.fillStyle='yellow'
// c.fillRect(200, 300, 50, 50)
// c.fillStyle='green'
// c.fillRect(200, 200, 50, 50)

//line
// c.beginPath();
// c.moveTo(300,300)
// c.lineTo(200,300)
// c.lineTo(500,100)
// c.strokeStyle ='red'
// c.stroke()

//circle
// for (let i = 0; i < 500; i++) {
//   var randomAng = Math.random()*2*Math.PI
//    c.beginPath()
//    c.arc(Math.random() * width, Math.random() * height, 30,randomAng, (Math.PI/2) * Math.random() + randomAng, false)
//    c.fillStyle= 'black'
//    c.fill()
// }

var x=200;
var y;
 var theta = 0
function animate(){
 
  requestAnimationFrame(animate);
  y = 200 + Math.pow(2500 - Math.pow(x-200,2) , 0.5) 
  x = 200 + 100 * Math.cos(theta);
  y = 200 + 100 * Math.sin(theta);
  c.beginPath();
  c.arc(x,y,30,0,Math.PI*2,false);
  c.strokeStyle='blue';
  c.stroke();
  theta += 0.1;
  if(y==1000){
    break;
  }
  
  
}
animate();