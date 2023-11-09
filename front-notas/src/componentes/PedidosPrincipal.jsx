import React, { useEffect, useState,useRef  } from 'react';
import '../hojas-estilo/PedidosPrincipal.css';
import axios from 'axios';
import { Button, Modal } from "react-bootstrap";

export function PedidosPrincipal() {
    
    const [query, setQuery] = useState('');
    const [mostrarModal, setmostrarModal] = useState(false);
    const [editable, setEditable] = useState(false);

    const handleSearch = () => {
        // const filteredResults = data.filter(item =>
        //   item.name.toLowerCase().includes(query.toLowerCase())
        // );
        // setResults(filteredResults);
      }

      
    const handleModalClose = () => {
        setmostrarModal(false);
        setEditable(false);
        /*
        setDescripcion(datosCompetencia.descripcionCompetencia);
        setEvidencia(datosCompetencia.evidenciaCompetencia);
        */
    };
    const handleModalAceptar = async () => {



    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    };


    const crearNuevoPedido = async (event) => {
        setmostrarModal(true);
    };

    return (
        <div className='principalPedidos'>
            <div className='tituloPedidos'>
                <div className='tituloPedidosIzq'>
                    <h1>Pedidos</h1>
                </div>
                <div className='tituloPedidosDer'>
                    <div className='seccionBotonesPedidos'>
                        <div className='botonIzqPedidos'>
                            <button >Carga Masiva</button>
                        </div>
                        <div className='botonDerPedidos'>
                            <button onClick={crearNuevoPedido}>Nuevo Pedido</button>
                            <Modal show={mostrarModal} onClose={handleModalClose}>
                                <div className='botonModalCerrar'>
                                    <button onClick={handleModalClose}>X</button>
                                </div>
                                <h2>Modal Content</h2>
                                <p>This is a simple modal example.</p>
                            </Modal>
                        </div>

                    </div>
                </div>
            </div>

            <div className='buscadorPedidos'>
                <div className='contendorBuscador'>
                    <div className='mitadContenedorBuscador'>
                        <div className='mitadBuscadorIzq'>
                            <div>Que estas bucando?</div>
                            <div className='buscadorQuery'>
                                <input
                                    type="text"
                                    placeholder="Buscar productos"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button onClick={handleSearch}>Buscar</button>
                            </div>
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