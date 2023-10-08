import React, { useEffect, useState } from 'react';
import '../HojasDeEstilo/InicioRoles.css';
import "../HojasDeEstilo/Reusable/Boton.css";
import logoBlanco from '../images/logoBlanco.png';
import { Link, useFetcher, useNavigate, redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addIdAdmin } from "../Redux/AdministradorSlice";
import { addDatosUsuario } from "../Redux/UsuarioSlice";
import { addFotoUsuario } from "../Redux/UsuarioSlice";
import { addIdFacultad } from "../Redux/CuentaSlice";
import { addIdEspecialidad } from "../Redux/CuentaSlice";
import { addIdMedicion } from "../Redux/CuentaSlice";
import { useLocalStorage } from './useLocalStorage';

export default function InicioRoles() {


    const dispatch = useDispatch();
    const datosAdmin = useSelector((state) => state.Administrador);


    const [id, setId] = useLocalStorage("id", "")
    const [idU, setIdU] = useLocalStorage("idUsuario", "")
    const [foto, setFoto] = useLocalStorage("foto", "")



    const [idAutor, setIdAutor] = useState('');
    const [completado, setCompletado] = useState(true);
    const [ruta, setRuta] = useState("");
    const [cookies, setCookie] = useCookies();
    const [token, setToken] = useState();
    const [resultado, setResultado] = useState({});
    const [nombre, setNombre] = useLocalStorage("nombre", "")
    const [aPaterno, setAPaterno] = useLocalStorage("aPaterno", "")
    const [aMaterno, setAMaterno] = useLocalStorage("aMaterno", "")
    const navigate = useNavigate();

    const obtenerDatosUsuario = async () => {

        setToken(cookies.jwt)
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        console.log("configuracion:")
        console.log(config);

        try {
            const respuesta = await axios.get("http://localhost:3050/api/perfil/listarPerfiles", config)
            console.log(respuesta.data);
            setResultado(respuesta.data);
            setNombre(respuesta.data.usuario[0].nombres);
            setAPaterno(respuesta.data.usuario[0].apellidoPaterno);
            setAMaterno(respuesta.data.usuario[0].apellidoMaterno);
            setIdAutor(respuesta.data.usuario[0].idUsuario);

            console.log("AquiRoles");

            setIdU(respuesta.data.usuario[0].idUsuario);

            dispatch(addIdAdmin(respuesta.data.usuario[0].idUsuario));

            /* window.localStorage.setItem("IdAdmin",respuesta.data.usuario[0].idUsuario);
             let valor=window.localStorage.getItem("IdAdmin");
             console.log("TERRIIIIIIIIBLE:   ")
             console.log(valor)*/
            console.log("!?!")
            // setIdAdmin(respuesta.data.usuario[0].idUsuario)
            //  console.log(idAdmin)

            dispatch(addDatosUsuario(respuesta.data.usuario[0]))
            // console.log(datosAdmin.idAdmin);
            //  console.log("AquiRoles 2");

            //console.log(respuesta.data.usuario[0].idUsuario);
            // console.log(idAutor);

            obtenerRuta(respuesta.data.usuario[0].idUsuario)
        } catch (error) {
            console.log(error)
        }
    }
    const obtenerRuta = async (id) => {

        setToken(cookies.jwt)
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        console.log("configuracion:")
        console.log(config);
        const data = {
            //idMuestraMedicion: datosMedicion.idMuestraMedicion
            nombre_id: id
        }
        console.log(data)

        try {
            const respuesta = await axios.post("http://localhost:3050/api/usuario/mostrarUsuario", data, config)
            console.log(respuesta.data);

            setRuta(respuesta.data.Foto)

            console.log("Ruta")
            console.log(respuesta.data.Foto)

            dispatch(addFotoUsuario(respuesta.data.Foto));
            setFoto(respuesta.data.Foto)


        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        //   setBandera(true)
        obtenerDatosUsuario();
    }, []);



    console.log(idAutor);

    const verPerfil = () => {
        navigate("/inicio/perfil", { state: { nombre: resultado.usuario[0].nombres, aPaterno: resultado.usuario[0].apellidoPaterno, aMaterno: resultado.usuario[0].apellidoMaterno, codigo: resultado.usuario[0].codigoPUCP, correo: resultado.usuario[0].correo, celular: resultado.usuario[0].celular, correo2: resultado.usuario[0].correo2, id: resultado.usuario[0].idUsuario } })
    };
    const verOpcion = (rolActual, perfil) => {
        setId(perfil.idResponsabilidad)

        if (rolActual == "Administrador") {
            navigate("/inicio/admin");
            dispatch(addIdFacultad(perfil.idResponsabilidad));
        }
        else if (rolActual.includes("Responsable de Facultad") || rolActual.includes("Facultad")) {
            navigate("/inicio/resFacu");
            dispatch(addIdFacultad(perfil.idResponsabilidad));
        }
        else if (rolActual.includes("Responsable de Especialidad") || rolActual.includes("Especialidad")) {
            navigate("/inicio/resEspe");
            dispatch(addIdEspecialidad(perfil.idResponsabilidad));
        }
        else if (rolActual.includes("Responsable de Medición") || rolActual.includes("Medición")) {
            navigate("/inicio/resMedi")
            dispatch(addIdMedicion(perfil.idResponsabilidad))
        }


    };

    useEffect(() => {
        if (!cookies.jwt) {
            navigate('/');
        }
    }, [cookies.jwt, navigate]);

    if (!cookies.jwt) {
        console.log("OJO")
        return null; // Opcionalmente, puedes mostrar un mensaje de carga en lugar de null
    }
    const isResultadoEmpty = () => {
        return Object.keys(resultado).length === 0;
    };


    return (
        <div>
            {isResultadoEmpty() ? (
                <LoadingOverlay
                    active={true}
                    spinner
                    text='Cargando contenidos...'
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

                </LoadingOverlay>
            ) : (
                <div className='InicioRoles'>
                    <div className='contenedorBotonesSuperiores'>
                        <button className='buttonMiPerfil btnDisenio' onClick={verPerfil}>Mi perfil</button>
                        <div className='contenedorCerrarSesion'>
                            <Link to={"/"}>
                                <h6 className='botonCerrarSesion btnDisenio'>Cerrar sesión</h6>
                            </Link>
                        </div>
                    </div>
                    <div className='logoUnico'>
                        <img src={logoBlanco} className='logo' alt='Logo' />
                    </div>
                    <div className="txtBienvenida">
                        <p>Bienvenido(a), {nombre} {aPaterno} {aMaterno}</p>
                    </div>

                    <div className='roles'>
                        <div className='contenedor'>
                            <div className='mitadColor'>
                                <img src={logoBlanco} className='logo' alt='Logo' />
                            </div>
                            <div className='mitadBlanca'>
                                <div className='txtSeleccion'>
                                    <p>Seleccione con que rol desea ingresar</p>
                                    <div className="miListaRoles">
                                        <ul>
                                            {resultado.success && resultado.perfiles.map((rol, index) => {
                                                return <li className="listaRoles " key={index} onClick={() => verOpcion(rol.roles, rol)}>{rol.roles}</li>
                                            })}
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='contenedorBotonesInferioress'>
                        <button className='buttonMiPerfil btnDisenio' onClick={verPerfil}>Mi perfil</button>
                        <div className='contenedorCerrarSesion'>
                            <Link to={"/"}>
                                <h6 className='botonCerrarSesion btnDisenio'>Cerrar sesión</h6>
                            </Link>
                        </div>
                    </div>
                </div>
            )}




        </div>
    );
}

