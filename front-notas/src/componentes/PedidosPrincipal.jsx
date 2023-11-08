import React, { useEffect, useState,useRef  } from 'react';
import '../hojas-estilo/PedidosPrincipal.css';
import axios from 'axios';

export function PedidosPrincipal() {
    


    return (
        <div className='principalPedidos'>
            <div className='tituloPedidos'>
                <div className='tituloPedidosIzq'>
                    <h1>Pedidos</h1>
                </div>
                <div className='tituloPedidosDer'>
                    <div className='seccionBotonesPedidos'>
                        <div className='botonIzqPedidos'>

                        </div>
                        <div className='botonDerPedidos'>

                        </div>
                    </div>
                </div>
            </div>

            <div className='buscadorPedidos'>
                <div className='contendorBuscador'>
                    <div className='mitadContenedorBuscador'>
                        <div className='mitadBuscadorIzq'>
                            Que estas bucando?
                            
                        </div>
                        <div className='mitadBuscadorDer'>
                            
                        </div>
                    </div>
                </div>

            </div>
            <div className='principalTabla'>
                <div className='contenedorTablaPedidos'> 

                </div>

            </div>
        </div>
    );
}

export default PedidosPrincipal;