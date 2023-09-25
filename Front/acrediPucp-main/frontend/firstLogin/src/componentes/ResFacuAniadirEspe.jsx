import 'bootstrap/dist/css/bootstrap.min.css';
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import "../HojasDeEstilo/Reusable/TablasFront.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../HojasDeEstilo/Reusable/InputValidacion.css";
import "../HojasDeEstilo/ResFacuAniadirEspe.css";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from 'react-redux';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import { getData, columns, formatRowData } from "./DataIndicadores";
import { Table } from 'react-bootstrap';
import { addDatosIndicadores } from '../Redux/IndicadoresSlice';
import { addBanderaIndicador } from '../Redux/IndicadoresSlice';
import { addDatosCompetencias } from '../Redux/CompetenciasSlice';
import { useLocalStorage } from './useLocalStorage';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addBanderaVerEspe, addDatosEspecialidad } from '../Redux/EspecialidadSlice';
import { addDatosAsistenteEspecialidad, vaciarDatosAsistenteEspecialidad } from '../Redux/AsistenteEspecialidadSlice';
import { addDatosResponsableEspecialidad, vaciarDatosResponsableEspecialidad } from '../Redux/ResponsableEspecialidadSlice';

import { useDispatch } from "react-redux";
import { faArrowsLeftRightToLine } from '@fortawesome/free-solid-svg-icons';

