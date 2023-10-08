import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import "../HojasDeEstilo/Reusable/RolBarraBase.css";
import logoBlanco from "../images/logoBlanco.png";
// import fotoPerfil from "../images/foto-perfil.jpg";
import 'bootstrap-icons/font/bootstrap-icons.css'
import ResMediEspaciosMedicion from './ResMediEspaciosMedicion';
import ResMediMuestraMedicion from './ResMediMuestraMedicion';
import ResMediVerDetalleMuestraMedicion from './ResMediVerDetalleMuestraMedicion';
import ResMediEvidencias from './ResMediEvidencias';
import ResMediGestionAlumnos from './ResMediGestionAlumnos';
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ResMediDetalleArchivos from './ResMediDetalleArchivos';
import { useCookies } from "react-cookie";
import ResMediCargaAlumnos from './ResMediCargaAlumnos';
import { set } from 'date-fns';
import { useLocalStorage } from './useLocalStorage';
import { addIdMedicion } from "../Redux/CuentaSlice";
import { addIdAdmin } from "../Redux/AdministradorSlice";
import { addDatosUsuario } from '../Redux/UsuarioSlice';
import LoadingOverlay from 'react-loading-overlay';
import { addBanderaCargarMedicion ,addBanderaCargarEvidenciaMuestra} from "../Redux/CargandoSlice";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import "../HojasDeEstilo/Reusable/breadcrums.css";
export default function ResMediBase() {

    const fecha = new Date();

    const [bandera, setBandera] = useState(false);
    const [bandera2, setBandera2] = useState(false);
    const [bandera3, setBandera3] = useState(false);
    const [bandera4, setBandera4] = useState(false);
    const [bandera5, setBandera5] = useState(false);
    const [bandera6, setBandera6] = useState(false);
    const [idCom, setIdCom] = useState('');
    const [idI,setIdI]=useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const datosUsuario = useSelector((state) => state.Usuario);
    const [cookies, setCookie] = useCookies();
    const completed = useSelector((state) => state.Cargando);

    const [id, setId] = useLocalStorage("id");
    const [idU, setIdU] = useLocalStorage("idUsuario");
    const [nombre, setNombre] = useLocalStorage("nombre");
    const [aPaterno, setAPaterno] = useLocalStorage("aPaterno");
    const [aMaterno, setAMaterno] = useLocalStorage("aMaterno");
    const [foto, setFoto] = useLocalStorage("foto");

    const location = useLocation();
    console.log(location.idA);
    dispatch(addIdMedicion(id));
    dispatch(addIdAdmin(idU));
    const atras = () => {
        if (bandera) {
            setBandera(false);
            setBandera2(false);
            setBandera3(false);
            setBandera4(false);
            setBandera5(false);
            setBandera6(false);
        } else if (bandera2) {

            dispatch(addBanderaCargarMedicion(false));
            setTimeout(async () => {
                setBandera(true);
                setBandera2(false);
                setBandera3(false);
                setBandera4(false);
                setBandera5(false);
                setBandera6(false);
             },500);
        } else if (bandera3) {
            dispatch(addBanderaCargarMedicion(false));
            setTimeout(async () => {
            setBandera(true);
            setBandera2(false);
            setBandera3(false);
            setBandera4(false);
            setBandera5(false);
            setBandera6(false);
        },750);
        } else if (bandera4) {
            dispatch(addBanderaCargarEvidenciaMuestra(false));
            setTimeout(async () => {
            setBandera(false);
            setBandera2(false);
            setBandera3(true);
            setBandera4(false);
            setBandera5(false);
            setBandera6(false);
        },750);
        }
        else if (bandera6) {

            dispatch(addBanderaCargarMedicion(false));
            setTimeout(async () => {
            setBandera(true);
            setBandera2(false);
            setBandera3(false);
            setBandera4(false);
            setBandera5(false);
            setBandera6(false);
        },750);
            // setBandera(true)
            // setBandera6(false);
        }
        else if (bandera5) {

            setBandera(false);
            setBandera2(false);
            setBandera3(false);
            setBandera4(false);
            setBandera5(false);
            setBandera6(true);
       
            // setBandera5(false)
            // setBandera6(true);
        }
        else {
            navigate("/inicio");
        }
        // {bandera?setBandera(false):bandera2?setBandera2(false):bandera3?setBandera3(false):navigate("/inicio")}
    }
    useEffect(() => {
        let datos = {
            nombres: nombre,
            apellidoPaterno: aPaterno,
            apellidoMaterno: aMaterno,
        }
        dispatch(addIdMedicion(id));
        dispatch(addIdAdmin(idU));
        dispatch(addDatosUsuario(datos));
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
                active={!completed.banderaCargarEvidenciaCompetencia}
                spinner
                text='Cargando evidencias de indicador...'
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
                active={!completed.banderaCargarEvidenciaMuestra}
                spinner
                text='Cargando evidencias de muestra...'
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
                active={!completed.banderaEliminaEvidenciaMedicion}
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

                <LoadingOverlay
                    active={!completed.banderaEvidenciaMedicion}
                    spinner
                    text='Subiendo evidencias...'
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
                                    <li className="nav-item" style={{ backgroundColor: '#003C7A', width: '100%', borderRadius: '10px' }}>
                                        <a href="#" className="nav-link align-middle px-3">
                                            <i class="bi bi-file-earmark-person"></i><span className="opcionRBB ms-1 d-none d-sm-inline">Mediciones</span>
                                        </a>
                                    </li>

                                </ul>
                                <hr></hr>
                                <div className="dropdown">
                                    <div className='titulo-RBB'>
                                        {/*location.state.rol*/}
                                        Responsable de Medición
                                    </div>
                                    <hr></hr>
                                    <div className="perfil-RBB">
                                        <img className="fotoPerfilEspe" src={foto} alt="" />
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
                                                    <Breadcrumb.Item onClick={atras}>Gestión Muestras</Breadcrumb.Item> : <></>}
                                                {bandera2 ?
                                                    <><Breadcrumb.Item onClick={()=>{setBandera2(false);}}>Gestión Muestras</Breadcrumb.Item>
                                                    <Breadcrumb.Item onClick={atras}>Detalle Muestra</Breadcrumb.Item> </> : <></>}
                                                {bandera3 ?
                                                    <><Breadcrumb.Item onClick={()=>{setBandera3(false);}}>Gestión Muestras</Breadcrumb.Item>
                                                    <Breadcrumb.Item onClick={atras}>Detalle Muestra</Breadcrumb.Item> </> : <></>}
                                                {bandera4 ?
                                                    <><Breadcrumb.Item onClick={()=>{setBandera4(false);}}>Gestión Muestras</Breadcrumb.Item>
                                                    <Breadcrumb.Item onClick={()=>{setBandera4(false);setBandera(true)}}>Detalle Muestra</Breadcrumb.Item>
                                                    <Breadcrumb.Item onClick={atras}>Evidencias</Breadcrumb.Item> </> : <></>}
                                                {bandera6 ?
                                                    <><Breadcrumb.Item onClick={()=>{setBandera6(false);}}>Gestión Muestras</Breadcrumb.Item>
                                                    <Breadcrumb.Item onClick={atras}>Detalle Muestra</Breadcrumb.Item> </> : <></>}
                                                {bandera5 ?
                                                    <><Breadcrumb.Item onClick={()=>{setBandera5(false);}}>Gestión Muestras</Breadcrumb.Item>
                                                    <Breadcrumb.Item onClick={()=>{setBandera5(false);setBandera(true)}}>Detalle Muestra</Breadcrumb.Item>
                                                    <Breadcrumb.Item onClick={atras}>Alumnos</Breadcrumb.Item> </> : <></>}
                                                
                                            </Breadcrumb>
                                            <p>
                                                {
                                                    bandera ? "Muestra de Medición" :
                                                    bandera2 ? "Muestra de Medición" :
                                                    "Muestras de Medición"
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="area-trabajo-RBB">
                                        {bandera ? <ResMediVerDetalleMuestraMedicion cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarComponente3={setBandera3} cambiarComponente4={setBandera4} cambiarComponente5={setBandera5} cambiarComponente6={setBandera6} /> :
                                        bandera2 ? <ResMediMuestraMedicion           cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarComponente3={setBandera3} cambiarComponente4={setBandera4} cambiarComponente5={setBandera5} cambiarComponente6={setBandera6}/> :
                                        bandera3 ? <ResMediEvidencias                cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarComponente3={setBandera3} cambiarComponente4={setBandera4} cambiarComponente5={setBandera5} cambiarComponente6={setBandera6} cambiaId={setIdCom} cambiaIndicador={setIdI}/> :
                                        bandera4 ? <ResMediDetalleArchivos           cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarComponente3={setBandera3} cambiarComponente4={setBandera4} cambiarComponente5={setBandera5} cambiarComponente6={setBandera6}  idCompetencia={idCom} idIndicador={idI}/> :
                                        bandera5 ? <ResMediCargaAlumnos              cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarComponente3={setBandera3} cambiarComponente4={setBandera4} cambiarComponente5={setBandera5} cambiarComponente6={setBandera6} /> :
                                        bandera6 ? <ResMediGestionAlumnos            cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarComponente3={setBandera3} cambiarComponente4={setBandera4} cambiarComponente5={setBandera5} cambiarComponente6={setBandera6} /> :
                                                   <ResMediEspaciosMedicion          cambiarComponente={setBandera} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </LoadingOverlay>
                </LoadingOverlay>
            </LoadingOverlay>
            </LoadingOverlay>
            </LoadingOverlay>
            </LoadingOverlay>
            </LoadingOverlay>
        </div>

    );


}