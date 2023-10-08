import "../HojasDeEstilo/AdminGestionFacultades.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/FormBuscar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Table } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';

import { addDatosAsistenteFacultad, vaciarDatosAsistenteFacultad } from '../Redux/AsistenteFacultadSlice';
import { addDatosResponsableFacultad, vaciarDatosResponsableFacultad } from '../Redux/ResponsableFacultadSlice';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addDatosFacultad, resetFacultad } from "../Redux/FacultadSlice";

import { Modal, Button } from 'react-bootstrap';
import { getData, columns, formatRowData } from "./DataFacultades";
import Table from "./TablaCuentas";
import Pagination from "../componentes/pagination/pagination";

export default function AdminGestionFacultades(props) {

    const [cookies, setCookie] = useCookies();
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [mostrarModal, setmostrarModal] = useState(false);
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);

    const [flagActualizar, setFlagActualizar] = useState(false);

    const [textoBusqueda, setTextoBusqueda] = useState("");

    const [data, setData] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [flagCheckeo, setFlagCheckeo] = useState(false);

    /****************** REDUX********************** */
    const dispatch = useDispatch();

    dispatch(vaciarDatosAsistenteFacultad());
    dispatch(vaciarDatosResponsableFacultad());
    /******************FIN DEL REDUX********************** */

    var [elementos, setElementos] = useState([{}]);

    useEffect(() => {
        dispatch(resetFacultad());
    }, []);

    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
        totalPages: 0,
        totalPassengers: 0,
    });

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setPageData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: true,
        }));
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            codigoNombreFacultad: textoBusqueda,
            paginaSolicitar: currentPage,
        }
        //console.log("configuracion:")
        //console.log(config);

        //console.log(data);

        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Facultad } = info;

            setPageData({
                isLoading: false,
                rowData: (Facultad.map((Facultad) => ({
                    seleccion: <input
                        className="checkboxAGF"
                        type="checkbox"
                        id={Facultad.idFacultad}
                        // checked={verificarCheck}
                        defaultChecked={seleccionados.includes(Facultad.idFacultad)}
                        // onChange={handleCheckBoxChange}
                        onChange={(e) => toggleValue(e, Facultad.idFacultad)}
                    />,
                    codigo: <div className="seleccionableGF miTablaGF" onClick={() => handleButtonFila(Facultad.idFacultad)}>{Facultad.codigoFacultad}</div>,
                    nombre: <div className="seleccionableGF miTablaGF" onClick={() => handleButtonFila(Facultad.idFacultad)}>{Facultad.nombreFacultad}</div>,
                    responsables: <div className="seleccionableGF miTablaGF" onClick={() => handleButtonFila(Facultad.idFacultad)}>{Facultad.responsables}</div>,
                    estado: <div className="seleccionableGF miTablaGF" onClick={() => handleButtonFila(Facultad.idFacultad)}>{Facultad.activo}</div>,
                }))),
                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });

    }, [currentPage, flagActualizar]);


    const handleModalAceptarHabilitar = async () => {


        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {
            idFacultades: seleccionados,
        };
        console.log(data);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/facultad/habilitarFacultad", data, config);

            console.log(respuesta.data);

            setSeleccionados([]);
            setmostrarModal2(false);
            //props.cambiarComponente2(false);
            setFlagActualizar(!flagActualizar);
            // setCurrentPage(currentPage);
            // flagBusqueda=!flagBusqueda;
            // obtenerNuevosDatos();
            // const boton=document.getElementById("boton-buscar-gc");
            // boton.click();
            if (respuesta.data.success) {
                toast.success('Facultad(es) habilitada(s).', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }

        } catch (error) {
            toast.error('No hay conexión. Intente de nuevo.', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            console.log(error)
        }
    }


    const handleModalAceptarDeshabilitar = async () => {


        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {
            idFacultades: seleccionados,
        };
        console.log(data);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/facultad/deshabilitarFacultad", data, config);

            console.log(respuesta.data);

            setSeleccionados([]);
            setmostrarModal(false);
            // props.cambiarComponente2(false);
            setFlagActualizar(!flagActualizar);
            // setCurrentPage(currentPage);
            // flagBusqueda=!flagBusqueda;
            // obtenerNuevosDatos();
            // const boton=document.getElementById("boton-buscar-gc");
            // boton.click();
            if (respuesta.data.success) {
                toast.success('Facultad(es) deshabilitada(s).', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }

        } catch (error) {
            toast.error('No hay conexión. Intente de nuevo.', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            console.log(error)
        }
        setFlagBusqueda(!flagBusqueda);
    };

    const handleModalCancelar = () => {
        setmostrarModal(false);
        setmostrarModal2(false);
        setFlagActualizar(true);

        // setTextoBoton("Editar");
        // setEditable(false);
        // setColor("#F2F7F9");
        // setColorTexto("#7892A4");
    };

    const handleModalClose = () => {
        setmostrarModal(false);
    };


    const handleButtonFila = async (idEnviado) => {

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {
            idFacultad: idEnviado
        }

        try {
            const respuesta = await axios.post("http://localhost:3050/api/facultad/mostrarDetalleFacultad", data, config);
            let Facultad = {
                idFacultad: idEnviado,
                codigoFacultad: respuesta.data.Facultad[0].codigoFacultad,
                nombreFacultad: respuesta.data.Facultad[0].nombreFacultad,
                correoFacultad: respuesta.data.Facultad[0].correoFacultad,
                tieneEspecialidad: respuesta.data.Facultad[0].tieneEspecialidad,
            }
            dispatch(addDatosFacultad(Facultad));
        } catch (error) {
            console.log(error)
        }

        props.cambiarComponenteAniadirFacultad(false);
        props.cambiarComponenteAniadirResFacultad(false);
        props.cambiarComponenteVerDetalleFacultad(true);

    }

    useEffect(() => {
        setPageData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: true,
        }));

        //console.log(textoBusqueda)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            codigoNombreFacultad: textoBusqueda,
            paginaSolicitar: currentPage,
        }
        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Facultad } = info;
            setCurrentPage(1)
            setPageData({
                isLoading: false,
                rowData: (Facultad.map((Facultad) => ({
                    seleccion: <input
                        className="checkboxAGF"
                        type="checkbox"
                        id={Facultad.idFacultad}
                        defaultChecked={seleccionados.includes(Facultad.idFacultad)}
                        //checked={verificarCheck}
                        //onChange={handleCheckBoxChange(Facultad.idFacultad)}
                        onChange={(e) => toggleValue(e, Facultad.idFacultad)}

                    />,
                    codigo: <div className="seleccionableGF miTablaGF" onClick={() => handleButtonFila(Facultad.idFacultad)}>{Facultad.codigoFacultad}</div>,
                    nombre: <div className="seleccionableGF miTablaGF" onClick={() => handleButtonFila(Facultad.idFacultad)}>{Facultad.nombreFacultad}</div>,
                    responsables: <div className="seleccionableGF miTablaGF" onClick={() => handleButtonFila(Facultad.idFacultad)}>{Facultad.responsables}</div>,
                    estado: <div className="seleccionableGF miTablaGF" onClick={() => handleButtonFila(Facultad.idFacultad)}>{Facultad.activo}</div>,
                }))),
                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });
    }, [flagBusqueda]);


    // Estado para almacenar la página actual
    var [paginaActual, setPaginaActual] = useState(0);
    // Cantidad de elementos por página
    var elementosPorPagina = 10;

    // Cálculo del índice del primer y último elemento de la página actual
    var indicePrimerElemento = paginaActual * elementosPorPagina;
    var indiceUltimoElemento = indicePrimerElemento + elementosPorPagina;

    // Obtener los elementos de la página actual
    var elementosPaginaActual = elementos.slice(
        indicePrimerElemento,
        indiceUltimoElemento
    );

    // Total de páginas
    var totalPaginas = Math.ceil(elementos.length / elementosPorPagina);

    // Función para cambiar la página actual
    function cambiarPagina(numeroPagina) {
        setPaginaActual(numeroPagina.selected);
    }

    const handleButtonAñadir = () => {
        setColor("#FFFFFF");
        setColorTexto("#000000");
        props.cambiarComponenteAniadirFacultad(true);
    };
    const handleButtonHabilitar = () => {
        setmostrarModal2(true);

    };
    const handleButtonDeshabilitar = () => {

        setmostrarModal(true);

    };
    const handleCambio = async (e) => {
        setTextoBusqueda(e.target.value);
    }


    const obtenerNuevosDatos = (e) => {
        e.preventDefault();
        setFlagBusqueda(!flagBusqueda);
        console.log(flagBusqueda);
    }

    let toggleValue = useCallback((event, id) => {
        if (event.target.checked) {
            setSeleccionados(value => [...value, id])
        } else {
            setSeleccionados(value => value.filter(it => it !== id))
        }
    }, [setSeleccionados])
    console.log(seleccionados)

    return (

        <div className="contenedorTablaAGF">
            
            <div className="barraSuperiorAGF">
                <div className="contenedorBarraAGF">
                    <form className="input-groupBuscar ">
                        <input className="form-controlBuscar" type="search" placeholder="Buscar por código o nombre" aria-label="Buscar" onChange={handleCambio} value={textoBusqueda} />
                        <div className="input-group-appendBuscar m-0">
                            <button className="btn m-0 border-end border-top border-bottom borde-izquierdo-cuadrado" id="boton-buscar-gc" onClick={obtenerNuevosDatos}><i className="bi bi-search" ></i></button>
                        </div>
                    </form>
                </div>
                <div className="contenedorBotonesConBusc">
                    <div className="btnDivDisenio">
                        <button className="btnAniadirAGF btnDisenio" onClick={handleButtonAñadir} >
                            Añadir
                        </button>
                    </div>
                </div>
            </div>
            <br />

            <p className="encontrLabel">Facultades Encontradas: {pageData.totalPassengers || "No hay resultados para su busqueda"}</p>
            <div className="espacioTablaAGF">

                {pageData.isLoading ? (
                    <div className="cargando d-flex flex-column align-items-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <br></br>
                        <p>  Cargando</p>
                    </div>


                ) : (
                    <>
                        {/* <button onClick={() => setCurrentPage(1)}>Reset</button> */}
                        <div className="contenedorTablaAGF" style={{ width: "100%", height: "100%" }}>
                            <Table
                                className="tablaAGF"
                                columns={columns}
                                data={pageData.rowData}
                                isLoading={pageData.isLoading}
                            />
                        </div>
                        <Pagination
                            totalRows={pageData.totalPassengers}
                            pageChangeHandler={setCurrentPage}
                            rowsPerPage={10}
                            currentPage={currentPage} />
                    </>)
                }
            </div>

            <div className="barraIntermediaAGF">
                <div className="btnDivDisenio">

                    <button className="btnHabilitarAGF btnDisenio" type="button"
                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                        onClick={handleButtonHabilitar}
                        style={seleccionados.length == 0?{backgroundColor:'gray'}:{}}
                        disabled={seleccionados.length == 0?true:false}>
                        Habilitar
                    </button>

                    <Modal show={mostrarModal2}>
                        <Modal.Body >
                            <p>¿Está seguro que desea habilitar las facultades seleccionadas?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="botonModal btnDisenio botonCancelarAGF" onClick={handleModalCancelar}>
                                Cancelar</Button>
                            <Button className="botonModal btnDisenio botonAceptarAGF" onClick={handleModalAceptarHabilitar}>
                                Aceptar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <div className="btnDivDisenio">

                    <button className="btnDeshabilitarAGF btnDisenio" type="button"
                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                        onClick={handleButtonDeshabilitar}
                        style={seleccionados.length == 0?{backgroundColor:'gray'}:{}}
                        disabled={seleccionados.length == 0?true:false}>
                        Deshabilitar
                    </button>

                    <Modal show={mostrarModal}>
                        <Modal.Body >
                            <p>¿Está seguro que desea deshabilitar las facultades seleccionadas?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" className="botonModal btnDisenio botonCancelarAGF" onClick={handleModalCancelar}>
                                Cancelar</Button>
                            <Button className="botonModal btnDisenio botonAceptarAGF" onClick={handleModalAceptarDeshabilitar}>
                                Aceptar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div >
    );
}
