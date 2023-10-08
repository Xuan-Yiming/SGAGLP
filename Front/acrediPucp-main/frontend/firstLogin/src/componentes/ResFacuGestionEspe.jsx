import "../HojasDeEstilo/ResFacuGestionEspe.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import { Table } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addDatosEspecialidad, resetEspecialidad } from "../Redux/EspecialidadSlice";

import { vaciarDatosAsistenteEspecialidad } from '../Redux/AsistenteEspecialidadSlice';
import { vaciarDatosResponsableEspecialidad } from '../Redux/ResponsableEspecialidadSlice';

import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';
import { getData, columns, formatRowData } from "./DataEspecialidad";
import Table from "./TablaCuentas";
import Pagination from "../componentes/pagination/pagination";
import { useLocalStorage } from './useLocalStorage';
import { ToastContainer, toast } from 'react-toastify';

export default function ResFacuGestionEspe(props) {
    let valor;
    const [cookies, setCookie] = useCookies();
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [mostrarModal, setmostrarModal] = useState(false);
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [mostrarModalHab, setmostrarModalHab] = useState(false);
    const [botonHabilitado, setBotonHabilitado] = useState(false);

    const [flagActualizar, setFlagActualizar] = useState(false);

    const [textoBusqueda, setTextoBusqueda] = useState("");

    const [data, setData] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [flagCheckeo, setFlagCheckeo] = useState(false);

    const dispatch = useDispatch();
    dispatch(vaciarDatosAsistenteEspecialidad());
    dispatch(vaciarDatosResponsableEspecialidad());

    const datosCuenta = useSelector((state) => state.Cuenta);

    var [elementos, setElementos] = useState([{}]);

    const [id, setId] = useLocalStorage("id");
    const [idEspecialidad, setidEspecialidad] = useLocalStorage("idEspecialidad","");

    useEffect(() => {
        dispatch(resetEspecialidad()); //limpia los datos de redux de la especialidad
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
        console.log("Galleta2:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            fidFacultad: id,
            codigoNombreEspecialidad: textoBusqueda,
            paginaSolicitar: currentPage,
        }
        //console.log("configuracion:")
        //console.log(config);

        //console.log(data);

        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Especialidad } = info;

            setPageData({
                isLoading: false,
                rowData: (Especialidad.map((Especialidad) => ({
                    seleccion: <input
                        className="checkboxGM"
                        type="checkbox"
                        id={Especialidad.idEspecialidad}
                        // checked={verificarCheck}
                        defaultChecked={seleccionados.includes(Especialidad.idEspecialidad)}
                        // onChange={handleCheckBoxChange}
                        onChange={(e) => toggleValue(e, Especialidad.idEspecialidad)}
                    />,
                    codigo: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Especialidad.idEspecialidad)}>{Especialidad.codigoEspecialidad}</div>,
                    nombre: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Especialidad.idEspecialidad)}>{Especialidad.nombreEspecialidad}</div>,
                    responsables: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Especialidad.idEspecialidad)}>{Especialidad.responsables}</div>,
                    estado: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Especialidad.idEspecialidad)}>{Especialidad.activo}</div>,
                }))),
                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });

    }, [currentPage, flagActualizar]);

    const validarCampos = () => {
        if (seleccionados.length > 0) {
            setBotonHabilitado(true);
            valor = 1;
        } else {
            setBotonHabilitado(false);
            valor = 0;
        }
        return valor;
    };

    const handleModalAceptarHabilitar = async () => {
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {

            idEspecialidades: seleccionados

        }

        console.log(data);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/especialidad/reactivarEspecialidad", data, config);

            console.log(respuesta.data);

            setmostrarModalHab(false);
            setFlagActualizar(true);
            setSeleccionados([]);
            setFlagBusqueda(!flagBusqueda);
            if (respuesta.data.success) {
                toast.success('Especialidad(es) habilitada(s).', {
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

    const handleModalAceptarEliminar = async () => {


        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {

            Especialidades: seleccionados

        }

        console.log(data);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/especialidad/deshabilitarEspecialidad", data, config);

            console.log(respuesta.data);

            setmostrarModal(false);
            setFlagActualizar(true);
            setSeleccionados([]);
            setFlagBusqueda(!flagBusqueda);
            if (respuesta.data.success) {
                toast.success('Especialidad(es) deshabilitada(s).', {
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
    };

    const handleModalCancelar = () => {
        setmostrarModal(false);
        setFlagActualizar(true);
    };

    const handleModalCancelarHab = () => {
        setmostrarModalHab(false);
        setFlagActualizar(true);
    };

    const handleModalClose = () => {
        setmostrarModal(false);
    };


    const handleModalEliminar = () => {

    }

    const handleModalHabilitar = () => {

    }

    const handleButtonFila = async (idEnviado) => {

        //console.log("Galleta:")
        //console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        setidEspecialidad(idEnviado);

        const data = {
            idEspecialidad: idEnviado
        }
        console.log(idEnviado);

        console.log("configuracion:")
        console.log(config);
        console.log(idEnviado);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/especialidad/mostrarDetalleEspecialidad", data, config);
            let Especialidad = {
                idEspecialidad: idEnviado,
                codigoEspecialidad: respuesta.data.Especialidad[0].codigoEspecialidad,
                nombreEspecialidad: respuesta.data.Especialidad[0].nombreEspecialidad,
                correoEspecialidad: respuesta.data.Especialidad[0].correoEspecialidad,
            }
            dispatch(addDatosEspecialidad(Especialidad));
        } catch (error) {
            console.log(error)
        }

        props.cambiarComponenteAniadirEspecialidad(false);
        props.cambiarComponenteAniadirResEspecialidad(false);
        props.cambiarComponenteAniadirAsisEspecialidad(false);
        props.cambiarComponenteVerDetalleEspecialidad(true);

    }

    useEffect(() => {
        setPageData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: true,
        }));
        console.log("Galleta1:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            fidFacultad: id,
            codigoNombreEspecialidad: textoBusqueda,
            paginaSolicitar: currentPage,
        }
        //console.log("configuracion:")
        //console.log(config);

        //console.log(data);
        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Especialidad } = info;
            setCurrentPage(1);
            setPageData({
                isLoading: false,
                rowData: (Especialidad.map((Especialidad) => ({
                    seleccion: <input
                        className="checkboxGM"
                        type="checkbox"
                        id={Especialidad.idEspecialidad}
                        // checked={verificarCheck}
                        defaultChecked={seleccionados.includes(Especialidad.idEspecialidad)}
                        // onChange={handleCheckBoxChange}
                        onChange={(e) => toggleValue(e, Especialidad.idEspecialidad)}
                    />,
                    codigo: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Especialidad.idEspecialidad)}>{Especialidad.codigoEspecialidad}</div>,
                    nombre: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Especialidad.idEspecialidad)}>{Especialidad.nombreEspecialidad}</div>,
                    responsables: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Especialidad.idEspecialidad)}>{Especialidad.responsables}</div>,
                    estado: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Especialidad.idEspecialidad)}>{Especialidad.activo}</div>,
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
        props.cambiarComponenteAniadirEspecialidad(true);
        props.cambiarComponenteAniadirResEspecialidad(false);
        props.cambiarComponenteVerDetalleEspecialidad(false);
    };

    const handleButtonEliminar = async () => {

        valor = validarCampos();
        if (valor) {
            setmostrarModal(true);
        } else {
            setmostrarModal(false);
        }

    };

    const handleButtonHabilitar = async () => {
        valor = validarCampos();
        if (valor) {
            setmostrarModalHab(true);
        } else {
            setmostrarModalHab(false);
        }
    }

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

        <div className="contenedorTablaGM">
            
            <div className="barraSuperiorGM">
                <div className="contenedorBarraGM">
                    <form className="input-groupBuscar ">
                        <input className="form-controlBuscar" type="search" placeholder="Buscar por código o nombre de especialidad" aria-label="Buscar" onChange={handleCambio} value={textoBusqueda} />
                        <div className="input-group-appendBuscar m-0">
                            <button className="btn m-0 border-end border-top border-bottom borde-izquierdo-cuadrado" id="boton-buscar-gc" onClick={obtenerNuevosDatos}><i className="bi bi-search" ></i></button>
                        </div>
                    </form>
                </div>
                <div className="contenedorBotonesConBusc">
                    <div className="btnDivDisenio btnAnadCont">
                        <button type="button" className="btnDisenio btnAniadirGE" onClick={handleButtonAñadir} >
                            Añadir
                        </button>
                    </div>
                    <div className="btnDivDisenio">
                        <Modal show={mostrarModal} onHide={handleModalEliminar}>
                            <Modal.Body >
                                <p>¿Está seguro que desea deshabilitar las especialidades seleccionadas?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="button" className="botonModal btnDisenio botonCancelarGM " onClick={handleModalCancelar}>
                                    Cancelar</Button>
                                <Button className="botonModal btnDisenio botonAceptarGM" onClick={handleModalAceptarEliminar}>
                                    Aceptar</Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={mostrarModalHab} onHide={handleModalHabilitar}>
                            <Modal.Body >
                                <p>¿Está seguro que desea habilitar las especialidades seleccionadas?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="button" className="botonModal btnDisenio botonCancelarGM " onClick={handleModalCancelarHab}>
                                    Cancelar</Button>
                                <Button className="botonModal btnDisenio botonAceptarGM" onClick={handleModalAceptarHabilitar}>
                                    Aceptar</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
            <br />
            <p className="encontrLabel">Especialidades encontradas: {pageData.totalPassengers || "No hay resultados para su busqueda"}</p>
            <div className="espacioTabla">
                
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
                        <div className="contenedorTablaGM" style={{ width: "100%", height: "510px" }}>
                            <Table
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
            <div className="botonesRFGE contenedorBotonesConBusc">
                <button className="btnHabilitarGE btnDisenio" type="button"
                    data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                    onClick={handleButtonHabilitar} 
                    style={seleccionados.length == 0?{backgroundColor:'gray'}:{}}
                    disabled={seleccionados.length == 0?true:false}>
                    Habilitar
                </button>
                <button type="button" className="btnEliminarGE btnDisenio btn-danger"
                    data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                    onClick={handleButtonEliminar} 
                    style={seleccionados.length == 0?{backgroundColor:'gray'}:{}}
                    disabled={seleccionados.length == 0?true:false}>
                    Deshabilitar
                </button>
            </div>
        </div >
    );
}
