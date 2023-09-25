import React, { useState } from 'react';
import { Alert,Button } from 'react-bootstrap';
import axios from 'axios';

function ModalCorreo(props) {

    const [correo, setCorreo] = useState('');
    const [respuesta, setRespuesta] = useState('');
    const [alerta, setAlerta] = useState(false);
    const [error, setError] = useState(true);
    const [valido, setValido] = useState(true);
    const [option, setOption] = useState({});

    const baseUrl = "http://localhost:3050/api/cuenta/recuperarContrasenia";
    const handleClickAlerta = () => {
        setAlerta(true)
    };

    const llamadaBack = async () => {
        var datosLogin = {};
        datosLogin.correo = correo;

        try {
            const response = await axios.post("http://localhost:3050/api/cuenta/recuperarContrasenia", datosLogin
            )
            // console.log(response.data);
            // console.log(response.data.success)
            setValido(response.data.success)
            if(response.data.success===false){
                setAlerta(false)
            }
            //  console.log(response.data.data.result)

            props.cambiarId(response.data.data.result)
            props.entraCorreo(!response.data.success)

            setRespuesta(response.data)

        } catch (error) {
            console.log(error)
        }



    }

    const comprobarCorreo = () => {
        /*
            var datosLogin={};
            datosLogin.correo=correo;
           console.log(datosLogin)
    
    
    
           const op = {
        method: 'POST',
        url: baseUrl,
       
        data: datosLogin,
        headers: {
          "Access-Control-Allow-Headers": "*",  // Esto permitirá todas las solicitudes CORS
          "Access-Control-Allow-Methods": 'OPTIONS,POST,GET', // Esto establece los métodos permitidos
          "Content-Type": "application/json" //Esto establece el tipo de contenido esperado
        },
    };
            
            setOption(op)
            
        axios
        .request(option)
        .then(function (response) {
            console.log(response.data);
                setRespuesta(response.data)
                setValido(respuesta.success)
                setError(respuesta.success)
                
        })
        .catch(function (error) {
            console.error(error);
            setValido(false);
        });
    
        if(valido){
            console.log("Ohnyo")
            console.log(respuesta.data.result)
            props.cambiarId(respuesta.data.result)
            props.entraCorreo(false)
        }*/


        llamadaBack();
        /*  console.log("ojo")
          console.log(respuesta.success)
       setValido(respuesta.success)*/
    }


    return (
        <div>

            <h3 className='encabezadoContra2'>Ingrese su correo electrónico</h3>
            <br/>
            {valido ? <></> : (<div style={{width:"100%"}}>
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
                                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:" >
                                    <use xlinkHref="#exclamation-triangle-fill" />
                                </svg>
                                <div style={{paddingLeft:"15px",paddingRight:"35px"}}>
                                El correo ingresado no se encuentra asociado a una cuenta del sistema
                                </div>
                                <Button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleClickAlerta}></Button>
                            </Alert>
                        </div>)}

            <input onChange={(e) => setCorreo(e.target.value)} type='text' id="correo-input" 
                            className={`form-control input-group correo-ancho2 ${correo !== '' ? 'campo-lleno' : ''}`}  placeholder='Ingrese su correo electrónico aquí' />

            <button className="boton-correo" onClick={comprobarCorreo} style={{marginTop:"8%"}}>Aceptar</button>

        </div>
    )
}

export default ModalCorreo