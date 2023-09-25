import React from 'react'
import error from "../images/failed.png";
import { useNavigate } from "react-router-dom";
import '../HojasDeEstilo/ErrorGmail.css';

export default function ErrorGmail() {

    const navigate = useNavigate();
    const regresar = () => {
        navigate("/")


    };

    return (
        <div className='contenedorEG container'>

            <img className="error" src={error} />
            <br />
            <div className='tituloGmail'>
                El correo ingresado no es válido
            </div>
            <br />
            <div className='mensaje'>
                Regrese a la página de login de AcrediPUCP e intente loguearse de nuevo
            </div>
            <div className='volver'>
                <button className='btnError' onClick={regresar}>Volver</button>
            </div>


        </div>




    )
}
