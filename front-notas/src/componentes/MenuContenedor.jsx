import React, { useEffect, useState } from 'react';
import '../hojas-estilo/MenuContenedor.css';
import ExpandableMenu from './ExpandableMenu';
import PlanificacionPrincipal from './PlanificacionPrincipal';
import SimulacionPrincipal from './SimulacionPrincipal';


export function MenuContenedor() {

    const [bandera,setBandera]=useState(true);
    const [bandera2,setBandera2]=useState(false);
    const [bandera3,setBandera3]=useState(false);


    return (
        <div className='superContenedor'>
            
            <div className='totalMenuPrincipal'>
                
                <div className='contenedorTrabajo'>
                    {bandera?<SimulacionPrincipal cambiarComponente={setBandera} />:
                    bandera2?<PlanificacionPrincipal cambiarComponente={setBandera2} />:
                    <SimulacionPrincipal/>}
                </div>

            </div>

            <ExpandableMenu />
        </div>
    );
}

export default MenuContenedor;