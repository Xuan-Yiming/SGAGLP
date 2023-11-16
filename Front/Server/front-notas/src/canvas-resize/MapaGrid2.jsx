import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
// import '../HojasDeEstilo/MapGrid.css';
// import logo from "../images/logoCircular.png";

const MapGrid2 = (props) => {
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    let rapidez = 1/72;
    const [cantidadCamiones, setCantidadCamiones] = useState(0);
    const [todosCamiones, setTodosCamiones] = useState('');
    const [todosBloqueos, setTodosBloqueos] = useState('');

    const [todosPedidos, setTodosPedidos] = useState([]);

    let [unidadCuadroAncho, setUnidadCuadroAncho] = useState('');
    let [unidadCuadroAlto, setUnidadCuadroAlto] = useState('');


    const elementosEstaticos = [{tipo: 'planta',x:12,y:8},
    {tipo: 'cisterna',x:42,y:42},
    {tipo: 'cisterna',x:63,y:3}

    // ,
    // {tipo: 'cliente',x:12,y:8},
    // {tipo: 'cliente',x:12,y:8},
    // {tipo: 'cliente',x:12,y:8},
    // {tipo: 'cliente',x:12,y:8}
  ]

  const [elementosCamiones,setElementosCamiones] = useState([]);

    // const elementosCamiones = props.elementosCamiones;

const elementosCamiones1 =[
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

{tipo: 'camion',id:'TA02',x:12,y:8,time:1},
{tipo: 'camion',id:'TA02',x:12,y:9,time:2},
{tipo: 'camion',id:'TA02',x:12,y:10,time:3},
{tipo: 'camion',id:'TA02',x:12,y:11,time:4},
{tipo: 'camion',id:'TA02',x:12,y:12,time:5},
{tipo: 'camion',id:'TA02',x:12,y:13,time:6},
{tipo: 'camion',id:'TA02',x:12,y:14,time:7},
{tipo: 'camion',id:'TA02',x:12,y:15,time:8},
{tipo: 'camion',id:'TA02',x:12,y:16,time:9},
{tipo: 'camion',id:'TA02',x:13,y:16,time:10},
{tipo: 'camion',id:'TA02',x:14,y:16,time:11},
{tipo: 'camion',id:'TA02',x:14,y:17,time:12},
{tipo: 'camion',id:'TA02',x:14,y:18,time:13},
{tipo: 'camion',id:'TA02',x:14,y:19,time:14},
{tipo: 'camion',id:'TA02',x:14,y:20,time:15},
{tipo: 'camion',id:'TA02',x:14,y:21,time:16},
{tipo: 'camion',id:'TA02',x:14,y:22,time:17},
{tipo: 'camion',id:'TA02',x:14,y:23,time:18},
{tipo: 'camion',id:'TA02',x:14,y:24,time:19},
{tipo: 'camion',id:'TA02',x:14,y:25,time:20}

]

const elementosEstaticosTemporales =[
    {tipo: 'bloqueo',id:'B01',x:18,y:6,inicio:1,final:600},
    {tipo: 'bloqueo',id:'B01',x:19,y:6,inicio:1,final:600},
    {tipo: 'bloqueo',id:'B01',x:20,y:6,inicio:1,final:600},
    {tipo: 'bloqueo',id:'B01',x:21,y:6,inicio:1,final:600},
    {tipo: 'bloqueo',id:'B01',x:21,y:7,inicio:1,final:600},
    // {tipo: 'bloqueo',id:'B01',x:22,y:7,inicio:1,final:600},
    // {tipo: 'bloqueo',id:'B01',x:22,y:9,inicio:1,final:600},
    // {tipo: 'bloqueo',id:'B01',x:22,y:10,inicio:1,final:600},
    // {tipo: 'bloqueo',id:'B01',x:23,y:6,inicio:1,final:600},
    // {tipo: 'bloqueo',id:'B01',x:24,y:6,inicio:1,final:600},
    // {tipo: 'bloqueo',id:'B01',x:25,y:6,inicio:1,final:600},
    {tipo: 'bloqueo',id:'B02',x:26,y:6,inicio:1,final:600},
    {tipo: 'bloqueo',id:'B02',x:26,y:5,inicio:1,final:600},
    {tipo: 'bloqueo',id:'B02',x:26,y:4,inicio:1,final:600},
    {tipo: 'bloqueo',id:'B02',x:26,y:3,inicio:1,final:600},
    {tipo: 'bloqueo',id:'B02',x:26,y:2,inicio:1,final:600},

    
    {tipo: 'cliente',id:'CLI01',x:29,y:10,inicio:0,final:21},
    {tipo: 'cliente',id:'CLI02',x:14,y:25,inicio:0,final:21}
    
]

const  getDataCamiones = async () =>{
    try {
      const response = await axios.get('http://localhost:3000/estructuraCamiones4');

      setElementosCamiones(response.data)
    //   console.log(response.data); // Response data
    //   console.log(elementosCamiones); // Response data
    //   console.log(elementosCamiones1); // Response data
    } catch (error) {
      console.error(error);
    }
  }

    // const [images, setImages] = useState({});

    const objectX = useRef(0);
    const objectSpeed = 2;

    const inicio ={"x":1,"y":1};
    const actual ={"x":1,"y":1};
    const final ={"x":2,"y":1};

    
    const graficarPuntosFijos = (c)=>{

        


        for (let i = 0; i < elementosEstaticos.length; i++){
            const elemento = elementosEstaticos[i];

            if(elemento.tipo == 'planta'){
                //PLANTA
                c.beginPath();
                c.arc(elemento.x*unidadCuadroAncho,elemento.y*unidadCuadroAlto,unidadCuadroAncho/2,0,2*Math.PI,true);
                c.strokeStyle='black';
                c.fillStyle = 'green'; // Fill color
                c.fill();
                c.stroke();
            }else if(elemento.tipo == 'cisterna'){
                //Cisterna
                c.beginPath();
                c.arc(elemento.x*unidadCuadroAncho,elemento.y*unidadCuadroAlto,unidadCuadroAncho/2,0,2*Math.PI,true);
                c.strokeStyle='black';
                c.fillStyle = 'orange'; // Fill color
                c.fill();
                c.stroke();
            }
            // else if(elemento.tipo == 'cliente'){
            //     c.beginPath();
            //     c.moveTo((elemento.x)*unidadCuadroAncho,(elemento.y-0.5)*unidadCuadroAlto); // Move to the starting point
                
            //     // Draw the diamond shape using lines
            //     c.lineTo((elemento.x)*unidadCuadroAncho - unidadCuadroAncho / 2, (elemento.y-0.5)*unidadCuadroAlto + unidadCuadroAncho / 2); // Left point
            //     c.lineTo((elemento.x)*unidadCuadroAncho , (elemento.y-0.5)*unidadCuadroAlto + unidadCuadroAncho); // Bottom point
            //     c.lineTo((elemento.x)*unidadCuadroAncho  + unidadCuadroAncho / 2, (elemento.y-0.5)*unidadCuadroAlto + unidadCuadroAncho / 2); // Right point
                
            //     // Close the path to complete the shape
            //     c.closePath();
                
            //     // Set the fill and stroke styles
            //     c.fillStyle = 'blue'; // Fill color
            //     c.strokeStyle = 'black'; // Stroke color
                
            //     // Fill and stroke the diamond
            //     c.fill();
            //     c.stroke();
            // }

        }

    }

    const graficarRutas = (c,tiempo)=>{

        let clockActual=0;
        let idAnt ='aaaa';
        let camArr =[];

        c.lineWidth = 4;
        c.strokeStyle="green";

        // for (let i = 0; i < elementosCamiones.length; i++) {
            
        //     const camion = elementosCamiones[i];
        //     // console.log(idAnt);
        //     if(idAnt!=camion.placa && clockActual*72<tiempo && tiempo < camion.time*72){
                
                

        //         c.beginPath();
                
        //         c.moveTo(camion.x * unidadCuadroAncho, unidadCuadroAlto*camion.y)
        //         for (let j = i+1; j < elementosCamiones.length; j++) {
        //             const camion1 = elementosCamiones[j];
        //             // idAnt = camion1.placa;
        //             if(camion.placa == camion1.placa){
                        
        //                 c.lineTo(camion1.x * unidadCuadroAncho, unidadCuadroAlto*camion1.y);
        //             }else {
                        
        //                 c.stroke();
        //                 break;
        //             }
                    
        //         }
        //         // clockActual=Math.floor(tiempo/72);
        //         idAnt = camion.placa;
        //     }
            
        // }

        
        // for (let j = 0; j < elementosCamiones.length; j++) {
        //     const camion = elementosCamiones[j];

        //     if(camion.time*72 ==Math.floor(tiempo/72)){
        //         for (let i = j+1; i < elementosCamiones.length; i++) {

        //             const camion1 = elementosCamiones[i];

        //             if(camion.idPedido == camion1.idPedido){
        //                 c.beginPath();
        //                 c.fillStyle = 'green';
        //                 c.fillRect( unidadCuadroAncho*(  -0.25+ camion.x),unidadCuadroAlto*(-0.25+camion.y),
        //                                         unidadCuadroAncho/2,unidadCuadroAlto/2);
        //                 clockActual=Math.floor(tiempo/72);
        //                 c.stroke();
        //             }

        //         }
        //     }
        // }

        for (let i = 0; i < todosPedidos.length; i++) {
            const pedido = todosPedidos[i];
            // console.log(todosPedidos[i]);
            let idAnt = 'aaaa';

            let disponibles = [];
        
            for (let j = 0; j < elementosCamiones.length; j++) {
                const camion = elementosCamiones[j];
                if(tiempo == camion.time){
                    disponibles.push(camion.idPedido);
                }
            }
            
            for (let j = 0; j < elementosCamiones.length; j++) {
                const camion = elementosCamiones[j];
                // let idAnt = 'aaa';
                let idAnt = 'aaa';
                
                // let flag =false;

                

                if(camion.idPedido==todosPedidos[i] && tiempo < camion.time && disponibles.includes(camion.idPedido)){
                    
                //&& (camion.time-1)*72<tiempo 


                    c.beginPath();
                    c.fillStyle = 'green';
                    c.fillRect( unidadCuadroAncho*(  -0.25+ camion.x),unidadCuadroAlto*(-0.25+camion.y),
                                            unidadCuadroAncho/2,unidadCuadroAlto/2);
                    clockActual=tiempo;
                    c.stroke();
                    // break;
                }
            }
            c.stroke();
        }

        // // let clockActual=0;
        // for (let i = 0; i < todosPedidos.length; i++) {
        //     const pedido = todosPedidos[i];
        //     // console.log(todosPedidos[i]);
        //     let idAnt = 'aaaa';
            
        //     for (let j = 0; j < elementosCamiones.length; j++) {
        //         // const camion = elementosCamiones[j];

        //         // if(idAnt != camion.idPedido){
        //         //     c.beginPath();
        //         //     c.lineWidth = 4;
        //         //     c.strokeStyle="green";
        //         //     c.moveTo((camion.x )* unidadCuadroAncho, unidadCuadroAlto*(camion.y));

        //         // }

                
        //         // if(camion.idPedido == pedido){


        //         //     let flag =false
        //         //     for (let k = j; k < elementosCamiones.length; k++) {
        //         //         const camion1 = elementosCamiones[k];
        //         //         if(tiempo < camion.time*72){
        //         //             flag =true;
        //         //             break;
        //         //         }
        //         //     }
        //         //     if(flag){
        //         //         // c.lineWidth = 1;
        //         //         // c.strokeStyle="black";
        //         //         const nuevoPunto = elementosCamiones[i+1];

        //         //         c.lineTo((nuevoPunto.x )* unidadCuadroAncho, unidadCuadroAlto*(nuevoPunto.y));
    
                        
    
        //         //         // c.lineWidth = 1;
        //         //         // c.strokeStyle="black";
        //         //     }

        //         //     idAnt = camion.idPedido;
        //         // }
        //         const camion = elementosCamiones[j];
        //         // let idAnt = 'aaa';
        //         let idAnt = 'aaa';
                
        //         // let flag =false;
        //         if(camion.idPedido==todosPedidos[i] && tiempo < camion.time*72){
                    
        //         //&& (camion.time-1)*72<tiempo 


        //             c.beginPath();
        //             // if(camion.idPedido==todosPedidos[i] && clockActual*72<props.tiempo && props.tiempo < camion.time*72){
        //             // if(camion.id==todosCamiones[j] && clockActual*72<props.tiempo && props.tiempo < camion.time*72){
        //             // if(camion.id != idAnt && clockActual*72<props.tiempo && props.tiempo < camion.time*72){
        //             c.fillStyle = 'green';
        //             c.fillRect( unidadCuadroAncho*(  -0.25+ camion.x),unidadCuadroAlto*(-0.25+camion.y),
        //                                     unidadCuadroAncho/2,unidadCuadroAlto/2);
        //             clockActual=Math.floor(tiempo/72);
        //             c.stroke();
        //             // break;
        //         }
        //     }
        //     c.stroke();
        // }

    }




    const graficarEstaticosTemporales = (c,tiempo)=>{

        let idAnt = 'aaa';
        c.lineWidth = 1;
        for (let i = 0; i < elementosEstaticosTemporales.length; i++){
            const elemento = elementosEstaticosTemporales[i];
            // Math.floor(props.tiempo/72)==camion.time
// console.log(elemento);
            if(elemento.inicio <= tiempo&& tiempo <= elemento.final){
                // console.log(elemento.inicio);
                if(elemento.tipo == 'bloqueo'){
                    // if(elemento.tipo = 'bloqueo' && elemento.inicio < Math.floor(tiempo/72) && Math.floor(tiempo/72) < elemento.final){
                        // console.log(elemento.inicio);
                            // c.beginPath();
                            // c.moveTo(elemento.x * unidadCuadroAncho, unidadCuadroAlto*elemento.y); // Move to the previous point
                            // idAnt = elemento.id;
                            c.lineWidth = 4;
                            c.strokeStyle="red";
                        if(elemento.id != idAnt){
                            c.beginPath();
                            c.moveTo(elemento.x * unidadCuadroAncho, unidadCuadroAlto*elemento.y); // Move to the previous point
                            idAnt = elemento.id;
                        }else{
                            // c.strokeStyle="green";
                            c.lineTo(elemento.x * unidadCuadroAncho, unidadCuadroAlto*elemento.y); // Draw a line to the new point
                            c.stroke(); // Render the line
                        }


                        // while(1){
                        //     i++;
                        //     if(i == elementosEstaticosTemporales.length)return;
                        //     const seleccionado=elementosEstaticosTemporales[i];
                        //     if(seleccionado.id == idAnt){
                                
                        //         c.lineTo(elemento.x * unidadCuadroAncho, unidadCuadroAlto*elemento.y); // Draw a line to the new point
                        //         c.stroke(); // Render the line
                        //     }else{
                        //         i--;
                        //         break;
                        //     }
                        // }
                    }
                    else if(elemento.tipo == 'cliente'){
                        c.lineWidth = 1;
                        // console.log(elemento.inicio);
                        c.beginPath();
                        c.moveTo((elemento.x)*unidadCuadroAncho,(elemento.y-0.5)*unidadCuadroAlto); // Move to the starting point
                        
                        // Draw the diamond shape using lines
                        c.lineTo((elemento.x)*unidadCuadroAncho - unidadCuadroAncho / 2, (elemento.y-0.5)*unidadCuadroAlto + unidadCuadroAncho / 2); // Left point
                        c.lineTo((elemento.x)*unidadCuadroAncho , (elemento.y-0.5)*unidadCuadroAlto + unidadCuadroAncho); // Bottom point
                        c.lineTo((elemento.x)*unidadCuadroAncho  + unidadCuadroAncho / 2, (elemento.y-0.5)*unidadCuadroAlto + unidadCuadroAncho / 2); // Right point
                        
                        // Close the path to complete the shape
                        c.closePath();
                        
                        // Set the fill and stroke styles
                        c.fillStyle = 'blue'; // Fill color
                        c.strokeStyle = 'black'; // Stroke color
                        
                        // Fill and stroke the diamond
                        c.fill();
                        c.stroke();
                    }
            }

        }


    }

    const getBloqueosTotales =()=>{

        let idAnt = 'aaa';
        let bloqueos = [];

        for (let i = 0; i < elementosEstaticosTemporales.length; i++){
            const elemento = elementosEstaticosTemporales[i];
            if(idAnt!=elemento.id){
                idAnt = elemento.id;
                bloqueos.push(elemento);
                // console.log(camionEscogido.id);
            }
        }
        setTodosBloqueos(bloqueos);
    }


    const getCantidadCamiones  = async ()=>{

        let cantidadCamiones=0;
        let camionAnt = 'aaa';
        let pedidoAnt = 'aaa';
        let camiones = [];
        let pedidos = [];


        // console.log(elementosCamiones);
        for (let i = 0; i < elementosCamiones.length; i++){
            const camionEscogido = elementosCamiones[i];
            // if(camionAnt!=camionEscogido.id){
            //     camionAnt = camionEscogido.id;
            //     cantidadCamiones++;
            //     camiones.push(camionAnt);
            //     // console.log(camionEscogido.id);
            // }

            if(camionAnt!=camionEscogido.placa){
                camionAnt = camionEscogido.placa;
                cantidadCamiones++;
                camiones.push(camionAnt);
                // console.log(camionEscogido.id);
            }
            if(pedidoAnt!=camionEscogido.idPedido){
                pedidoAnt = camionEscogido.idPedido;
                // cantidadCamiones++;
                pedidos.push(pedidoAnt);
                // console.log(camionEscogido.idPedido);
            }
        }
        setTodosPedidos(pedidos);
        setTodosCamiones(camiones);
        setCantidadCamiones(cantidadCamiones);
        // console.log(todosPedidos);
    }

    useEffect(() => {
        
        getDataCamiones();
        getCantidadCamiones();

        console.log(props.tiempo);
        
        // getBloqueosTotales();
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

        getDataCamiones();
        getCantidadCamiones();
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;



        const cuadrosAlto = 50;
        const cuadrosAncho = 70;
        // console.log(`Ancho del cuadricula: ${canvas.width / cuadrosAncho}`);
        // console.log(`alto cuadricula: ${canvas.height / cuadrosAncho}`);


        function animate(){
            
        
            //seccion de medidas
            // un cuadro es una separacion canvas.width / cuadrosAncho
            // supoiniendo que un cuadro es 1km entonces para estar a 50kmh
            //entoncesla velocdiadd o corriendo una hora por ms es velocidad --> canvas.width *50 / cuadrosAncho cada segundo
            

            unidadCuadroAncho = canvas.width / cuadrosAncho;
            unidadCuadroAlto = canvas.height / cuadrosAlto;
        
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


            
                ctx.beginPath();
                graficarPuntosFijos(ctx);
                ctx.stroke();
            ////FINAL CUADRICULA


            //BLOQUEOS  Y PEDIDOS
            // ctx.beginPath();
            ctx.lineWidth = 1;
            graficarEstaticosTemporales(ctx,props.tiempo);
            ctx.lineWidth = 1;
            // ctx.stroke();

            

            //RUTAS
            ctx.beginPath();
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.strokeStyle="black";
            graficarRutas(ctx,props.tiempo);
            ctx.lineWidth = 1;
            ctx.strokeStyle="black";
            ctx.beginPath();
            ctx.stroke();


            //BLOQUEOS  Y PEDIDOS

            // console.log(elementosCamiones);

            // console.log(props.tiempo);
            for(let j=0;j<cantidadCamiones;j++){

                for (let i = 0; i < elementosCamiones.length; i++) {
                    
                    
                    const camion = elementosCamiones[i];
                    // let idAnt = 'aaa';
                    let idAnt = 'aaa';
                    let clockActual=0;
                    // let flag =false;
                    if(camion.placa==todosCamiones[j] && props.tiempo<=camion.time){
                        
                        



                        ctx.beginPath();
                        ctx.fillStyle = 'grey';
                        ctx.fillRect( unidadCuadroAncho*(-0.5 +  camion.x),unidadCuadroAlto*(-0.5+camion.y),
                                                unidadCuadroAncho,unidadCuadroAlto);
                        clockActual=props.tiempo;
                        ctx.stroke();
                        break;
                    }
    
                }
            }



        }
        
        animate();

    }, []);
    


    useEffect(() => {

        getDataCamiones();
        getCantidadCamiones();
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;



        const cuadrosAlto = 50;
        const cuadrosAncho = 70;
        // console.log(`Ancho del cuadricula: ${canvas.width / cuadrosAncho}`);
        // console.log(`alto cuadricula: ${canvas.height / cuadrosAncho}`);


        function animate(){
            
        
            //seccion de medidas
            // un cuadro es una separacion canvas.width / cuadrosAncho
            // supoiniendo que un cuadro es 1km entonces para estar a 50kmh
            //entoncesla velocdiadd o corriendo una hora por ms es velocidad --> canvas.width *50 / cuadrosAncho cada segundo
            

            unidadCuadroAncho = canvas.width / cuadrosAncho;
            unidadCuadroAlto = canvas.height / cuadrosAlto;
        
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


            
                ctx.beginPath();
                graficarPuntosFijos(ctx);
                ctx.stroke();
            ////FINAL CUADRICULA


            //BLOQUEOS  Y PEDIDOS
            // ctx.beginPath();
            ctx.lineWidth = 1;
            graficarEstaticosTemporales(ctx,props.tiempo);
            ctx.lineWidth = 1;
            // ctx.stroke();

            

            //RUTAS
            ctx.beginPath();
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.strokeStyle="black";
            graficarRutas(ctx,props.tiempo);
            ctx.lineWidth = 1;
            ctx.strokeStyle="black";
            ctx.beginPath();
            ctx.stroke();


            //BLOQUEOS  Y PEDIDOS

            // console.log(elementosCamiones);

            // console.log(props.tiempo);
            for(let j=0;j<cantidadCamiones;j++){

                for (let i = 0; i < elementosCamiones.length; i++) {
                    
                    
                    const camion = elementosCamiones[i];
                    // let idAnt = 'aaa';
                    let idAnt = 'aaa';
                    let clockActual=0;
                    // let flag =false;
                    if(camion.placa==todosCamiones[j] && props.tiempo<=camion.time){
                        
                        



                        ctx.beginPath();

                        // if(camion.id==todosCamiones[j] && clockActual*72<props.tiempo && props.tiempo < camion.time*72){
                        // if(camion.id != idAnt && clockActual*72<props.tiempo && props.tiempo < camion.time*72){
                        ctx.fillStyle = 'grey';
                        ctx.fillRect( unidadCuadroAncho*(-0.5 +  camion.x),unidadCuadroAlto*(-0.5+camion.y),
                                                unidadCuadroAncho,unidadCuadroAlto);
                        clockActual=props.tiempo;
                        ctx.stroke();
                        break;
                    }


                    // if(i+1 <= elementosCamiones.length){
                    //     const nuevoPunto = elementosCamiones[i+1];
                    //     ctx.lineWidth = 1;
                    //     ctx.strokeStyle="black";

                    //     ctx.beginPath();
                    //     ctx.lineWidth = 4;
                    //     ctx.strokeStyle="green";
                    //     ctx.moveTo((camion.x )* unidadCuadroAncho, unidadCuadroAlto*(camion.y));
                    //     ctx.lineTo((nuevoPunto.x )* unidadCuadroAncho, unidadCuadroAlto*(nuevoPunto.y));

                    //     ctx.stroke();

                    //     ctx.lineWidth = 1;
                    //     ctx.strokeStyle="black";
                    // }

                    // if(camion.placa != idAnt){
                    //     ctx.beginPath();
                    //     ctx.moveTo((camion.x )* unidadCuadroAncho, unidadCuadroAlto*(camion.y));
                    //     idAnt = camion.placa;
                    // }else{
                    //     // c.strokeStyle="green";
                    //     ctx.lineTo((camion.x )* unidadCuadroAncho, unidadCuadroAlto*(camion.y));
                    //     ctx.stroke(); // Render the line
                    // }
    
                }
                // for (let i = 0; i < elementosCamiones.length; i++) {
                //     const camion = elementosCamiones[i];
                //     // let idAnt = 'aaa';
                //     let idAnt = 'aaa';
                //     let clockActual=0;

                //     if(camion.id != idAnt &&clockActual*72<props.tiempo && props.tiempo < camion.time*72 ){

                //         clockActual=Math.floor(props.tiempo/72);
                //         break;
                //     }
                //     // if(idAnt!=camion.placa && i+1 < elementosCamiones.length){
                //     //     const nuevoPunto = elementosCamiones[i+1];
                //     //     ctx.lineWidth = 1;
                //     //     ctx.strokeStyle="black";

                //     //     ctx.stroke();
                //     //     ctx.beginPath();
                //     //     ctx.lineWidth = 4;
                //     //     ctx.strokeStyle="green";
                //     //     ctx.moveTo((camion.x )* unidadCuadroAncho, unidadCuadroAlto*(camion.y));
                //     //     ctx.lineTo((nuevoPunto.x )* unidadCuadroAncho, unidadCuadroAlto*(nuevoPunto.y));

                //     //     ctx.stroke();

                //     //     ctx.lineWidth = 1;
                //     //     ctx.strokeStyle="black";
                //     //     idAnt = camion.placa;
                //     // }
                //     // ctx.beginPath();
                //     // ctx.stroke();
                // }
            }



        }
        
        animate();

    }, [dimensions,props.tiempo]);
    
    

    return <canvas ref={canvasRef} {...props} />;
};

export default MapGrid2;