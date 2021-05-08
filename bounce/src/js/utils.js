function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function rotateAxis(velocity , angle){
    const rotatedVelocities = {
      x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
      y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    }
    return rotatedVelocities;
}

function resolveCollision(particle, otherParticle){

     
     const xVelocityDiff = otherParticle.velocity.x - particle.velocity.x;
     const yVelocityDiff = otherParticle.velocity.y - particle.velocity.y;

     const xDist = otherParticle.x - particle.x
     const yDist = otherParticle.y - particle.y

    if(xVelocityDiff*xDist + yVelocityDiff*yDist <= 0){


      const angle = -Math.atan2(yDist , xDist)

     const m1 = particle.mass
     const m2 = otherParticle.mass

     const u1 = rotateAxis(particle.velocity , angle)
     const u2 = rotateAxis(otherParticle.velocity , angle)

     const v1 = {
       x: u1.x*(m1-m2)/(m1+m2) + u2.x*2*m2 / (m1+m2),
       y: u1.y
     }
     const v2 = {
       x: u2.x*(m1-m2)/(m1+m2) + u1.x*2*m2 / (m1+m2),
       y: u2.y
     }

     const vFinal1 = rotateAxis(v1, -angle);
     const vFinal2 = rotateAxis(v2, -angle);

     particle.velocity.x = vFinal1.x
     particle.velocity.y = vFinal1.y

     otherParticle.velocity.x = vFinal2.x
     otherParticle.velocity.y = vFinal2.y


     }

     
}

module.exports = { randomIntFromRange, randomColor, distance, resolveCollision }
