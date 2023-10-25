import React, { useRef, useEffect, useState } from 'react';
// import '../HojasDeEstilo/MapGrid.css';
// import logo from "../images/logoCircular.png";

const MapGrid2 = (props) => {
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    let [unidadCuadroAncho, setUnidadCuadroAncho] = useState('');
    let [unidadCuadroAlto, setUnidadCuadroAlto] = useState('');

    // const [images, setImages] = useState({});

    const objectX = useRef(0);
    const objectSpeed = 2;



    // useEffect(() => {
    //     // Maneja los cambios en los datos aquí

    //     console.log(`propsv:`,props);

    //     setDimensions(props.ancho,props.alto);
    //     console.log(`Ancho del div: ${props.ancho}`);
    //     console.log(`alto del div: ${props.alto}`);
    // }, [props.ancho, props.alto]);


    useEffect(() => {
        // Ajustar el tamaño del canvas al del contenedor
        function updateSize() {
            if (canvasRef.current && canvasRef.current.parentElement) {
                const { width, height } = canvasRef.current.parentElement.getBoundingClientRect();
                setDimensions({ width, height });
            }
        }

        updateSize();

        // Agregar listener para detectar cambios de tamaño y actualizar el canvas
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);

    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;



        const cuadrosAlto = 50;
        const cuadrosAncho = 70;
        console.log(`Ancho del cuadricula: ${canvas.width / cuadrosAncho}`);
        console.log(`alto cuadricula: ${canvas.height / cuadrosAncho}`);

        var x=0;

        function animate(){
        
            //seccion de medidas
            // un cuadro es una separacion canvas.width / cuadrosAncho
            // supoiniendo que un cuadro es 1km entonces para estar a 50kmh
            //entoncesla velocdiadd o corriendo una hora por ms es velocidad --> canvas.width *50 / cuadrosAncho cada segundo
            

            unidadCuadroAncho = canvas.width / cuadrosAncho;
            unidadCuadroAlto = canvas.height / cuadrosAlto;


            //EL RETO AHORA ES PONERLO EN UNA CELDA QUE ADJACENTE QUE NOS MANDEN, DE 0,0 A 0,1 A 0,2 ETC

            const consecutivePoints = [{"x":0,"y":1},{"x":0,"y":2},{"x":0,"y":3}]

        
            requestAnimationFrame(animate);
            ctx.clearRect(0,0,canvas.width,canvas.height);


            ctx.beginPath();
            // Dibujar cuadrícula
            for (let x = 0; x < canvas.width; x += canvas.width / cuadrosAncho) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
            }

            for (let y = 0; y < canvas.height; y += canvas.height / cuadrosAlto) {
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
            }
            ctx.strokeStyle = "black";
            ctx.stroke();
            //termina cuadricula
        
            // console.log(x);


            // ctx.beginPath();
    
            // ctx.arc(300,300,30,0,Math.PI,true);
            // ctx.strokeStyle='red';
            // ctx.stroke();
    
            // ctx.beginPath();
            
            

            //el anochde del canvas que divide a delta es hasta donde llegara, ese sera nuestro punto de finalizacion

            const delta = (x)%canvas.width;

            // ctx.arc(delta,300,30,0,Math.PI,true);
            // ctx.strokeStyle='blue';
            // ctx.stroke();
            ctx.fillRect(delta + unidadCuadroAncho*0.5,0 +unidadCuadroAlto*0.5,
                                unidadCuadroAncho,unidadCuadroAlto);
            x+=(unidadCuadroAncho)/50;  //esto se divide entre 60 para el tiempo real cada min y 3600 para segundo
            // requestAnimationFrame(animate);
            // console.log('loop');
        
        }
        
        animate();

    }, [dimensions]);
    
    

    return <canvas ref={canvasRef} {...props} />;
};

export default MapGrid2;