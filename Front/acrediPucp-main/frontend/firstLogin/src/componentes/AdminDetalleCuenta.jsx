import fotoPerfil from "../images/FotoPerfil.png";
import "../HojasDeEstilo/AdminDetalleCuenta.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalDragFoto from './ModalDragFoto';
import "../HojasDeEstilo/Reusable/InputValidacion.css";
import { useCookies } from "react-cookie";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addDatosAdmin } from "../Redux/AdministradorSlice";
import {
    addDatosCuenta, addRoles, addNombreCuenta, addApellidoPCuenta, addApellidoMCuenta, addCorreoCuenta,
    addCelularCuentas, addCorreoSecundarioCuenta, addCodigoCuenta, addFoto
} from "../Redux/CuentaSlice";


export default function AdminDetalleCuenta(props) {

    let valor;

    const [cookies, setCookie] = useCookies();

    const dispatch = useDispatch();
    const datosCuenta = useSelector((state) => state.Cuenta);
    const datosAdmin = useSelector((state) => state.Administrador);

    const [editable, setEditable] = useState(false);
    const [textoBoton, setTextoBoton] = useState("Editar");
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [mostrarModal, setmostrarModal] = useState(false);
    const [mostrarModal3, setmostrarModal3] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [mensajeError, setMensajeError] = useState(false);
    const [nombres, setNombres] = useState(datosCuenta.nombreCuenta2);
    const [apPaterno, setApPaterno] = useState(datosCuenta.apellidoPCuenta2);
    const [apMaterno, setApMaterno] = useState(datosCuenta.apellidoMCuenta2);
    const [codigo, setcodigo] = useState(datosCuenta.codigoCuenta);
    const [celular, setCelular] = useState(datosCuenta.celularCuenta);
    const [correoSecundario, setCorreoSecundario] = useState(datosCuenta.correoSecundarioCuenta);
    const [correo, setCorreo] = useState(datosCuenta.correoCuenta);
    const [botonColor, setBotonColor] = useState("#042354");
    const [contrasenia, setContrasenia] = useState(""); 
    const [mostrarTexto1, setMostrarTexto1] = useState("");
    const [mostrarTexto2, setMostrarTexto2] = useState("");
    const [mostrarTexto3, setMostrarTexto3] = useState("");
    const [mostrarTexto4, setMostrarTexto4] = useState("");
    const [mostrarTexto5, setMostrarTexto5] = useState("");
    const [mostrarTexto6, setMostrarTexto6] = useState("");
    const [mostrarTexto7, setMostrarTexto7] = useState("");
    const [backgroundColorInput1, setBackgroundColorInput1] = useState("#ccc");
    const [backgroundColorInput2, setBackgroundColorInput2] = useState("#ccc");
    const [backgroundColorInput3, setBackgroundColorInput3] = useState("#ccc");
    const [backgroundColorInput4, setBackgroundColorInput4] = useState("#ccc");
    const [backgroundColorInput5, setBackgroundColorInput5] = useState("#ccc");
    const [backgroundColorInput6, setBackgroundColorInput6] = useState("#ccc");
    const [backgroundColorInput7, setBackgroundColorInput7] = useState("#ccc");
    const [openModal, setOpenModal] = useState(false);
    const [mostrarTexto, setMostrarTexto] = useState(false);


    const valCadGeneral = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/;
    const valCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    const valCodigo = /^[a-zA-Z0-9]{8}(?:[a-zA-Z0-9]{4})?$/;
    const valNumero = /^\d{9}$/;

    useEffect(() => {
        if ((valCorreo.test(correo) && correo.trim().length !==0) && 
        (valCadGeneral.test(nombres) && nombres.trim().length !==0) &&
        (valCadGeneral.test(apPaterno) && apPaterno.trim().length !==0) &&
        (valCadGeneral.test(apMaterno) && apMaterno.trim().length !==0) &&
        ((valCorreo.test(correoSecundario) &&  correo !== correoSecundario) || correoSecundario.trim().length===0) &&
        (valCodigo.test(codigo) && codigo.trim().length !==0) &&
        (valNumero.test(celular) || celular.trim().length ==0)
        ) {
            setBotonColor("#042354");
        }else{
            setBotonColor("#ADADAD");
        }
        if(valCadGeneral.test(nombres) && nombres.trim().length !==0){
            setBackgroundColorInput1("black")
        }
        if(valCadGeneral.test(apPaterno) && apPaterno.trim().length !==0){
            setBackgroundColorInput2("black")
        }
        if(valCadGeneral.test(apMaterno) && apMaterno.trim().length !==0){
            setBackgroundColorInput3("black")
        }
        if(valCodigo.test(codigo) && codigo.trim().length !==0){
            setBackgroundColorInput4("black")
        }
        if(valCorreo.test(correo) && correo.trim().length !==0){
            setBackgroundColorInput5("black")
        }
        if(valNumero.test(celular) || celular.trim().length ==0){
            setBackgroundColorInput6("black")
        }
        if((valCorreo.test(correoSecundario) &&  correo !== correoSecundario)|| correoSecundario.trim().length == 0){
            setBackgroundColorInput7("black")
        }
    }, [nombres, apPaterno, apMaterno, codigo, correo, celular,correoSecundario]);



    const handleChange = (e) => {

        const { name, value } = e?.target || {};
        console.log("aca" + value + " , nombres:" + name)
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
                // dispatch(addCorreoCuenta(e.target.value));
                break;
            case "celular":
                setCelular(value);
                // dispatch(addCelularCuentas(e.target.value));
                break;
            case "correoSecundario":
                setCorreoSecundario(value);
                // dispatch(addCorreoSecundarioCuenta(e.target.value));
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
        }

        if ((valCorreo.test(correo) && correo.trim().length !==0) && 
        (valCadGeneral.test(nombres) && nombres.trim().length !==0) &&
        (valCadGeneral.test(apPaterno) && apPaterno.trim().length !==0) &&
        (valCadGeneral.test(apMaterno) && apMaterno.trim().length !==0) &&
        ((valCorreo.test(correoSecundario) &&  correo !== correoSecundario) || correoSecundario.trim().length ==0) &&
        (valCodigo.test(codigo) && codigo.trim().length !==0) &&
        (valNumero.test(celular) || celular.trim().length ==0)
        ) {
            setGuardando(true);
            valor = 1;
        } else {
            setGuardando(false);
            console.log("invalido");
            valor = 0;
        }

        if (valCadGeneral.test(nombres) && nombres.trim().length !==0) {
            console.log(nombres);
            setBackgroundColorInput1("black");
            setMostrarTexto1("");
        } else {
            setBackgroundColorInput1("#FF6961");
            setMostrarTexto1("Nombre inválido");
        }
        if (valCadGeneral.test(apPaterno) && apPaterno.trim().length !==0) {
            console.log(apPaterno);
            setBackgroundColorInput2("black");
            setMostrarTexto2("");
        } else {
            setBackgroundColorInput2("#FF6961");
            setMostrarTexto2("Apellido Paterno inválido");
        }
        if (valCadGeneral.test(apMaterno) && apMaterno.trim().length !==0) {
            console.log(apMaterno);
            setBackgroundColorInput3("black");
            setMostrarTexto3("");
        } else {
            setBackgroundColorInput3("#FF6961");
            setMostrarTexto3("Apellido Materno inválido");
        }
        if (valCodigo.test(codigo) && codigo.trim().length !==0) {
            console.log(codigo);
            setBackgroundColorInput4("black");
            setMostrarTexto4("");
        } else {
            setBackgroundColorInput4("#FF6961");
            setMostrarTexto4("Código inválido");
        }
        if (valCorreo.test(correo) && correo.trim().length !==0) {
            console.log(correo);
            setBackgroundColorInput5("black");
            setMostrarTexto5("");
        } else {
            setBackgroundColorInput5("#FF6961");
            setMostrarTexto5("Correo inválido");
        }
        if (valNumero.test(celular) || celular.trim().length ==0) {
            console.log(celular);
            setBackgroundColorInput6("black");
            setMostrarTexto6("");
        } else {
            setBackgroundColorInput6("#FF6961");
            setMostrarTexto6("Celular inválido");
        }
        if ((valCorreo.test(correoSecundario) &&  correo !== correoSecundario) || correoSecundario.trim().length == 0) {
            console.log(correoSecundario);
            setBackgroundColorInput7("black");
            setMostrarTexto7("");
        } else {
            setBackgroundColorInput7("#FF6961");
            setMostrarTexto7("Correo secundario inválido");
        }

        return valor;

    };


    const handleClick = () => {
        setEditable(!editable);
        setTextoBoton(editable ? "Editar" : "Guardar");

        if ((valCorreo.test(correo) && correo.trim().length !==0) && 
        (valCadGeneral.test(nombres) && nombres.trim().length !==0) &&
        (valCadGeneral.test(apPaterno) && apPaterno.trim().length !==0) &&
        (valCadGeneral.test(apMaterno) && apMaterno.trim().length !==0) &&
        ((valCorreo.test(correoSecundario) &&  correo !== correoSecundario) || correoSecundario.trim().length ==0) &&
        (valCodigo.test(codigo) && codigo.trim().length !==0) &&
        (valNumero.test(celular) || celular.trim().length ==0)) {
            setGuardando(true);
            valor = 1;
        } else {
            setGuardando(false);
            valor = 0;
        }
      
    };

    const handleValidacion = () => {

        if ((valCorreo.test(correo) && correo.trim().length !==0) && 
        (valCadGeneral.test(nombres) && nombres.trim().length !==0) &&
        (valCadGeneral.test(apPaterno) && apPaterno.trim().length !==0) &&
        (valCadGeneral.test(apMaterno) && apMaterno.trim().length !==0) &&
        ((valCorreo.test(correoSecundario) &&  correo !== correoSecundario) || correoSecundario.trim().length == 0) &&
        (valCodigo.test(codigo) && codigo.trim().length !==0) &&
        (valNumero.test(celular) || celular.trim().length ==0)) {
            setmostrarModal(true);
            setGuardando(true);
            console.log("validoooooo");
            valor = 1;
        } else {
            setmostrarModal(false);
            setGuardando(false);
            valor = 0;
        }

        if (valCadGeneral.test(nombres) && nombres.trim().length !==0) {
            console.log(nombres);
            setBackgroundColorInput1("black");
            setMostrarTexto1("");
        } else {
            setBackgroundColorInput1("#FF6961");
            setMostrarTexto1("Nombre inválido");
        }
        if (valCadGeneral.test(apPaterno) && apPaterno.trim().length !==0) {
            console.log(apPaterno);
            setBackgroundColorInput2("black");
            setMostrarTexto2("");
        } else {
            setBackgroundColorInput2("#FF6961");
            setMostrarTexto2("Apellido Paterno inválido");
        }
        if (valCadGeneral.test(apMaterno) && apMaterno.trim().length !==0) {
            console.log(apMaterno);
            setBackgroundColorInput3("black");
            setMostrarTexto3("");
        } else {
            setBackgroundColorInput3("#FF6961");
            setMostrarTexto3("Apellido Materno inválido");
        }
        if (valCodigo.test(codigo) && codigo.trim().length !==0) {
            console.log(codigo);
            setBackgroundColorInput4("black");
            setMostrarTexto4("");
        } else {
            setBackgroundColorInput4("#FF6961");
            setMostrarTexto4("Código inválido");
        }
        if (valCorreo.test(correo) && correo.trim().length !==0) {
            console.log(correo);
            setBackgroundColorInput5("black");
            setMostrarTexto5("");
        } else {
            setBackgroundColorInput5("#FF6961");
            setMostrarTexto5("Correo inválido");
        }
        if (valNumero.test(celular) || celular.trim().length ==0) {
            console.log(celular);
            setBackgroundColorInput6("black");
            setMostrarTexto6("");
        } else {
            setBackgroundColorInput6("#FF6961");
            setMostrarTexto6("Celular inválido");
        }
        if ((valCorreo.test(correoSecundario) &&  correo !== correoSecundario) || correoSecundario.trim().length == 0) {
            console.log(correoSecundario);
            setBackgroundColorInput7("black");
            setMostrarTexto7("");
        } else {
            setBackgroundColorInput7("#FF6961");
            setMostrarTexto7("Correo secundario inválido");
        }

    };

    const handleModalAceptar = async () => {


        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {
            idUsuario: datosCuenta.idCuenta,
            nombres: nombres,
            apellidoPaterno: apPaterno,
            apellidoMaterno: apMaterno,
            codigoPUCP: codigo,
            correo: correo,
            correo2: correoSecundario,
            celular: celular,
            contrasenia: "",

            rutaFoto: "",
            usuarioCreacion: datosAdmin.idAdmin
        }
        console.log("ID DE LA CUENTAAAAAAAAAAAAAAAAAAAAA");
        console.log(datosCuenta.idCuenta);
        console.log("ID DE LA CUENTAAAAAAAAAAAAAAAAAAAAA");

        console.log(datosAdmin.idAdmin);
        console.log("aqui datos MODIFICACION FINAL");
        console.log("configuracion:");
        console.log(config);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/usuario/modificarUsuario", data, config);

            if (respuesta.data.success){
                toast.success('Usuario modificado correctamente.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setmostrarModal(false);
                setTextoBoton("Editar");
                setEditable(false);
                setColor("#F2F7F9");
                setColorTexto("#7892A4");
            }else{
                toast.error(respuesta.data.error.message, {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setMensajeError(respuesta.data.error.message);
                setmostrarModal3(true);
                setmostrarModal(false);
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
            console.log(error)
        }



    };

    const handleModalCancelar = () => {


        setNombres(datosCuenta.nombreCuenta2)
        setApPaterno(datosCuenta.apellidoPCuenta2)
        setApMaterno(datosCuenta.apellidoMCuenta2)
        setcodigo(datosCuenta.codigoCuenta)
        setCelular(datosCuenta.celularCuenta)
        setCorreoSecundario(datosCuenta.correoSecundarioCuenta)
        setCorreo(datosCuenta.correoCuenta)


        setmostrarModal(false);
        setTextoBoton("Editar");
        setEditable(false);
        setColor("#F2F7F9");
        setColorTexto("#7892A4");
    };

    const handleModalClose = () => {
        setmostrarModal(false);
    };
    const handleModalClose3 = () => {
        setmostrarModal3(false);
    };
    const handleButtonClick = () => {
        if (textoBoton === "Editar") {
            handleEdit();
            handleClick();
            setColor("#FFFFFF");
            setColorTexto("#000000");
        } else {
            handleValidacion();
            //setmostrarModal(true);
        }
    };

    const handleEdit = () => {
        setEditable(true);
    };


    const handleFoto = async (idu) => {

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            //idMuestraMedicion: datosMedicion.idMuestraMedicion
            nombre_id: idu
        }
        console.log("Consultando foto:")
        console.log(data)
        try {
            const respuesta = await axios.post("http://localhost:3050/api/usuario/mostrarUsuario", data, config);

            console.log("FOTO")
            console.log(respuesta.data)

            dispatch(addFoto(respuesta.data.Foto))

        } catch (error) {
            console.log(error)
        }


    }
    const cargarFoto = () => {
        setOpenModal(true)
    }




    let imageUrl = fotoPerfil;
    if (datosCuenta.rutaFoto != false) {
        return (
            <div className="inicioPaginaDC">
                <br></br>
                <div className="contfotoPerfilDC">
                    {/* "{{ isImageAvailable ? 'image.jpg' : 'default-image.jpg' }}" */}
                    {/* <img className="fotoPerfilDC" src= {datosCuenta.rutaFoto} alt="Foto de perfil" /> */}
                    <div className="contenedorFotoUnico">
                        <img className="fotoPerfilDC" src={datosCuenta.rutaFoto} onerror="this.onerror=null; this.src='fotoPerfil';" alt="Foto de perfil" />
                    </div>
                    <p>{nombres + " " + apPaterno + " " + apMaterno}</p>
                    <Button className="btnEditarFoto2" onClick={cargarFoto}>
                        {/*   <PencilSquare />*/}
                        <i className="bi bi-pencil-square" />

                    </Button>

                </div>

                <div className="posBtnEditarDC">

                    <Modal show={mostrarModal} onHide={handleModalClose}>
                        <Modal.Body >
                            <p>¿Está seguro que desea guardar los cambios realizados?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className=" botonModal btnDisenio botonCancelarDC" onClick={handleModalCancelar}>
                                Cancelar</Button>
                            <Button className=" botonModal btnDisenio botonAceptarDC" onClick={handleModalAceptar}>
                                Aceptar</Button>
                        </Modal.Footer>
                    </Modal>
                    
                </div>
                <div className="contDatosDC">

                    <div className="contPerfilDC">
                        <h2 className="tituloDC">Datos personales</h2>
                        <div className="contDatosPersonalesDC">
                            <div className="contenedorDC2">
                                <div className="datos-nombreDC alineacionDC">
                                    <label className="label" htmlFor="nombres">
                                        Nombres
                                    </label>
                                    <br></br>
                                    <input style={{ borderWidth: '0.5px', backgroundColor: color, color: colorTexto }}
                                        className={mostrarTexto1 ? 'inputDCError' : 'inputDC'} disabled={!editable}
                                        type="text" id="nombres"
                                        value={nombres} onChange={handleChange}
                                        name="nombres" />
                                    <input class="inputEspecialADC" disabled type="text" name="txtValido1" value={mostrarTexto1}
                                        onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }}/>
                                </div>
                                <div className="datos-nombreDC alineacionDC btnDivDisenio">
                                    <button className="botonEditarAlinear btnDisenio"
                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                        style={{ borderWidth: '0.5px', backgroundColor: botonColor }} onClick={handleButtonClick} >
                                        {textoBoton}
                                    </button>
                                </div>
                            </div>
                            <div className="datos-apellidoDC">
                                <div className="contenedorADC">
                                    <div className="apellido-paterno-container alineacionDC">
                                        <label className="label" htmlFor="apellidoPaterno">
                                            Apellido paterno
                                        </label>
                                        <br></br>
                                        <input className={mostrarTexto2 ? 'inputDCError' : 'inputDC'} style={{ borderWidth: '0.5px', backgroundColor: color, color: colorTexto, colorTexto }} disabled={!editable}
                                            type="text" id="apellidoPaterno" value={apPaterno} onChange={handleChange} name="apPaterno" />
                                        <input class="inputEspecialADC" disabled type="text" name="txtValido2" value={mostrarTexto2}
                                            onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }}/>
                                    </div>
                                    <div className="apellido-materno-container alineacionDC">
                                        <label className="label" htmlFor="apellidoMaterno">
                                            Apellido materno
                                        </label>
                                        <br></br>
                                        <input className={mostrarTexto3 ? 'inputDCError' : 'inputDC'} style={{ borderWidth: '1px', borderStyle: 'solid', backgroundColor: color, color: colorTexto, colorTexto }} disabled={!editable} type="text"
                                            id="apellidoMaterno" value={apMaterno} onChange={handleChange} name="apMaterno" />
                                        <input class="inputEspecialADC" disabled type="text" name="txtValido3" value={mostrarTexto3}
                                            onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }}/>
                                    </div>
                                </div>
                            </div>
                            <div class="contenedorADC">
                                <div className="datos-codigoDC alineacionDC">
                                    <label className="label" htmlFor="codigo">
                                        Código
                                    </label>
                                    <br></br>
                                    <input className="inputDC" style={{ borderWidth: '0.5px', backgroundColor: color, color: colorTexto, colorTexto, borderBlockColor: backgroundColorInput4 }} disabled={!editable}
                                        type="text" id="codigo" value={codigo} onChange={handleChange} name="codigo" />
                                    <input class="inputEspecialADC" disabled type="text" name="txtValido4" value={mostrarTexto4}
                                        onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }}/>
                                </div>
                                <div className="datos-correoDC alineacionDC">
                                    <label className="label" htmlFor="correoElectronico">
                                        Correo electrónico
                                    </label>
                                    <br></br>
                                    <input className="inputDC" style={{ borderWidth: '0.5px', backgroundColor: color, color: colorTexto, colorTexto, borderBlockColor: backgroundColorInput5 }} disabled={!editable} type="email"
                                        id="correoElectronico" value={correo} onChange={handleChange} name="correo" />
                                    <input class="inputEspecialADC" disabled type="text" name="txtValido5" value={mostrarTexto5}
                                        onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }}/>
                                </div>
                            </div>
                            <div class="contenedorADC">
                                <div className="datos-celular alineacionDC">
                                    <label className="label" htmlFor="celular">
                                        Celular
                                    </label>
                                    <br></br>
                                    <input className="inputDC" style={{ borderWidth: '0.5px', backgroundColor: color, color: colorTexto, colorTexto, borderBlockColor: backgroundColorInput6 }} disabled={!editable}
                                        type="tel" id="celular" value={celular} onChange={handleChange} name="celular" />
                                    <input class="inputEspecialADC" disabled type="text" name="txtValido6" value={mostrarTexto6}
                                        onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }}/>
                                </div>
                                <div className="datos-correo-secundario alineacionDC">
                                    <label className="label" htmlFor="correoSecundario">
                                        Correo secundario
                                    </label>
                                    <br></br>
                                    <input className="inputDC" style={{ borderWidth: '0.5px', backgroundColor: color, color: colorTexto, colorTexto, borderBlockColor: backgroundColorInput7 }} disabled={!editable} type="email"
                                        id="correoSecundario" value={correoSecundario} onChange={handleChange} name="correoSecundario" />
                                    <input class="inputEspecialADC" disabled type="text" name="txtValido7" value={mostrarTexto7}
                                        onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="rectanguloAzulDC">

                    </div>
                    <div className="contPerfilDC">
                        <h2 className="tituloDC">Roles Asignados</h2>
                        <ul>
                            {datosCuenta.roles.map((rol, index) => {
                                return <li className="listaRolesDC" key={index}>{rol.roles}</li>
                            })}
                        </ul>
                    </div>
                </div>
                <br></br>

                {openModal && <ModalDragFoto closeModal={setOpenModal} mostrarFoto={handleFoto} idUsuario={datosCuenta.idCuenta} />}
            </div>
        );
    }

    else {
        return (
            <div className="inicioPaginaDC">
                <br></br>
                <div className="contfotoPerfilDC">
                    {/* "{{ isImageAvailable ? 'image.jpg' : 'default-image.jpg' }}" */}
                    {/* <img className="fotoPerfilDC" src= {datosCuenta.rutaFoto} alt="Foto de perfil" /> */}
                    <div className="contenedorFotoUnico">
                        <img className="fotoPerfilDC" src={imageUrl} onerror="this.onerror=null; this.src='fotoPerfil';" alt="Foto de perfil" />
                    </div>
                    <p>{nombres + " " + apPaterno + " " + apMaterno}</p>
                    <Button className="btnEditarFoto2" onClick={cargarFoto}>
                        {/*   <PencilSquare />*/}
                        <i className="bi bi-pencil-square" />

                    </Button>

                </div>

                <div className="posBtnEditarDC">

                    <Modal show={mostrarModal} onHide={handleModalClose}>
                        <Modal.Body >
                            <p>¿Está seguro que desea guardar los cambios realizados?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="botonModal btnDisenio botonCancelarDC" onClick={handleModalCancelar}>
                                Cancelar</Button>
                            <Button className="botonModal btnDisenio botonAceptarDC" onClick={handleModalAceptar}>
                                Aceptar</Button>
                        </Modal.Footer>
                    </Modal>
                    {/* <Modal show={mostrarModal3} onHide={handleModalClose3}>
                        <Modal.Body >
                            <p>{mensajeError}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="botonAceptarAC" onClick={handleModalClose3}>
                                Aceptar</Button>
                        </Modal.Footer>
                    </Modal> */}
                </div>
                <div className="contDatosDC">

                    <div className="contPerfilDC">
                        <h2 className="tituloDC">Datos personales</h2>
                        <div className="contDatosPersonalesDC">
                            <div className="contenedorDC2">
                                <div className="datos-nombreDC alineacionDC">
                                    <label className="label" htmlFor="nombres">
                                        Nombres
                                    </label>
                                    <br></br>
                                    <input style={{ borderWidth: '0.5px', backgroundColor: color, color: colorTexto, borderBlockColor: backgroundColorInput1 }}
                                        className="inputDC" disabled={!editable}
                                        type="text" id="nombres"
                                        value={nombres} onChange={handleChange}
                                        name="nombres" />
                                    <input class="inputEspecialADC" disabled type="text" name="txtValido1" value={mostrarTexto1}
                                    onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }}/>
                                </div>
                                <div className="btnDivDisenio datos-nombreDC alineacionDC">
                                    <button className="button btnEdicionGuardar btnDisenio"
                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                        style={{ borderWidth: '0.5px', backgroundColor: botonColor }} onClick={handleButtonClick} >
                                        {textoBoton}
                                    </button>
                                </div>
                            </div>
                            <div className="datos-apellidoDC">
                                <div className="contenedorADC">
                                    <div className="apellido-paterno-container alineacionDC">
                                        <label className="label" htmlFor="apellidoPaterno">
                                            Apellido paterno
                                        </label>
                                        <br></br>
                                        <input className="inputDC" style={{ borderWidth: '0.5px', backgroundColor: color, color: colorTexto, colorTexto, borderBlockColor: backgroundColorInput2 }} disabled={!editable}
                                            type="text" id="apellidoPaterno" value={apPaterno} onChange={handleChange} name="apPaterno" />
                                        <input class="inputEspecialADC" disabled type="text" name="txtValido2" value={mostrarTexto2}
                                        onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }}/>
                                    </div>
                                    <div className="apellido-materno-container alineacionDC">
                                        <label className="label" htmlFor="apellidoMaterno">
                                            Apellido materno
                                        </label>
                                        <br></br>
                                        <input className="inputDC" style={{ borderWidth: '1px', borderStyle: 'solid', backgroundColor: color, color: colorTexto, colorTexto, borderBlockColor: backgroundColorInput3 }} disabled={!editable} type="text"
                                            id="apellidoMaterno" value={apMaterno} onChange={handleChange} name="apMaterno" />
                                        <input class="inputEspecialADC" disabled type="text" name="txtValido3" value={mostrarTexto3}
                                        onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }}/>
                                    </div>
                                </div>
                            </div>
                            <div class="contenedorADC">
                                <div className="datos-codigoDC alineacionDC">
                                    <label className="label" htmlFor="codigo">
                                        Código PUCP
                                    </label>
                                    <br></br>
                                    <input className="inputDC" style={{ borderWidth: '0.5px', backgroundColor: color, color: colorTexto, colorTexto, borderBlockColor: backgroundColorInput4 }} disabled={!editable}
                                        type="text" id="codigo" value={codigo} onChange={handleChange} name="codigo" />
                                    <input class="inputEspecialADC" disabled type="text" name="txtValido4" value={mostrarTexto4}
                                    onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }}/>
                                </div>
                                <div className="datos-correoDC alineacionDC">
                                    <label className="label" htmlFor="correoElectronico">
                                        Correo electrónico
                                    </label>
                                    <br></br>
                                    <input className="inputDC" style={{ borderWidth: '0.5px', backgroundColor: color, color: colorTexto, colorTexto, borderBlockColor: backgroundColorInput5 }} disabled={!editable} type="email"
                                        id="correoElectronico" value={correo} onChange={handleChange} name="correo" />
                                    <input class="inputEspecialADC" disabled type="text" name="txtValido5" value={mostrarTexto5}
                                    onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }}/>
                                </div>
                            </div>
                            <div class="contenedorADC">
                                <div className="datos-celular alineacionDC">
                                    <label className="label" htmlFor="celular">
                                        Celular
                                    </label>
                                    <br></br>
                                    <input className="inputDC" style={{ borderWidth: '0.5px', backgroundColor: color, color: colorTexto, colorTexto, borderBlockColor: backgroundColorInput6 }} disabled={!editable}
                                        type="tel" id="celular" value={celular} onChange={handleChange} name="celular" />
                                    <input class="inputEspecialADC" disabled type="text" name="txtValido6" value={mostrarTexto6}
                                    onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }}/>
                                </div>
                                <div className="datos-correo-secundario alineacionDC">
                                    <label className="label" htmlFor="correoSecundario">
                                        Correo secundario
                                    </label>
                                    <br></br>
                                    <input className="inputDC" style={{ borderWidth: '0.5px', backgroundColor: color, color: colorTexto, colorTexto, borderBlockColor: backgroundColorInput7 }} disabled={!editable} type="email"
                                        id="correoSecundario" value={correoSecundario} onChange={handleChange} name="correoSecundario" />
                                    <input class="inputEspecialADC" disabled type="text" name="txtValido7" value={mostrarTexto7}
                                    onChange={handleChange} style={{ width: "100%", maxWidth: "500px" }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="rectanguloAzulDC">

                    </div>
                    <div className="contPerfilDC">
                        <h2 className="tituloDC">Roles Asignados</h2>
                        <ul>
                            {datosCuenta.roles.map((rol, index) => {
                                return <li className="listaRolesDC" key={index}>{rol.roles}</li>
                            })}
                        </ul>
                    </div>
                </div>
                <br></br>

                {openModal && <ModalDragFoto closeModal={setOpenModal} mostrarFoto={handleFoto} idUsuario={datosCuenta.idCuenta} />}




            </div>
        );
    }
}