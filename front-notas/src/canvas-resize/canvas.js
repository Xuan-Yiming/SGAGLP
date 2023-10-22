var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//cuadrado/rectangulo
c.fillStyle = 'rgba(255,0,0,0.5)';
c.fillRect(100,100,100,100);


for(let i=0;i<10;i++){
    c.fillStyle = 'rgba(' + i*20+20+',0,0,0.5)';
    c.fillRect(i*100+ 10,100,10,10);
}


//line
c.beginPath();
c.moveTo(50,300);
c.lineTo(300,100);
c.lineTo(400,300);
c.strokeStyle = "#fa34a3";
c.stroke();


// //circle
// c.beginPath();
// c.arc(300,300,30,0,Math.PI,true);
// c.strokeStyle='blue';
// c.stroke();

//animation

var x=200;

function animate(){

    // requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    c.beginPath();
    c.arc(x,300,30,0,Math.PI,true);
    c.strokeStyle='blue';
    c.stroke();

    x+=1;
    // requestAnimationFrame(animate);
    // console.log('loop');

}

animate();


console.log(canvas);