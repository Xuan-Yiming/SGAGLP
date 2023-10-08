import React, { useState, useEffect } from 'react'
import "../HojasDeEstilo/Reusable/RolBarraBase.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../HojasDeEstilo/Reusable/breadcrums.css";
import logoBlanco from "../images/logoBlanco.png";
// import fotoPerfil from "../images/foto-perfil.jpg";
import 'bootstrap-icons/font/bootstrap-icons.css'
import AdminDetalleCuenta from './AdminDetalleCuenta';
import AdminAñadirCuenta from './AdminAñadirCuenta';
import AdminGestionCuentas from './AdminGestionCuentas';
import AdminAniadirArchivo from './AdminAniadirArchivo';
import AdminGestionFacultades from './AdminGestionFacultades';
import AdminAniadirFacultad from './AdminAniadirFacultad';
import AdminAniadirResFacultad from './AdminAniadirResFacultad';
import AdminVerDetalleFacultad from './AdminVerDetalleFacultad';
import AdminAniadirAsisFacultad from './AdminAniadirAsisFacultad';
import AdminGestionCiclosAcademicos from './AdminGestionCiclosAcademicos';
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocalStorage } from './useLocalStorage';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

export default function AdminBase() {

    const dispatch = useDispatch();
    const datosAdmin = useSelector((state) => state.Administrador);
    const datosUsuario = useSelector((state) => state.Usuario);

    const fecha = new Date();
    const [id, setId] = useLocalStorage("id")

    const [bandera, setBandera] = useState(false);
    const [bandera2, setBandera2] = useState(false);
    const [bandera3, setBandera3] = useState(false);
    const [banderaAniadirFacultad, setBanderaAniadirFacultad] = useState(false);
    const [banderaAniadirResFacultad, setBanderaAniadirResFacultad] = useState(false);
    const [banderaAniadirAsisFacultad, setBanderaAniadirAsisFacultad] = useState(false);
    const [banderaVerDetalleFacultad, setBanderaVerDetalleFacultad] = useState(false);
    const [banderaEstadoVerFacu, setBanderaEstadoVerFacu] = useState(false);
    const [cookies, setCookie] = useCookies();
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
    const [foto, setFoto] = useLocalStorage("foto");
    const [nombre, setNombre] = useLocalStorage("nombre");
    const [aPaterno, setAPaterno] = useLocalStorage("aPaterno");

    const navigate = useNavigate();

    const location = useLocation();





    const verEnlace = (opcion) => {
        setBandera(false);
        setBandera2(false);
        setBandera3(false);
        setBanderaAniadirFacultad(false);
        setBanderaAniadirResFacultad(false);
        setBanderaVerDetalleFacultad(false);
        setBanderaAniadirAsisFacultad(false);
        setOpcionSeleccionada(opcion);
    };

    //console.log(location.idA);
    const atras = () => {
        if (bandera) {
            setBandera(false)
            setBandera2(false)
            setBandera3(false)
        } else if (bandera2) {
            setBandera2(false)
        } else if (bandera3) {
            setBandera3(false)
        } else if (banderaAniadirFacultad) {
            setBanderaAniadirFacultad(false)
            setBanderaAniadirResFacultad(false)
            setBanderaVerDetalleFacultad(false)
            setBanderaAniadirAsisFacultad(false)
        } else if (banderaAniadirResFacultad && !banderaEstadoVerFacu) {
            setBanderaAniadirResFacultad(false)
            setBanderaVerDetalleFacultad(false)
            setBanderaAniadirAsisFacultad(false)
            setBanderaAniadirFacultad(true)
        } else if (banderaAniadirResFacultad && banderaEstadoVerFacu) {
            setBanderaAniadirResFacultad(false)
            setBanderaAniadirFacultad(false)
            setBanderaAniadirAsisFacultad(false)
            setBanderaVerDetalleFacultad(true)
        } else if (banderaAniadirAsisFacultad && !banderaEstadoVerFacu) {
            setBanderaAniadirResFacultad(false)
            setBanderaVerDetalleFacultad(false)
            setBanderaAniadirAsisFacultad(false)
            setBanderaAniadirFacultad(true)
        } else if (banderaAniadirAsisFacultad && banderaEstadoVerFacu) {
            setBanderaAniadirResFacultad(false)
            setBanderaAniadirFacultad(false)
            setBanderaAniadirAsisFacultad(false)
            setBanderaVerDetalleFacultad(true)
        } else if (banderaVerDetalleFacultad) {
            setBanderaVerDetalleFacultad(false)
            setBanderaAniadirFacultad(false)
            setBanderaAniadirResFacultad(false)
            setBanderaAniadirAsisFacultad(false)
        } else {
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
            <div className="row">
                <div className="menuRBB col-auto col-2 px-0">
                    <div className="barraLateralRBB d-flex flex-column align-items-center col-2 text-white px-3 pt-2 min-vh-100">
                        <div className="d-flex flex-column align-items-center pb-3 mb-md-0">
                            <img src={logoBlanco} style={{ width: "190px" }} />
                        </div>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className={`nav-item ${opcionSeleccionada === 'gestCuentas' ? 'fondoSeleccionado' : ''}`} onClick={() => setOpcionSeleccionada('gestCuentas')}>
                                <a href="#" className="nav-link align-middle px-3" onClick={() => verEnlace("gestCuentas")}>
                                    <i className="bi bi-person-square"></i> <span className="opcionRBB ms-1 d-none d-sm-inline">Gestionar Cuentas</span>
                                </a>
                            </li>
                            <li className={`nav-item ${opcionSeleccionada === 'gestFacultades' ? 'fondoSeleccionado' : ''}`} onClick={() => setOpcionSeleccionada('gestFacultades')}>
                                <a href="#" className="nav-link align-middle px-3" onClick={() => verEnlace("gestFacultades")}>
                                    <i className="bi bi-bank"></i> <span className="opcionRBB ms-1 d-none d-sm-inline">Gestionar facultades</span>
                                </a>
                            </li>
                            <li className={`nav-item ${opcionSeleccionada === 'gestCiclos' ? 'fondoSeleccionado' : ''}`} onClick={() => setOpcionSeleccionada('gestCiclos')}>
                                <a href="#" className="nav-link align-middle px-3" onClick={() => verEnlace("gestCiclos")}>
                                    <i className="bi bi-calendar-check"></i> <span className="opcionRBB ms-1 d-none d-sm-inline">Ciclos academicos</span>
                                </a>
                            </li>
                        </ul>
                        <hr></hr>
                        <div className="dropdown">
                            <div className='titulo-RBB'>
                                {/*location.state.rol*/}
                                Administrador
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
                                        <Breadcrumb.Item onClick={() => navigate("/inicio")}>Inicio</Breadcrumb.Item>
                                        {bandera ? 
                                            <Breadcrumb.Item onClick={atras}>Gestionar Cuentas</Breadcrumb.Item> : <></>}
                                        {bandera2 ? 
                                            <Breadcrumb.Item onClick={atras}>Gestionar Cuentas</Breadcrumb.Item> : <></>}
                                        {bandera3 ? 
                                            <Breadcrumb.Item onClick={atras}>Gestionar Cuentas</Breadcrumb.Item> : <></>}
                                        {(banderaAniadirFacultad || banderaVerDetalleFacultad) ? 
                                            <Breadcrumb.Item onClick={atras}>Gestionar Facultades</Breadcrumb.Item> : <></>}
                                        {(banderaAniadirResFacultad || banderaAniadirAsisFacultad) && !banderaEstadoVerFacu ? 
                                            <><Breadcrumb.Item onClick={() => { setBanderaAniadirResFacultad(false); setBanderaAniadirAsisFacultad(false) }}> Gestionar Facultades </Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={atras}>Añadir Facultad</Breadcrumb.Item></> : <></>}
                                        {(banderaAniadirResFacultad || banderaAniadirAsisFacultad) && banderaEstadoVerFacu ? 
                                            <><Breadcrumb.Item onClick={() => { setBanderaAniadirResFacultad(false); setBanderaAniadirAsisFacultad(false) }}> Gestionar Facultades </Breadcrumb.Item>
                                            <Breadcrumb.Item onClick={atras}>Detalle Facultad</Breadcrumb.Item></> : <></>}
                                    </Breadcrumb>
                                    <p>
                                        {
                                            bandera ? "Añadir Cuenta" :
                                            bandera2 ? "Detalle Cuenta" :
                                            bandera3 ? "Importar cuentas" :
                                            banderaAniadirFacultad ? "Añadir Facultad" :
                                            banderaAniadirResFacultad ? "Añadir Responsable Facultad" :
                                            banderaVerDetalleFacultad ? "Detalle Facultad" :
                                            banderaAniadirAsisFacultad ? "Añadir Asistente Facultad" :
                                            opcionSeleccionada === "gestCuentas" ? "Gestionar Cuentas" :
                                            opcionSeleccionada === "gestFacultades" ? "Gestionar Facultades" :
                                            opcionSeleccionada === "gestCiclos" ? "Gestionar Ciclos" :
                                            "Gestionar Cuentas"
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="area-trabajo-RBB">
                                {opcionSeleccionada === "gestCuentas" ? (
                                    bandera ?  <AdminAñadirCuenta   cambiarComponente={setBandera} idAutor={location.idAutor} /> :
                                    bandera2 ? <AdminDetalleCuenta  cambiarComponente2={setBandera2} /> :
                                    bandera3 ? <AdminAniadirArchivo cambiarComponente3={setBandera3} /> :
                                               <AdminGestionCuentas cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarComponente3={setBandera3} />
                                ) : opcionSeleccionada === "gestFacultades" ? (
                                    banderaAniadirFacultad ?     <AdminAniadirFacultad      cambiarComponenteAniadirFacultad={setBanderaAniadirFacultad} cambiarComponenteAniadirResFacultad={setBanderaAniadirResFacultad} cambiarComponenteVerDetalleFacultad={setBanderaVerDetalleFacultad} cambiarComponenteAniadirAsisFacultad={setBanderaAniadirAsisFacultad} cambiarEstadoVerFacu={setBanderaEstadoVerFacu} /> :
                                    banderaAniadirResFacultad ?  <AdminAniadirResFacultad   cambiarComponenteAniadirFacultad={setBanderaAniadirFacultad} cambiarComponenteAniadirResFacultad={setBanderaAniadirResFacultad} cambiarComponenteVerDetalleFacultad={setBanderaVerDetalleFacultad} cambiarComponenteAniadirAsisFacultad={setBanderaAniadirAsisFacultad} cambiarEstadoVerFacu={setBanderaEstadoVerFacu} /> :
                                    banderaVerDetalleFacultad ?  <AdminVerDetalleFacultad   cambiarComponenteAniadirFacultad={setBanderaAniadirFacultad} cambiarComponenteAniadirResFacultad={setBanderaAniadirResFacultad} cambiarComponenteVerDetalleFacultad={setBanderaVerDetalleFacultad} cambiarComponenteAniadirAsisFacultad={setBanderaAniadirAsisFacultad} cambiarEstadoVerFacu={setBanderaEstadoVerFacu} /> :
                                    banderaAniadirAsisFacultad ? <AdminAniadirAsisFacultad  cambiarComponenteAniadirFacultad={setBanderaAniadirFacultad} cambiarComponenteAniadirResFacultad={setBanderaAniadirResFacultad} cambiarComponenteVerDetalleFacultad={setBanderaVerDetalleFacultad} cambiarComponenteAniadirAsisFacultad={setBanderaAniadirAsisFacultad} cambiarEstadoVerFacu={setBanderaEstadoVerFacu} /> :
                                                                 <AdminGestionFacultades    cambiarComponenteAniadirFacultad={setBanderaAniadirFacultad} cambiarComponenteAniadirResFacultad={setBanderaAniadirResFacultad} cambiarComponenteVerDetalleFacultad={setBanderaVerDetalleFacultad} cambiarComponenteAniadirAsisFacultad={setBanderaAniadirAsisFacultad} cambiarEstadoVerFacu={setBanderaEstadoVerFacu} />
                                ) : opcionSeleccionada === "gestCiclos" ? (
                                    <AdminGestionCiclosAcademicos/>
                                ) : (
                                    bandera ?   <AdminAñadirCuenta   cambiarComponente={setBandera} idAutor={location.idAutor} /> :
                                    bandera2 ?  <AdminDetalleCuenta  cambiarComponente2={setBandera2} /> :
                                    bandera3 ?  <AdminAniadirArchivo cambiarComponente3={setBandera3} /> :
                                                <AdminGestionCuentas cambiarComponente={setBandera} cambiarComponente2={setBandera2} cambiarComponente3={setBandera3} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    );
}