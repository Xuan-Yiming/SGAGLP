import React, { useEffect, useState } from 'react';
import { Alert,Button } from 'react-bootstrap';
import '../HojasDeEstilo/IngresarCuenta.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import "../HojasDeEstilo/Reusable/Boton.css";
import campus from "../images/campus.png";
import alumnos from "../images/nuevo1.jpg";
import medicion from "../images/nuevo2.jpg";
import reportes from "../images/nuevo3.jpg";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import logo from "../images/logoAzul.png";
import logo2 from "../images/logoBlanco.png";
import '../App.css';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import ModalLogin from './ModalLogin';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function IngresarCuenta() {

    const baseUrl = "http://localhost:3050/api/autorizador/login";
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
    const [usuario, setUsuario] = useState({});
    const [verificado, setVerificado] = useState('');
    const [correo, setCorreo] = useState('');
    const [alerta, setAlerta] = useState(false);
    const [contrasenia, setContrasenia] = useState('');
    const [respuesta, setRespuesta] = useState({})
    const [valido, setValido] = useState(false);
    const [valido2, setValido2] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [cambioModal, setCambioModal] = useState(true);
    const imagenes = [alumnos, reportes, medicion];
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentTituloIndex, setCurrentTituloIndex] = useState(0);
    const titulos = ["Califica fácilmente a tus alumnos", "Revisa el estatus de tus mediciones", "Obtén reportes de tus mediciones a solo unos clicks"];


    const cambiarTipoContrasenia = () => {
        setMostrarContrasenia(!mostrarContrasenia);
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((currentImageIndex + 1) % imagenes.length);
        }, 3500);
    
        return () => clearInterval(interval);
    }, [currentImageIndex]);

   


    const navigate = useNavigate();
    const googleLogin = () => {
        window.open("http://localhost:3050/auth/google", "_self");
    }
    const handleClickAlerta = () => {
        setAlerta(true)
    };
    const handleLogout = () => {
        console.log("ADIOS")

        removeCookie('jwt');
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // Para eliminar la cookie forzando el caso de FireFox
    };



    const enviarDatosLogin = () => {
        var datosLogin = {};
        datosLogin.correo = correo;
        datosLogin.contrasenia = contrasenia;
        console.log(datosLogin)
        var errorMessage = "";
        var mensajeCompleto = "";
        const option = {
            method: 'POST',
            url: baseUrl,
            withCredentials: true,
            credentials: 'include',
            data: datosLogin,
            headers: {
                "Access-Control-Allow-Headers": "*",  // Esto permitirá todas las solicitudes CORS
                "Access-Control-Allow-Methods": 'OPTIONS,POST,GET', // Esto establece los métodos permitidos
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json" //Esto establece el tipo de contenido esperado
            },
        };


        console.log(option)

        axios
            .request(option)
            .then(function (response) {
                console.log(response.data);
                setRespuesta(response.data)
                if (response.data.success) {
                    setValido(true);
                    setValido2(false);
                    
                } else {
                    errorMessage = response.data.error.message;
                    mensajeCompleto = "Error: " + errorMessage;
                    console.log("eeror es "+errorMessage)
                    toast.error(mensajeCompleto, {
                        position: "top-right",
                        autoClose: false,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    //setAlerta(false)
                    setValido(false);
                    setValido2(true);
                }
            })
            .catch(function (error) {
                console.error(error);
                setValido(false);
            });

        if (respuesta.success) {
            setValido2(false);
        } else {
            setValido2(true);
        }
    }

    useEffect(() => {

        handleLogout()

    }, [])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'correo') {
            setCorreo(value);
        } else if (name === 'contrasenia') {
            setContrasenia(value);
        }
    };

    const isCorreoFilled = correo !== '';
    const isContraseniaFilled = contrasenia !== '';

    return (
        
        <div className='contenedor-ingresar-cuenta '>
            <ToastContainer />
            <div className='row'>
            <div className='columna col-8'>
          <div className="image-container">
               <img className="campus" src={imagenes[currentImageIndex]} />
             <div className='dots mt-auto'>
                   <div className="text-container">
                   <p className="dots-text">{titulos[currentImageIndex]}</p>
  
    <div className="dots-container">
    {imagenes.map((image, index) => (
      <span
          key={index}
          className={`dot ${index === currentImageIndex ? 'active' : ''}`}
          onClick={() => setCurrentImageIndex(index)}
      />
    ))}
  </div>
  </div>
 
</div>

    </div>
</div>
                <div className='ingresar-cuenta col-4'>
                    <div className='logotipo'>
                        <div className='imagenes'>
                            <img className='imagen' src={logo} alt='Logo de Acredi' />
                            <img className='imagen2' src={logo2} alt='Logo de Acredi blanco' />
                        </div>
                    </div>
                    <h2 className='subtitle diseñoIniciar'>Iniciar sesión</h2>


                    <div className="googleContainer" onClick={googleLogin}>
                        <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google Icon" />
                        <p className='googleName'>Login With Google</p>
                    </div>
                    <div className='divider'>
                        <hr />
                    </div>
                    {/* {respuesta.success === false ?
                        <div style={{width:"45%", paddingTop:"10px", paddingBottom:"30px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                            <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </symbol>
                            <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                            </symbol>
                            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </symbol>
                        </svg>
                            <Alert variant="danger" className="d-flex align-items-center" role="alert" show={!alerta}>
                                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                                    <use xlinkHref="#exclamation-triangle-fill" />
                                </svg>
                                <div>
                                    El usuario y/o contraseña no son válidos. Vuelva a intentarlo
                                </div>
                                <Button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleClickAlerta}></Button>
                            </Alert>
                        </div>
                        :
                        <>
                        </>} */}
                    <div class="formGroupInputLog">

                        <input
                            id="correo-input"
                            onChange={(e) => {
                                setCorreo(e.target.value);
                                handleInputChange(e);
                            }}
                            type='text'
                            name="correo"
                            value={correo}
                            className={`form-control input-group correo-ancho ${correo !== '' ? 'campo-lleno' : ''}`}
                        />
                        <label className={isCorreoFilled ? 'filled' : ''}>Correo Electrónico</label>
                        <br />
                    </div>


                    <div class="formGroupInputLog">
                        <div className="input-groupIC contrasenia-input-group">
                            <input
                                onChange={(e) => {
                                    setContrasenia(e.target.value);
                                    handleInputChange(e);
                                }}
                                type={mostrarContrasenia ? 'text' : 'password'}
                                name="contrasenia"
                                value={contrasenia}
                                className={`form-control contrasenia-input input-group correo-ancho ${contrasenia !== '' ? 'campo-lleno' : ''}`}
                            />
                            <label className={isContraseniaFilled ? 'filled' : ''}>Contraseña</label>
                            <span className="input-group-text iconoradious" onClick={cambiarTipoContrasenia}>
                                <i className={`bi bi-${mostrarContrasenia ? 'eye-slash-fill' : 'eye-fill'}`}></i>
                            </span>
                        </div>
                    </div>




                    <div onClick={() => { setOpenModal(true) }} className='contra'>
                        ¿Olvidó su contraseña?
                    </div>

                    {openModal && <ModalLogin closeModal={setOpenModal} />}

                    <button onClick={enviarDatosLogin} className="iniciar-sesion-btn btnDisenio" >
                        Iniciar sesión
                    </button>

                    {respuesta.success ? navigate("/inicio") : <></>}
                </div>
            </div>
        </div>
    );
}

export default IngresarCuenta;
