import React, { useEffect, useState } from "react";
import "../HojasDeEstilo/Reusable/Boton.css";
import fotoPerfil from "../images/FotoPerfil.png";
import "../HojasDeEstilo/perfil.css";
import { Button, Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import axios from 'axios';
import ModalDragFoto from './ModalDragFoto';
import { useNavigate, Link } from "react-router-dom";




export default function MiPerfil(props) {

    const [valido, setValido] = useState(true);
    const [valido2, setValido2] = useState(true);
    const [valido3, setValido3] = useState(true);
    const [valido4, setValido4] = useState(true);
    const navigate = useNavigate();

    const [botonColor, setBotonColor] = useState("#042354");
    const [textoBoton, setTextoBoton] = useState("Editar");
    const [editable, setEditable] = useState(false);

    const [colorFondo, setColorFondo] = useState("rgb(242, 247, 249)");
    const [colorTexto, setColorTexto] = useState("rgb(120, 146, 164)");

    const [nombre, setNombre] = useState(props.nombre)
    const [id, setId] = useState(props.id)
    const [aMaterno, setAMaterno] = useState(props.aMaterno)
    const [aPaterno, setAPaterno] = useState(props.aPaterno)
    const [correo, setCorreo] = useState(props.correo)
    const [correo2, setCorreo2] = useState(props.correo2)
    const [celular, setCelular] = useState(props.celular)
    const [codigo, setCodigo] = useState(props.codigo)
    const [cookies, setCookie] = useCookies();
    const [openModal, setOpenModal] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);
    const [ruta, setRuta] = useState("");
    const [recargarDatos, setRecargarDatos] = useState(false);
    const [editable1, setEditable1] = useState(true)
    const [editable2, setEditable2] = useState(true)

    const handleModalCancelar = () => {
        setmostrarModal2(false);

        // setFlagActualizar(true);
        //  handleButtonClick()
    };

    useEffect(() => {
        if (!cookies.jwt) {
            navigate('/');
        }
    }, [cookies.jwt, navigate]);

  
    const handleButtonClick = () => {
        if (textoBoton === "Editar") {

            setEditable(true)

            setColorFondo("#FFFFFF");
            setColorTexto("#000000");

            //  handleEdit();
            // handleClick();
            //  setColor("#FFFFFF");
            // setColorTexto("#000000");
            setTextoBoton("Guardar")
        } else {

            if (mostrarModal2) {
                setEditable(false)

                setColorFondo("rgb(242, 247, 249)");
                setColorTexto("rgb(120, 146, 164)");

                //  handleEdit();
                // handleClick();
                //  setColor("#FFFFFF");
                // setColorTexto("#000000");
                setTextoBoton("Editar")




                setmostrarModal2(false);
            } else {
                setmostrarModal2(true);
                // handleValidacion();
                //setmostrarModal(true);
            }
        }
    };

    const handleInputNombre = (event) => {
        const valor = event.target.value;


        setNombre(valor);
    };
    const handleInputAPaterno = (event) => {
        const valor = event.target.value;


        setAPaterno(valor);
    };
    const handleInputAMaterno = (event) => {
        const valor = event.target.value;


        setAMaterno(valor);
    };
    const handleInputCorreo = (event) => {
        const valor = event.target.value;


        setCorreo(valor);
    };
    const handleInputCelular = (event) => {
        let valor = event.target.value;

        if ((!isNaN(valor) && (valor.length === 9)) || (valor.length === 0 && !valor.includes(" "))) {
            setCelular(valor);
            setValido(true)
            setEditable1(true)
        } else {
            setBotonColor("#ADADAD")
            setValido(false)
            setCelular(valor);
            setEditable1(false)
        }


        if (((!isNaN(valor) && (valor.length === 9)) || (valor.length === 0 && !valor.includes(" "))) && (((correo2.indexOf('@') !== -1) && (correo2.includes('.')) ))||(correo2.length===0 && !correo2.includes(" "))) {

            setBotonColor("#042354")
        }
    };
    const handleInputCodigo = (event) => {
        const valor = event.target.value;


        setCodigo(valor);
    };
    const handleInputCorreo2 = (event) => {
        console.log("LLEGANDO")
        const valor = event.target.value.replace(/\s/g, '');
        console.log("CORREO2")
        console.log(valor)

     


        if (((valor.indexOf('@') !== -1) && (valor.includes('.')) && (valor.trim().length!=0))||(valor.length===0 && !valor.includes(" "))) {
            console.log("ENTRANDIN")
            setCorreo2(valor);
            setValido2(true);
            setValido3(true);
            setValido4(true);
            setEditable2(true);
        } else if ((valor.indexOf('@') == -1) && (valor.includes('.'))) {
            console.log("ENTRANDIN2")
            setValido2(false);
            setValido3(true);
            setValido4(true);
            setCorreo2(valor);
            setEditable2(false);
            setBotonColor("#ADADAD")
        } else if (!valor.includes('.') && (valor.indexOf('@') !== -1)) {
            console.log("ENTRANDIN3")
            setValido2(true);
            setValido3(false);
            setValido4(true);
            setCorreo2(valor);
            setEditable2(false);
            setBotonColor("#ADADAD")
        } else {
            console.log("ENTRANDIN4")
            setValido2(true);
            setValido3(true);
            setValido4(false);
            setCorreo2(valor);
            setEditable2(false);
            setBotonColor("#ADADAD")
        }

        if (((!isNaN(celular) && (celular.length === 9)) ||(celular.length === 0 && !celular.includes(" "))) && (((valor.indexOf('@') !== -1) && (valor.includes('.')) ))||(valor.length===0&& !valor.includes(" "))) {
            console.log("ENTRANDIN5")
            setBotonColor("#042354")
        }

         
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
            setRuta(respuesta.data.Foto)
        } catch (error) {
            console.log(error)
        }


    }


    useEffect(() => {

        handleFoto(id);

    }, []);







    const cargarFoto = () => {
        setOpenModal(true)
    }

    const handleGuardarCambios = async () => {

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        
       let valor1 = correo2.replace(/\s/g, '');
       let valor2 = celular.replace(/\s/g, '');
      
        setCelular(valor2)
        setCorreo2(valor1)

        const data = {
            //idMuestraMedicion: datosMedicion.idMuestraMedicion
            correo2: valor1,
            celular: valor2,
            idUsuario: id
        }
        console.log("Enviando datos secundarios:")
        console.log(data)

        try {
            const respuesta = await axios.post("http://localhost:3050/api/cuenta/modificarCuenta", data, config);
            console.log("secundarios")
            console.log(respuesta.data)
            setTimeout(() => {
                handleButtonClick() // llamamos a la función handleButtonClick una vez que el estado se ha actualizado y el modal se ha cerrado
            }, 0);
        } catch (error) {
            console.log(error)
        }
        // handleButtonClick()

    }




    return (
        <div className="inicioPaginaMP">
            <Modal show={mostrarModal2} onHide={() => setmostrarModal2(false)}>
                <Modal.Body >
                    <p>¿Está seguro que desea guardar los cambios?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="botonModal btnDisenio botonCancelarGC" onClick={handleModalCancelar}>
                        Cancelar</Button>
                    <Button className="botonModal btnDisenio botonAceptarGC" onClick={handleGuardarCambios}>
                        Aceptar</Button>
                </Modal.Footer>
            </Modal>

            <div className="contenedorGeneral">
                <div className="contenedorFotoPerfilMP">


                    <img className="fotoPerfilMP" src={ruta} alt="Foto de perfil" />

                </div>


                <div className="contBotonEditar">
                    <Button className="btnEditarFoto" onClick={cargarFoto}>
                        {/*   <PencilSquare />*/}
                        <i className="bi bi-pencil-square" />

                    </Button>
                </div>

                <div className="contenedorDatos">
                    <div className="perfil-containerMP">


                        <h2 className="tituloMP">Datos Personales</h2>
                        <div className="datos-containerMP">
                            <div className="datosDiv">
                                <label className="labelMP" htmlFor="nombres">
                                    Nombres
                                </label>
                                <br></br>
                                <input className="inputMP " type="text" id="nombres" value={nombre} onChange={handleInputNombre} disabled />

                            </div>
                            <div className="datos-apellidoMP">
                                <div className="mitad-containerMP" style={{ marginRight: '10px' }}>
                                    <label className="labelMP" htmlFor="apellidoPaterno">
                                        Apellido paterno
                                    </label>
                                    <br></br>
                                    <input className="inputMP" type="text" id="apellidoPaterno" value={aPaterno} onChange={handleInputAPaterno} disabled />
                                </div>
                                <div className="mitad-containerMP" style={{ marginLeft: '10px' }}>
                                    <label className="labelMP" htmlFor="apellidoMaterno">
                                        Apellido materno
                                    </label>
                                    <br></br>
                                    <input className="inputMP" type="text" id="apellidoMaterno" value={aMaterno} onChange={handleInputAMaterno} disabled />
                                </div>
                            </div>
                            <div className="datosDiv">
                                <label className="labelMP" htmlFor="codigoPUCP">
                                    Código PUCP
                                </label>
                                <br></br>
                                <input className="inputMP inputMPmitad" type="text" id="codigoPUCP" value={codigo} onChange={handleInputCodigo} disabled />
                            </div>
                            <div className="datosDiv">
                                <label className="labelMP" htmlFor="correoElectronico">
                                    Correo electrónico
                                </label>
                                <br></br>
                                <input className="inputMP" type="email" id="correoElectronico" value={correo} onChange={handleInputCorreo} disabled />
                            </div>
                        </div>
                        <div>

                            <div className="datosDiv">
                                <label className="labelMP" htmlFor="celular">
                                    Celular
                                </label>

                                <br></br>
                                <input className="inputMP inputMPmitad" type="tel" id="celular" value={celular} onChange={handleInputCelular} disabled={!editable} style={{ backgroundColor: colorFondo, color: colorTexto }} />
                                {valido ? <></> : <p style={{ color: "red" }}>El número celular ingresado debe tener 9 dígitos</p>}

                            </div>
                            <div className="datosDiv">
                                <label className="labelMP" htmlFor="correoSecundario">
                                    Correo secundario
                                </label>
                                <br></br>
                                <input className="inputMP" type="email" id="correoSecundario" value={correo2} onChange={handleInputCorreo2} disabled={!editable} style={{ backgroundColor: colorFondo, color: colorTexto }} />
                                {valido2 ? <></> : <p style={{ color: "red" }}>El correo ingresado debe contener '@'</p>}
                                {valido3 ? <></> : <p style={{ color: "red" }}>El correo ingresado debe contener por lo menos un '.'</p>}
                                {valido4 ? <></> : <p style={{ color: "red" }}>El correo ingresado debe contener por lo menos un '.' y un '@'</p>}

                            </div>
                        </div>
                        <div className="btnDivDisenio btnDiv">
                            <button className="nuevoEditar btnDisenio" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ borderwidth: '0.5px', backgroundColor: botonColor }} onClick={handleButtonClick} disabled={(!editable1) || (!editable2)}>
                                {textoBoton}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {openModal && <ModalDragFoto closeModal={setOpenModal} mostrarFoto={handleFoto} idUsuario={id} />}
        </div>


    );
}
