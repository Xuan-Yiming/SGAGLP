import "../HojasDeEstilo/ResFacuGestionRep.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../HojasDeEstilo/Reusable/FormBuscar.css";
// import { Table } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addDatosCuenta, addRoles, addNombreCuenta, addApellidoPCuenta, addApellidoMCuenta, addFoto } from "../Redux/CuentaSlice";
import { addDatosEspecialidad } from "../Redux/EspecialidadSlice";
import { Modal, Button } from 'react-bootstrap';
import { getData, columns, formatRowData } from "./DataEspecialidad";
import Table from "./TablaCuentas";
import Pagination from "../componentes/pagination/pagination";
import { useLocalStorage } from './useLocalStorage';

export default function ResFacuGestionRep(props) {
    let valor;
    const [cookies, setCookie] = useCookies();
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [mostrarModal, setmostrarModal] = useState(false);
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);
    const [botonHabilitado, setBotonHabilitado] = useState(false);

    const [flagActualizar, setFlagActualizar] = useState(false);

    const [textoBusqueda, setTextoBusqueda] = useState("");

    const [data, setData] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [flagCheckeo, setFlagCheckeo] = useState(false);

    const dispatch = useDispatch();

    const datosCuenta = useSelector((state) => state.Cuenta);
    const [id, setId] = useLocalStorage("id");

    var [elementos, setElementos] = useState([{}]);

    /* Posible creacion de slice Espacio, falta ver si sera necesario
    useEffect(() => {
        let Espacio = {
            idEspacio: "",
            codigo: "",
            descripcion: "",
            rubricas: [],
            indicadores:[]
        };
        dispatch(addDatosIndicadores(Indicador));
    }, []);
    */

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
                    correo: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Especialidad.idEspecialidad)}>{Especialidad.correo}</div>,
                    fechacreacion: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Especialidad.idEspecialidad)}>{Especialidad.fechaCreacion.substr(8, 2) + "/" + Especialidad.fechaCreacion.substr(5, 2) + "/" + Especialidad.fechaCreacion.substr(0, 4)}</div>,
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
        /* Sin implmentar no creo q se tenga q
    
    
        console.log("Galleta:")
        console.log(cookies.jwt)
    
        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
    
        const data = new Set(seleccionados);
        const objetoJSON = {};
    
        data.forEach(id => {
            objetoJSON[id] = true;
        });
    
        console.log("valores json");
        console.log(objetoJSON);
    
        try {
            const respuesta = await axios.post("http://localhost:3050/api/usuario/habilitarUsuario", objetoJSON, config);
    
            console.log(respuesta.data);
    
            setmostrarModal2(false);
            props.cambiarComponente2(false);
            setFlagActualizar(!flagActualizar);
            // setCurrentPage(currentPage);
            // flagBusqueda=!flagBusqueda;
            // obtenerNuevosDatos();
            // const boton=document.getElementById("boton-buscar-gc");
            // boton.click();
    
    
        } catch (error) {
    
            console.log(error)
        }
        */
    }

    const handleModalAceptarEliminar = async () => {


        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = new Set(seleccionados);
        const objetoJSON = {};

        data.forEach(id => {
            objetoJSON[id] = true;
        });

        console.log("valores json");
        console.log(objetoJSON);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/especialidad/deshabilitarEspecialidad", objetoJSON, config);

            console.log(respuesta.data);

            setmostrarModal(false);
            //props.cambiarComponente2(false);
            setFlagActualizar(!flagActualizar);
            //setCurrentPage(currentPage);
            // flagBusqueda=!flagBusqueda;
            // obtenerNuevosDatos();
            // const boton=document.getElementById("boton-buscar-gc");
            // boton.click();


        } catch (error) {

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


    const handleModalEliminar = () => {

    }

    const handleButtonFila = async (idEnviado) => {

        //console.log("Galleta:")
        //console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            idEspecialidad: idEnviado
        }
        console.log(idEnviado);

        console.log("configuracion:")
        console.log(config);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/especialidad/mostrarDetalleEspecialidad", data, config);
            console.log(respuesta.data.data[0])
            dispatch(addDatosEspecialidad(respuesta.data.data[0]));
        } catch (error) {
            console.log(error)
        }

        props.cambiarComponenteAniadirEspecialidad(false);
        props.cambiarComponenteAniadirResEspecialidad(false);
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
                    correo: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Especialidad.idEspecialidad)}>{Especialidad.correo}</div>,
                    fechacreacion: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Especialidad.idEspecialidad)}>{Especialidad.fechaCreacion.substr(8, 2) + "/" + Especialidad.fechaCreacion.substr(5, 2) + "/" + Especialidad.fechaCreacion.substr(0, 4)}</div>,
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
            <br></br>
            <div className="barraSuperiorGM">
                <div className="contenedorBarraGM">
                    <form className="input-groupBuscar ">
                        <input className="form-controlBuscar" type="search" placeholder="Buscar por código o nombre de creador" aria-label="Buscar" onChange={handleCambio} value={textoBusqueda} />
                        <div className="input-group-appendBuscar m-0">
                            <button className="btn m-0 border-end border-top border-bottom borde-izquierdo-cuadrado" id="boton-buscar-gc" onClick={obtenerNuevosDatos}><i className="bi bi-search" ></i></button>
                        </div>
                    </form>
                </div>
                {/*
                <div className="botonesSuperioresGM">
                    <div className="btnAniadirGM">
                        <button type="button" className="btn btn-primary" onClick={handleButtonAñadir} >
                            Añadir
                        </button>
                    </div>
                    <div className="btnEliminarGM">
                        <button type="button" className="btnEliminarGM btn btn-danger"
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                            onClick={handleButtonEliminar} style={{ background: botonHabilitado ? '#9E0520' : '#9E0520' }}>
                            Eliminar
                        </button>
                        <Modal show={mostrarModal} onHide={handleModalEliminar}>
                            <Modal.Body >
                                <p>¿Está seguro que desea deshabilitar las especialidades seleccionadas?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="button" className="botonCancelarGM btn btn-danger" onClick={handleModalCancelar}>
                                    Cancelar</Button>
                                <Button className="botonAceptarGM" onClick={handleModalAceptarEliminar}>
                                    Aceptar</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                */}
            </div>
            <br />

            <div className="espacioTabla">
                <p>Especialidades encontradas: {pageData.totalPassengers || "No hay resultados para su busqueda"}</p>
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
        </div >
    );
}
