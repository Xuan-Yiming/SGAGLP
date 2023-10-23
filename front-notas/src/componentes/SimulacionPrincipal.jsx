import React, { useEffect, useState,useRef  } from 'react';
import '../hojas-estilo/SimulacionPrincipal.css';
import Canvas from '../canvas-resize/CanvasPrime.js';
import MapaGrid from '../canvas-resize/MapaGrid.jsx';
import MapaGrid2 from '../canvas-resize/MapaGrid2.jsx';

export function SimulacionPrincipal() {
    const divRef = useRef();
    let divWidth = null; // Variable para almacenar el ancho del div
    let divHeight = null;

    const draw = (context,count)=>{
        // context.clearRect(0,0,context.canvas.width,context.canvas.height);
        // // context.canvas.width = context.canvas.width;
        // context.fillStyle = 'grey';
    
        // const delta = count%800;
        // context.fillRect(10 + delta,10,100,100);

        

        // context.beginPath();
        const cuadrosAlto = 50;
        const cuadrosAncho = 70;

        // Dibujar cuadrícula
        for (let x = 0; x < context.canvas.width; x += context.canvas.width / cuadrosAncho) {
            context.moveTo(x, 0);
            context.lineTo(x, context.canvas.height);
        }
        // context.lineTo(0,context.canvas.height);
        for (let y = 0; y < context.canvas.height; y += context.canvas.height / cuadrosAlto) {
            context.moveTo(0, y);
            context.lineTo(context.canvas.width, y);
        }
        // context.lineTo(context.canvas.width, 0);
        
        context.strokeStyle = "black";
        context.stroke();
        
    }

    const draw2 = (context,count)=>{
        context.clearRect(0,0,context.canvas.width,context.canvas.height);
        // context.canvas.width = context.canvas.width;
        context.fillStyle = 'grey';
    
        const delta = count%800;
        context.fillRect(100 + delta,100,200,100);
        
    }

    useEffect(() => {
        if (divRef.current) {
          // Accede al ancho actual del div a través de clientWidth
          divWidth = divRef.current.clientWidth;
          divHeight = divRef.current.clientHeight;
          console.log(`Ancho del div: ${divWidth}`,divWidth);
          console.log(`alto del div: ${divHeight}`);
        }
      }, []);

    return (
        <div className='principalSimulacion'>
            <div className='principalSimulacionIzq'>

                <div className='SimulacionLadoIzq'>
                    <div className='SimulacionTitulo'>
                        <h1>Simulacion</h1>
                    </div>
                    <div className='SimulacionMapa' ref={divRef}>
                        {/* <Canvas className='mapaSimulado'  draw = {draw} draw2 ={null} width='100%' height ='100%'/> */}
                        <MapaGrid2 ancho ={divWidth} alto ={divHeight}/>
                        {/* <Canvas className='mapaSimulado'  draw = {draw2} width='100%' height ='100%'/> */}
                        
                        {/* <div id="canvas-container" style={{ width: '100%', height: '100%' }}>
                            <Canvas className='mapaSimulado' id='canvas' draw = {draw} width='100%' height ='100%'/>
                        </div> */}


                    </div>
                </div>

            </div>
            <div className='principalSimulacionDer'>
                <div className='SimulacionLadoDer'>

                    <div className='SimulacionBotonesDer'></div>
                    <div className='SimulacionConfigurar'></div>
                    <div className='SimulacionResumen'></div>

                </div>
            </div>
        </div>
    );
}

export default SimulacionPrincipal;