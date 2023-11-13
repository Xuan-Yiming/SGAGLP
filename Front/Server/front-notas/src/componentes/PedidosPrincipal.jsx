import React, { useEffect, useState,useRef  } from 'react';
import '../hojas-estilo/PedidosPrincipal.css';
import axios from 'axios';
import { Button, Modal } from "react-bootstrap";
// import TablaPedidos from './componentes/TablaPedidos.jsx';


export function PedidosPrincipal() {
    
    const [query, setQuery] = useState('');
    const [mostrarModal, setmostrarModal] = useState(false);
    const [editable, setEditable] = useState(false);

    const dataPedidos = [
        { id:'P1', cantidad: 4.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',x:4,y:5,estado: 1},
        { id:'P2', cantidad: 12.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:6,y:30,estado: 0},
        { id:'P3', cantidad: 8.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:7,y:15,estado: 1},
        { id:'P4', cantidad: 7.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:12,y:35,estado: 0},
        { id:'P5', cantidad: 4.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:15,y:25,estado: 1},
        { id:'P6', cantidad: 3.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:4,y:5,estado: 0},
        { id:'P7', cantidad: 1.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:1,y:4,estado: 0},
        { id:'P8', cantidad: 18.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:5,y:8,estado: 1}
        // Add more data as needed
    ];

    let [dataPedidosProcesada, setdataPedidosProcesada] = useState([]);
     

    useEffect(() => {
        // getDataCamiones()
        for (let i = 0; i < dataPedidos.length; i++) {
            let item =[];

            item.id = dataPedidos[i].id;
            item.cantidad = dataPedidos[i].cantidad;
            item.fecha = dataPedidos[i].fecha;
            item.hora = dataPedidos[i].hora;
            item.horaLlegada = dataPedidos[i].horaLlegada;
            item.coordenadas = '('+dataPedidos[i].x + ','+dataPedidos[i].y+')';
            item.estado = dataPedidos[i].estado;

            dataPedidosProcesada.push(item);
            
        }
        console.log(dataPedidosProcesada);
    }, []);



    const columnasPedidos = [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Cantidad', accessor: 'cantidad' },
        { Header: 'Fecha', accessor: 'fecha' },
        { Header: 'Hora', accessor: 'hora' },
        { Header: 'Coordenadas', accessor: 'coordenadas' },
        { Header: 'Hora Llegada', accessor: 'horaLlegada' },
        { Header: 'Estado', accessor: 'estado' },
        // Add more columns as needed
        //{ id:'P1', cantidad: 4.0,fecha:'2023/08/04',hora:'11:08:09', x:4,y:5,estado: 1},
      ];



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
                    {/* <TablaPedidos columns={columnasPedidos} data={dataPedidosProcesada} />                 */}
                </div>

            </div>
        </div>
    );
}

export default PedidosPrincipal;