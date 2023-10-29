import React, { useRef, useEffect, useState } from 'react';
// import '../HojasDeEstilo/MapGrid.css';
// import logo from "../images/logoCircular.png";

const MapGrid2 = (props) => {
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    let rapidez = 1/72;

    let [unidadCuadroAncho, setUnidadCuadroAncho] = useState('');
    let [unidadCuadroAlto, setUnidadCuadroAlto] = useState('');


    const elementosEstaticos = [{tipo: 'planta',x:12,y:8},
    {tipo: 'cisterna',x:42,y:42},
    {tipo: 'cisterna',x:63,y:3}
    // ,
    // {tipo: 'cliente',x:12,y:8},
    // {tipo: 'cliente',x:12,y:8},
    // {tipo: 'cliente',x:12,y:8},
    // {tipo: 'cliente',x:12,y:8},
    // {tipo: 'cliente',x:12,y:8},
    // {tipo: 'cliente',x:12,y:8}
  ]


const elementosCamiones =[
{tipo: 'camion',id:'TA01',x:12,y:8,time:1},
{tipo: 'camion',id:'TA01',x:13,y:8,time:2},
{tipo: 'camion',id:'TA01',x:14,y:8,time:3},
{tipo: 'camion',id:'TA01',x:15,y:8,time:4},
{tipo: 'camion',id:'TA01',x:16,y:8,time:5},
{tipo: 'camion',id:'TA01',x:17,y:8,time:6},
{tipo: 'camion',id:'TA01',x:18,y:8,time:7},
{tipo: 'camion',id:'TA01',x:19,y:8,time:8},
{tipo: 'camion',id:'TA01',x:20,y:8,time:9},
{tipo: 'camion',id:'TA01',x:20,y:9,time:10},
{tipo: 'camion',id:'TA01',x:20,y:10,time:11},
{tipo: 'camion',id:'TA01',x:21,y:10,time:12},
{tipo: 'camion',id:'TA01',x:22,y:10,time:13},
{tipo: 'camion',id:'TA01',x:23,y:10,time:14},
{tipo: 'camion',id:'TA01',x:24,y:10,time:15},
{tipo: 'camion',id:'TA01',x:25,y:10,time:16},
{tipo: 'camion',id:'TA01',x:26,y:10,time:17},
{tipo: 'camion',id:'TA01',x:27,y:10,time:18},
{tipo: 'camion',id:'TA01',x:28,y:10,time:19},
{tipo: 'camion',id:'TA01',x:29,y:10,time:20},

// {tipo: 'camion',id:'TA02',x:12,y:8,time:1},
// {tipo: 'camion',id:'TA02',x:13,y:8,time:2},
// {tipo: 'camion',id:'TA02',x:14,y:8,time:3},
// {tipo: 'camion',id:'TA02',x:15,y:8,time:4},
// {tipo: 'camion',id:'TA02',x:16,y:8,time:5},
// {tipo: 'camion',id:'TA02',x:17,y:8,time:6},
// {tipo: 'camion',id:'TA02',x:18,y:8,time:7},
// {tipo: 'camion',id:'TA02',x:19,y:8,time:8},
// {tipo: 'camion',id:'TA02',x:20,y:8,time:9},
// {tipo: 'camion',id:'TA02',x:20,y:9,time:10},
// {tipo: 'camion',id:'TA02',x:20,y:10,time:11},
// {tipo: 'camion',id:'TA02',x:21,y:10,time:12},
// {tipo: 'camion',id:'TA02',x:22,y:10,time:13},
// {tipo: 'camion',id:'TA02',x:23,y:10,time:14},
// {tipo: 'camion',id:'TA02',x:24,y:10,time:15},
// {tipo: 'camion',id:'TA02',x:25,y:10,time:16},
// {tipo: 'camion',id:'TA02',x:26,y:10,time:17},
// {tipo: 'camion',id:'TA02',x:27,y:10,time:18},
// {tipo: 'camion',id:'TA02',x:28,y:10,time:19},
// {tipo: 'camion',id:'TA02',x:29,y:10,time:20}

]


    // const [images, setImages] = useState({});

    const objectX = useRef(0);
    const objectSpeed = 2;

    const inicio ={"x":1,"y":1};
    const actual ={"x":1,"y":1};
    const final ={"x":2,"y":1};



    const dibujarHacia = (context,actual,inicio,final,velocidad,direccion)=>{


        //NO TRATAR DE REHACER EL -TAMAÑAO POR QUE ESTO PUEDE MALOGRARSE
        // context.clearRect(0,0,context.canvas.width,context.canvas.height);

        // console.log(velocidad);

        if(velocidad + unidadCuadroAncho*(0.5 + inicio.x) <= unidadCuadroAncho*(0.5 + final.x) && 
                            unidadCuadroAlto*(0.5 + inicio.y) <= unidadCuadroAlto*(0.5 + final.y)){
                                console.log(velocidad);
                            }
        else if (velocidad + unidadCuadroAncho*(0.5 + inicio.x) < unidadCuadroAncho*(0.5 + final.x) && 
        unidadCuadroAlto*(0.5 + inicio.y) < unidadCuadroAlto*(0.5 + final.y)){
            context.fillStyle = 'grey';
            context.fillRect(velocidad + unidadCuadroAncho*(0.5 + inicio.x),unidadCuadroAlto*(0.5+inicio.y),
                                    unidadCuadroAncho,unidadCuadroAlto);
            // actual.x++;
            
        }


    }


    const dibujarHacia2 = (context,inicio,final,velocidad)=>{

        

    }


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
        // console.log(`Ancho del cuadricula: ${canvas.width / cuadrosAncho}`);
        // console.log(`alto cuadricula: ${canvas.height / cuadrosAncho}`);

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

            // ctx.fillRect(props.tiempo + unidadCuadroAncho*0.5,0 +unidadCuadroAlto*0.5,
            //                     unidadCuadroAncho,unidadCuadroAlto);


            // console.log(props.tiempo);

            //dibujarHacia(ctx,actual,inicio,final,props.tiempo,1);

            for (let i = 0; i < elementosCamiones.length; i++) {

                const camion = elementosCamiones[i];
                let idAnt = 'aaa';
                let clockActual=0;
                if(camion.id != idAnt && clockActual*72<props.tiempo && props.tiempo < camion.time*72){
                    ctx.fillStyle = 'grey';
                    // console.log(idAnt);
                    // console.log(camion.id);
                    // console.log(props.tiempo);

                    // console.log(camion.x);
                    // console.log(camion.y);
                    ctx.fillRect( unidadCuadroAncho*(0.5 +  camion.x),unidadCuadroAlto*(0.5+camion.y),
                                            unidadCuadroAncho,unidadCuadroAlto);
                    idAnt=camion.id;
                    clockActual=Math.floor(props.tiempo/72);
                    break;
                }
                // console.log(`Truck ID: ${camion.id}`);
                // console.log(`Type: ${camion.tipo}`);
                // console.log(`Coordinates (x, y): (${camion.x}, ${camion.y})`);
                // console.log(`Time: ${camion.time}`);
                // console.log('------------------');
            }

        }
        
        animate();

    }, [dimensions,props.tiempo]);
    
    

    return <canvas ref={canvasRef} {...props} />;
};

export default MapGrid2;