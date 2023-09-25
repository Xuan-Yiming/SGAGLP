import React, { useState, useEffect } from 'react'
import LoadingOverlay from 'react-loading-overlay';
import "../HojasDeEstilo/Reusable/RolBarraBase.css";
import logoBlanco from "../images/logoBlanco.png";
// import fotoPerfil from "../images/foto-perfil.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../HojasDeEstilo/Reusable/breadcrums.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useNavigate, Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import ResFacuGestionEspe from './ResFacuGestionEspe';
import ResFacuAniadirEspe from './ResFacuAniadirEspe';
import ResFacuAniadirResEspe from './ResFacuAniadirResEspe';
import ResFacuVerDetalleEspe from './ResFacuVerDetalleEspe';
import ResFacuGestionRep from './ResFacuGestionRep';
import ResFacuAniadirAsisEspe from './ResFacuAniadirAsisEspe';
import ResFacuGestionRepAlt from './ResFacuGestionRepAlt';
import { useLocalStorage } from './useLocalStorage';
import ResFacuVerPlanesDeMejora from './ResFacuVerPlanesDeMejora';
import ResFacuVerDetallePlanMejora from './ResFacuVerDetallePlanMejora';
import ResFacuVerDetalleActividad from './ResFacuVerDetalleActividad';
import ResFacuVerDetallePropuesta from './ResFacuVerDetallePropuesta';
import ResFacuDetalleArchivosActividades from './ResFacuDetalleArchivosActividades';
import ResFacuGestMuestras from './ResFacuGestMuestras';
import ResFacuVerDetalleMuestra from './ResFacuVerDetalleMuestra';
import Breadcrumb from 'react-bootstrap/Breadcrumb'


