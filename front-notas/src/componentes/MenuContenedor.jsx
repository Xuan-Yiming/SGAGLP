import React, { useEffect, useState } from 'react';
import '../hojas-estilo/MenuContenedor.css';
import ExpandableMenu from './ExpandableMenu';


export function MenuContenedor() {

    return (
        <div>
            
            <div className='totalMenuPrincipal'>
                

            </div>

            <ExpandableMenu />
        </div>
    );
}

export default MenuContenedor;