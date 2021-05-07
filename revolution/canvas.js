var canvas = document.querySelector('canvas');
const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight 

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


var x = 200;
var y;
var theta = 0
var radius = 50
var rand = Math.random() * 10

function animate() {
  
 
   requestAnimationFrame(animate);

  // for revolute the circle---------------->

  c.beginPath()
  y = 200 + Math.pow(10000 - Math.pow(x - 200, 2), 0.5)
  x = width/2 + 100 * Math.cos(theta);
  y = height/2 + 100 * Math.sin(theta);
  theta += rand;
  c.arc(x, y, radius, 0, Math.PI * 2, false);
  c.strokeStyle = 'blue';
  c.stroke();
 
  
}


const click1 = () => {
  animate();
}
const click2 = () => {
  location.reload();
}

