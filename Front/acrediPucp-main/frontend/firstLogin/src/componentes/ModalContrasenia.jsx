import React, { useState } from 'react'
import { Alert,Button } from 'react-bootstrap';
import axios from 'axios';
import "../HojasDeEstilo/ModalContrasenia.css"
import "../HojasDeEstilo/NuevoModalContra.css"

function ModalContrasenia({ close, id }) {
    const [codigo, setCodigo] = useState('')
    const [nuevaContra, setNuevaContra] = useState('')
    const [nuevaContra2, setNuevaContra2] = useState('')
    const [valido, setValido] = useState(false);
    const [valido2, setValido2] = useState(true);
    const [valido3, setValido3] = useState(true);
    const [valido4, setValido4] = useState(true);
    const [alerta, setAlerta] = useState(false);
    const [alerta2, setAlerta2] = useState(false);
    const [alerta3, setAlerta3] = useState(false);
    const [falta, setFalta] = useState(false);
    const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
    const [mostrarContrasenia2, setMostrarContrasenia2] = useState(false);
    const baseUrl = "http://localhost:3050/api/cuenta/cambiarContrasenia";
    const handleClickAlerta = () => {
        setAlerta(true)
    };
    const isContraseniaFilled = nuevaContra !== '';
    const isContraseniaFilled2 = nuevaContra2 !== '';
    const handleClickAlerta2 = () => {
        setAlerta2(true)
    };
    const handleClickAlerta3 = () => {
        setAlerta3(true)
        setValido3(true)
    };
    const cambiarTipoContrasenia = () => {
        setMostrarContrasenia(!mostrarContrasenia);
    }
    const cambiarTipoContrasenia2 = () => {
        setMostrarContrasenia2(!mostrarContrasenia2);
    }
    const comprobarContrasenia = () => {

        if (nuevaContra === nuevaContra2) {

            setValido4(true)
            setAlerta(true)
            if (codigo == '') {
                setFalta(true)
            } else {
                var datosContra = {};
                datosContra.idUsuario = id;
                datosContra.contrasenia = nuevaContra;
                datosContra.codigo = codigo;
                console.log(datosContra)



                const option = {
                    method: 'POST',
                    url: baseUrl,

                    data: datosContra,
                    headers: {
                        "Access-Control-Allow-Headers": "*",  // Esto permitirá todas las solicitudes CORS
                        "Access-Control-Allow-Methods": 'OPTIONS,POST,GET', // Esto establece los métodos permitidos
                        "Content-Type": "application/json" //Esto establece el tipo de contenido esperado
                    },
                };


                console.log(option)



                axios
                    .request(option)
                    .then(function (response) {
                        console.log(response)
                        setValido(response.data.success)
                        setValido2(response.data.success)
                        setAlerta2(false)

                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            }
        } else {
            setValido(false);
            setValido4(false)
            setAlerta(false)
        }

    }
    const handleVerificarContraCoincidencia= () => {
        setAlerta(false)
    };

    const handleNuevaContra=(valor)=>{
            if(valor.includes(" ")){
                valor = valor.replace(/\s/g, '');
                setValido3(false)
                setNuevaContra(valor)
                setAlerta3(false)
            }else{
                setValido3(true)
                setNuevaContra(valor)
                setAlerta3(false)

            }


    }
    const handleNuevaContra2=(valor)=>{
        if(valor.includes(" ")){
            valor = valor.replace(/\s/g, '');
            setValido3(false)
            setNuevaContra2(valor)
            setAlerta3(false)
        }else{
            setValido3(true)
            setNuevaContra2(valor)
            setAlerta3(false)

        }


}

    return (
        <div>
            {valido ? <div>

                <p className='confirmacion'>Su nueva contraseña ha sido correctamente guardada</p>
                <button className="boton-aceptar" onClick={() => close(false)}>Aceptar</button>



            </div> : <>
           
                {((nuevaContra === nuevaContra2) && valido4) ? <></>
                    : (
                        <div style={{ width: "100%" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </symbol>
                                <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                </symbol>
                                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </symbol>
                            </svg>
                            <Alert variant="warning" className="d-flex align-items-center" role="alert" show={!alerta}>
                                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                                    <use xlinkHref="#exclamation-triangle-fill" />
                                </svg>
                                <div style={{paddingLeft:"15px",paddingRight:"35px"}}>
                                Las contraseñas ingresadas no coinciden
                                </div>
                                <Button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleClickAlerta} style={{ marginLeft: 'auto' }}></Button>
                            </Alert>
                        </div>)}
                 {valido3 ? <></>
                    : (
                        <div style={{ width: "100%" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                                <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                </symbol>
                                <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                </symbol>
                                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </symbol>
                            </svg>
                            <Alert variant="warning" className="d-flex align-items-center" role="alert" show={!alerta3}>
                                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                                    <use xlinkHref="#exclamation-triangle-fill" />
                                </svg>
                                <div style={{paddingLeft:"15px",paddingRight:"35px"}}>
                                No se permiten espacios en la contraseña
                                </div>
                                <Button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleClickAlerta3} style={{ marginLeft: 'auto' }}></Button>
                            </Alert>
                        </div>)}


              {valido2 ? <></> : (<div style={{width:"100%"}}>
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
                            <Alert variant="danger" className="d-flex align-items-center" role="alert" show={!alerta2}>
                                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:" >
                                    <use xlinkHref="#exclamation-triangle-fill" />
                                </svg>
                                <div style={{paddingLeft:"15px",paddingRight:"125.5px"}}>El código ingresado no es válido
                                </div>
                                <Button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleClickAlerta2}></Button>
                            </Alert>
                        </div>)}


             
                <h3 className='encabezadoContra2' style={{marginBottom:"4%"}}>Código enviado a su bandeja de correo</h3>
             
                <input 
                            id="correo-input" 
                            className={`form-control input-group correo-ancho2 ${codigo !== '' ? 'campo-lleno' : ''}`} onChange={(e) => setCodigo(e.target.value)} type='text' placeholder='Ingrese aquí su código'  />
                <br />
                <h3 className='encabezadoContra2' style={{marginBottom:"4%"}}>Nueva contraseña</h3>

                <div class="formGroupInputLog2">
                        <div className="input-groupIC2 contrasenia-input-group">
                <input onChange={(e) => {handleNuevaContra(e.target.value);handleVerificarContraCoincidencia()}} type={mostrarContrasenia ? 'text' : 'password'}
                                name="contrasenia"
                                value={nuevaContra}
                                className={`form-control  input-group correo-ancho3 ${nuevaContra !== '' ? 'campo-lleno' : ''}`} placeholder='Ingrese aquí su nueva contraseña' />
                                
                            <span className="input-group-text" onClick={cambiarTipoContrasenia}>
                                <i className={`bi bi-${mostrarContrasenia ? 'eye-slash-fill' : 'eye-fill'}`}></i>
                            </span>
                            </div>
                            </div>

                <br />
                <h3 className='encabezadoContra2' style={{marginBottom:"4%"}}>Repita su nueva contraseña</h3>



                <div class="formGroupInputLog2">
                        <div className="input-groupIC2 contrasenia-input-group">
                <input onChange={(e) => {handleNuevaContra2(e.target.value);handleVerificarContraCoincidencia()}} type={mostrarContrasenia2 ? 'text' : 'password'}
                                name="contrasenia"
                                value={nuevaContra2}
                                className={`form-control contrasenia-input input-group correo-ancho3 ${nuevaContra2 !== '' ? 'campo-lleno' : ''}`} placeholder='Repita aquí su nueva contraseña' />
                <span className="input-group-text" onClick={cambiarTipoContrasenia2}>
                                <i className={`bi bi-${mostrarContrasenia2 ? 'eye-slash-fill' : 'eye-fill'}`}></i>
                            </span>
                   </div>
                 </div>




                <button className="boton-correo" onClick={comprobarContrasenia} style={{marginTop:"8%"}}>Aceptar</button>


                


            </>}


        </div>
    )
}

export default ModalContrasenia