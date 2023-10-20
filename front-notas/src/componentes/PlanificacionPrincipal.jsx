import React, { useEffect, useState } from 'react';
import '../hojas-estilo/PlanificacionPrincipal.css';


export function PlanificacionPrincipal() {

    return (
        <div className='principalPlanificacion'>
            <div className='principalPlanificacionIzq'>

                <div className='PlanificacicionTitulo'></div>
                <div className='PlanifiacionMapa'></div>
                <div className='PlanificacionBotones'></div>
            </div>
            <div className='principalPlanificacionDer'>
                <div className='PlanificacionBotonesDer'></div>
                <div className='PlanificacionTablaPedidos'></div>
                <div className='PlanificacionResumen'></div>
                <div className=''></div>
            </div>
        </div>
    );
}

export default PlanificacionPrincipal;