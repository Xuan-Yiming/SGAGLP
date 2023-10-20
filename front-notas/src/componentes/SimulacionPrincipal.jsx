import React, { useEffect, useState } from 'react';
import '../hojas-estilo/SimulacionPrincipal.css';


export function SimulacionPrincipal() {

    return (
        <div className='principalSimulacion'>
            <div className='principalSimulacionIzq'>

                <div className='SimulacionLadoIzq'>
                    <div className='SimulacionTitulo'>
                        <h1>Simulacion</h1>
                    </div>
                    <div className='SimulacionMapa'>




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