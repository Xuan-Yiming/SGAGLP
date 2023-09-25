import fotoPerfil from "../images/FotoPerfil.png";
import "../HojasDeEstilo/AdminAñadirCuenta.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/InputValidacion.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addIdAdmin } from "../Redux/AdministradorSlice";
import { addDatosAdmin } from "../Redux/AdministradorSlice";
export default function AdminAñadirCuenta(props) {

    const dispatch = useDispatch();
    const datosAdmin = useSelector((state) => state.Administrador);
    const [cookies, setCookie] = useCookies();

    let valor;
    const [mensajeError, setMensajeError] = useState("");
    const [mostrarModal, setmostrarModal] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);
    const [botonColor, setBotonColor] = useState("#ADADAD");
    const [nombres, setNombres] = useState("");
    const [apPaterno, setApPaterno] = useState("");
    const [apMaterno, setApMaterno] = useState("");
    const [codigo, setcodigo] = useState("");
    const [celular, setCelular] = useState("");
    const [correoSecundario, setCorreoSecundario] = useState("");
    const [correo, setCorreo] = useState("");
    const [nuevaImagen, setNuevaImagen] = useState();
    const [foto, setFotoPerfil] = useState(fotoPerfil);
    const [guardando, setGuardando] = useState(false);
    const [mostrarTexto1, setMostrarTexto1] = useState("");
    const [mostrarTexto2, setMostrarTexto2] = useState("");
    const [mostrarTexto3, setMostrarTexto3] = useState("");
    const [mostrarTexto4, setMostrarTexto4] = useState("");
    const [mostrarTexto5, setMostrarTexto5] = useState("");
    const [mostrarTexto6, setMostrarTexto6] = useState("");
    const [mostrarTexto7, setMostrarTexto7] = useState("");
    const [backgroundColorInput1, setBackgroundColorInput1] = useState("black");
    const [backgroundColorInput2, setBackgroundColorInput2] = useState("black");
    const [backgroundColorInput3, setBackgroundColorInput3] = useState("black");
    const [backgroundColorInput4, setBackgroundColorInput4] = useState("black");
    const [backgroundColorInput5, setBackgroundColorInput5] = useState("black");
    const [backgroundColorInput6, setBackgroundColorInput6] = useState("black");
    const [backgroundColorInput7, setBackgroundColorInput7] = useState("black");

    const valCadGeneral = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/;
    const valCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    const valCodigo = /^[a-zA-Z0-9]{8}(?:[a-zA-Z0-9]{4})?$/;
    const valNumero = /^\d{9}$/;

    useEffect(() => {
        if ((valCorreo.test(correo) && correo.trim().length !== 0) &&
            (valCadGeneral.test(nombres) && nombres.trim().length !== 0) &&
            (valCadGeneral.test(apPaterno) && apPaterno.trim().length !== 0) &&
            (valCadGeneral.test(apMaterno) && apMaterno.trim().length !== 0) &&
            (valCorreo.test(correoSecundario) || correoSecundario.length == 0) &&
            (valCodigo.test(codigo) && codigo.trim().length !== 0) &&
            (valNumero.test(celular) || celular.trim().length == 0)
        ) {
            setBotonColor("#042354");
        } else {
            setBotonColor("#ADADAD");
        }
        if (valCadGeneral.test(nombres) && nombres.trim().length !== 0) {
            setBackgroundColorInput1("black")
        }
        if (valCadGeneral.test(apPaterno) && apPaterno.trim().length !== 0) {
            setBackgroundColorInput2("black")
        }
        if (valCadGeneral.test(apMaterno) && apMaterno.trim().length !== 0) {
            setBackgroundColorInput3("black")
        }
        if (valCodigo.test(codigo) && codigo.trim().length !== 0) {
            setBackgroundColorInput4("black")
        }
        if (valCorreo.test(correo) && correo.trim().length !== 0) {
            setBackgroundColorInput5("black")
        }
        if (valNumero.test(celular) || celular.trim().length == 0) {
            setBackgroundColorInput6("black")
        }
        if (valCorreo.test(correoSecundario) || correoSecundario.length == 0) {
            setBackgroundColorInput7("black")
        }
    }, [nombres, apPaterno, apMaterno, codigo, correo, celular, correoSecundario]);



    const handleChange = (e) => {
        const { name, value } = e?.target || {};

        switch (name) {
            case "nombres":
                setNombres(value);
                break;
            case "apPaterno":
                setApPaterno(value);
                break;
            case "apMaterno":
                setApMaterno(value);
                break;
            case "codigo":
                setcodigo(value);
                break;
            case "correo":
                setCorreo(value);
                break;
            case "celular":
                setCelular(value);
                break;
            case "correoSecundario":
                setCorreoSecundario(value);
                break;
            case "txtValido1":
                setMostrarTexto1(value);
                break;
            case "txtValido2":
                setMostrarTexto2(value);
                break;
            case "txtValido3":
                setMostrarTexto3(value);
                break;
            case "txtValido4":
                setMostrarTexto4(value);
                break;
            case "txtValido5":
                setMostrarTexto5(value);
                break;
            case "txtValido6":
                setMostrarTexto6(value);
                break;
            case "txtValido7":
                setMostrarTexto7(value);
                break;
            case "mensajeError":
                setMensajeError(value);
                break;
        }

        if ((valCorreo.test(correo) && correo.trim().length !== 0) &&
            (valCadGeneral.test(nombres) && nombres.trim().length !== 0) &&
            (valCadGeneral.test(apPaterno) && apPaterno.trim().length !== 0) &&
            (valCadGeneral.test(apMaterno) && apMaterno.trim().length !== 0) &&
            (valCorreo.test(correoSecundario) || correoSecundario.length == 0) &&
            (valCodigo.test(codigo) && codigo.trim().length !== 0) &&
            (valNumero.test(celular) || celular.trim().length == 0)) {
            setGuardando(true);
            valor = 1;
        } else {
            setGuardando(false);
            console.log("invalido");
            valor = 0;
        }

        return valor;

    };

    const handleButtonClick = () => {

        if ((valCorreo.test(correo) && correo.trim().length !== 0) &&
            (valCadGeneral.test(nombres) && nombres.trim().length !== 0) &&
            (valCadGeneral.test(apPaterno) && apPaterno.trim().length !== 0) &&
            (valCadGeneral.test(apMaterno) && apMaterno.trim().length !== 0) &&
            (valCorreo.test(correoSecundario) || correoSecundario.length == 0) &&
            (valCodigo.test(codigo) && codigo.trim().length !== 0) &&
            (valNumero.test(celular) || celular.trim().length == 0)) {
            setGuardando(true);
            setmostrarModal(true);
            valor = 1;
        } else {
            setGuardando(false);
            setmostrarModal(false);
            console.log("invalido");
            valor = 0;
        }

        if (valCadGeneral.test(nombres) && nombres.trim().length !== 0) {
            console.log(nombres);
            setBackgroundColorInput1("black");
            setMostrarTexto1("");
        } else {
            setBackgroundColorInput1("#FF6961");
            setMostrarTexto1("Nombre inválido");
        }
        if (valCadGeneral.test(apPaterno) && apPaterno.trim().length !== 0) {
            console.log(apPaterno);
            setBackgroundColorInput2("black");
            setMostrarTexto2("");
        } else {
            setBackgroundColorInput2("#FF6961");
            setMostrarTexto2("Apellido Paterno inválido");
        }
        if (valCadGeneral.test(apMaterno) && apMaterno.trim().length !== 0) {
            console.log(apMaterno);
            setBackgroundColorInput3("black");
            setMostrarTexto3("");
        } else {
            setBackgroundColorInput3("#FF6961");
            setMostrarTexto3("Apellido Materno inválido");
        }
        if (valCodigo.test(codigo) && codigo.trim().length !== 0) {
            console.log(codigo);
            setBackgroundColorInput4("black");
            setMostrarTexto4("");
        } else {
            setBackgroundColorInput4("#FF6961");
            setMostrarTexto4("Código inválido");
        }
        if (valCorreo.test(correo) && correo.trim().length !== 0) {
            console.log(correo);
            setBackgroundColorInput5("black");
            setMostrarTexto5("");
        } else {
            setBackgroundColorInput5("#FF6961");
            setMostrarTexto5("Correo inválido");
        }
        if (valNumero.test(celular) || celular.trim().length == 0) {
            console.log(celular);
            setBackgroundColorInput6("black");
            setMostrarTexto6("");
        } else {
            setBackgroundColorInput6("#FF6961");
            setMostrarTexto6("Celular inválido");
        }
        if (valCorreo.test(correoSecundario) || correoSecundario.trim().length == 0) {
            console.log(correoSecundario);
            setBackgroundColorInput7("black");
            setMostrarTexto7("");
        } else {
            setBackgroundColorInput7("#FF6961");
            setMostrarTexto7("Correo secundario inválido");
        }

    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('fotoPerfil', nuevaImagen);

        const response = await fetch('/api/actualizarPerfil', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            if (nuevaImagen) {
                setFotoPerfil(URL.createObjectURL(nuevaImagen));
            }
        }
    };

    const handleImagenSeleccionada = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const archivo = e.target.files[0];
            setNuevaImagen(archivo);
        }
    };


    const handleModalClose = () => {
        setmostrarModal(false);
    };

    const handleModalClose2 = () => {
        setmostrarModal2(false);
    };

    const handleModalAceptar = async () => {
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            nombres: nombres,
            apellidoPaterno: apPaterno,
            apellidoMaterno: apMaterno,
            codigoPUCP: codigo,
            correo: correo,
            correo2: correoSecundario,
            // contrasenia:"1234abcde",
            celular: celular,
            // rutaFoto:'',
            usuarioCreacion: datosAdmin.idAdmin
        }
        console.log(datosAdmin.idAdmin)
        console.log("aqui datos de admin final")
        console.log("configuracion:")
        console.log(config);
        var errorMessage = "";
        var mensajeCompleto = "";

        try {
            const respuesta = await axios.post("http://localhost:3050/api/usuario/insertarUsuario", data, config);

            console.log(respuesta.data);
            if (respuesta.data.success) {
                toast.success('Usuario registrado exitosamente.', {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                toast.info('Se le enviará un correo al usuario una vez le asigne un rol.', {
                    position: "top-right",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                props.cambiarComponente(false);
                console.log("AQUI SI ACEPTA");
            } else {
                errorMessage = respuesta.data.error.message;
                mensajeCompleto = "Error: " + errorMessage;
                //setmostrarModal2(true);
                setmostrarModal(false);
                setMensajeError(mensajeCompleto);
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
                console.log("AQUI NO ACEPTA");
            }

        } catch (error) {
            toast.error('No hay conexión. Intente de nuevo.', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            console.log(error);
            console.log(error.message);
        }
    };


    return (
        <div className="inicioPaginaAC">
            <br></br>
            <div className="contfotoPerfilAC">
                <img className="fotoPerfilAC" src={nuevaImagen ? URL.createObjectURL(nuevaImagen) : foto} alt="Imagen seleccionada" />
            </div>
            <div className="contenedorBotones contbot">
                <div className="btnDivDisenio">
                    <button className="btnDisenio btnEditarAC" type="button"
                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                        style={{ borderWidth: '0.5px', backgroundColor: botonColor }} onClick={handleButtonClick} >
                        Guardar
                    </button>
                </div>
            </div>

            <div onSubmit={handleSubmit} className="contDatosAC">
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea registrar una nueva cuenta?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio  botonCancelarAC" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio  botonAceptarAC" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>

                <div className="contPerfilAC">
                    <h2 className="tituloTipo3 tituloGen tituloAAC ">Datos personales</h2>
                    <div className="contDatosPersonalesAAC">
                        <div className="nombreCuentaAC alineacionAC">
                            <label className="labelGen" htmlFor="nombres">
                                Nombres *
                            </label>
                            <br></br>
                            <input class="inputGen inputGend" style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: backgroundColorInput1 }}
                                type="text" name="nombres" value={nombres} onChange={handleChange} className="inputAC" />
                            <input class="inputEspecialAC" disabled type="text" name="txtValido1" value={mostrarTexto1}
                                onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }} />
                        </div>
                        <div className="datos-apellido">
                            <div class="contenedorAC">
                                <div className="alineacionAC">
                                    <label className="labelGen" htmlFor="apellidoPaterno">
                                        Apellido paterno *
                                    </label>
                                    <br></br>
                                    <input style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: backgroundColorInput2 }}
                                        className="inputAC"
                                        type="text" name="apPaterno" onChange={handleChange}
                                        value={apPaterno} />
                                    <input class="inputEspecialAC" disabled type="text" name="txtValido2" value={mostrarTexto2}
                                        onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }} />
                                </div>
                                <div className="alineacionAC">
                                    <label className="labelGen" htmlFor="apellidoMaterno">
                                        Apellido materno *
                                    </label>
                                    <br></br>
                                    <input style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: backgroundColorInput3 }}
                                        className="inputAC" type="text"
                                        id="apMaterno"
                                        onChange={handleChange}
                                        name="apMaterno" value={apMaterno} />
                                    <input class="inputEspecialAC" disabled type="text" name="txtValido3" value={mostrarTexto3}
                                        onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }} />
                                </div>
                            </div>
                        </div>
                        <div class="contenedorAC">
                            <div className="alineacionAC">
                                <label className="labelGen" htmlFor="codigo">
                                    Código *
                                </label>
                                <br></br>
                                <input style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: backgroundColorInput4 }}
                                    onChange={handleChange}
                                    className="inputAC" type="text" name="codigo"
                                    value={codigo} />
                                <input class="inputEspecialAC" disabled type="text" name="txtValido4" value={mostrarTexto4}
                                    onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }} />
                            </div>
                            <div className="alineacionAC">
                                <label className="labelGen" htmlFor="correoElectronico">
                                    Correo electrónico *
                                </label>
                                <br></br>
                                <input style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: backgroundColorInput5 }}
                                    className="inputAC" type="email" name="correo" onChange={handleChange}
                                    value={correo} />
                                <input class="inputEspecialAC" disabled type="text" name="txtValido5" value={mostrarTexto5}
                                    onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }} />
                            </div>
                        </div>
                        <div class="contenedorAC">
                            <div className="datos-celular alineacionAC">
                                <label className="labelGen" htmlFor="celular">
                                    Celular
                                </label>
                                <br></br>
                                <input style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: backgroundColorInput6 }}
                                    className="inputAC" type="tel" onChange={handleChange}
                                    name="celular" id="celular"
                                    value={celular}
                                />
                                <input class="inputEspecialAC" disabled type="text" name="txtValido6" value={mostrarTexto6}
                                    onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }} />
                            </div>
                            <div className="alineacionAC">
                                <label className="labelGen" htmlFor="correoSecundario">
                                    Correo secundario
                                </label>
                                <br></br>
                                <input style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: backgroundColorInput7 }}
                                    className="inputAC" type="email" id="correoSecundario"
                                    name="correoSecundario" onChange={handleChange}
                                    value={correoSecundario}
                                />
                                <input class="inputEspecialAC" disabled type="text" name="txtValido7" value={mostrarTexto7}
                                    onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }} />
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
            </div>
            <br></br>
        </div>
    );
}