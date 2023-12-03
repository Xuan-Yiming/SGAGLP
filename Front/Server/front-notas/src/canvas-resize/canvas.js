var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


// //circle
// c.beginPath();
// c.arc(300,300,30,0,Math.PI,true);
// c.strokeStyle='blue';
// c.stroke();

//animation

var x=200;

function animate(){




    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    // console.log(x);
    c.beginPath();

    c.arc(300,300,30,0,Math.PI,true);
    c.strokeStyle='red';
    c.stroke();

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