export default function ResFacuAniadirEspe(props) {
    let valor;
    const [cookies, setCookie] = useCookies();
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [id, setId] = useLocalStorage("id");
    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [mostrarModal, setmostrarModal] = useState(false);
    const [mostrarModa2, setmostrarModal2] = useState(false);
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [seleccionado, setSeleccionado] = useState([]);
    const [selectedIndicadores, setSelectedIndicadores] = useState([]);
    const [editable, setEditable] = useState(false);
    const [cambioCompetencia, setCambioCompetencia] = useState(0);
    const [seleccionadosAsis, setSeleccionadosAsis] = useState([]);
    const [colorBoton, setColorBoton] = useState("#042354");
    const [inputBorderColorNombre, setInputBorderColorNombre] = useState('#000000');
    const [inputBorderColorCodigo, setInputBorderColorCodigo] = useState('#000000');
    const [inputBorderColorCorreo, setInputBorderColorCorreo] = useState('#000000');
    const [mostrarModal3, setmostrarModal3] = useState(false);
    const [mensajeError, setMensajeError] = useState(false);

    const dispatch = useDispatch();

    const datosEspecialidad = useSelector((state) => state.Especialidad);
    const datosResponsableEspecialidad = useSelector((state) => state.ResponsableEspecialidad);
    const datosAsistenteEspecialidad = useSelector((state) => state.AsistenteEspecialidad);
    const datosCuenta = useSelector((state) => state.Cuenta);
    const [textoaviso, setTextoaviso] = useState("");
    const [textoavisoAsis, setTextoavisoAsis] = useState("");
    const [textoavisoResp, setTextoavisoResp] = useState("");
    var bandera = false;

    const valCodigo = /^[\w\sÁÉÍÓÚÜÑáéíóúüñ]+$/u;
    const valNombre = /^[a-zA-ZÀ-ÿ\s]+$/;
    const valCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

    useEffect(() => {
        setCodigo(datosEspecialidad.codigoEspecialidad);
        setCorreo(datosEspecialidad.correoEspecialidad);
        setNombre(datosEspecialidad.nombreEspecialidad);
        props.cambiarEstadoVerEspe(false);
        dispatch(addBanderaVerEspe(false));
        console.log("yo tmb");
    }, [])

    useEffect(() => {
        if ((valCodigo.test(codigo) && codigo.trim().length !==0)  && 
        (valCorreo.test(correo) || correo.length == 0 || correo.trim().length ==0) && 
        (valNombre.test(nombre) && nombre.trim().length !==0) &&
            datosResponsableEspecialidad.ResponsablesEspecialidad.length !== 0) {
            setColorBoton("#042354");
        }else{
            setColorBoton("#ADADAD");
        }
        if(valCodigo.test(codigo) && codigo.trim().length !==0){
            setInputBorderColorCodigo("black")
        }else{
            if(codigo.length===0){
                setInputBorderColorCodigo("black")
            }else{
                setInputBorderColorCodigo("red")
            }
        }
        if(valCorreo.test(correo) || correo.length == 0 || correo.trim().length ==0){
            setInputBorderColorCorreo("black")
        }else{
            if(correo.length===0){
                setInputBorderColorCorreo("black")
            }else{
                setInputBorderColorCorreo("red")
            }
        }
        if(valNombre.test(nombre) && nombre.trim().length !==0){
            setInputBorderColorNombre("black")
        }else{
            if(nombre.length===0){
                setInputBorderColorNombre("black")
            }else{
                setInputBorderColorNombre("red")
            }
        }
        if(datosResponsableEspecialidad.ResponsablesEspecialidad.length === 0){
            setTextoavisoResp("Seleccione al menos un Responsable");
        }
    }, [codigo, nombre, correo, datosAsistenteEspecialidad, datosResponsableEspecialidad]);

    const handleButtonEliminar = () => {
        //setmostrarModal2(true);

        const nuevosResponsablesEspecialidad = datosResponsableEspecialidad.ResponsablesEspecialidad.filter(
            (_, index) => !seleccionado.includes(index)
        );

        setSeleccionado([]);

        let ResponsablesEspecialidad = {
            idResponsable: "",
            codigoResponsable: "",
            nombreResponsable: "",
            correoResponsable: "",
            ResponsablesEspecialidad: nuevosResponsablesEspecialidad
        }

        dispatch(addDatosResponsableEspecialidad(ResponsablesEspecialidad))
    };

    const handleCheckboxChangeAsis = (index) => {
        if (seleccionadosAsis.includes(index)) {
            setSeleccionadosAsis(seleccionadosAsis.filter((item) => item !== index));
        } else {
            setSeleccionadosAsis([...seleccionadosAsis, index]);
        }
    };

    const handleCheckboxChange = (index) => {
        if (seleccionado.includes(index)) {
            setSeleccionado(seleccionado.filter((item) => item !== index));
        } else {
            setSeleccionado([...seleccionado, index]);
        }
    };

    const handleModalCloseEliminar = () => {
        setmostrarModal2(false);
    };

    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const handleChangeCodigo = (event) => {
        setCodigo(event.target.value);
        validarCampos(codigo, nombre, correo);
    };

    const handleChangeNombres = (event) => {
        setNombre(event.target.value);
        validarCampos(codigo, nombre, correo);
    };

    const handleChangeCorreo = (event) => {
        setCorreo(event.target.value);
        validarCampos(codigo, nombre, correo);
    };

    const validarCampos = (valorCodigo, valorNombre, valorCorreo) => {
        if (valorCodigo !== '' && valorNombre !== '' && valorCorreo !== '') {
            setBotonHabilitado(true);
            valor = 1;
        } else {
            setBotonHabilitado(false);
            valor = 0;
        }
        return valor;
    };

    const handleModalClose = () => {
        setmostrarModal(false);
        setEditable(false);
        /*
        setDescripcion(datosCompetencia.descripcionCompetencia);
        setEvidencia(datosCompetencia.evidenciaCompetencia);
        */
    };
    
    const handleModalClose3 = () => {
        setmostrarModal3(false);
        setEditable(false);
        /*
        setNombre(datosCompetencia.descripcionCompetencia);
        setCorreo(datosCompetencia.evidenciaCompetencia);*/
    };

    const handleButtonAñadirAsis = () => {
        setColor("#FFFFFF");
        setColorTexto("#000000");

        let Especialidad = {
            idEspecialidad: "",
            codigoEspecialidad: codigo,
            nombreEspecialidad: nombre,
            correoEspecialidad: correo,
        }
        dispatch(addDatosEspecialidad(Especialidad));
        console.log();
        props.cambiarComponenteAniadirEspecialidad(false);
        props.cambiarComponenteAniadirResEspecialidad(false);
        props.cambiarComponenteVerDetalleEspecialidad(false);
        props.cambiarComponenteAniadirAsisEspecialidad(true);
        /*
        props.cambiarComponenteAniadirAsisEspecialidadcialidad(true);
        */
    };

    const handleButtonEliminarAsis = () => {
        //setmostrarModal2(true);

        const nuevosAsistestesEspecialidad = datosAsistenteEspecialidad.AsistentesEspecialidad.filter(
            (_, index) => !seleccionadosAsis.includes(index)
        );

        setSeleccionadosAsis([]);

        let AsistentesEspecialidad = {
            idAsistente: "",
            codigoAsistente: "",
            nombreAsistente: "",
            correoAsistente: "",
            AsistentesEspecialidad: nuevosAsistestesEspecialidad
        }

        dispatch(addDatosAsistenteEspecialidad(AsistentesEspecialidad))
    };

    const handleModalAceptar = async () => {
        setEditable(false);
        setmostrarModal(false);

        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const arregloIds = [];
        for (let i = 0; i < datosAsistenteEspecialidad.AsistentesEspecialidad.length; i++) {
            arregloIds.push(datosAsistenteEspecialidad.AsistentesEspecialidad[i].idAsistente);
        }

        const arregloIds2 = [];
        for (let i = 0; i < datosResponsableEspecialidad.ResponsablesEspecialidad.length; i++) {
            arregloIds2.push(datosResponsableEspecialidad.ResponsablesEspecialidad[i].idResponsable);
        }

        const data = {
            nombreEspecialidad: nombre,
            fidFacultad: id,
            codigoEspecialidad: codigo,
            correo: correo,
            Responsables: arregloIds2,
            Asistentes: arregloIds,
        }


        try {
            const respuesta = await axios.post("http://localhost:3050/api/especialidad/insertarEspecialidad", data, config);
            console.log(respuesta.data.idEspecialidad);
            setColor("#FFFFFF");
            setColorTexto("#000000'");
            //props.cambiarComponente2(false);
            console.log("-----------------")
            console.log(respuesta.data.idEspecialidad)
            console.log("-----------------")
            if (respuesta.data.idEspecialidad == 0) {
                bandera = true;
                console.log("ENTRO a true")
                console.log(bandera);
            } else {
                bandera = false;
                if (respuesta.data.success) {
                    toast.success('Especialidad registrada exitosamente.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            }

        } catch (error) {

            console.log(error)
        }
        if (bandera === false) {
            props.cambiarComponenteAniadirEspecialidad(false);
            props.cambiarComponenteAniadirAsisEspecialidad(false);
            props.cambiarComponenteAniadirResEspecialidad(false);
            props.cambiarComponenteVerDetalleEspecialidad(false);
            setNombre("");
            setCodigo("");
            setCorreo("");
            dispatch(vaciarDatosAsistenteEspecialidad());
            dispatch(vaciarDatosResponsableEspecialidad());
            setTextoaviso("");
        }else{
            console.log("ENTRO a verificacion")
            //setMensajeError("Ya existe una especialidad registrada con ese código");
            toast.error('Especialidad existente. Inserte un nuevo código', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setmostrarModal3(true);
            setmostrarModal(false);
            setCodigo("");
        }        
    };

    const handleButtonFila = async (idIndicador, Indicador) => {
        dispatch(addDatosIndicadores(Indicador));
        console.log("FILAAAAAAAAAAAAAAAA");
        console.log(Indicador);
        props.cambiarComponente(false);
        props.cambiarComponente2(false);
        props.cambiarComponente3(false);
        props.cambiarComponente4(true);
    };

    const handleButtonAñadir = () => {
        setColor("#FFFFFF");
        setColorTexto("#000000");

        let Especialidad = {
            idEspecialidad: "",
            codigoEspecialidad: codigo,
            nombreEspecialidad: nombre,
            correoEspecialidad: correo,
        }
        dispatch(addDatosEspecialidad(Especialidad));
        console.log();
        props.cambiarComponenteAniadirEspecialidad(false);
        props.cambiarComponenteAniadirResEspecialidad(true);
        props.cambiarComponenteVerDetalleEspecialidad(false);
    };
    const handleButtonEditar = () => {
        setEditable(true);
    };
    const handleButtonGuardar = () => {
        setColor("#042354");

        valor = validarCampos();
        if (valor) {
            if(datosResponsableEspecialidad.ResponsablesEspecialidad.length === 0 || 
                (!valCodigo.test(codigo) || codigo.trim().length ==0) ||
                (!valCorreo.test(correo)  && correo.length > 0) || 
                (!valNombre.test(nombre) || nombre.trim().length ==0)){
                    if(codigo.trim().length ==0){
                        setInputBorderColorCodigo("red")
                    }
                    if(correo.trim().length ==0){
                        setInputBorderColorCorreo("red")
                    }
                    if(nombre.trim().length ==0){
                        setInputBorderColorNombre("red")
                    }
                setmostrarModal(false);
            }else{
                setmostrarModal(true);
            }
        } else {
            setmostrarModal(false);
        }
    };




    return (
        <div className="contenedorPrincipalRFAE">
            <div className="contenedorDatosSuperioresRFAE">
                <div className="contenedor-descripcionRFAE">
                    <div className="labelGen codigoRFAE">Código de Especialidad *</div>
                    <input className="inputActivoGen "
                        type="text" name="codigo"
                        value={codigo} onChange={handleChangeCodigo}
                        style={{ height: "27px", width: "80%" , borderColor: inputBorderColorCodigo}} />
                </div>
                <div className="contenedor-descripcionRFAE">
                    <div className="labelGen descripcionRFAE">Nombre de Especialidad *</div>
                    <input className="inputActivoGen  "
                        type="text" name="descripcion"
                        value={nombre} onChange={handleChangeNombres}
                        style={{ height: "27px", width: "80%" , borderColor: inputBorderColorNombre}} />
                </div>
                <div className="contenedor-descripcionRFAE">
                    <div className="labelGen evidenciaRFAE">Correo</div>
                    <input className="inputActivoGen "
                        type="text" name="evidencia"
                        value={correo} onChange={handleChangeCorreo}
                        style={{ height: "27px", width: "80%", borderColor: inputBorderColorCorreo }} />
                </div>
                <input className="inputEspecial" name="txtTextoAviso" value={textoaviso} disabled></input>
            </div>
            
            <div className="contenedor-indicadoresRFAE">
                <div className="contIndicRFAE">
                    <h2 className="tituloTipo3 tituloGen tituloIDsRFAE">Responsable de Especialidad</h2>
                    <div style={{display: "flex"}}>
                        <input className="inputEspecial" name="txtTextoAvisoResp" style={{ width: "100%", maxWidth: "500px" }} value={textoavisoResp} disabled></input>
                        <div className="contenedor-botonesRFAE">
                            <div className="botonesSuperioresRFAE">
                                <div className="btnDivDisenio">
                                    <button className="btnDisenio btnAniadirRFAE" onClick={handleButtonAñadir} >
                                        Añadir
                                    </button>
                                </div>
                                <div className="btnDivDisenio">
                                    <button className="btnDisenio btnEliminarRFAE" onClick={handleButtonEliminar} >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contenedorTablaF">
                        {datosResponsableEspecialidad.ResponsablesEspecialidad.length === 0 && <p>Sin Responsables</p>}
                        {datosResponsableEspecialidad.ResponsablesEspecialidad.length !== 0 && (

                            <Table bordered hover className='tablaF'>
                                <thead>
                                    <tr className="ColumnaAAFA">
                                        <th className="SeleccionCol">Selección</th>
                                        <th className="CodigoAAF">Código</th>
                                        <th className="NombreAAF">Nombre Completo</th>
                                        <th className="CorreoAAF">Correo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosResponsableEspecialidad.ResponsablesEspecialidad.map((e, index) => (
                                        <tr key={index}>
                                            <td className="filaAAF">
                                                <input
                                                    className="checkboxGC"
                                                    type="checkbox"
                                                    checked={seleccionado.includes(index)}
                                                    onChange={() => handleCheckboxChange(index)} />
                                            </td>
                                            <td className="filaAAF">{e.codigoResponsable}</td>
                                            <td className="filaAAF">{e.nombreResponsable}</td>
                                            <td className="filaAAF">{e.correoResponsable}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </Table>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="contenedor-indicadoresAAF">
                <div className="contIndicRFAE">
                    <h2 className="tituloTipo3 tituloGen tituloIDsAAF">Asistentes de Especialidad</h2>
                    <input className="inputEspecial" name="txtTextoAvisoAsis" style={{ width: "100%", maxWidth: "500px" }}  value={textoavisoAsis} disabled></input>                    
                    <div className="contenedor-botonesAAF">

                        <div className="botonesSuperioresRFAE">
                            <div className="btnDivDisenio">
                                <button className="btnDisenio btnAniadirRFAE" onClick={handleButtonAñadirAsis} >
                                    Añadir
                                </button>
                            </div>
                            <div className="btnDivDisenio">
                                <button className="btnDisenio btnEliminarRFAE" onClick={handleButtonEliminarAsis} >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="contenedorTablaF">
                        {datosAsistenteEspecialidad.AsistentesEspecialidad.length === 0 && <p>Sin Asistentes</p>}
                        {datosAsistenteEspecialidad.AsistentesEspecialidad.length !== 0 && (

                            <Table className='tablaF' bordered hover>
                                <thead>
                                    <tr className="ColumnaAAF">
                                        <th className="SeleccionAAF">Selección</th>
                                        <th className="CodigoAAF">Código</th>
                                        <th className="NombreAAF">Nombre Completo</th>
                                        <th className="CorreoAAF">Correo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosAsistenteEspecialidad.AsistentesEspecialidad.map((e, index) => (
                                        <tr key={index}>
                                            <td className="filaAAF">
                                                <input
                                                    type="checkbox"
                                                    checked={seleccionadosAsis.includes(index)}
                                                    onChange={() => handleCheckboxChangeAsis(index)} />
                                            </td>
                                            <td className="filaAAF">{e.codigoAsistente}</td>
                                            <td className="filaAAF">{e.nombreAsistente}</td>
                                            <td className="filaAAF">{e.correoAsistente}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                        )}
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="contDatosRFAE">
                {/*<Modal show={mostrarModal3} onHide={handleModalClose3}>
                    <Modal.Body >
                        //<p>{mensajeError}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonAceptarRFAE" onClick={handleModalClose3}>
                            Aceptar</Button>
                    </Modal.Footer>
                                    </Modal>*/}
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea registrar la nueva especialidad?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" className="botonModal btnDisenio botonCancelarRFAE" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarRFAE" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
            </form>
            
            <div className="contenedor-guardarRFAE">
                <div className="btnDivDisenio">
                    <button className="btnDisenio btnGuardarRFAE" type="button" onClick={handleButtonGuardar} style={{ background: colorBoton }}>
                        Guardar</button>
                </div>
            </div>
        </div>
    );
}