import React, { useEffect, useState } from 'react';
import '../hojas-estilo/IngresarCuenta.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import "../hojas-estilo/Reusable/Boton.css";
import '../App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import logosga from "../imagenes/logoSGA.png";

export function IngresarCuenta() {

    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [cambioPag, setCambioPag] = useState(false);
    const isContraseniaFilled = contrasenia !== '';
    const isCorreoFilled = correo !== '';
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
    const navigate = useNavigate();

    const cambiarTipoContrasenia = () => {
        setMostrarContrasenia(!mostrarContrasenia);
    }

    const activarCambioPag = () => {
        setCambioPag(true);
    }

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'correo') {
            setCorreo(value);
        } else if (name === 'contrasenia') {
            setContrasenia(value);
        }
    };


    useEffect(() => {


    }, [])


    return (
        <div  className='login-contenedor-principal'>

            <div className='login-sub-contenedor'>

            <div className='login-espacio-logo'>
                <img className='imagenLogo' src={logosga}/>
            </div>
            <div className='letrero-login'>
                Login
            </div>
            <div className='contenedor-usuario'>

                <div className='label-usuario'>
                    Usuario
                </div> 
                <div className='textbox-usuario'>
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
                        {/* <label className={isCorreoFilled ? 'filled' : ''}>Correo Electrónico</label> */}
                        <br />
                </div>

            </div>
            <div className='contenedor-contrasenia'>
                <div className='label-contrasenia'>
                    Contraseña
                </div>
                <div className='textbox-contrasenia'>
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
                            {/* <label className={isContraseniaFilled ? 'filled' : ''}>Contraseña</label> */}
                            <span className="input-group-text iconoradious" onClick={cambiarTipoContrasenia}>
                                <i className={`bi bi-${mostrarContrasenia ? 'eye-slash-fill' : 'eye-fill'}`}></i>
                            </span>
                        </div>
                </div>

            </div>

            <button className='botonIngresar' onClick={activarCambioPag}>

                Ingresar

            </button>
            {cambioPag ? navigate("/inicio") : <></>}

            </div>


        </div>
    );
}

export default IngresarCuenta;