import {addBandera,addBanderaCargandoCompetencia,addBanderaCargandoEvidencia} from "../Redux/CargandoSlice";
import { BreadcrumbItem } from 'react-bootstrap';
export default function ResFacuBase() {
    const dispatch = useDispatch();
    const [banderaAniadirEspecialidad, setBanderaAniadirEspecialidad] = useState(false);
    const [banderaAniadirResEspecialidad, setBanderaAniadirResEspecialidad] = useState(false);
    const [banderaVerDetalleEspecialidad, setBanderaVerDetalleEspecialidad] = useState(false);
    const [banderaAniadirAsisEspecialidad, setBanderaAniadirAsisEspecialidad] = useState(false);
    const [banderaVerPlanesMejora, setBanderaVerPlanesMejora] = useState(false);
    const [banderaVerDetallePlanMejora, setBanderaVerDetallePlanMejora] = useState(false);
    const [banderaVerDetallePropuesta, setBanderaVerDetallePropuesta] = useState(false);
    const [banderaVerDetalleActividad, setBanderaVerDetalleActividad] = useState(false);
    const [banderaVerDetalleArchivosActividades, setBanderaVerDetalleArchivosActividades] = useState(false);
    const [banderaEstadoVerEspe, setBanderaEstadoVerEspe] = useState(false);



    const [banderaGestMuestras, setBanderaGestMuestras] = useState(false);
    const [banderaVerDetalleMuestraMedicion, setBanderaVerDetalleMuestraMedicion] = useState(false);
    const [banderaGestAlumnos, setBanderaGestAlumnos] = useState(false);
    const [banderaGestEvidencias, setBanderaGestEvidencias] = useState(false);
    const [banderaDetalleArchivos, setBanderaDetalleArchivos] = useState(false);



    const [cookies, setCookie] = useCookies();
    const [opcionSeleccionada, setOpcionSeleccionada] = useState("gestEspes");
    const [foto, setFoto] = useLocalStorage("foto");
    const [nombre, setNombre] = useLocalStorage("nombre");
    const [aPaterno, setAPaterno] = useLocalStorage("aPaterno");
    const completed = useSelector((state) => state.Cargando);
    const navigate = useNavigate();

    const datosUsuario = useSelector((state) => state.Usuario);

    const verEnlace = (opcion) => {
        setBanderaAniadirEspecialidad(false);
        setBanderaAniadirResEspecialidad(false);
        setBanderaVerDetalleEspecialidad(false);
        setBanderaAniadirAsisEspecialidad(false);
        setOpcionSeleccionada(opcion);
    };

    const atras = () => {
        if (banderaAniadirEspecialidad || banderaVerDetalleEspecialidad) {
            setBanderaAniadirEspecialidad(false);
            setBanderaAniadirResEspecialidad(false);
            setBanderaVerDetalleEspecialidad(false);
            setBanderaAniadirAsisEspecialidad(false);
        } else if (banderaAniadirResEspecialidad && !banderaEstadoVerEspe) {
            setBanderaAniadirResEspecialidad(false);
            setBanderaAniadirEspecialidad(true);
            setBanderaVerDetalleEspecialidad(false);
            setBanderaAniadirAsisEspecialidad(false);
        } else if (banderaAniadirResEspecialidad && banderaEstadoVerEspe) {
            setBanderaAniadirResEspecialidad(false);
            setBanderaAniadirEspecialidad(false);
            setBanderaVerDetalleEspecialidad(true);
            setBanderaAniadirAsisEspecialidad(false);
        } else if (banderaAniadirAsisEspecialidad && !banderaEstadoVerEspe) {
            setBanderaAniadirAsisEspecialidad(false);
            setBanderaAniadirEspecialidad(true);
            setBanderaAniadirResEspecialidad(false);
            setBanderaVerDetalleEspecialidad(false);
        } else if (banderaAniadirAsisEspecialidad && banderaEstadoVerEspe) {
            setBanderaAniadirAsisEspecialidad(false);
            setBanderaAniadirEspecialidad(false);
            setBanderaAniadirResEspecialidad(false);
            setBanderaVerDetalleEspecialidad(true);
        } else if (banderaVerPlanesMejora) {
            setBanderaVerPlanesMejora(false);
            setBanderaVerDetalleEspecialidad(true);
        }else if (banderaVerDetallePlanMejora) {
            setBanderaVerPlanesMejora(true);
            setBanderaVerDetallePlanMejora(false);
        }else if (banderaVerDetallePropuesta) {
            setBanderaVerDetallePlanMejora(true);
            setBanderaVerDetallePropuesta(false);
        }else if (banderaVerDetalleActividad) {
            setBanderaVerDetallePropuesta(true);
            setBanderaVerDetalleActividad(false);
            
        }else if (banderaVerDetalleMuestraMedicion) {
            setBanderaGestMuestras(true);
            setBanderaVerDetalleMuestraMedicion(false);
        }else if (banderaGestMuestras) {
            setBanderaGestMuestras(false);
            setBanderaVerDetalleEspecialidad(true);
        }else if (banderaVerDetalleArchivosActividades) {
            dispatch(addBanderaCargandoEvidencia(false));
            setTimeout(async () => {
            setBanderaVerDetalleArchivosActividades(false);
            setBanderaVerDetalleActividad(true);
            },600);
        }
         else {
            navigate("/inicio")
        }
    }

    useEffect(() => {
        if (!cookies.jwt) {
            navigate('/');
        }
    }, [cookies.jwt, navigate]);

    if (!cookies.jwt) {
        console.log("OJO")
        return null; 
    }

    return (
        
        <div className="baseRBB">
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
            <div className="row">
                <div className="menuRBB col-auto col-2 px-0">
                    <div className="barraLateralRBB d-flex flex-column align-items-center col-2 text-white px-3 pt-2 min-vh-100">
                        <div className="d-flex flex-column align-items-center pb-3 mb-md-0">
                            <img src={logoBlanco} style={{ width: "190px" }} />
                        </div>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className={`nav-item ${opcionSeleccionada === 'gestEspes' ? 'fondoSeleccionado' : ''}`} onClick={() => setOpcionSeleccionada('gestEspes')}>
                                <a href="#" className="nav-link align-middle px-3" onClick={() => verEnlace("gestEspes")}>
                                    <i class="bi bi-buildings"></i><span className="opcionRBB ms-1 d-none d-sm-inline">Gestionar Especialidades</span>
                                </a>
                            </li>
                            <li className={`nav-item ${opcionSeleccionada === 'gestResultEspes' ? 'fondoSeleccionado' : ''}`} onClick={() => setOpcionSeleccionada('gestResultEspes')}>
                                <a href="#" className="nav-link align-middle px-3" onClick={() => verEnlace("gestResultEspes")}>
                                    <i class="bi bi-file-bar-graph"></i><span className="opcionRBB ms-1 d-none d-sm-inline">Resultado Especialidades</span>
                                </a>
                            </li>
                        </ul>
                        <hr></hr>
                        <div className="dropdown">
                            <div className='titulo-RBB'>
                                Responsable de Facultad
                            </div>
                            <hr></hr>
                            <div className="perfil-RBB">
                                <img className="fotoPerfilEspe" src={foto} alt="" />
                                <div className="cuadro-RBB">
                                    <div className="nombre">
                                        <p> {nombre} {aPaterno}</p>
                                    </div>
                                    <div className="tiempo">
                                        <p>{(new Date()).toLocaleDateString()}</p>
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
                                        {(banderaAniadirEspecialidad || banderaVerDetalleEspecialidad) ? 
                                            <Breadcrumb.Item onClick={()=>atras()}>Gestionar Especialidades</Breadcrumb.Item> : <></>}
                                        {(banderaAniadirResEspecialidad || banderaAniadirAsisEspecialidad) && !banderaEstadoVerEspe ? 
                                            <><Breadcrumb.Item onClick={() => { setBanderaAniadirResEspecialidad(false); setBanderaAniadirAsisEspecialidad(false) }}> Gestionar Especialidades </Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={atras}> Añadir Especialidad</Breadcrumb.Item></> : <></>}
                                        {(banderaAniadirResEspecialidad || banderaAniadirAsisEspecialidad) && banderaEstadoVerEspe ? 
                                            <><Breadcrumb.Item onClick={() => { setBanderaAniadirResEspecialidad(false); setBanderaAniadirAsisEspecialidad(false) }}> Gestionar Especialidades </Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={atras}> Detalle Especialidad</Breadcrumb.Item></> : <></>}
                                        {(banderaVerPlanesMejora) ? 
                                            <><Breadcrumb.Item onClick={() => { setBanderaVerPlanesMejora(false);}}> Gestionar Especialidades </Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={atras}> Detalle Especialidad</Breadcrumb.Item></> : <></>}
                                        {(banderaVerDetallePlanMejora) ?
                                            <><Breadcrumb.Item onClick={() => { setBanderaVerDetallePlanMejora(false);}}> Gestionar Especialidades </Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={() => { setBanderaVerDetallePlanMejora(false); setBanderaVerDetalleEspecialidad(true)}}> Detalle Especialidad</Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={atras}> Listar P. de Mejora </Breadcrumb.Item></> : <></>}
                                        {(banderaVerDetallePropuesta) ?
                                            <><Breadcrumb.Item onClick={() => { setBanderaVerDetallePropuesta(false);}}> Gestionar Especialidades </Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={() => { setBanderaVerDetallePropuesta(false); setBanderaVerDetalleEspecialidad(true)}}> Detalle Especialidad</Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={() => { setBanderaVerDetallePropuesta(false); setBanderaVerDetallePlanMejora(true)}}> Listar P. de Mejora </Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={atras}> Detalle P. Mejora </Breadcrumb.Item> </> : <></>}
                                        {(banderaVerDetalleActividad) ?
                                            <><Breadcrumb.Item onClick={() => { setBanderaVerDetalleActividad(false);}}> Gestionar Especialidades </Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={() => { setBanderaVerDetalleActividad(false); setBanderaVerDetalleEspecialidad(true)}}> Detalle Especialidad</Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={() => { setBanderaVerDetalleActividad(false); setBanderaVerDetallePlanMejora(true)}}> Listar P. de Mejora </Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={() => { setBanderaVerDetalleActividad(false); setBanderaVerDetallePropuesta(true)}}> Detalle P. Mejora </Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={atras}> Detalle Propuesta </Breadcrumb.Item> </> : <></>}
                                        {(banderaVerDetalleArchivosActividades) ?
                                            <><Breadcrumb.Item onClick={() => { setBanderaVerDetalleArchivosActividades(false);}}> Gestionar Especialidades </Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={() => { setBanderaVerDetalleArchivosActividades(false); setBanderaVerDetalleEspecialidad(true)}}> Detalle Especialidad</Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={() => { setBanderaVerDetalleArchivosActividades(false); setBanderaVerDetallePlanMejora(true)}}> Listar P. de Mejora </Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={() => { setBanderaVerDetalleArchivosActividades(false); setBanderaVerDetallePropuesta(true)}}> Detalle P. Mejora </Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={() => { setBanderaVerDetalleArchivosActividades(false); setBanderaVerDetalleActividad(true)}}> Detalle P. Mejora </Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={atras}> Detalle Actividad </Breadcrumb.Item> </> : <></>}
                                        {(banderaGestMuestras) ? 
                                            <><Breadcrumb.Item onClick={() => { setBanderaGestMuestras(false);}}> Gestionar Especialidades </Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={atras}> Detalle Especialidad</Breadcrumb.Item></> : <></>}
                                        {(banderaVerDetalleMuestraMedicion) ?
                                            <><Breadcrumb.Item onClick={() => { setBanderaVerDetalleMuestraMedicion(false);}}> Gestionar Especialidades </Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={() => { setBanderaVerDetalleMuestraMedicion(false); setBanderaVerDetalleEspecialidad(true)}}> Detalle Especialidad</Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={atras}> Listar Muestras </Breadcrumb.Item></> : <></>}
                                            
                                    </Breadcrumb>
                                    <p>
                                        {
                                            banderaAniadirEspecialidad ? "Añadir Especialidad" :
                                            banderaAniadirResEspecialidad ? "Añadir Responsable de Especialidad" :
                                            banderaVerDetalleEspecialidad ? "Ver Detalle de Especialidad" :
                                            banderaVerPlanesMejora ? "Ver Planes de Mejora" :
                                            banderaVerDetallePlanMejora ? "Ver Detalle de Plan de Mejora" :
                                            banderaVerDetallePropuesta ? "Ver Detalle de Propuesta" :
                                            banderaVerDetalleActividad ? "Ver Detalle de Actividad" :
                                            banderaVerDetalleArchivosActividades ? "Ver Detalle de Evidencias" :
                                            banderaAniadirAsisEspecialidad ? "Añadir Asistente de Especialidad" :
                                            banderaGestMuestras ? "Consulta de Muestras" :
                                            banderaVerDetalleMuestraMedicion?"Detalle de Muestra" :
                                            banderaVerDetalleArchivosActividades ? "Ver Archivos de Actividad" :
                                            opcionSeleccionada === "gestEspes" ? "Gestionar Especialidades" :
                                            opcionSeleccionada === "gestResultEspes" ? "Resultados de Especialidades" :
                                            "Gestionar Especialidades"
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* const [banderaGestMuestras, setBanderaGestMuestras] = useState(false);
    const [banderaVerDetalleMuestraMedicion, setBanderaVerDetalleMuestraMedicion] = useState(false);
    const [banderaGestAlumnos, setBanderaGestAlumnos] = useState(false);
    const [banderaGestEvidencias, setBanderaGestEvidencias] = useState(false);
    const [banderaDetalleArchivos, setBanderaDetalleArchivos] = useState(false); */}

                            <div className="area-trabajo-RBB">
                                {opcionSeleccionada === "gestEspecialidades" ? (
                                    banderaAniadirEspecialidad ?      <ResFacuAniadirEspe       cambiarComponenteAniadirEspecialidad={setBanderaAniadirEspecialidad} cambiarComponenteAniadirResEspecialidad={setBanderaAniadirResEspecialidad} cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad} cambiarComponenteAniadirAsisEspecialidad={setBanderaAniadirAsisEspecialidad} cambiarEstadoVerEspe={setBanderaEstadoVerEspe} /> :
                                    banderaAniadirResEspecialidad ?   <ResFacuAniadirResEspe    cambiarComponenteAniadirEspecialidad={setBanderaAniadirEspecialidad} cambiarComponenteAniadirResEspecialidad={setBanderaAniadirResEspecialidad} cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad} cambiarComponenteAniadirAsisEspecialidad={setBanderaAniadirAsisEspecialidad} cambiarEstadoVerEspe={setBanderaEstadoVerEspe} /> :
                                    banderaVerDetalleEspecialidad ?   <ResFacuVerDetalleEspe    cambiarComponenteAniadirEspecialidad={setBanderaAniadirEspecialidad} cambiarComponenteAniadirResEspecialidad={setBanderaAniadirResEspecialidad} cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad} cambiarComponenteAniadirAsisEspecialidad={setBanderaAniadirAsisEspecialidad} cambiarEstadoVerEspe={setBanderaEstadoVerEspe} cambiarComponente={setBanderaGestMuestras} /> :  
                                    banderaAniadirAsisEspecialidad ?  <ResFacuAniadirAsisEspe   cambiarComponenteAniadirEspecialidad={setBanderaAniadirEspecialidad} cambiarComponenteAniadirResEspecialidad={setBanderaAniadirResEspecialidad} cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad} cambiarComponenteAniadirAsisEspecialidad={setBanderaAniadirAsisEspecialidad} cambiarEstadoVerEspe={setBanderaEstadoVerEspe} /> :
                                    banderaGestMuestras ? <ResFacuGestMuestras     cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad}  cambiarComponente={setBanderaGestMuestras} cambiarComponente1={setBanderaVerDetalleMuestraMedicion} 
                                                        cambiarComponente2={setBanderaGestAlumnos} cambiarComponente3={setBanderaGestEvidencias} cambiarComponente4={setBanderaDetalleArchivos} /> :
                                    banderaVerDetalleMuestraMedicion ? <ResFacuVerDetalleMuestra     cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad}  cambiarComponente={setBanderaGestMuestras} cambiarComponente1={setBanderaVerDetalleMuestraMedicion} 
                                                        cambiarComponente2={setBanderaGestAlumnos} cambiarComponente3={setBanderaGestEvidencias} cambiarComponente4={setBanderaDetalleArchivos} /> :                                                        
                                                        <ResFacuGestionEspe       cambiarComponenteAniadirEspecialidad={setBanderaAniadirEspecialidad} cambiarComponenteAniadirResEspecialidad={setBanderaAniadirResEspecialidad} cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad} cambiarComponenteAniadirAsisEspecialidad={setBanderaAniadirAsisEspecialidad} cambiarEstadoVerEspe={setBanderaEstadoVerEspe} /> 
                                ) : opcionSeleccionada === "gestResultEspes" ? (
                                    // <ResFacuGestionRep cambiarComponenteAniadirEspecialidad={setBanderaAniadirEspecialidad} cambiarComponenteAniadirResEspecialidad={setBanderaAniadirResEspecialidad} cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad} />
                                    <ResFacuGestionRepAlt cambiarComponenteAniadirEspecialidad={setBanderaAniadirEspecialidad} cambiarComponenteAniadirResEspecialidad={setBanderaAniadirResEspecialidad} cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad} />
                                ) : (
                                    banderaAniadirEspecialidad ?     <ResFacuAniadirEspe        cambiarComponenteAniadirEspecialidad={setBanderaAniadirEspecialidad} cambiarComponenteAniadirResEspecialidad={setBanderaAniadirResEspecialidad} cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad} cambiarComponenteAniadirAsisEspecialidad={setBanderaAniadirAsisEspecialidad} cambiarEstadoVerEspe={setBanderaEstadoVerEspe} /> :
                                    banderaAniadirResEspecialidad ?  <ResFacuAniadirResEspe     cambiarComponenteAniadirEspecialidad={setBanderaAniadirEspecialidad} cambiarComponenteAniadirResEspecialidad={setBanderaAniadirResEspecialidad} cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad} cambiarComponenteAniadirAsisEspecialidad={setBanderaAniadirAsisEspecialidad} cambiarEstadoVerEspe={setBanderaEstadoVerEspe} /> :
                                    banderaVerDetalleEspecialidad ?  <ResFacuVerDetalleEspe     cambiarComponenteAniadirEspecialidad={setBanderaAniadirEspecialidad} cambiarComponenteAniadirResEspecialidad={setBanderaAniadirResEspecialidad} cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad} cambiarComponenteAniadirAsisEspecialidad={setBanderaAniadirAsisEspecialidad}cambiarComponenteVerPlanesMejora={setBanderaVerPlanesMejora} cambiarEstadoVerEspe={setBanderaEstadoVerEspe} cambiarComponente={setBanderaGestMuestras} />:
                                    banderaVerPlanesMejora ?  <ResFacuVerPlanesDeMejora     cambiarComponenteAniadirEspecialidad={setBanderaAniadirEspecialidad} cambiarComponenteAniadirResEspecialidad={setBanderaAniadirResEspecialidad} cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad} cambiarComponenteAniadirAsisEspecialidad={setBanderaAniadirAsisEspecialidad} cambiarComponenteVerPlanesMejora={setBanderaVerPlanesMejora} cambiarComponenteVerDetallePlanMejora={setBanderaVerDetallePlanMejora} cambiarEstadoVerEspe={setBanderaEstadoVerEspe} /> :
                                    banderaVerDetallePlanMejora ?  <ResFacuVerDetallePlanMejora     cambiarComponenteAniadirEspecialidad={setBanderaAniadirEspecialidad} cambiarComponenteAniadirResEspecialidad={setBanderaAniadirResEspecialidad} cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad} cambiarComponenteAniadirAsisEspecialidad={setBanderaAniadirAsisEspecialidad} cambiarComponenteVerPlanesMejora={setBanderaVerPlanesMejora} cambiarComponenteVerDetallePropuesta={setBanderaVerDetallePropuesta} cambiarComponenteVerDetallePlanMejora={setBanderaVerDetallePlanMejora} cambiarEstadoVerEspe={setBanderaEstadoVerEspe} /> :
                                    banderaVerDetallePropuesta ?  <ResFacuVerDetallePropuesta     cambiarComponenteAniadirEspecialidad={setBanderaAniadirEspecialidad} cambiarComponenteAniadirResEspecialidad={setBanderaAniadirResEspecialidad} cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad} cambiarComponenteAniadirAsisEspecialidad={setBanderaAniadirAsisEspecialidad} cambiarComponenteVerPlanesMejora={setBanderaVerPlanesMejora} cambiarComponenteVerDetallePropuesta={setBanderaVerDetallePropuesta} cambiarComponenteVerDetallePlanMejora={setBanderaVerDetallePlanMejora} cambiarComponenteVerDetalleActividad={setBanderaVerDetalleActividad}cambiarEstadoVerEspe={setBanderaEstadoVerEspe} /> :
                                    banderaVerDetalleActividad ?  <ResFacuVerDetalleActividad        cambiarComponenteAniadirEspecialidad={setBanderaAniadirEspecialidad} cambiarComponenteAniadirResEspecialidad={setBanderaAniadirResEspecialidad} cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad} cambiarComponenteAniadirAsisEspecialidad={setBanderaAniadirAsisEspecialidad} cambiarComponenteVerPlanesMejora={setBanderaVerPlanesMejora} cambiarComponenteVerDetallePropuesta={setBanderaVerDetallePropuesta} cambiarComponenteVerDetallePlanMejora={setBanderaVerDetallePlanMejora} cambiarComponenteVerDetalleActividad={setBanderaVerDetalleActividad} cambiarComponenteVerArchivosActividades={setBanderaVerDetalleArchivosActividades} cambiarEstadoVerEspe={setBanderaEstadoVerEspe} /> :
                                    banderaVerDetalleArchivosActividades ?  <ResFacuDetalleArchivosActividades         cambiarComponenteAniadirEspecialidad={setBanderaAniadirEspecialidad} cambiarComponenteAniadirResEspecialidad={setBanderaAniadirResEspecialidad} cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad} cambiarComponenteAniadirAsisEspecialidad={setBanderaAniadirAsisEspecialidad} cambiarComponenteVerPlanesMejora={setBanderaVerPlanesMejora} cambiarComponenteVerDetallePropuesta={setBanderaVerDetallePropuesta} cambiarComponenteVerDetallePlanMejora={setBanderaVerDetallePlanMejora} cambiarComponenteVerDetalleActividad={setBanderaVerDetalleActividad} cambiarEstadoVerEspe={setBanderaEstadoVerEspe} /> :
                                    banderaAniadirAsisEspecialidad ? <ResFacuAniadirAsisEspe    cambiarComponenteAniadirEspecialidad={setBanderaAniadirEspecialidad} cambiarComponenteAniadirResEspecialidad={setBanderaAniadirResEspecialidad} cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad} cambiarComponenteAniadirAsisEspecialidad={setBanderaAniadirAsisEspecialidad} cambiarEstadoVerEspe={setBanderaEstadoVerEspe} /> :
                                    banderaGestMuestras ? <ResFacuGestMuestras     cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad}  cambiarComponente={setBanderaGestMuestras} cambiarComponente1={setBanderaVerDetalleMuestraMedicion} 
                                                        cambiarComponente2={setBanderaGestAlumnos} cambiarComponente3={setBanderaGestEvidencias} cambiarComponente4={setBanderaDetalleArchivos} /> :
                                    banderaVerDetalleMuestraMedicion ? <ResFacuVerDetalleMuestra     cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad}  cambiarComponente={setBanderaGestMuestras} cambiarComponente1={setBanderaVerDetalleMuestraMedicion} 
                                                        cambiarComponente2={setBanderaGestAlumnos} cambiarComponente3={setBanderaGestEvidencias} cambiarComponente4={setBanderaDetalleArchivos} /> :
                                                        <ResFacuGestionEspe       cambiarComponenteAniadirEspecialidad={setBanderaAniadirEspecialidad} cambiarComponenteAniadirResEspecialidad={setBanderaAniadirResEspecialidad} cambiarComponenteVerDetalleEspecialidad={setBanderaVerDetalleEspecialidad} cambiarComponenteAniadirAsisEspecialidad={setBanderaAniadirAsisEspecialidad} cambiarEstadoVerEspe={setBanderaEstadoVerEspe} /> 
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            </LoadingOverlay>
            </LoadingOverlay>
        </div>
    );


}