import React, { useEffect, useState,useRef  } from 'react';
import '../hojas-estilo/PlanificacionPrincipal.css';
import MapaGrid2 from '../canvas-resize/MapaGrid2.jsx';
import axios from 'axios';

// import Canvas from ""


export function PlanificacionPrincipal() {

    const divRef = useRef();
    let divWidth = null; // Variable para almacenar el ancho del div
    let divHeight = null;
    useEffect(() => {
        // getDataCamiones()
          if (divRef.current) {
            // Accede al ancho actual del div a través de clientWidth
            divWidth = divRef.current.clientWidth;
            divHeight = divRef.current.clientHeight;
            console.log(`Ancho del div: ${divWidth}`,divWidth);
            console.log(`alto del div: ${divHeight}`);
          }
        }, []);



    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [speedMultiplier, setSpeedMultiplier] = useState(1);
    const [elementosCamiones,setElementosCamiones] = useState('');


    return (
        <div className='principalPlanificacion'>
            <div className='principalPlanificacionIzq'>

                <div className='PlanificacicionTitulo'>
                    <div className='BodyPlanificacionTitulo'>
                        <h1>Planificación dia a dia</h1>
                    </div>
                </div>
                <div className='PlanifiacionMapa'>
                <MapaGrid2 ancho ={divWidth} alto ={divHeight} tiempo={elapsedTime} elementosCamiones={elementosCamiones}/>

                </div>
                
                {/* <div className='PlanificacionBotonesIzq'></div> */}
            </div>
            <div className='principalPlanificacionDer'>
                <div className='PlanificacionBotonesDer'></div>
                <div className='PlanificacionTablaPedidos'></div>
                <div className='PlanificacionResumen'></div>
                {/* <div className=''></div> */}
            </div>
        </div>
    );
}

export default PlanificacionPrincipal;