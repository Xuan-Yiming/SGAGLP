import { React, useEffect } from 'react'
import "../HojasDeEstilo/MiPerfilBase.css";
import "../HojasDeEstilo/Reusable/RolBarraBase.css";
import logoBlanco from "../images/logoBlanco.png";
// import fotoPerfil from "../images/foto-perfil.jpg";
import 'bootstrap-icons/font/bootstrap-icons.css'
import Perfil from './Perfil.jsx';
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, Link, redirect } from "react-router-dom";


export default function MiPerfilBase() {

    const fecha = new Date();

    const navigate = useNavigate();

    const location = useLocation();

    const atras = () => {
        navigate("/inicio")
    }

    const [cookies] = useCookies(['jwt']);

    useEffect(() => {
        if (!cookies.jwt) {
            navigate('/');
        }
    }, [cookies.jwt, navigate]);

    if (!cookies.jwt) {
        console.log("OJO")
        return null; // Opcionalmente, puedes mostrar un mensaje de carga en lugar de null
    }




    return (

        <div className="containerMP">
            <div className="row flex-nowrap">

                <div className="mainAdminMiPerfil col">
                    <div className="contenedor-RBB">
                        <div className="subContenedorMiPerfil contPerf">
                            <div className="encabezadoMP">
                                <div onClick={atras} className="icono-flecha-RBB flechaMiPe">
                                    <i className="bi bi-arrow-left-circle"></i>
                                </div>
                                <div className="titulo-pestaña-RBB">
                                    <p className='tituloMiPe'>Mi Perfil</p>
                                </div>
                            </div>

                            <div className="areatrabajoMiPerfil">
                                <Perfil nombre={location.state.nombre} aPaterno={location.state.aPaterno} aMaterno={location.state.aMaterno} codigo={location.state.codigo} correo={location.state.correo} celular={location.state.celular} correo2={location.state.correo2} id={location.state.id} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}