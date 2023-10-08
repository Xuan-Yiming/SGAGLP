import "../HojasDeEstilo/AdminGestionCiclosAcademicos.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../HojasDeEstilo/Reusable/FormBuscar.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import "../HojasDeEstilo/Tabla.css";
// import { Table } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';
import { useLocalStorage } from './useLocalStorage';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addDatosCuenta, addRoles, addNombreCuenta, addApellidoPCuenta, addApellidoMCuenta, addFoto } from "../Redux/CuentaSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';
import { getData, columns, formatRowData } from "./DataCiclosAcademicos";
import Table from "./TablaCuentas";
import Pagination from "../componentes/pagination/pagination";

export default function AdminGestionCuenta(props) {

    const [anioNuevoM, setAnioNuevoM] = useState("");
    const [codigoDescripcionM, setCodigoDescripcionM] = useState("");
    const [semestreNuevoM, setSemestreNuevoM] = useState("");
    const [idCicloM, setidCicloM] = useState("");
    const [colorBoton, setColorBoton] = useState("#042354");
    const [botonHabilitado, setBotonHabilitado] = useState(false);

    const [anioNuevo, setAnioNuevo] = useState("");
    const [semestreNuevo, setSemestreNuevo] = useState("");
    const [textoaviso, setTextoaviso] = useState("");

    const [anioM, setAnioM] = useState("");
    const [semestreM, setSemestreM] = useState("");

    const [cookies, setCookie] = useCookies();
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [mostrarModal, setmostrarModal] = useState(false);
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);
    const [mostrarModalAnadir, setmostrarModalAnadir] = useState(false);

    const [flagActualizar, setFlagActualizar] = useState(false);

    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [textoBusquedaFIni, setTextoBusquedaFIni] = useState("");
    const [textoBusquedaFFin, setTextoBusquedaFFin] = useState("");
    const [textoBusquedaFIniC, setTextoBusquedaFIniC] = useState("");
    const [textoBusquedaFFinC, setTextoBusquedaFFinC] = useState("");
    const [textoBusquedaFIniM, setTextoBusquedaFIniM] = useState("");
    const [textoBusquedaFFinM, setTextoBusquedaFFinM] = useState("");
    const [modalKey, setModalKey] = useState(0);
    const [data, setData] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [flagCheckeo, setFlagCheckeo] = useState(false);
    const [modalDetalleCiclo, setmodalDetalleCiclo] = useState(false);
    const datosCuenta = useSelector((state) => state.Cuenta);
    const [id, setId] = useLocalStorage("id");
    //
    const [modalOpen, setModalOpen] = useState(false);
    var bandera = false;

    const [flagIncompleto1, setFlagIncompleto1] = useState(false);
    const [flagIncompleto2, setFlagIncompleto2] = useState(false);
    const [flagIncompleto3, setFlagIncompleto3] = useState(false);
    const [flagIncompleto4, setFlagIncompleto4] = useState(false);
    const [colorBotonEliminar, setColorBotonEliminar] = useState("#9E0520");
    const [inputBorderFechaINI, setInputBorderFechaINI] = useState('#000000');
    const [inputBorderFechaFIN, setInputBorderFechaFIN] = useState('#000000');
    const [inputBorderAnio, setInputBorderAnio] = useState('#000000');
    const [inputBorderSemestre, setInputBorderSemestre] = useState('#000000');

    const anioVal = /^\d{4}$/;
    const semestreVal = /^[012]+$/;

    useEffect(() => {
        if (seleccionados.length > 0) {
            setColorBotonEliminar("#9E0520"); // Cambia el color del botón a azul si está seleccionado   
        }else{
            setColorBotonEliminar("#ADADAD");
        }
    }, [seleccionados]);


    useEffect(() => {
        if(anioVal.test(anioNuevo) && 
        semestreVal.test(semestreNuevo) &&
        textoBusquedaFIniC && 
        textoBusquedaFFinC){
            setColorBoton("#042354");
        }else{
            setColorBoton("#ADADAD");
        }
        if(anioVal.test(anioNuevo)){
            setInputBorderAnio('#000000');
        }else{
            if(anioNuevo.length===0){
                setInputBorderAnio("black")
            }else{
                setInputBorderAnio("red")
            }
        }
        if(semestreVal.test(semestreNuevo)){
            setInputBorderSemestre('#000000');
        }else{
            if(semestreNuevo.length===0){
                setInputBorderSemestre("black")
            }else{
                setInputBorderSemestre("red")
            }
        }
        
        if(textoBusquedaFIniC){
            setInputBorderFechaINI('#000000');
        }else{
            if(!textoBusquedaFIniC){
                setInputBorderFechaINI("black")
            }else{
                setInputBorderFechaINI("red")
            }
        }
        if(textoBusquedaFFinC){
            setInputBorderFechaFIN('#000000');
        }else{
            if(!textoBusquedaFFinC){
                setInputBorderFechaFIN("black")
            }else{
                setInputBorderFechaFIN("red")
            }
        }
        
    }, [anioNuevo, semestreNuevo,textoBusquedaFIniC,textoBusquedaFFinC]);

    const abrirModalObjetivo = () => {
        setmodalDetalleCiclo(true);
    };

    const abrirModalAnadir = () => {
        setTextoaviso("");
        setmostrarModalAnadir(true);
    };

    const cerrarModalAnadir = async () => {
        if(anioNuevo.trim().length ==0){
            setInputBorderAnio("red");
        }
        if(semestreNuevo.trim().length ==0){
            setInputBorderSemestre("red");
        }
        if(textoBusquedaFIniC==""){
            setInputBorderFechaINI("red");
        }
        if(textoBusquedaFFinC == ""){
            setInputBorderFechaFIN("red");
        }
        if (isNaN(anioNuevo) || anioNuevo == "" || semestreNuevo == "" || isNaN(semestreNuevo) || textoBusquedaFIniC === "" || textoBusquedaFFinC === "") {
            if (isNaN(anioNuevo)) setTextoaviso("El año debe ser un número");
            if (isNaN(semestreNuevo)) setTextoaviso("El semestre debe ser un número");
            if (anioNuevo == "") setFlagIncompleto1(true);
            if (semestreNuevo == "") setFlagIncompleto2(true);
            if (textoBusquedaFIniC == "") setFlagIncompleto3(true);
            if (textoBusquedaFFinC == "") setFlagIncompleto4(true);
        } else {
            console.log(isNaN(anioNuevo));
            console.log(isNaN(semestreNuevo));
            console.log(textoBusquedaFFinC);
            console.log(textoBusquedaFIniC);
            // setFlagIncompleto(false);
            console.log("INSERTA CICLO");
            const config = {
                headers: { Authorization: 'Bearer ' + cookies.jwt }
            }
            const formattedDateFIni = moment(textoBusquedaFIniC).format('YYYY-MM-DD');
            const formattedDateFFin = moment(textoBusquedaFFinC).format('YYYY-MM-DD');
            const data = {
                anio: anioNuevo,
                semestre: semestreNuevo,
                fechaInicio: formattedDateFIni,
                fechaFin: formattedDateFFin,
            }

            try {
                const respuesta = await axios.post("http://localhost:3050/api/cicloAcademico/insertarCicloAcademico", data, config);
                if (respuesta.data.success) {
                    toast.success('Ciclo academico registrado correctamente.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setFlagActualizar(!flagActualizar);
                    setmostrarModalAnadir(false);
                    setTextoaviso("");
                    setAnioNuevo("");
                    setSemestreNuevo("");
                    setTextoBusquedaFIniC("");
                    setTextoBusquedaFFinC("");
                } else {
                    toast.error(respuesta.data.error.message, {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    console.log("boaaaaaaaaaaa")
                    setTextoaviso(respuesta.data.error.message);
                    setAnioNuevo("");
                    setSemestreNuevo("");
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
    };

    const openModal = () => {
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleDetalle = (e) => {
        const { name, value } = e?.target || {};
        switch (name) {
            case "txtAnio":
                setAnioM(value);
                break;
            case "txtSemestre":
                setSemestreM(value);
                break;
        }
    }

    const handleDetalleFIniM = (e) => {
        const { name, value } = e?.target || {};
        setTextoBusquedaFIniM(e);
    }

    const handleDetalleFFinM = (e) => {
        const { name, value } = e?.target || {};
        setTextoBusquedaFFinM(e);
    }

    const handleAnadir = (e) => {
        const { name, value } = e?.target || {};
        switch (name) {
            case "txtAnioNuevo":
                setFlagIncompleto1(false);
                setAnioNuevo(value);
                break;
            case "txtSemestreNuevo":
                setFlagIncompleto2(false);
                setSemestreNuevo(value);
                break;
            case "txtTextoAviso":
                setTextoaviso(value);
                break;
            /*
            case "txtFechaIniC":
                setTextoBusquedaFIniC(value);
                break;
            case "txtFechaFinC":
                setTextoBusquedaFFinC(value);
                break;
            */
        }
    }

    const handleAnadirFIniC = (e) => {
        const { name, value } = e?.target || {};
        setTextoBusquedaFIniC(e);
        if (textoBusquedaFIniC != "") {
            setFlagIncompleto3(false);
        }
    }

    const handleAnadirFFinC = (e) => {
        const { name, value } = e?.target || {};
        setTextoBusquedaFFinC(e);
        if (textoBusquedaFFinC != "") {
            setFlagIncompleto4(false);
        }
    }

    const cerrarModal = () => {
        setmostrarModal2(false);
    }

    const cerrarModalAnadirS = () => {
        setmostrarModalAnadir(false)
        setInputBorderAnio("black");
        setInputBorderSemestre("black");
        setInputBorderFechaINI("black");
        setInputBorderFechaFIN("black");
        setTextoBusquedaFIniC("");
        setTextoBusquedaFFinC("");
        setAnioNuevo("");
        setSemestreNuevo("");
    }

    const cerrarModalCiclo = async () => {
        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const formattedDateFIni = moment(textoBusquedaFIniM).format('YYYY-MM-DD');
        const formattedDateFFin = moment(textoBusquedaFFinM).format('YYYY-MM-DD');
        const data = {
            idCicloAcademico: idCicloM,
            semestre: semestreNuevoM,
            anio: anioNuevoM,
            fechaInicio: formattedDateFIni,
            fechaFin: formattedDateFFin
        }

        try {
            const respuesta = await axios.post("http://localhost:3050/api/cicloAcademico/modificarCicloAcademico", data, config);
            console.log("respuesta modificar");
            console.log(respuesta.data);
            if (respuesta.data.success) {
                toast.success('Ciclo modificado correctamente.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setFlagActualizar(!flagActualizar);
                setmostrarModalAnadir(false);
                setTextoaviso("");
            } else {
                toast.error(respuesta.data.error.message, {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTextoaviso(respuesta.data.error.message);
                
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

        setFlagActualizar(!flagActualizar);
        setmodalDetalleCiclo(false);
        setmostrarModal2(false);
        setmostrarModalAnadir(false);

    };

    var [elementos, setElementos] = useState([{}]);

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
        const formattedDateFIni = moment(textoBusquedaFIni).format('YYYY-MM-DD');
        const formattedDateFFin = moment(textoBusquedaFFin).format('YYYY-MM-DD');
        const data = {
            fechaIni: formattedDateFIni,
            fechaFin: formattedDateFFin,
            codigoDescripcion: textoBusqueda,
            paginaSolicitar: currentPage,
        }
        console.log("aaaaaaaaaaaaaaaaaa");
        console.log(data);
        //console.log("configuracion:")
        //console.log(config);

        //console.log(data);

        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Ciclo } = info;

            setPageData({
                isLoading: false,
                rowData: (Ciclo.map((Ciclo) => ({
                    seleccion: <input
                        className="checkboxGC"
                        type="checkbox"
                        id={Ciclo.id}
                        // checked={verificarCheck}
                        defaultChecked={seleccionados.includes(Ciclo.id)}
                        // onChange={handleCheckBoxChange}
                        onChange={(e) => toggleValue(e, Ciclo.id)}
                    />,
                    ciclo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Ciclo.id, Ciclo.anio, Ciclo.semestre, Ciclo.fechaInicio, Ciclo.fechaFin)}>{Ciclo.ciclo}</div>,
                    fechaInicio: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Ciclo.id, Ciclo.anio, Ciclo.semestre, Ciclo.fechaInicio, Ciclo.fechaFin)}>{Ciclo.fechaInicio.substr(8, 2) + "/" + Ciclo.fechaInicio.substr(5, 2) + "/" + Ciclo.fechaInicio.substr(0, 4)}</div>,
                    fechaFin: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Ciclo.id, Ciclo.anio, Ciclo.semestre, Ciclo.fechaInicio, Ciclo.fechaFin)}>{Ciclo.fechaFin.substr(8, 2) + "/" + Ciclo.fechaFin.substr(5, 2) + "/" + Ciclo.fechaFin.substr(0, 4)}</div>,
                    creadoPor: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Ciclo.id, Ciclo.anio, Ciclo.semestre, Ciclo.fechaInicio, Ciclo.fechaFin)}>{Ciclo.usuarioCreacion}</div>,
                    fechaCreacion: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Ciclo.id, Ciclo.anio, Ciclo.semestre, Ciclo.fechaInicio, Ciclo.fechaFin)}>{Ciclo.fechaCreacion.substr(8, 2) + "/" + Ciclo.fechaCreacion.substr(5, 2) + "/" + Ciclo.fechaCreacion.substr(0, 4)}</div>,
                }))),
                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
            console.log("Ciclo")
            console.log(Ciclo.id);
        });

    }, [currentPage, flagActualizar]);

    const handleAnadirCiclo = async () => {

    }

    const handleModalAceptarDeshabilitar = async () => {


        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {
            idCicloAcademicos: seleccionados,
        };

        try {
            const respuesta = await axios.post("http://localhost:3050/api/cicloAcademico/anularCicloAcademico", data, config);

            console.log(respuesta.data);

            setmostrarModal(false);
            setmostrarModal2(false);
            setmostrarModalAnadir(false);
            setFlagActualizar(!flagActualizar);
            if (respuesta.data.success) {
                toast.success('Ciclo(s) eliminado(s) exitosamente.', {
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
        setFlagBusqueda(!flagBusqueda);
        setSeleccionados([]);
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

    const handleButtonFila = async (idEnviado, anio, semestre, fechaInicio, fechaFin) => {

        //props.cambiarComponente(false);
        //props.cambiarComponente2(true);
        setidCicloM(idEnviado);
        setAnioNuevoM(anio);
        setSemestreNuevoM(semestre);
        setTextoBusquedaFIniM(new Date(fechaInicio));
        setTextoBusquedaFFinM(new Date(fechaFin));
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
        const formattedDateFIni = moment(textoBusquedaFIni).format('YYYY-MM-DD');
        const formattedDateFFin = moment(textoBusquedaFFin).format('YYYY-MM-DD');
        const data = {
            fechaIni: formattedDateFIni,
            fechaFin: formattedDateFFin,
            codigoDescripcion: textoBusqueda,
            paginaSolicitar: currentPage,
        }
        console.log("bbbbbbbbbbb");
        console.log(data);
        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Ciclo } = info;
            setCurrentPage(1)
            setPageData({
                isLoading: false,
                rowData: (Ciclo.map((Ciclo) => ({
                    seleccion: <input
                        className="checkboxGC"
                        type="checkbox"
                        id={Ciclo.id}
                        defaultChecked={seleccionados.includes(Ciclo.id)}
                        //checked={verificarCheck}
                        //onChange={handleCheckBoxChange(Usuario.idUsuario)}
                        onChange={(e) => toggleValue(e, Ciclo.id)}

                    />,
                    ciclo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Ciclo.id, Ciclo.anio, Ciclo.semestre, Ciclo.fechaInicio, Ciclo.fechaFin)}>{Ciclo.ciclo}</div>,
                    fechaInicio: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Ciclo.id, Ciclo.anio, Ciclo.semestre, Ciclo.fechaInicio, Ciclo.fechaFin)}>{Ciclo.fechaInicio.substr(8, 2) + "/" + Ciclo.fechaInicio.substr(5, 2) + "/" + Ciclo.fechaInicio.substr(0, 4)}</div>,
                    fechaFin: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Ciclo.id, Ciclo.anio, Ciclo.semestre, Ciclo.fechaInicio, Ciclo.fechaFin)}>{Ciclo.fechaFin.substr(8, 2) + "/" + Ciclo.fechaFin.substr(5, 2) + "/" + Ciclo.fechaFin.substr(0, 4)}</div>,
                    creadoPor: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Ciclo.id, Ciclo.anio, Ciclo.semestre, Ciclo.fechaInicio, Ciclo.fechaFin)}>{Ciclo.usuarioCreacion}</div>,
                    fechaCreacion: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Ciclo.id, Ciclo.anio, Ciclo.semestre, Ciclo.fechaInicio, Ciclo.fechaFin)}>{Ciclo.fechaCreacion.substr(8, 2) + "/" + Ciclo.fechaCreacion.substr(5, 2) + "/" + Ciclo.fechaCreacion.substr(0, 4)}</div>,
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
            setmostrarModal(true);
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

    const formatDate = (date) => {
        if (!date) return "";

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');

        return `${year}-${formattedMonth}-${formattedDay}`;
    };

    const handleCambio = async (e) => {
        setTextoBusqueda(e.target.value);
    }

    const handleCambioFIni = async (e) => {
        setTextoBusquedaFIni(e);
    }

    const handleCambioFFin = async (e) => {
        setTextoBusquedaFFin(e);
    }

    const handleInputClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

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
        <div className="contenedorTablaAGCA">

            <div className="barraSuperiorAGCA">
                <div className="contenedorBarraAGCA">
                    <form className="input-groupBuscar ">
                        <input className=" form-controlBuscar formBuscCiclo" type="search" placeholder="Buscar por ciclo" aria-label="Buscar" onChange={handleCambio} value={textoBusqueda} />
                        <DatePicker selected={textoBusquedaFIni} value={textoBusquedaFIni} onChange={handleCambioFIni} type="search" placeholderText="Fecha Inicio" dateFormat="dd/MM/yyyy" className="form-controlBuscar  formBuscCicloFecha" />
                        <DatePicker selected={textoBusquedaFFin} value={textoBusquedaFFin} onChange={handleCambioFFin} type="search" placeholderText="Fecha Fin" dateFormat="dd/MM/yyyy" className="form-controlBuscar formBuscCicloFecha" />
                        <button className="btn  m-0 border-end border-top border-bottom botonLupa" id="boton-buscar-gc" onClick={obtenerNuevosDatos}><i className="bi bi-search" ></i></button>
                    </form>
                </div>
                <div className="contenedorBotonesConBusc">
                    <div className=" btnDivDisenio">
                        <button onClick={abrirModalAnadir} class="btnAniadirAGCA btnDisenio" href="#" role="button" >
                            Añadir
                        </button>
                    </div>
                    <div className="btnDivDisenio ">
                        <button class="btnDeshabilitarAGCA btnDisenio " href="#" role="button" type="button"
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                            onClick={handleButtonDeshabilitar}
                            style={seleccionados.length == 0 ? { backgroundColor: 'gray' } : {}}
                            disabled={seleccionados.length == 0 ? true : false}>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>

            <div className="espacioTablaAGCA">
                <p>Ciclos Encontrados: {pageData.totalPassengers || "No hay resultados para su busqueda"}</p>
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
                        <div className="contenedorTablaAGCA" style={{ width: "100%", height: "510px" }}>
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

            <div className="barraIntermediaAGCA">
                <div>
                    <Modal className="modalAnchoPersonalizadoAGCA" show={mostrarModal2} onHide={handleButtonFila}>
                        <Modal.Body >
                            <div>
                                <div className="espacioSupModalAGCA">
                                    <button className="botonCerrarAGCA" type="button"
                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={cerrarModal} >
                                        <i class="bi bi-x-circle"></i> </button>
                                </div>
                            </div>
                            <p>Detalle Ciclo Académico</p>
                            <div className="contenedorAGCA">
                                <div className="derechaAGCA">
                                    <label className="labelGen" htmlFor="tipoMedicion">
                                        Ciclo </label>
                                </div>
                                <div className="izquierdaAGCA">
                                    <input className="inputActivoGen inputAGCA" name="txtAnio" value={anioNuevoM} onChange={handleDetalle} style={{ backgroundColor: "#edf3f6" }} readOnly ></input>
                                </div>
                                <div className="izquierdaAGCA">
                                    <input className="inputActivoGen inputAGCA" name="txtSemestre" value={semestreNuevoM} onChange={handleDetalle} style={{ backgroundColor: "#edf3f6" }} readOnly ></input>
                                </div>
                            </div>
                            <div className="contenedorAGCA">
                                <div className="derechaAGCA">
                                    <label className="labelGen" htmlFor="tipoMedicion">
                                        Fechas (Inicio y Fin) </label>
                                </div>
                                <DatePicker selected={textoBusquedaFIniM} value={textoBusquedaFIniM} name="txtFechaIniM" onChange={handleDetalleFIniM} type="search" placeholderText="Inicio del ciclo" dateFormat="dd/MM/yyyy" className="inputActivoGen" />
                                <DatePicker selected={textoBusquedaFFinM} value={textoBusquedaFFinM} name="txtFechaFinM" onChange={handleDetalleFFinM} type="search" placeholderText="Fin del ciclo" dateFormat="dd/MM/yyyy" className="inputActivoGen" />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="botonModal btnDisenio botonAceptarrAGCA" onClick={cerrarModalCiclo}>
                                Guardar</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal className="modalAnchoPersonalizadoAGCA" show={mostrarModalAnadir} onHide={handleAnadirCiclo}>
                        <Modal.Body >
                            <div className="espacioSupModalAGCA">
                                <button className="botonCerrarAGCA" type="button"
                                    data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={cerrarModalAnadirS} >
                                    <i class="bi bi-x-circle"></i> </button>
                            </div>
                            <p>Añadir Ciclo Académico</p>
                            <div className="contenedorAGCA">
                                <div className="derechaAGCA">
                                    {/*<label className="labelGen" htmlFor="tipoMedicion" style={flagIncompleto1 ? { color: 'red' } : {}}>
                                        Ciclo {(flagIncompleto1 || flagIncompleto2) ? " (esta incompleto)" : ""}</label>*/}
                                    <label className="labelGen" htmlFor="tipoMedicion"> Ciclo *</label>
                                </div>
                                <div className="izquierdaAGCA">
                                    <input maxLength={4} style={{ borderColor: inputBorderAnio}} className="inputActivoGen inputAGCA" name="txtAnioNuevo" value={anioNuevo} onChange={handleAnadir} placeholder="Año" ></input>
                                </div>
                                <div className="izquierdaAGCA">
                                    <input maxLength={1} style={{ borderColor: inputBorderSemestre}} className="inputActivoGen inputAGCA2" name="txtSemestreNuevo" value={semestreNuevo} onChange={handleAnadir} placeholder="Semestre" ></input>
                                </div>
                            </div>
                            <div className="contenedorAGCA">
                                <div className="derechaAGCA">
                                    {/*<label className="labelGen" htmlFor="tipoMedicion" style={flagIncompleto3 ? { color: 'red' } : {}}>
                                        Fechas (Inicio y Fin) {(flagIncompleto3 || flagIncompleto4) ? " (esta incompleta)" : ""}
                                    </label>*/}
                                    <label className="labelGen" htmlFor="tipoMedicion">
                                        Fechas (Inicio y Fin) * 
                                    </label>
                                </div>
                                <DatePicker customInput={<input style={{ borderColor: inputBorderFechaINI }} />} name="txtFechaIniC" selected={textoBusquedaFIniC} value={textoBusquedaFIniC} onChange={handleAnadirFIniC} type="search" placeholderText="Inicio del ciclo" dateFormat="dd/MM/yyyy" className="inputActivoGen inputAGCA3" />
                                <DatePicker customInput={<input style={{ borderColor: inputBorderFechaFIN }} />} name="txtFechaFinC" selected={textoBusquedaFFinC} value={textoBusquedaFFinC} onChange={handleAnadirFFinC} type="search" placeholderText="Fin del ciclo" dateFormat="dd/MM/yyyy" className="inputActivoGen inputAGCA3" />
                            </div>
                            <br></br>
                            <input  style={{ width: "100%", maxWidth: "500px" }} className="inputEspecial" name="txtTextoAviso" value={textoaviso} disabled onChange={handleAnadir} ></input>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="botonModal btnDisenio botonAceptarrAGCA" onClick={cerrarModalAnadir}
                            style={{ background: colorBoton }}>
                                Guardar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <div className="btnDeshabilitarAGCA">
                <Modal show={mostrarModal} onHide={handleModalDeshabilitar}>
                    <Modal.Body >
                        <p>¿Está seguro que desea eliminar los ciclos academicos seleccionados?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonCancelarAGCA" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarrAGCA" onClick={handleModalAceptarDeshabilitar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
            </div>


            <Modal className="modalCicloCreadoAGCA"
                show={modalOpen}
                onHide={closeModal}
                contentLabel="Ciclo ya creado"
            >
                <br></br>
                <p>El ciclo ya ha sido creado anteriormente.</p>
                <div class="contenedorInferiorAGCA">
                    <button className="botonAceptarCicCreadoAGCA btn btn-primary" type="button" onClick={closeModal}>Aceptar</button>
                </div>
                <br></br>
            </Modal>
        </div >
    );
}
