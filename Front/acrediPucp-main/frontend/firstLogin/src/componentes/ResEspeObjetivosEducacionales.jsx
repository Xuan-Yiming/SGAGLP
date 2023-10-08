import "../HojasDeEstilo/ResEspeObjetivosEducacionales.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/InputValidacion.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
// import { Table } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';
import { useLocalStorage } from './useLocalStorage';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addDatosCuenta, addRoles, addNombreCuenta, addApellidoPCuenta, addApellidoMCuenta, addFoto } from "../Redux/CuentaSlice";

import { Modal, Button } from 'react-bootstrap';
import { getData, columns, formatRowData } from "./DataObjetivosEducacionales";
import Table from "./TablaCuentas";
import Pagination from "../componentes/pagination/pagination";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminGestionCuenta(props) {

    const [codigoObjetivoM, setCodigoObjetivoM] = useState("");
    const [codigoDescripcionM, setCodigoDescripcionM] = useState("");
    const [codigoSumillaM, setCodigoSumillaM] = useState("");
    const [idObjetivoM, setidObjetivoM] = useState("");

    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [codigoObjetivoNuevo, setCodigoObjetivoNuevo] = useState("");
    const [codigoDescripcionNuevo, setCodigoDescripcionNuevo] = useState("");
    const [codigoSumillaNuevo, setCodigoSumillaNuevo] = useState("");
    const [textoaviso, setTextoaviso] = useState("");

    const [cookies, setCookie] = useCookies();
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [mostrarModal, setmostrarModal] = useState(false);
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);
    const [mostrarModalAnadir, setmostrarModalAnadir] = useState(false);

    const [inputBorderObjetivo, setInputBorderObjetivo] = useState('#000000');
    const [inputBorderSumilla, setInputBorderSumilla] = useState('#000000');
    const [inputBorderDescripcion, setInputBorderDescripcion] = useState('#000000');
    const [colorBotonEliminar, setColorBotonEliminar] = useState("#9E0520");
    const [flagActualizar, setFlagActualizar] = useState(false);
    const [colorBoton, setColorBoton] = useState("#042354");
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [modalKey, setModalKey] = useState(0);
    const [data, setData] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [flagCheckeo, setFlagCheckeo] = useState(false);
    const [modalDetalleObjetivo, setmodalDetalleObjetivo] = useState(false);
    const datosCuenta = useSelector((state) => state.Cuenta);
    const [id, setId] = useLocalStorage("id");
    //
    const [modalOpen, setModalOpen] = useState(false);
    var bandera = false;

    const [flagIncompleto1, setFlagIncompleto1] = useState(false);
    const [flagIncompleto2, setFlagIncompleto2] = useState(false);
    const [flagIncompleto3, setFlagIncompleto3] = useState(false);

    useEffect(() => {
        if (seleccionados.length > 0) {
            setColorBotonEliminar("#9E0520"); // Cambia el color del botón a azul si está seleccionado   
        }else{
            setColorBotonEliminar("#ADADAD");
        }
    }, [seleccionados]);

    useEffect(() => {
        if(codigoObjetivoNuevo.trim().length !== 0 && 
        codigoDescripcionNuevo.trim().length !== 0 &&
        codigoSumillaNuevo.trim().length !== 0){
            setColorBoton("#042354");
        }else{
            setColorBoton("#ADADAD");
        }
        if(codigoObjetivoNuevo.trim().length !== 0){
            setInputBorderObjetivo('#000000');
        }
        if(codigoDescripcionNuevo.trim().length !== 0){
            setInputBorderDescripcion('#000000');
        }
        if(codigoSumillaNuevo.trim().length !== 0){
            setInputBorderSumilla('#000000');
        }
    }, [codigoObjetivoNuevo, codigoDescripcionNuevo,codigoSumillaNuevo]);

    const abrirModalObjetivo = () => {
        setmodalDetalleObjetivo(true);
    };

    const abrirModalAnadir = () => {
        setTextoaviso("");
        setmostrarModalAnadir(true);
    };

    const cerrarModalAnadir = async () => {
        if(codigoObjetivoNuevo.trim().length == 0){
            setInputBorderObjetivo("red");
        }
        if(codigoDescripcionNuevo.trim().length == 0){
            setInputBorderDescripcion("red");
        }
        if(codigoSumillaNuevo.trim().length == 0){
            setInputBorderSumilla("red");
        }
        if (codigoSumillaNuevo == "" || codigoDescripcionNuevo == "" || codigoObjetivoNuevo == "") {
            if (codigoObjetivoNuevo == "") setFlagIncompleto1(true);
            if (codigoSumillaNuevo == "") setFlagIncompleto2(true);
            if (codigoDescripcionNuevo == "") setFlagIncompleto3(true);
        } else {
            // setFlagIncompleto(false);
            console.log("INSERTA OBJETIVO");
            const config = {
                headers: { Authorization: 'Bearer ' + cookies.jwt }
            }
            const data = {
                fidEspecialidad: id,
                sumilla: codigoSumillaNuevo,
                descripcion: codigoDescripcionNuevo,
                codigoObjetivo: codigoObjetivoNuevo,
            }

            try {
                const respuesta = await axios.post("http://localhost:3050/api/objetivoEducacional/insertarObjetivoEducacional", data, config);
                console.log("respuesta insertar");
                console.log(respuesta.data);
                console.log(respuesta.data.idObjetivoEducacional);
                if (respuesta.data.idObjetivoEducacional == 0) {
                    bandera = true;
                    console.log(bandera);
                } else {
                    bandera = false;
                    console.log("tostada")
                    console.log(respuesta.data.success)
                    if (respuesta.data.success) {
                        toast.success('Objetivo(s) creado(s) correctamente.', {
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
                }
            } catch (error) {
                console.log(error)
            }

            console.log(bandera);
            if (bandera === true) {
                //setModalOpen(true);
                //setModalKey(prevKey => prevKey + 1);
                console.log("-------------------")
                console.log(bandera)
                setTextoaviso("Objetivo educacional existente");
                setCodigoObjetivoNuevo("");
                //setmostrarModalAnadir(true);
            } else {
                console.log("insertaoooooooo uwu");
                setFlagActualizar(!flagActualizar);
                setmostrarModalAnadir(false);
                setTextoaviso("");
                setCodigoObjetivoNuevo("");
                setCodigoDescripcionNuevo("");
                setCodigoSumillaNuevo("");
            }
        }
    };

    const openModal = () => {
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleDetalle = (e) => {
        const { name, value } = e?.target || {};
        switch (name) {
            case "txtCodigo":
                setCodigoObjetivoM(value);
                break;
            case "txtSumilla":
                setCodigoSumillaM(value);
                break;
            case "txtDescripcion":
                setCodigoDescripcionM(value);
                break;
        }
    }

    const handleAnadir = (e) => {
        const { name, value } = e?.target || {};

        switch (name) {
            case "txtCodigoNuevo":
                setFlagIncompleto1(false);
                setCodigoObjetivoNuevo(value);
                break;
            case "txtSumillaNuevo":
                setFlagIncompleto2(false);
                setCodigoSumillaNuevo(value);
                break;
            case "txtDescripcionNuevo":
                setFlagIncompleto3(false);
                setCodigoDescripcionNuevo(value);
                break;
            case "txtTextoAviso":
                setTextoaviso(value);
                break;
        }
    }

    const cerrarModal = () => {
        setmostrarModal2(false);
    }

    const cerrarModalAnadirS = () => {
        setmostrarModalAnadir(false)
        setInputBorderObjetivo("black");
        setInputBorderDescripcion("black");
        setInputBorderSumilla("black");
        setCodigoObjetivoNuevo("");
        setCodigoDescripcionNuevo("");
        setCodigoSumillaNuevo("");
    }

    const cerrarModalObjetivo = async () => {
        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            idObjetivoEducacional: idObjetivoM,
            sumilla: codigoSumillaM,
            descripcion: codigoDescripcionM,
            codigoObjetivo: codigoObjetivoM,
        }

        try {
            const respuesta = await axios.post("http://localhost:3050/api/objetivoEducacional/modificarObjetivoEducacional", data, config);
            console.log("respuesta modificar");
            console.log(respuesta.data);
            if (respuesta.data.success) {
                toast.success('Objetivo modificado correctamente.', {
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
            console.log(error)
        }

        setFlagActualizar(!flagActualizar);
        setmodalDetalleObjetivo(false);
        setmostrarModal2(false);
        setmostrarModalAnadir(false);

    };


    /****************** REDUX********************** */
    const dispatch = useDispatch();
    const datosAdmin = useSelector((state) => state.Administrador);
    const datosGeneral = useSelector((state) => state.General);


    /******************FIN DEL REDUX********************** */

    var [elementos, setElementos] = useState([{}]);

    // useEffect(() => {
    //     obtenerDatosCuentas();
    // }, []);
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
        //console.log("Galleta:")
        //console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            codigoDescripcion: textoBusqueda,
            fidEspecialidad: id,
            paginaSolicitar: currentPage,
        }
        //console.log("configuracion:")
        //console.log(config);

        //console.log(data);

        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, ObjetivoEducacional } = info;

            setPageData({
                isLoading: false,
                rowData: (ObjetivoEducacional.map((ObjetivoEducacional) => ({
                    seleccion: <input
                        className="checkboxGC"
                        type="checkbox"
                        id={ObjetivoEducacional.idObjetivoEducacional}
                        // checked={verificarCheck}
                        defaultChecked={seleccionados.includes(ObjetivoEducacional.idObjetivoEducacional)}
                        // onChange={handleCheckBoxChange}
                        onChange={(e) => toggleValue(e, ObjetivoEducacional.idObjetivoEducacional)}
                    />,
                    codigoObjetivo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(ObjetivoEducacional.idObjetivoEducacional, ObjetivoEducacional.sumilla, ObjetivoEducacional.descripcion, ObjetivoEducacional.codigoObjetivo)}>{ObjetivoEducacional.codigoObjetivo}</div>,
                    sumilla: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(ObjetivoEducacional.idObjetivoEducacional, ObjetivoEducacional.sumilla, ObjetivoEducacional.descripcion, ObjetivoEducacional.codigoObjetivo)}>{ObjetivoEducacional.sumilla}</div>,
                    nombreCompleto: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(ObjetivoEducacional.idObjetivoEducacional, ObjetivoEducacional.sumilla, ObjetivoEducacional.descripcion, ObjetivoEducacional.codigoObjetivo)}>{ObjetivoEducacional.nombreCompleto}</div>,
                    fechaCreacion: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(ObjetivoEducacional.idObjetivoEducacional, ObjetivoEducacional.sumilla, ObjetivoEducacional.descripcion, ObjetivoEducacional.codigoObjetivo)}>{ObjetivoEducacional.fechaCreacion.substr(8, 2) + "/" + ObjetivoEducacional.fechaCreacion.substr(5, 2) + "/" + ObjetivoEducacional.fechaCreacion.substr(0, 4)}</div>,
                }))),
                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
            console.log("ESPECIALIDAD")
            console.log(ObjetivoEducacional.idObjetivoEducacional);
        });

    }, [currentPage]);

    useEffect(() => {
        console.log("Estoy acutalizando flag")
        setPageData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: true,
        }));
        //console.log("Galleta:")
        //console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            codigoDescripcion: textoBusqueda,
            fidEspecialidad: id,
            paginaSolicitar: currentPage,
        }
        //console.log("configuracion:")
        //console.log(config);

        //console.log(data);

        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, ObjetivoEducacional } = info;

            setPageData({
                isLoading: false,
                rowData: (ObjetivoEducacional.map((ObjetivoEducacional) => ({
                    seleccion: <input
                        className="checkboxGC"
                        type="checkbox"
                        id={ObjetivoEducacional.idObjetivoEducacional}
                        // checked={verificarCheck}
                        defaultChecked={seleccionados.includes(ObjetivoEducacional.idObjetivoEducacional)}
                        // onChange={handleCheckBoxChange}
                        onChange={(e) => toggleValue(e, ObjetivoEducacional.idObjetivoEducacional)}
                    />,
                    codigoObjetivo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(ObjetivoEducacional.idObjetivoEducacional, ObjetivoEducacional.sumilla, ObjetivoEducacional.descripcion, ObjetivoEducacional.codigoObjetivo)}>{ObjetivoEducacional.codigoObjetivo}</div>,
                    sumilla: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(ObjetivoEducacional.idObjetivoEducacional, ObjetivoEducacional.sumilla, ObjetivoEducacional.descripcion, ObjetivoEducacional.codigoObjetivo)}>{ObjetivoEducacional.sumilla}</div>,
                    nombreCompleto: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(ObjetivoEducacional.idObjetivoEducacional, ObjetivoEducacional.sumilla, ObjetivoEducacional.descripcion, ObjetivoEducacional.codigoObjetivo)}>{ObjetivoEducacional.nombreCompleto}</div>,
                    fechaCreacion: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(ObjetivoEducacional.idObjetivoEducacional, ObjetivoEducacional.sumilla, ObjetivoEducacional.descripcion, ObjetivoEducacional.codigoObjetivo)}>{ObjetivoEducacional.fechaCreacion.substr(8, 2) + "/" + ObjetivoEducacional.fechaCreacion.substr(5, 2) + "/" + ObjetivoEducacional.fechaCreacion.substr(0, 4)}</div>,
                }))),
                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });

    }, [flagActualizar]);

    const handleAnadirObjetivo = async () => {

    }

    const handleModalAceptarDeshabilitar = async () => {


        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = new Set(seleccionados);
        const objetoJSON = {};

        data.forEach(idObjetivoEducacional => {
            objetoJSON[idObjetivoEducacional] = true;
        });

        console.log("valores json");
        console.log(objetoJSON);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/objetivoEducacional/anularObjetivoEducacional", objetoJSON, config);

            console.log("TOSTADAuwu");
            if (respuesta.data.success) {
                toast.success('Objetivo(s) eliminado(s) correctamente.', {
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
            setmostrarModal(false);
            setmostrarModal2(false);
            setmostrarModalAnadir(false);
            setFlagActualizar(!flagActualizar);
        } catch (error) {

            console.log(error)
            console.log("pipipip")
        }
        setFlagBusqueda(!flagBusqueda);
        setSeleccionados([]);
        console.log("uwu")
    };

    const handleModalCancelar = () => {
        setmostrarModal(false);
        setFlagActualizar(true);
    };

    const handleModalClose = () => {
        setmostrarModal(false);
    };


    const handleModalDeshabilitar = () => {

    }

    const handleButtonFila = async (idEnviado, sumilla, descripcion, codigoObjetivo) => {

        //props.cambiarComponente(false);
        //props.cambiarComponente2(true);
        setidObjetivoM(idEnviado);
        setCodigoSumillaM(sumilla);
        setCodigoDescripcionM(descripcion);
        setCodigoObjetivoM(codigoObjetivo);
        setmostrarModal2(true);
    }

    useEffect(() => {
        setPageData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: true,
        }));



        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            codigoDescripcion: textoBusqueda,
            fidEspecialidad: id,
            paginaSolicitar: currentPage,
        }
        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, ObjetivoEducacional } = info;
            setCurrentPage(1)
            setPageData({
                isLoading: false,
                rowData: (ObjetivoEducacional.map((ObjetivoEducacional) => ({
                    seleccion: <input
                        className="checkboxGC"
                        type="checkbox"
                        id={ObjetivoEducacional.idObjetivoEducacional}
                        defaultChecked={seleccionados.includes(ObjetivoEducacional.idObjetivoEducacional)}
                        //checked={verificarCheck}
                        //onChange={handleCheckBoxChange(Usuario.idUsuario)}
                        onChange={(e) => toggleValue(e, ObjetivoEducacional.idObjetivoEducacional)}

                    />,
                    codigoObjetivo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(ObjetivoEducacional.idObjetivoEducacional, ObjetivoEducacional.sumilla, ObjetivoEducacional.descripcion, ObjetivoEducacional.codigoObjetivo)}>{ObjetivoEducacional.codigoObjetivo}</div>,
                    sumilla: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(ObjetivoEducacional.idObjetivoEducacional, ObjetivoEducacional.sumilla, ObjetivoEducacional.descripcion, ObjetivoEducacional.codigoObjetivo)}>{ObjetivoEducacional.sumilla}</div>,
                    nombreCompleto: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(ObjetivoEducacional.idObjetivoEducacional, ObjetivoEducacional.sumilla, ObjetivoEducacional.descripcion, ObjetivoEducacional.codigoObjetivo)}>{ObjetivoEducacional.nombreCompleto}</div>,
                    fechaCreacion: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(ObjetivoEducacional.idObjetivoEducacional, ObjetivoEducacional.sumilla, ObjetivoEducacional.descripcion, ObjetivoEducacional.codigoObjetivo)}>{ObjetivoEducacional.fechaCreacion.substr(8, 2) + "/" + ObjetivoEducacional.fechaCreacion.substr(5, 2) + "/" + ObjetivoEducacional.fechaCreacion.substr(0, 4)}</div>,
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

    const handleButtonImportar = () => {
        // props.cambiarComponente(false);
        // props.cambiarComponente2(false);
        // props.cambiarComponente3(true);
    };
    const handleButtonAñadir = () => {
        setColor("#FFFFFF");
        setColorTexto("#000000");
        // props.cambiarComponente(true);
    };

    const handleButtonDeshabilitar = async () => {
        let valor = 0;
        valor = validarCampos();
        if (valor) {
            if(seleccionados.length > 0){
                setmostrarModal(true);
            }else{
                setmostrarModal(false);
            }
        } else {
            setmostrarModal(false);
        }
    };
    const validarCampos = () => {
        let valor = 0;
        if (seleccionados.length > 0) {
            setBotonHabilitado(true);
            valor = 1;
        } else {
            setBotonHabilitado(false);
            valor = 0;
        }
        return valor;
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
        <div className="contenedorTablaREOE">

            <div className="barraSuperiorREOE">
                <div className="contenedorBotones barraBotSup">
                    <div className=" btnDivDisenio">
                        <button onClick={abrirModalAnadir} class="btnAniadirREOE btnDisenio" href="#" role="button" >
                            Añadir
                        </button>
                    </div>
                    <div className="btnDivDisenio ">
                        <button class="btnDeshabilitarREOE btnDisenio " href="#" role="button" type="button"
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                            onClick={handleButtonDeshabilitar} style={{ background: colorBotonEliminar }}>
                            Eliminar
                        </button>
                    </div>

                </div>
            </div>

            <div className="espacioTablaREOE">
                <p>Objetivos Registrados: {pageData.totalPassengers || "No hay resultados para su busqueda"}</p>
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
                        <div className="contenedorTablaREOE" style={{ width: "100%", height: "510px" }}>
                            <Table className="miTabla"
                                columns={columns}
                                data={pageData.rowData}
                                isLoading={pageData.isLoading}
                                cambiarComponente={props.cambiarComponente}
                                cambiarComponente2={props.cambiarComponente2}
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

            <div className="barraIntermediaREOE">
                <div>
                    <Modal className="modalAnchoPersonalizadoREOE" show={mostrarModal2} onHide={handleButtonFila}>
                        <Modal.Body >
                            <div>
                                <div className="espacioSupModalREOE">
                                    <button className="botonCerrarREOE" type="button"
                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={cerrarModal} >
                                        <i class="bi bi-x-circle"></i> </button>
                                </div>
                            </div>
                            <p>Detalle Objetivo Educacional</p>
                            <div className="contenedorREOE">
                                <div className="derechaREOE">
                                    <label className="labelGen" htmlFor="tipoMedicion">
                                        Código </label>
                                </div>
                                <div className="izquierdaREOE">
                                    <input className="inputActivoGen inputREOE" name="txtCodigo" value={codigoObjetivoM} onChange={handleDetalle} style={{ backgroundColor: "F2F7F9" }} readOnly ></input>
                                </div>
                            </div>
                            <div className="contenedorREOE">
                                <div className="derechaREOE">
                                    <label className="labelGen  " htmlFor="tipoMedicion">
                                        Sumilla </label>
                                </div>
                                <div className="izquierdaREOE">
                                    <textarea className="inputActivoGen inputMenosPad inputREOE form-control2REVC" name="txtSumilla" value={codigoSumillaM} onChange={handleDetalle} rows="4" cols="50"
                                        type="text"
                                        style={{ width: "80%" }} />
                                </div>
                            </div>
                            <div className="contenedorREOE">
                                <div className="derechaREOE">
                                    <label className="labelGen" htmlFor="tipoMedicion">
                                        Descripción </label>
                                </div>
                                <div className="izquierdaREOE">
                                    <textarea className="inputActivoGen inputMenosPad inputREOE form-control2REVC formDescr" name="txtDescripcion" value={codigoDescripcionM} onChange={handleDetalle} rows="4" cols="50"
                                        type="text"
                                        style={{ width: "80%" }} />
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="botonModal btnDisenio botonAceptarrREOE" onClick={cerrarModalObjetivo}>
                                Guardar</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal className="modalAnchoPersonalizadoREOE" show={mostrarModalAnadir} onHide={handleAnadirObjetivo}>
                        <Modal.Body >
                            <div className="espacioSupModalREOE">
                                <button className="botonCerrarREOE" type="button"
                                    data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={cerrarModalAnadirS} >
                                    <i class="bi bi-x-circle"></i> </button>
                            </div>
                            <p>Añadir Objetivo Educacional</p>
                            <div className="contenedorREOE">
                                <div className="derechaREOE">
                                    {/*<label className="labelGen" htmlFor="tipoMedicion" style={flagIncompleto1 ? { color: 'red' } : {}}>
                                        Código {flagIncompleto1 ? " (esta incompleto)" : ""}</label>*/}
                                    <label className="labelGen" htmlFor="tipoMedicion">
                                        Código *</label>
                                </div>
                                <div className="izquierdaREOE">
                                    <input className="inputActivoGen inputREOE" style={{ borderColor: inputBorderObjetivo}} name="txtCodigoNuevo" value={codigoObjetivoNuevo} onChange={handleAnadir} ></input>
                                </div>
                            </div>
                            <div className="contenedorREOE">
                                <div className="derechaREOE">
                                    {/*<label className="labelGen" htmlFor="tipoMedicion" style={flagIncompleto2 ? { color: 'red' } : {}}>
                                        Sumilla {flagIncompleto2 ? " (esta incompleta)" : ""} </label>*/}
                                    <label className="labelGen" htmlFor="tipoMedicion" >
                                        Sumilla *</label>
                                </div>
                                <div className="izquierdaREOE">
                                    <textarea className="inputActivoGen inputMenosPad inputREOE form-control2REVC" name="txtSumillaNuevo" value={codigoSumillaNuevo} onChange={handleAnadir} rows="4" cols="50"
                                        type="text"
                                        style={{ width: "80%" , borderColor: inputBorderSumilla}} />
                                </div>
                            </div>
                            <div className="contenedorREOE">
                                <div className="derechaREOE">
                                    {/*<label className="labelGen" htmlFor="tipoMedicion" style={flagIncompleto3 ? { color: 'red' } : {}}>
                                        Descripción {flagIncompleto3 ? " (esta incompleta)" : ""}</label>*/}
                                    <label className="labelGen" htmlFor="tipoMedicion">
                                        Descripción *</label>
                                </div>
                                <div className="izquierdaREOE">
                                    <textarea className="inputActivoGen inputMenosPad inputREOE form-control2REVC formDescr" name="txtDescripcionNuevo" value={codigoDescripcionNuevo} onChange={handleAnadir} rows="4" cols="50"
                                        type="text"
                                        style={{ width: "80%" , borderColor: inputBorderDescripcion}} />
                                </div>
                                <input className="inputEspecial" style={{ width: "100%", maxWidth: "500px" }} name="txtTextoAviso" value={textoaviso} disabled onChange={handleAnadir} ></input>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="botonModal btnDisenio botonAceptarrREOE" onClick={cerrarModalAnadir} style={{ background: colorBoton }}>
                                Guardar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <div className="btnDeshabilitarREOE">
                <Modal show={mostrarModal} onHide={handleModalDeshabilitar}>
                    <Modal.Body >
                        <p>¿Está seguro que desea eliminar los objetivos educacionales seleccionados?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonCancelarREOE" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarrREOE" onClick={handleModalAceptarDeshabilitar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <Modal className="modalObjetivoCreadoREOE"
                show={modalOpen}
                onHide={closeModal}
                contentLabel="Cuenta ya creada"
            >
                <br></br>
                <p>El objetivo ya ha sido creado anteriormente.</p>
                <div class="contenedorInferiorREOE">
                    <button className="botonAceptarObCreadoREOE btn btn-primary" type="button" onClick={closeModal}>Aceptar</button>
                </div>
                <br></br>
            </Modal>
        </div >
    );
}
