import "../HojasDeEstilo/Reusable/RolBarraBase.css";
import LoadingOverlay from 'react-loading-overlay';
import logoBlanco from "../images/logoBlanco.png";
import React, { useState, useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useLocation, useNavigate, Link } from "react-router-dom";
import ResEspeAniadirIndicador from '../componentes/ResEspeAniadirIndicador';
import ResEspeAñadirCompetencia from '../componentes/ResEspeAñadirCompetencia';
import ResEspeVerDetalleIndicador from '../componentes/ResEspeVerDetalleIndicador';
import ResMediVerDetalleMuestraMedicion from '../componentes/ResMediVerDetalleMuestraMedicion';
import ResEspeCompetencias from './ResEspeCompetencias';
import ResMediEspacios from './ResMediEspaciosMedicion';
import RespEspVerDetalleCompetencia from './RespEspVerDetalleCompetencia';
import { useSelector, useDispatch } from "react-redux";
import ResEspeAnadirMedicion from "./ResEpeAnadirMedicion";
import ResEspeAnadirEspacioMedicion from "./ResEspeAnadirEspacioMedicion";
import ResEspeObjetivosEducacionales from "./ResEspeObjetivosEducacionales";
import ResEspeGestionMedicion from "./ResEspeGestionMedicion";
import ResEspeGestionReportes from "./ResEspeGestionReportes";
import ResEspeAniadirMuestraMedicion from "./ResEspeAniadirMuestraMedicion";
import ResEspeEditarMuestraMedicion from "./ResEspeEditarMuestraMedicion";
import ResEspeGestionPlanDeMejora from "./ResEspeGestionPlanDeMejora";
import ResEspeCrearPlanMejora from "./ResEspeCrearPlanMejora";
import ResEspeVerDetalleMedicion from "./ResEspVerDetalleMedicion";
import ResEspeConfigurarEspacioMedicion from "./ResEspeConfigurarEspacioMedicion";
import ResEspeBuscarIndicador from "./ResEspeBuscarIndicador";
import ResEspeEditarPlan from "./ResEspeEditarPlan";
import ResEspeCrearPropuesta from "./ResEspeCrearPropuesta";
import ResEspeCrearActividad from "./ResEspeCrearActividad";
import ResEspeEditarPropuesta from "./ResEspeEditarPropuesta";
import ResEspeEditarActividad from "./ResEspeEditarActividad";
import ResEspeGestMuestras from "./ResEspeGestMuestras";
import ResEspeVerDetalleMuestraMedicion from "./ResEspeVerDetalleMuestraMedicion";
import ResEspeGestionAlumnos from "./ResEspeGestionAlumnos";
import ResEspeEvidencias from "./ResEspeEvidencias";
import ResEspeDetalleArchivos from "./ResEspeDetalleArchivos";
import { useLocalStorage } from './useLocalStorage';
import { addIdEspecialidad } from "../Redux/CuentaSlice";
import { addIdAdmin } from "../Redux/AdministradorSlice";
import ModalDragParametros from './ModalDragParametros';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../HojasDeEstilo/Reusable/breadcrums.css";
import {
    addBandera,addBanderaCargandoCompetencia,addBanderaCargandoEvidencia,addBanderaCargarMedicion
} from "../Redux/CargandoSlice";
import { useCookies } from "react-cookie";
import ResEspeDetalleArchivosActividades from "./ResEspeDetalleArchivosActividades";
import ResEspeAniadirResPlanMejora from "./ResEspeAniadirResPlanMejora";


