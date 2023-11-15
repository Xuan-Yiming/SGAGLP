import React, { useEffect, useState,useRef  } from 'react';
import '../hojas-estilo/PedidosPrincipal.css';
import axios from 'axios';
import { Button, Modal } from "react-bootstrap";
import TablaPedidos from './TablaPedidos.jsx';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

export function PedidosPrincipal() {
    
    const [query, setQuery] = useState('');
    const [mostrarModal, setmostrarModal] = useState(false);
    const [editable, setEditable] = useState(false);
    const [flagActualizar, setFlagActualizar] = useState(false);

    const dataPedidos = [
        { id:'P1', cantidad: 4.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',x:4,y:5,estado: 1},
        { id:'P2', cantidad: 12.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:6,y:30,estado: 0},
        { id:'P3', cantidad: 8.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:7,y:15,estado: 1},
        { id:'P4', cantidad: 7.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:12,y:35,estado: 0},
        { id:'P5', cantidad: 4.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:15,y:25,estado: 1},
        { id:'P6', cantidad: 3.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:4,y:5,estado: 0},
        { id:'P7', cantidad: 1.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:1,y:4,estado: 0},
        { id:'P8', cantidad: 18.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:5,y:8,estado: 1},
        { id:'P9', cantidad: 4.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',x:4,y:5,estado: 1},
        { id:'P11', cantidad: 12.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:6,y:30,estado: 0},
        { id:'P12', cantidad: 8.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:7,y:15,estado: 1},
        { id:'P13', cantidad: 7.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:12,y:35,estado: 0},
        { id:'P14', cantidad: 4.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:15,y:25,estado: 1},
        { id:'P15', cantidad: 3.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:4,y:5,estado: 0},
        { id:'P16', cantidad: 1.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:1,y:4,estado: 0},
        { id:'P17', cantidad: 18.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:5,y:8,estado: 1},
        { id:'P18', cantidad: 4.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',x:4,y:5,estado: 1},
        { id:'P19', cantidad: 12.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:6,y:30,estado: 0},
        { id:'P20', cantidad: 8.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:7,y:15,estado: 1},
        { id:'P21', cantidad: 7.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:12,y:35,estado: 0},
        { id:'P22', cantidad: 4.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:15,y:25,estado: 1},
        { id:'P23', cantidad: 3.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:4,y:5,estado: 0},
        { id:'P24', cantidad: 1.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:1,y:4,estado: 0},
        { id:'P25', cantidad: 18.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:5,y:8,estado: 1},
        { id:'P26', cantidad: 4.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',x:4,y:5,estado: 1},
        { id:'P27', cantidad: 12.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:6,y:30,estado: 0},
        { id:'P28', cantidad: 8.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:7,y:15,estado: 1},
        { id:'P29', cantidad: 7.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:12,y:35,estado: 0},
        { id:'P31', cantidad: 4.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:15,y:25,estado: 1},
        { id:'P32', cantidad: 3.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:4,y:5,estado: 0},
        { id:'P33', cantidad: 1.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:1,y:4,estado: 0},
        { id:'P34', cantidad: 18.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:5,y:8,estado: 1},
        { id:'P35', cantidad: 4.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',x:4,y:5,estado: 1},
        { id:'P36', cantidad: 12.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:6,y:30,estado: 0},
        { id:'P37', cantidad: 8.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:7,y:15,estado: 1},
        { id:'P38', cantidad: 7.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:12,y:35,estado: 0},
        { id:'P39', cantidad: 4.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:15,y:25,estado: 1},
        { id:'P40', cantidad: 3.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:4,y:5,estado: 0},
        { id:'P41', cantidad: 1.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:1,y:4,estado: 0},
        { id:'P42', cantidad: 18.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:5,y:8,estado: 1},
        { id:'P43', cantidad: 18.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:5,y:8,estado: 1}
        // Add more data as needed
    ];

    // const elementosPorPagina = 10;
    let [dataPedidosProcesada, setdataPedidosProcesada] = useState([]);
    // const totalPaginas = Math.ceil(dataPedidosProcesada.length / elementosPorPagina);
    // const [paginaActual, setPaginaActual] = useState(0);

    
    // const indicePrimerElemento = paginaActual * elementosPorPagina;
    // const indiceUltimoElemento = indicePrimerElemento + elementosPorPagina;
    // const [elementos, setElementos] = useState([]);

    // // Obtener los elementos de la página actual
    // var elementosPaginaActual = elementos.slice(
    //     indicePrimerElemento,
    //     indiceUltimoElemento
    // );


    // function cambiarPagina(numeroPagina) {
    //     setPaginaActual(numeroPagina.selected);
    // }
    useEffect(() => {
        // getDataCamiones()
        cargarDataPedidos();
        setFlagActualizar(true);
        console.log(dataPedidosProcesada.length);
    }, []);

    const cargarDataPedidos = async () => {
        console.log(dataPedidos.length);

        let Contenedor =[];

        for (let i = 0; i < dataPedidos.length; i++) {
            let item =[];

            item.id = dataPedidos[i].id;
            item.cantidad = dataPedidos[i].cantidad;
            item.fecha = dataPedidos[i].fecha;
            item.hora = dataPedidos[i].hora;
            item.horaLlegada = dataPedidos[i].horaLlegada;
            item.coordenadas = '('+dataPedidos[i].x + ','+dataPedidos[i].y+')';
            item.estado = dataPedidos[i].estado;

            Contenedor.push(item);
            
        }
        setdataPedidosProcesada(Contenedor);
        
    }



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
                    <TablaPedidos columns={columnasPedidos} data={dataPedidosProcesada} longitud = {Math.ceil(dataPedidosProcesada.length/10)}/>                
                    {/* <Table className="tablaF" bordered hover>
                            <thead>
                                <tr className="ColumnaAAA">
                                    <th className="CodigoAAA">Cantidad</th>
                                    <th className="NombreAAA">Fecha</th>
                                    <th className="CorreoAAA">Hora</th>
                                    <th className="CorreoSecAAA">Coordenadas</th>
                                    <th className="CelularAAA">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataPedidos.map(e => (
                                    // { id:'P3', cantidad: 8.0,fecha:'2023/08/04',hora:'11:08:09',horaLlegada:'11:08:09',  x:7,y:15,estado: 1},
                                    <tr key={e.id}>
                                        <td className="filaAAA">{e.cantidad}</td>
                                        <td className="filaAAA">{e.fecha} </td>
                                        <td className="filaAAA">{e.hora}</td>
                                        <td className="filaAAA">{e.horaLlegada}</td>
                                        <td className="filaAAA">{e.coordenadas}</td>
                                        <td className="filaAAA">{e.estado}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table> */}
                </div>
                {/* <div className="contenedorPaginacionAAA">
                    <ReactPaginate
                        previousLabel={'<'}
                        previousLinkClassName={'my-previous-button'}
                        nextLabel={'>'}
                        nextLinkClassName={'my-next-button'}
                        breakLabel={'...'}
                        pageCount={totalPaginas}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={cambiarPagina}
                        containerClassName={'pagination'}
                        activeClassName={'activePage'}
                        pageClassName={"my-page-class"}
                        pageLinkClassName={"my-page-link-class"}
                        previousClassName={"my-previous-class"}
                        nextClassName={"my-next-class"}
                    />
                </div> */}

            </div>
        </div>
    );
}

export default PedidosPrincipal;