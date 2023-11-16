import React, { useEffect, useState } from 'react';
import '../hojas-estilo/MenuContenedor.css';
import ExpandableMenu from './ExpandableMenu';
import PlanificacionPrincipal from './PlanificacionPrincipal';
import SimulacionPrincipal from './SimulacionPrincipal';
import PedidosPrincipal from './PedidosPrincipal';
import ContenedorHtml from './ContenedorHtml'


export function MenuContenedor() {

    const [bandera,setBandera]=useState(true);
    const [bandera2,setBandera2]=useState(false);
    const [bandera3,setBandera3]=useState(false);
    const [bandera4,setBandera4]=useState(false);


    return (
        <div className='superContenedor'> 
            
            <div className='totalMenuPrincipal'>
                
                <div className='contenedorTrabajo'>
                    {bandera?<PlanificacionPrincipal  />:
                    bandera2?<PedidosPrincipal  />:
                    bandera3?<ContenedorHtml  />:
                    bandera4?<SimulacionPrincipal  />:
                    <SimulacionPrincipal/>}
                </div>

            </div>

            <ExpandableMenu cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarComponente3={setBandera3} cambiarComponente4={setBandera4}/>
        </div>
    );
}

export default MenuContenedor;