export default function ResEspeBase() {

    const fecha = new Date();
    const [openModal, setOpenModal] = useState(false);


    const [idCom, setIdCom] = useState('');
    const [bandera, setBandera] = useState(false);
    const [bandera2, setBandera2] = useState(false);
    const [bandera3, setBandera3] = useState(false);
    const [bandera4, setBandera4] = useState(false);
    const [bandera5, setBandera5] = useState(false);
    const dispatch = useDispatch();
    const completed = useSelector((state) => state.Cargando);
    //const [completed, setcompleted] = useState(true);
    const [banderaResEspeGesMedi, setbanderaResEspeGesMedi] = useState(false);
    const [BanderaIndicador, setBanderaIndicador] = useState(false);
    const [BanderaEspacio, setBanderaEspacio] = useState(false);
    const [BanderaAñadir, setBanderaAñadir] = useState(false);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

    const [banderaMedicion1, setBanderaMedicion1] = useState(false);
    const [banderaMedicion2, setBanderaMedicion2] = useState(false);
    const [banderaMedicion3, setBanderaMedicion3] = useState(false);
    const [banderaMedicion4, setBanderaMedicion4] = useState(false);
    const [banderaMedicion5, setBanderaMedicion5] = useState(false);
    const [banderaMedicion6, setBanderaMedicion6] = useState(false);
    const [banderaMedicion7, setBanderaMedicion7] = useState(false);

    const [banderaPlanMejora1, setBanderaPlanMejora1] = useState(false);
    const [banderaPlanMejora2, setBanderaPlanMejora2] = useState(false);
    const [banderaPlanMejora3, setBanderaPlanMejora3] = useState(false);
    const [banderaPlanMejora4, setBanderaPlanMejora4] = useState(false);
    const [banderaPlanMejora5, setBanderaPlanMejora5] = useState(false);
    const [banderaPlanMejora6, setBanderaPlanMejora6] = useState(false);
    const [banderaPlanMejora7, setBanderaPlanMejora7] = useState(false);
    const [banderaPlanMejora8, setBanderaPlanMejora8] = useState(false);
    const [esSeguimiento, setEsSeguimiento] = useState(false)
    const [modificaPropuesta, setModificaPropuesta] = useState(false)

    const [banderaObjetivo1, setBanderaObjetivo1] = useState(false);
    const [banderaObjetivo2, setBanderaObjetivo2] = useState(false);
    const [banderaObjetivo3, setBanderaObjetivo3] = useState(false);

    const [bDetalleMuestra, setBDetalleMuestra] = useState(false);
    const [bGestionAlumnos, setBGestionAlumnos] = useState(false);
    const [bEvidencias, setBEvidencias] = useState(false);
    const [bDetalleArchivos, setBDetalleArchivos] = useState(false);

    const navigate = useNavigate();
    const datosUsuario = useSelector((state) => state.Usuario);
    const [cookies, setCookie] = useCookies();
    const [idI,setIdI]=useState("");

    const [id, setId] = useLocalStorage("id");
    const [idU, setIdU] = useLocalStorage("idUsuario");
    const [nombre, setNombre] = useLocalStorage("nombre");
    const [aPaterno, setAPaterno] = useLocalStorage("aPaterno");
    const [foto, setFoto] = useLocalStorage("foto");
    const location = useLocation();

    dispatch(addIdEspecialidad(id));
    dispatch(addIdAdmin(idU));

    const atras = () => {
        // bandera?setBandera(false):
        // bandera2?{setBandera(true); setBandera2(false);}:
        // navigate("/inicio");
        if (bandera) {
            setBandera(false);
            setBandera2(false);
            setBandera3(false);
            setBandera4(false);
        } else if (bandera2 && !BanderaIndicador) {
            setBandera(true);
            setBandera2(false);
            setBandera3(false);
            setBandera4(false);
        } else if (bandera2 && BanderaIndicador) {
            dispatch(addBanderaCargandoCompetencia(false));
            setTimeout(async () => {
                setBandera(false);
                setBandera2(false);
                setBandera3(true);
                setBandera4(false);
            },600);
        } else if (bandera3) {
            setBandera(false);
            setBandera2(false);
            setBandera3(false);
            setBandera4(false);
        } else if (bandera4 && BanderaIndicador) {
            dispatch(addBanderaCargandoCompetencia(false));
            setTimeout(async () => {
            setBandera(false);
            setBandera2(false);
            setBandera3(true);
            setBandera4(false);
        },600);
        } else if (banderaMedicion1) {
            setBanderaMedicion1(false);
            setBanderaMedicion2(false);
            setBanderaMedicion3(false);
            setBanderaMedicion4(false);
            setBanderaMedicion5(false);
            setBanderaMedicion6(false);
            setBanderaMedicion7(false);
        } else if (banderaMedicion2 && !BanderaEspacio) {
            setBanderaMedicion1(true);
            setBanderaMedicion2(false);
            setBanderaMedicion3(false);
            setBanderaMedicion4(false);
            setBanderaMedicion5(false);
            setBanderaMedicion6(false);
            setBanderaMedicion7(false);
        } else if (banderaMedicion2 && BanderaEspacio) {
            setBanderaMedicion1(false);
            setBanderaMedicion2(false);
            setBanderaMedicion3(false);
            setBanderaMedicion4(true);
            setBanderaMedicion5(false);
            setBanderaMedicion6(false);
            setBanderaMedicion7(false);
        } else if (banderaMedicion3 && !BanderaEspacio) {
            setBanderaMedicion1(false);
            setBanderaMedicion2(true);
            setBanderaMedicion3(false);
            setBanderaMedicion4(false);
            setBanderaMedicion5(false);
            setBanderaMedicion6(false);
            setBanderaMedicion7(false);
        } else if (banderaMedicion3 && BanderaEspacio && BanderaAñadir) {
            setBanderaMedicion1(false);
            setBanderaMedicion2(true);
            setBanderaMedicion3(false);
            setBanderaMedicion4(false);
            setBanderaMedicion5(false);
            setBanderaMedicion6(false);
            setBanderaMedicion7(false);
        } else if (banderaMedicion3 && BanderaEspacio && !BanderaAñadir) {
            setBanderaMedicion1(false);
            setBanderaMedicion2(false);
            setBanderaMedicion3(false);
            setBanderaMedicion4(false);
            setBanderaMedicion5(true);
            setBanderaMedicion6(false);
            setBanderaMedicion7(false);
        } else if (banderaMedicion4) {
            setBanderaMedicion1(false);
            setBanderaMedicion2(false);
            setBanderaMedicion3(false);
            setBanderaMedicion4(false);
            setBanderaMedicion5(false);
            setBanderaMedicion6(false);
            setBanderaMedicion7(false);
        } else if (banderaMedicion5) {
            setBanderaMedicion1(false);
            setBanderaMedicion2(false);
            setBanderaMedicion3(false);
            setBanderaMedicion4(true);
            setBanderaMedicion5(false);
            setBanderaMedicion6(false);
            setBanderaMedicion7(false);
        } else if (banderaMedicion6 && !BanderaEspacio) {
            setBanderaMedicion1(false);
            setBanderaMedicion2(true);
            setBanderaMedicion3(false);
            setBanderaMedicion4(false);
            setBanderaMedicion5(false);
            setBanderaMedicion6(false);
            setBanderaMedicion7(false);
        } else if (banderaMedicion6 && BanderaEspacio && BanderaAñadir) {
            setBanderaMedicion1(false);
            setBanderaMedicion2(true);
            setBanderaMedicion3(false);
            setBanderaMedicion4(false);
            setBanderaMedicion5(false);
            setBanderaMedicion6(false);
            setBanderaMedicion7(false);
        } else if (banderaMedicion6 && BanderaEspacio && !BanderaAñadir) {
            setBanderaMedicion1(false);
            setBanderaMedicion2(false);
            setBanderaMedicion3(false);
            setBanderaMedicion4(false);
            setBanderaMedicion5(true);
            setBanderaMedicion6(false);
            setBanderaMedicion7(false);
        } else if (banderaMedicion7) {
            setBanderaMedicion1(false);
            setBanderaMedicion2(false);
            setBanderaMedicion3(false);
            setBanderaMedicion4(false);
            setBanderaMedicion5(true);
            setBanderaMedicion6(false);
            setBanderaMedicion7(false);
        } else if (banderaPlanMejora1) {
            setBanderaPlanMejora1(false);
            setBanderaPlanMejora2(false);
            setBanderaPlanMejora3(false);
        } else if (banderaPlanMejora2 && esSeguimiento == false) {
            setBanderaPlanMejora1(true);
            setBanderaPlanMejora2(false);
            setBanderaPlanMejora3(false);
        } else if (banderaPlanMejora2 && esSeguimiento == true) {

            setBanderaPlanMejora1(false);
            setBanderaPlanMejora2(false);
            setBanderaPlanMejora3(false);
            setBanderaPlanMejora4(true);
            setBanderaPlanMejora5(false);
        } else if (banderaPlanMejora3 && esSeguimiento == false) {
            setBanderaPlanMejora1(false);
            setBanderaPlanMejora2(true);
            setBanderaPlanMejora3(false);
        } else if (banderaPlanMejora3 && esSeguimiento == true) {

            if (!modificaPropuesta) {
                setBanderaPlanMejora1(false);
                setBanderaPlanMejora2(true);
                setBanderaPlanMejora3(false);
                setBanderaPlanMejora4(false);
                setBanderaPlanMejora5(false);

            } else {
                setBanderaPlanMejora1(false);
                setBanderaPlanMejora2(false);
                setBanderaPlanMejora3(false);
                setBanderaPlanMejora4(false);
                setBanderaPlanMejora5(true);
            }
        } else if (banderaPlanMejora4) {
            setBanderaPlanMejora1(false);
            setBanderaPlanMejora2(false);
            setBanderaPlanMejora3(false);
            setBanderaPlanMejora4(false);
        } else if (banderaPlanMejora5) {
            setBanderaPlanMejora1(false);
            setBanderaPlanMejora2(false);
            setBanderaPlanMejora3(false);
            setBanderaPlanMejora4(true);
            setBanderaPlanMejora5(false);
        } else if (banderaPlanMejora6) {
            setBanderaPlanMejora1(false);
            setBanderaPlanMejora2(false);
            setBanderaPlanMejora3(false);
            setBanderaPlanMejora4(false);
            setBanderaPlanMejora5(true);
            setBanderaPlanMejora6(false);
        } else if (banderaPlanMejora7) {
            dispatch(addBanderaCargandoEvidencia(false));
            setTimeout(async () => {
            setBanderaPlanMejora1(false);
            setBanderaPlanMejora2(false);
            setBanderaPlanMejora3(false);
            setBanderaPlanMejora4(false);
            setBanderaPlanMejora5(false);
            setBanderaPlanMejora6(true);
            setBanderaPlanMejora7(false);
        },600);
        }
        else if (banderaPlanMejora8) {
            console.log(esSeguimiento)
            console.log("esSeguimiento")
            setBanderaPlanMejora1(false);
            setBanderaPlanMejora2(false);
            setBanderaPlanMejora4(false);
            setBanderaPlanMejora5(false);
            if(esSeguimiento){                
                setBanderaPlanMejora6(true);
            }else{
                
                setBanderaPlanMejora3(true);
            }
            setBanderaPlanMejora7(false);
            setBanderaPlanMejora8(false);
        } else if (bDetalleMuestra) {
            setBDetalleMuestra(false);
            setBGestionAlumnos(false);
            setBEvidencias(false);
            setBDetalleArchivos(false);
        } else if (bGestionAlumnos) {
            dispatch(addBanderaCargarMedicion(false));
            setTimeout(async () => { 
            setBGestionAlumnos(false);
            setBDetalleMuestra(true);
            setBEvidencias(false);
            setBDetalleArchivos(false);
        },500);
        } else if (bEvidencias) {
            dispatch(addBanderaCargarMedicion(false));
            setTimeout(async () => { 
            setBEvidencias(false);
            setBDetalleMuestra(true);
            setBGestionAlumnos(false);
            setBDetalleArchivos(false);
        },500);
        } else if (bDetalleArchivos) {
            dispatch(addBanderaCargandoEvidencia(false));
            setTimeout(async () => {

            setBDetalleArchivos(false);
            setBEvidencias(true);
            setBDetalleMuestra(false);
            setBGestionAlumnos(false);
        },500);
        } else {
            navigate("/inicio");
        }
        // {bandera?setBandera(false):bandera2?setBandera2(false):bandera3?setBandera3(false):navigate("/inicio")}
    }
    const verEnlace = (opcion) => {
        setOpcionSeleccionada(opcion);
        setBandera(false);
        setBandera2(false);
        setBandera3(false);
        setBandera4(false);
        setBanderaMedicion1(false);
        setBanderaMedicion2(false);
        setBanderaMedicion3(false);
        setBanderaMedicion4(false);
        setBanderaMedicion5(false);
        setBanderaMedicion6(false);
        setBanderaMedicion7(false);
        setBanderaPlanMejora1(false);
        setBanderaPlanMejora2(false);
        setBanderaPlanMejora3(false);
        setBanderaPlanMejora4(false);
        setBanderaPlanMejora5(false);
        setBanderaPlanMejora6(false);
        setBanderaPlanMejora7(false);
        setEsSeguimiento(false);
        setModificaPropuesta(false);
        setBDetalleMuestra(false);
        setBGestionAlumnos(false);
        setBEvidencias(false);
        setBDetalleArchivos(false);
    };

    useEffect(() => {
        dispatch(addIdEspecialidad(id));
        dispatch(addIdAdmin(idU));
        if (!cookies.jwt) {
            navigate('/');
        }
    }, [cookies.jwt, navigate]);

    if (!cookies.jwt) {
        console.log("OJO")
        return null; 
    }

    function seleccionar(li) {
       
        var listaItems = document.getElementsByClassName('nav-item');
        for (var i = 0; i < listaItems.length; i++) {
            listaItems[i].classList.remove('selected');
        }

        // Agregar la clase 'selected' al elemento li seleccionado
        li.classList.add('selected');
    }

    const handleParametros = () => {
        setOpenModal(true);
    }


    return (


        <div className="baseRBB">
            <LoadingOverlay
                active={!completed.banderaCargarCalificacion}
                spinner
                text='Cargando calificaciones...'
                styles={{
                    overlay: (base) => ({
                        ...base,
                        zIndex: 2000, // Establece un valor de z-index alto para el LoadingOverlay
                        backgroundColor: "#042354",
                    }),
                    wrapper: {
                        height: '100%'
                    }
                }}
            >
            <LoadingOverlay
                active={!completed.banderaCargarMedicion}
                spinner
                text='Cargando medición...'
                styles={{
                    overlay: (base) => ({
                        ...base,
                        zIndex: 2000, // Establece un valor de z-index alto para el LoadingOverlay
                        backgroundColor: "#042354",
                    }),
                    wrapper: {
                        height: '100%'
                    }
                }}
            >
            <LoadingOverlay
                active={!completed.banderaCargandoEvidencia}
                spinner
                text='Cargando evidencias...'
                styles={{
                    overlay: (base) => ({
                        ...base,
                        zIndex: 2000, // Establece un valor de z-index alto para el LoadingOverlay
                        backgroundColor: "#042354",
                    }),
                    wrapper: {
                        height: '100%'
                    }
                }}
            >
            <LoadingOverlay
                active={!completed.banderaCargandoIndicador}
                spinner
                text='Cargando indicador...'
                styles={{
                    overlay: (base) => ({
                        ...base,
                        zIndex: 2000, // Establece un valor de z-index alto para el LoadingOverlay
                        backgroundColor: "#042354",
                    }),
                    wrapper: {
                        height: '100%'
                    }
                }}
            >
            <LoadingOverlay
                active={!completed.banderaCargandoCompetencia}
                spinner
                text='Cargando competencia...'
                styles={{
                    overlay: (base) => ({
                        ...base,
                        zIndex: 2000, // Establece un valor de z-index alto para el LoadingOverlay
                        backgroundColor: "#042354",
                    }),
                    wrapper: {
                        height: '100%'
                    }
                }}
            >
             <LoadingOverlay
                active={!completed.banderaGuardandoCambios}
                spinner
                text='Guardando cambios...'
                styles={{
                    overlay: (base) => ({
                        ...base,
                        zIndex: 2000, // Establece un valor de z-index alto para el LoadingOverlay
                        backgroundColor: "#042354",
                    }),
                    wrapper: {
                        height: '100%'
                    }
                }}
            >
            <LoadingOverlay
                active={!completed.bandera}
                spinner
                text='Generando reporte...'
                styles={{
                    overlay: (base) => ({
                        ...base,
                        zIndex: 2000, // Establece un valor de z-index alto para el LoadingOverlay
                        backgroundColor: "#042354",
                    }),
                    wrapper: {
                        height: '100%'
                    }
                }}
            >
                 <LoadingOverlay
                active={!completed.banderaEliminaEvidenciaActividad}
                spinner
                text='Eliminando evidencias...'
                styles={{
                    overlay: (base) => ({
                        ...base,
                        zIndex: 2000, // Establece un valor de z-index alto para el LoadingOverlay
                        backgroundColor: "#042354",
                    }),
                    wrapper: {
                        height: '100%'
                    }
                }}
            >
            
                <div className="row">
                    <div className="menuRBB col-auto col-2 px-0">
                        <div className="barraLateralRBB d-flex flex-column align-items-center col-2 text-white px-3 pt-2 min-vh-100">
                            <div className="d-flex flex-column align-items-center pb-3 mb-md-0">
                                <img src={logoBlanco} style={{ width: "190px" }} />
                            </div>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li className={`nav-item ${opcionSeleccionada === 'gestObj' ? 'fondoSeleccionado' : ''}`} onClick={() => setOpcionSeleccionada('gestObj')}>
                                    <a href="#" className="nav-link align-middle px-3" onClick={() => verEnlace("gestObj")}>
                                        <i class="bi bi-trophy"></i><span className="opcionRBB ms-1 d-none d-sm-inline">Gestionar Obj.Educa</span>
                                    </a>
                                </li>
                                <li className={`nav-item ${opcionSeleccionada === 'gestComp' ? 'fondoSeleccionado' : ''}`} onClick={() => setOpcionSeleccionada('gestComp')}>
                                    <a href="#" className="nav-link align-middle px-3" onClick={() => verEnlace("gestComp")}>
                                        <i class="bi bi-award"></i><span className="opcionRBB ms-1 d-none d-sm-inline">Gestionar Competencias</span>
                                    </a>
                                </li>
                                <li className={`nav-item ${opcionSeleccionada === 'gestMedi' ? 'fondoSeleccionado' : ''}`} onClick={() => setOpcionSeleccionada('gestMedi')}>
                                    <a href="#" className="nav-link align-middle px-3" onClick={() => verEnlace("gestMedi")}>
                                        <i class="bi bi-file-earmark-binary"></i><span className="opcionRBB ms-1 d-none d-sm-inline">Gestionar Mediciones</span>
                                    </a>
                                </li>
                                <li className={`nav-item ${opcionSeleccionada === 'gestPlan' ? 'fondoSeleccionado' : ''}`} onClick={() => setOpcionSeleccionada('gestPlan')}>
                                    <a href="#" className="nav-link align-middle px-3" onClick={() => verEnlace("gestPlan")}>
                                        <i class="bi bi-lightbulb"></i> <span className="opcionRBB ms-1 d-none d-sm-inline">Gestionar Planes de Mejora</span>
                                    </a>
                                </li>
                                <li className={`nav-item ${opcionSeleccionada === 'Reportes' ? 'fondoSeleccionado' : ''}`} onClick={() => setOpcionSeleccionada('Reportes')}>
                                    <a href="#" className="nav-link align-middle px-3" onClick={() => verEnlace("Reportes")}>
                                        <i class="bi bi-file-earmark-bar-graph"></i> <span className="opcionRBB ms-1 d-none d-sm-inline" >Reportes</span>
                                    </a>
                                </li>
                                <li className={`nav-item ${opcionSeleccionada === 'gestMuestra' ? 'fondoSeleccionado' : ''}`} onClick={() => setOpcionSeleccionada('gestMuestra')}>
                                    <a href="#" className="nav-link align-middle px-3" onClick={() => verEnlace("gestMuestra")}>
                                        <i class=" bi bi-clipboard2-check"></i> <span className="opcionRBB ms-1 d-none d-sm-inline">Consulta de Muestras</span>
                                    </a>
                                </li>
                                <li  onClick={handleParametros}>
                                    <a href="#" className="nav-link align-middle px-3" onClick={handleParametros}>
                                        <i class="bi bi-gear"></i> <span className="opcionRBB ms-1 d-none d-sm-inline">Configuración de Parámetros</span>
                                    </a>
                                </li>
                            </ul>
                            <hr></hr>
                            <div className="dropdown">
                                <div className='titulo-RBB'>
                                    {/*location.state.rol*/}
                                    Responsable Especialidad

                                </div>
                                <hr></hr>
                                <div className="perfil-RBB">
                                    <img className="fotoPerfilAdmin" src={foto} alt="" />
                                    <div className="cuadro-RBB">
                                        <div className="nombre">
                                            <p> {/*{location.state.nombre} {location.state.aPaterno}*/} {nombre} {aPaterno}</p>

                                        </div>
                                        <div className="tiempo">
                                            <p>{fecha.toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="icono-salida-RBB">
                                        <Link to={"/"}>
                                            <i className="bi bi-box-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mainRBB col-10 px-0">
                        <div className="contenedor-RBB">
                            <div className="sub-contenedor-RBB">

                                <div className="encabezado-RBB">
                                    <div onClick={atras} className="icono-flecha-RBB">
                                        <i className="bi bi-arrow-left-circle"></i>
                                    </div>

                                    <div className="titulo-pestaña-RBB" style={{position:"relative"}}>
                                        <Breadcrumb>
                                            <Breadcrumb.Item onClick={()=>navigate("/inicio")}>Inicio</Breadcrumb.Item>
                                            {bandera ? 
                                                <Breadcrumb.Item onClick={atras}>Gestión de Competencias</Breadcrumb.Item> : <></>}
                                            {(bandera2 && !BanderaIndicador) ?
                                                <><Breadcrumb.Item onClick={()=>setBandera2(false)}>Gestión de Competencias</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Añadir Competencia</Breadcrumb.Item></> : <></>}
                                            {(bandera2 && BanderaIndicador) ?
                                                <><Breadcrumb.Item onClick={()=>setBandera2(false)}>Gestión de Competencias</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Detalle Competencia</Breadcrumb.Item></> : <></>}
                                            {bandera3 ?
                                                <Breadcrumb.Item onClick={atras}>Gestión de Competencia</Breadcrumb.Item> : <></>}
                                            {bandera4 ?
                                                <><Breadcrumb.Item onClick={()=>setBandera4(false)}>Gestión de Competencia</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Detalle Competencia</Breadcrumb.Item></> : <></>}
                                            {banderaMedicion1 ?
                                                <Breadcrumb.Item onClick={atras}>Gestión de Mediciones</Breadcrumb.Item> : <></>}
                                            {banderaMedicion2 && !BanderaEspacio ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaMedicion2(false)}>Gestión de Mediciones</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Añadir Medición</Breadcrumb.Item></> : <></>}
                                            {banderaMedicion2 && BanderaEspacio ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaMedicion2(false)}>Gestión de Mediciones</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Detalle Medición</Breadcrumb.Item></> : <></>}
                                            {banderaMedicion3 && !BanderaEspacio ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaMedicion3(false)}>Gestión de Mediciones</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={()=>{setBanderaMedicion3(false);setBanderaMedicion1(true)}}>Añadir Medición</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}> Añadir Espacio </Breadcrumb.Item> </> : <></>}
                                            {banderaMedicion3 && BanderaEspacio && BanderaAñadir ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaMedicion3(false)}>Gestión de Mediciones</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={()=>{setBanderaMedicion3(false);setBanderaMedicion4(true)}}>Detalle Medición</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}> Añadir Espacio </Breadcrumb.Item> </> : <></>}
                                            {banderaMedicion3 && BanderaEspacio && !BanderaAñadir ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaMedicion3(false)}>Gestión de Mediciones</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={()=>{setBanderaMedicion3(false);setBanderaMedicion4(true)}}>Detalle Medición</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}> Configurar Espacio </Breadcrumb.Item> </> : <></>}
                                            {banderaMedicion4 ?
                                                <Breadcrumb.Item onClick={atras}>Gestión de Mediciones</Breadcrumb.Item> : <></>}
                                            {banderaMedicion5 ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaMedicion5(false)}>Gestión de Mediciones</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Detalle Medición</Breadcrumb.Item> </> : <></>}
                                            {banderaMedicion6 && !BanderaEspacio ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaMedicion6(false)}>Gestión de Mediciones</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={()=>{setBanderaMedicion6(false);setBanderaMedicion1(true)}}>Añadir Medición</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}> Añadir Espacio </Breadcrumb.Item> </> : <></>}
                                            {banderaMedicion6 && BanderaEspacio && BanderaAñadir ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaMedicion6(false)}>Gestión de Mediciones</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={()=>{setBanderaMedicion6(false);setBanderaMedicion4(true)}}>Detalle Medición</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}> Añadir Espacio </Breadcrumb.Item> </> : <></>}
                                            {banderaMedicion6 && BanderaEspacio && !BanderaAñadir ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaMedicion6(false)}>Gestión de Mediciones</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={()=>{setBanderaMedicion6(false);setBanderaMedicion4(true)}}>Detalle Medición</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}> Configurar Espacio </Breadcrumb.Item> </> : <></>}
                                            {banderaMedicion7 ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaMedicion7(false)}>Gestión de Mediciones</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={()=>{setBanderaMedicion7(false);setBanderaMedicion4(true)}}>Detalle Medición</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}> Configurar Espacio </Breadcrumb.Item> </> : <></>}

                                            {banderaPlanMejora1 ?
                                                <Breadcrumb.Item onClick={atras}>Gestión de Planes de Mejora</Breadcrumb.Item> : <></>}
                                            {banderaPlanMejora2 && !esSeguimiento ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaPlanMejora2(false)}>Gestión de Planes de Mejora</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Crear Plan de Mejora</Breadcrumb.Item></> : <></>}
                                            {banderaPlanMejora2 && esSeguimiento ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaPlanMejora2(false)}>Gestión de Planes de Mejora</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Seguimiento de Plan de Mejora</Breadcrumb.Item></> : <></>}
                                            {banderaPlanMejora3 && !esSeguimiento ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaPlanMejora3(false)}>Gestión de Planes de Mejora</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={()=>{setBanderaPlanMejora3(false);setBanderaPlanMejora1(true)}}>Crear Plan de Mejora</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Crear Propuesta</Breadcrumb.Item> </> : <></>}
                                            {banderaPlanMejora3 && esSeguimiento && modificaPropuesta ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaPlanMejora3(false)}>Gestión de Planes de Mejora</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={()=>{setBanderaPlanMejora3(false);setBanderaPlanMejora4(true)}}>Seguimiento de Plan de Mejora</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Seguimiento de Propuesta</Breadcrumb.Item> </> : <></>}
                                            {banderaPlanMejora3 && esSeguimiento && !modificaPropuesta ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaPlanMejora3(false)}>Gestión de Planes de Mejora</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={()=>{setBanderaPlanMejora3(false);setBanderaPlanMejora4(true)}}>Seguimiento de Plan de Mejora</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Crear Propuesta</Breadcrumb.Item> </> : <></>}
                                            {banderaPlanMejora4 ?
                                                <Breadcrumb.Item onClick={atras}>Gestión de Planes de Mejora</Breadcrumb.Item> : <></>}
                                            {banderaPlanMejora5 ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaPlanMejora5(false)}>Gestión de Planes de Mejora</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Seguimiento de Plan de Mejora</Breadcrumb.Item> </> : <></>}
                                            {banderaPlanMejora6 ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaPlanMejora6(false)}>Gestión de Planes de Mejora</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={()=>{setBanderaPlanMejora6(false);setBanderaPlanMejora4(true)}}>Seguimiento de Plan de Mejora</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Seguimiento de Propuesta</Breadcrumb.Item> </> : <></>}
                                            {banderaPlanMejora7 ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaPlanMejora7(false)}>Gestión de Planes de Mejora</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={()=>{setBanderaPlanMejora7(false);setBanderaPlanMejora4(true)}}>Seguimiento de Plan de Mejora</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={()=>{setBanderaPlanMejora7(false);setBanderaPlanMejora5(true)}}>Seguimiento de Propuesta</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Seguimiento de Actividad</Breadcrumb.Item> </> : <></>}
                                            {banderaPlanMejora8 && !esSeguimiento ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaPlanMejora8(false)}>Gestión de Planes de Mejora</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={()=>{setBanderaPlanMejora8(false);setBanderaPlanMejora1(true)}}>Crear Plan de Mejora</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={()=>{setBanderaPlanMejora8(false);setBanderaPlanMejora2(true)}}>Crear Propuesta</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Añadir Responsable a Plan de Mejora</Breadcrumb.Item> </> : <></>}
                                            {banderaPlanMejora8 && esSeguimiento ?
                                                <><Breadcrumb.Item onClick={()=>setBanderaPlanMejora8(false)}>Gestión de Planes de Mejora</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={()=>{setBanderaPlanMejora8(false);setBanderaPlanMejora4(true)}}>Seguimiento de Plan de Mejora</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={()=>{setBanderaPlanMejora8(false);setBanderaPlanMejora5(true)}}>Seguimiento de Propuesta</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Añadir Responsable a Plan de Mejora</Breadcrumb.Item> </> : <></>}
                                            {bDetalleMuestra ?
                                                <Breadcrumb.Item onClick={atras}>Consulta de Muestras</Breadcrumb.Item> : <></>}
                                            {bGestionAlumnos ?
                                                <><Breadcrumb.Item onClick={()=>setBGestionAlumnos(false)}>Consulta de Muestras</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Detalle Muestra</Breadcrumb.Item> </> : <></>}
                                            {bEvidencias ?
                                                <><Breadcrumb.Item onClick={()=>setBEvidencias(false)}>Consulta de Muestras</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Detalle Muestra</Breadcrumb.Item> </> : <></>}
                                            {bDetalleArchivos ?
                                                <><Breadcrumb.Item onClick={()=>setBEvidencias(false)}>Consulta de Muestras</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={()=>{setBDetalleArchivos(false);setBDetalleMuestra(true)}}>Detalle Muestra</Breadcrumb.Item>
                                                <Breadcrumb.Item onClick={atras}>Evidencias</Breadcrumb.Item> </> : <></>}
                                                
                                        </Breadcrumb>
                                        <p>
                                            {
                                                bandera ? "Añadir Competencia" :
                                                bandera2 ? "Añadir Indicador" :
                                                bandera3 ? "Detalle Competencia" :
                                                bandera4 ? "Detalle Indicador" :
                                                banderaMedicion1 ? "Añadir Medición" :
                                                banderaMedicion2 ? "Añadir Espacio de Medición" :
                                                banderaMedicion3 ? "Añadir Muestra" :
                                                banderaMedicion4 ? "Detalle Medición" :
                                                banderaMedicion5 ? "Configurar Espacio de Medición" :
                                                banderaMedicion6 ? "Añadir Indicador al Espacio de Medición" :
                                                banderaMedicion7 ? "Editar Muestra de Medición" :
                                                banderaPlanMejora8 ? "Añadir Responsable a Plan de Mejora" :
                                                banderaPlanMejora7 ? "Evidencias de Actividad" :
                                                banderaPlanMejora6 ? "Seguimiento de Actividad" :
                                                banderaPlanMejora5 ? "Seguimiento de Propuesta" :
                                                banderaPlanMejora4 ? "Seguimiento de Plan de Mejora" :
                                                banderaPlanMejora1 ? "Crear Plan de Mejora" :
                                                banderaPlanMejora2 ? "Crear Propuesta" :
                                                banderaPlanMejora3 ? "Crear Actividad" :
                                                bDetalleMuestra ? "Detalle Muestra" :
                                                bGestionAlumnos ? "Gestión de Alumnos" :
                                                bEvidencias ? "Evidencias" :
                                                bDetalleArchivos ? "Detalle Archivos" :
                                                opcionSeleccionada === "gestObj" ? "Gestión de Objetivos Educacionales" :
                                                opcionSeleccionada === "gestComp" ? "Gestión de Competencias" :
                                                opcionSeleccionada === "gestMedi" ? "Gestión de Medición" :
                                                opcionSeleccionada === "gestPlan" ? "Gestión de Plan de Mejora" :
                                                opcionSeleccionada === "Reportes" ? "Reportes" :
                                                opcionSeleccionada === "gestMuestra" ? "Gestión de Muestras" :
                                                "Gestión de Competencias"
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="area-trabajo-RBB">
                                    {opcionSeleccionada === "gestObj" ? (
                                        <ResEspeObjetivosEducacionales />
                                    ) : opcionSeleccionada === "gestComp" ? (
                                        bandera ?  <ResEspeAñadirCompetencia        cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarBanderaIndicador={setBanderaIndicador} /> :
                                        bandera2 ? <ResEspeAniadirIndicador         cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarComponente3={setBandera3} cambiarComponente4={setBandera4} cambiarBanderaIndicador={setBanderaIndicador} /> :
                                        bandera3 ? <RespEspVerDetalleCompetencia    cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarComponente3={setBandera3} cambiarComponente4={setBandera4} cambiarBanderaIndicador={setBanderaIndicador} /> :
                                        bandera4 ? <ResEspeVerDetalleIndicador      cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarComponente3={setBandera3} cambiarComponente4={setBandera4} cambiarBanderaIndicador={setBanderaIndicador} /> :
                                                   <ResEspeCompetencias             cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarComponente3={setBandera3} />
                                    ) : opcionSeleccionada === "gestMedi" ? (
                                        banderaMedicion1 ? <ResEspeAnadirMedicion            cambiarComponenteMedicion1={setBanderaMedicion1} cambiarComponenteMedicion2={setBanderaMedicion2} cambiarComponenteMedicion3={setBanderaMedicion3} cambiarComponenteMedicion4={setBanderaMedicion4} cambiarComponenteMedicion5={setBanderaMedicion5} cambiarComponenteMedicion6={setBanderaMedicion6} cambiarBanderaEspacio={setBanderaEspacio} cambiarBanderaAñadir={setBanderaAñadir} cambiarComponenteMedicion7={setBanderaMedicion7}/> :
                                        banderaMedicion2 ? <ResEspeAnadirEspacioMedicion     cambiarComponenteMedicion1={setBanderaMedicion1} cambiarComponenteMedicion2={setBanderaMedicion2} cambiarComponenteMedicion3={setBanderaMedicion3} cambiarComponenteMedicion4={setBanderaMedicion4} cambiarComponenteMedicion5={setBanderaMedicion5} cambiarComponenteMedicion6={setBanderaMedicion6} cambiarBanderaEspacio={setBanderaEspacio} cambiarBanderaAñadir={setBanderaAñadir} cambiarComponenteMedicion7={setBanderaMedicion7}/> :
                                        banderaMedicion3 ? <ResEspeAniadirMuestraMedicion    cambiarComponenteMedicion1={setBanderaMedicion1} cambiarComponenteMedicion2={setBanderaMedicion2} cambiarComponenteMedicion3={setBanderaMedicion3} cambiarComponenteMedicion4={setBanderaMedicion4} cambiarComponenteMedicion5={setBanderaMedicion5} cambiarComponenteMedicion6={setBanderaMedicion6} cambiarBanderaEspacio={setBanderaEspacio} cambiarBanderaAñadir={setBanderaAñadir} cambiarComponenteMedicion7={setBanderaMedicion7}/> :
                                        banderaMedicion4 ? <ResEspeVerDetalleMedicion        cambiarComponenteMedicion1={setBanderaMedicion1} cambiarComponenteMedicion2={setBanderaMedicion2} cambiarComponenteMedicion3={setBanderaMedicion3} cambiarComponenteMedicion4={setBanderaMedicion4} cambiarComponenteMedicion5={setBanderaMedicion5} cambiarComponenteMedicion6={setBanderaMedicion6} cambiarBanderaEspacio={setBanderaEspacio} cambiarBanderaAñadir={setBanderaAñadir} cambiarComponenteMedicion7={setBanderaMedicion7}/> :
                                        banderaMedicion5 ? <ResEspeConfigurarEspacioMedicion cambiarComponenteMedicion1={setBanderaMedicion1} cambiarComponenteMedicion2={setBanderaMedicion2} cambiarComponenteMedicion3={setBanderaMedicion3} cambiarComponenteMedicion4={setBanderaMedicion4} cambiarComponenteMedicion5={setBanderaMedicion5} cambiarComponenteMedicion6={setBanderaMedicion6} cambiarBanderaEspacio={setBanderaEspacio} cambiarBanderaAñadir={setBanderaAñadir} cambiarComponenteMedicion7={setBanderaMedicion7}/> :
                                        banderaMedicion6 ? <ResEspeBuscarIndicador           cambiarComponenteMedicion1={setBanderaMedicion1} cambiarComponenteMedicion2={setBanderaMedicion2} cambiarComponenteMedicion3={setBanderaMedicion3} cambiarComponenteMedicion4={setBanderaMedicion4} cambiarComponenteMedicion5={setBanderaMedicion5} cambiarComponenteMedicion6={setBanderaMedicion6} cambiarBanderaEspacio={setBanderaEspacio} cambiarBanderaAñadir={setBanderaAñadir} cambiarComponenteMedicion7={setBanderaMedicion7}/> :
                                        banderaMedicion7 ? <ResEspeEditarMuestraMedicion     cambiarComponenteMedicion1={setBanderaMedicion1} cambiarComponenteMedicion2={setBanderaMedicion2} cambiarComponenteMedicion3={setBanderaMedicion3} cambiarComponenteMedicion4={setBanderaMedicion4} cambiarComponenteMedicion5={setBanderaMedicion5} cambiarComponenteMedicion6={setBanderaMedicion6} cambiarBanderaEspacio={setBanderaEspacio} cambiarBanderaAñadir={setBanderaAñadir} cambiarComponenteMedicion7={setBanderaMedicion7}/> :
                                                           <ResEspeGestionMedicion           cambiarComponenteMedicion1={setBanderaMedicion1} cambiarComponenteMedicion2={setBanderaMedicion2} cambiarComponenteMedicion3={setBanderaMedicion3} cambiarComponenteMedicion4={setBanderaMedicion4} cambiarComponenteMedicion5={setBanderaMedicion5} cambiarComponenteMedicion6={setBanderaMedicion6} cambiarBanderaEspacio={setBanderaEspacio} cambiarBanderaAñadir={setBanderaAñadir} cambiarComponenteMedicion7={setBanderaMedicion7}/>
                                    ) : opcionSeleccionada === "gestPlan" ? (
                                        banderaPlanMejora1 ? <ResEspeCrearPlanMejora            cambiarComponentePlanMejora1={setBanderaPlanMejora1} cambiarComponentePlanMejora2={setBanderaPlanMejora2} cambiarComponentePlanMejora3={setBanderaPlanMejora3} seguimiento={setEsSeguimiento} modifica={setModificaPropuesta} /> :
                                        banderaPlanMejora2 ? <ResEspeCrearPropuesta             cambiarComponentePlanMejora1={setBanderaPlanMejora1} cambiarComponentePlanMejora2={setBanderaPlanMejora2} cambiarComponentePlanMejora3={setBanderaPlanMejora3} esSeguimiento={esSeguimiento} cambiarComponentePlanMejora4={setBanderaPlanMejora4} cambiarComponentePlanMejora5={setBanderaPlanMejora5} cambiarComponentePlanMejora6={setBanderaPlanMejora6} cambiarComponentePlanMejora7={setBanderaPlanMejora7} /> :
                                        banderaPlanMejora3 ? <ResEspeCrearActividad             cambiarComponentePlanMejora1={setBanderaPlanMejora1} cambiarComponentePlanMejora2={setBanderaPlanMejora2} cambiarComponentePlanMejora3={setBanderaPlanMejora3} esSeguimiento={esSeguimiento} modificaPropuesta={modificaPropuesta} cambiarComponentePlanMejora4={setBanderaPlanMejora4} cambiarComponentePlanMejora5={setBanderaPlanMejora5} cambiarComponentePlanMejora6={setBanderaPlanMejora6} cambiarComponentePlanMejora7={setBanderaPlanMejora7}
                                        cambiarComponentePlanMejora8={setBanderaPlanMejora8}  /> :
                                        banderaPlanMejora4 ? <ResEspeEditarPlan                 cambiarComponentePlanMejora1={setBanderaPlanMejora1} cambiarComponentePlanMejora2={setBanderaPlanMejora2} cambiarComponentePlanMejora3={setBanderaPlanMejora3} cambiarComponentePlanMejora4={setBanderaPlanMejora4} cambiarComponentePlanMejora5={setBanderaPlanMejora5} cambiarComponentePlanMejora6={setBanderaPlanMejora6} cambiarComponentePlanMejora7={setBanderaPlanMejora7} seguimiento={setEsSeguimiento} modifica={setModificaPropuesta} /> :
                                        banderaPlanMejora5 ? <ResEspeEditarPropuesta            cambiarComponentePlanMejora1={setBanderaPlanMejora1} cambiarComponentePlanMejora2={setBanderaPlanMejora2} cambiarComponentePlanMejora3={setBanderaPlanMejora3} cambiarComponentePlanMejora4={setBanderaPlanMejora4} cambiarComponentePlanMejora5={setBanderaPlanMejora5} cambiarComponentePlanMejora6={setBanderaPlanMejora6} cambiarComponentePlanMejora7={setBanderaPlanMejora7} seguimiento={setEsSeguimiento} modifica={setModificaPropuesta} /> :
                                        banderaPlanMejora6 ? <ResEspeEditarActividad            cambiarComponentePlanMejora1={setBanderaPlanMejora1} cambiarComponentePlanMejora2={setBanderaPlanMejora2} cambiarComponentePlanMejora3={setBanderaPlanMejora3} cambiarComponentePlanMejora4={setBanderaPlanMejora4} cambiarComponentePlanMejora5={setBanderaPlanMejora5} cambiarComponentePlanMejora6={setBanderaPlanMejora6} cambiarComponentePlanMejora7={setBanderaPlanMejora7} cambiarComponentePlanMejora8={setBanderaPlanMejora8} seguimiento={setEsSeguimiento} modifica={setModificaPropuesta} /> :
                                        banderaPlanMejora7 ? <ResEspeDetalleArchivosActividades cambiarComponentePlanMejora1={setBanderaPlanMejora1} cambiarComponentePlanMejora2={setBanderaPlanMejora2} cambiarComponentePlanMejora3={setBanderaPlanMejora3} cambiarComponentePlanMejora4={setBanderaPlanMejora4} cambiarComponentePlanMejora5={setBanderaPlanMejora5} cambiarComponentePlanMejora6={setBanderaPlanMejora6} cambiarComponentePlanMejora7={setBanderaPlanMejora7} seguimiento={setEsSeguimiento} modifica={setModificaPropuesta} /> :
                                        banderaPlanMejora8 ? <ResEspeAniadirResPlanMejora cambiarComponentePlanMejora1={setBanderaPlanMejora1} cambiarComponentePlanMejora2={setBanderaPlanMejora2} cambiarComponentePlanMejora3={setBanderaPlanMejora3} cambiarComponentePlanMejora4={setBanderaPlanMejora4} cambiarComponentePlanMejora5={setBanderaPlanMejora5} cambiarComponentePlanMejora6={setBanderaPlanMejora6} cambiarComponentePlanMejora7={setBanderaPlanMejora7} cambiarComponentePlanMejora8={setBanderaPlanMejora8} seguimiento={setEsSeguimiento} modifica={setModificaPropuesta} /> :
                                                             <ResEspeGestionPlanDeMejora        cambiarComponentePlanMejora1={setBanderaPlanMejora1} cambiarComponentePlanMejora2={setBanderaPlanMejora2} cambiarComponentePlanMejora3={setBanderaPlanMejora3} cambiarComponentePlanMejora4={setBanderaPlanMejora4} />
                                    ) : opcionSeleccionada === "Reportes" ? (
                                        <ResEspeGestionReportes />
                                    ) : opcionSeleccionada === "gestMuestra" ? (
                                        bDetalleMuestra ?   <ResEspeVerDetalleMuestraMedicion   cambiarDetalleMuestra={setBDetalleMuestra} cambiarGestionAlumnos={setBGestionAlumnos} cambiarEvidencias={setBEvidencias} cambiarDetalleArchivos={setBDetalleArchivos} /> :
                                        bGestionAlumnos ?   <ResEspeGestionAlumnos              cambiarDetalleMuestra={setBDetalleMuestra} cambiarGestionAlumnos={setBGestionAlumnos} cambiarEvidencias={setBEvidencias} cambiarDetalleArchivos={setBDetalleArchivos} /> :
                                        bEvidencias ?       <ResEspeEvidencias                  cambiarDetalleMuestra={setBDetalleMuestra} cambiarGestionAlumnos={setBGestionAlumnos} cambiarEvidencias={setBEvidencias} cambiarDetalleArchivos={setBDetalleArchivos} cambiaId={setIdCom} cambiaIndicador={setIdI}/> :
                                        bDetalleArchivos ?  <ResEspeDetalleArchivos             cambiarDetalleMuestra={setBDetalleMuestra} cambiarGestionAlumnos={setBGestionAlumnos} cambiarEvidencias={setBEvidencias} cambiarDetalleArchivos={setBDetalleArchivos} idCompetencia={idCom} idIndicador={idI}/> :
                                                            <ResEspeGestMuestras                cambiarDetalleMuestra={setBDetalleMuestra} cambiarGestionAlumnos={setBGestionAlumnos} cambiarEvidencias={setBEvidencias} cambiarDetalleArchivos={setBDetalleArchivos} />
                                    ) : (
                                        bandera ?  <ResEspeAñadirCompetencia        cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarBanderaIndicador={setBanderaIndicador} /> :
                                        bandera2 ? <ResEspeAniadirIndicador         cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarComponente3={setBandera3} cambiarComponente4={setBandera4} cambiarBanderaIndicador={setBanderaIndicador} /> :
                                        bandera3 ? <RespEspVerDetalleCompetencia    cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarComponente3={setBandera3} cambiarComponente4={setBandera4} cambiarBanderaIndicador={setBanderaIndicador} /> :
                                        bandera4 ? <ResEspeVerDetalleIndicador      cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarComponente3={setBandera3} cambiarComponente4={setBandera4} cambiarBanderaIndicador={setBanderaIndicador} /> :
                                                   <ResEspeCompetencias             cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarComponente3={setBandera3} />
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {openModal && <ModalDragParametros closeModal={setOpenModal} />}
                          
            </LoadingOverlay>
            </LoadingOverlay>
            </LoadingOverlay>
            </LoadingOverlay>
            </LoadingOverlay></LoadingOverlay></LoadingOverlay>
            
            </LoadingOverlay>
            <ToastContainer />
        </div>

    );


}
