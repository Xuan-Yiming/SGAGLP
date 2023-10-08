import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../HojasDeEstilo/AdminAniadirFacultad.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import "../HojasDeEstilo/Reusable/InputValidacion.css";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import { getData, columns, formatRowData } from "./DataRespFacultad";
import { Table } from 'react-bootstrap';
import { addDatosIndicadores } from '../Redux/IndicadoresSlice';
import Pagination from "../componentes/pagination/pagination";

import { addBanderaVerFacu, addDatosFacultad } from '../Redux/FacultadSlice';
import { addDatosAsistenteFacultad, vaciarDatosAsistenteFacultad } from '../Redux/AsistenteFacultadSlice';
import { addDatosResponsableFacultad, vaciarDatosResponsableFacultad } from '../Redux/ResponsableFacultadSlice';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from "react-redux";
import { faArrowsLeftRightToLine } from '@fortawesome/free-solid-svg-icons';

export default function AdminAniadirFacultad(props) {

    let valor;
    const [cookies, setCookie] = useCookies();
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [mostrarModal, setmostrarModal] = useState(false);
    const [mostrarModa2, setmostrarModal2] = useState(false);
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [seleccionado, setSeleccionado] = useState([]);
    const [seleccionadosAsis, setSeleccionadosAsis] = useState([]);

    const [datosExtra, setDatosExtra] = useState([]);

    const [selectedIndicadores, setSelectedIndicadores] = useState([]);
    const [editable, setEditable] = useState(false);
    const [cambioCompetencia, setCambioCompetencia] = useState(0);
    const [flagActualizar, setFlagActualizar] = useState(false);

    const datosCompetencia = useSelector((state) => state.Competencias);

    const [inputBorderColorNombre, setInputBorderColorNombre] = useState('#000000');
    const [inputBorderColorCodigo, setInputBorderColorCodigo] = useState('#000000');
    const [inputBorderColorCorreo, setInputBorderColorCorreo] = useState('#000000');

    const datosFacultad = useSelector((state) => state.Facultad);
    const datosResponsableFacultad = useSelector((state) => state.ResponsableFacultad);
    const datosAsistenteFacultad = useSelector((state) => state.AsistenteFacultad);
    const datosCuenta = useSelector((state) => state.Cuenta);
    const [textoavisoAsis, setTextoavisoAsis] = useState("");
    const [textoaviso, setTextoaviso] = useState("");
    const [textoavisoResp, setTextoavisoResp] = useState("");
    const [colorBoton, setColorBoton] = useState("#042354");
    var bandera = false;

    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(false);

    const valCodigo = /^[\w\sÁÉÍÓÚÜÑáéíóúüñ]+$/u;
    const valNombre = /^[a-zA-ZÀ-ÿ\s]+$/;
    const valCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

    const handleCheckboxEspecialidad = () => {
        setIsChecked(!isChecked);
    };

    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
        totalPages: 0,
        totalPassengers: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if ((valCodigo.test(codigo) && codigo.trim().length !==0)  && 
        (valCorreo.test(correo) || correo.length == 0 || correo.trim().length ==0) && 
        (valNombre.test(nombre) && nombre.trim().length !==0) &&
            datosResponsableFacultad.ResponsablesFacultad.length !== 0) {
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
        if(datosResponsableFacultad.ResponsablesFacultad.length === 0){
            setTextoavisoResp("Seleccione al menos un Responsable");
        }
    }, [codigo, nombre, correo, datosAsistenteFacultad, datosResponsableFacultad]);

    useEffect(() => {
        setCodigo(datosFacultad.codigoFacultad);
        setCorreo(datosFacultad.correoFacultad);
        setNombre(datosFacultad.nombreFacultad);
        props.cambiarEstadoVerFacu(false);
        console.log("me quiero matar")
        console.log(datosResponsableFacultad);
        console.log(datosAsistenteFacultad);
        dispatch(addBanderaVerFacu(false));
    }, [])

    const handleButtonEliminar = () => {
        //setmostrarModal2(true);

        const nuevosResponsablesFacultad = datosResponsableFacultad.ResponsablesFacultad.filter(
            (_, index) => !seleccionado.includes(index)
        );

        setSeleccionado([]);

        let ResponsablesFacultad = {
            idResponsable: "",
            codigoResponsable: "",
            nombreResponsable: "",
            correoResponsable: "",
            ResponsablesFacultad: nuevosResponsablesFacultad
        }

        dispatch(addDatosResponsableFacultad(ResponsablesFacultad))
    };

    const handleButtonEliminarAsis = () => {
        //setmostrarModal2(true);}

        const nuevosAsistestesFacultad = datosAsistenteFacultad.AsistentesFacultad.filter(
            (_, index) => !seleccionadosAsis.includes(index)
        );

        setSeleccionadosAsis([]);

        let AsistentesFacultad = {
            idAsistente: "",
            codigoAsistente: "",
            nombreAsistente: "",
            correoAsistente: "",
            AsistentesFacultad: nuevosAsistestesFacultad
        }

        dispatch(addDatosAsistenteFacultad(AsistentesFacultad))
    };

    const handleCheckboxChange = (index) => {
        if (seleccionado.includes(index)) {
            setSeleccionado(seleccionado.filter((item) => item !== index));
        } else {
            setSeleccionado([...seleccionado, index]);
        }
    };

    const handleCheckboxChangeAsis = (index) => {
        if (seleccionadosAsis.includes(index)) {
            setSeleccionadosAsis(seleccionadosAsis.filter((item) => item !== index))
        } else {
            setSeleccionadosAsis([...seleccionadosAsis, index])
        }
    };
 
    const handleModalCloseEliminar = () => {
        setmostrarModal2(false);
    };

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
        setNombre(datosCompetencia.descripcionCompetencia);
        setCorreo(datosCompetencia.evidenciaCompetencia);*/
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
        for (let i = 0; i < datosAsistenteFacultad.AsistentesFacultad.length; i++) {
            arregloIds.push(datosAsistenteFacultad.AsistentesFacultad[i].idAsistente);
        }

        const arregloIds2 = [];
        for (let i = 0; i < datosResponsableFacultad.ResponsablesFacultad.length; i++) {
            arregloIds2.push(datosResponsableFacultad.ResponsablesFacultad[i].idResponsable);
        }

        const data = {
            nombreFacultad: nombre,
            tieneEspecialidad: isChecked,
            codigoFacultad: codigo,
            correo: correo,
            Responsables: arregloIds2,
            Asistentes: arregloIds,
        }

        console.log("INSERTADOOOOOOOOOO")

        try {
            const respuesta = await axios.post("http://localhost:3050/api/facultad/insertarFacultad", data, config);
            console.log(respuesta.data.idFacultad);
            console.log(respuesta.data);
            setColor("#FFFFFF");
            setColorTexto("#000000'");
            //props.cambiarComponente2(false);
            if (respuesta.data.idFacultad == 0) {
                bandera = true;
                console.log("ENTRO a true")
                console.log(bandera);
            } else {
                bandera = false;
                if (respuesta.data.success) {
                    toast.success('Facultad registrada exitosamente.', {
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
            props.cambiarComponenteAniadirFacultad(false);
            props.cambiarComponenteAniadirResFacultad(false);
            props.cambiarComponenteVerDetalleFacultad(false);
            props.cambiarComponenteAniadirAsisFacultad(false);
            setNombre("");
            setCodigo("");
            setCorreo("");
            dispatch(vaciarDatosAsistenteFacultad());
            dispatch(vaciarDatosResponsableFacultad());
            setTextoaviso("");
        }else{
            console.log("ENTRO a verificacion")
            //setTextoaviso("Ya existe una facultad registrad con ese código")
            toast.error('Facultad existente. Inserte un nuevo código', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setCodigo("");
        }
        // Cambio a pantalla AdminGestionFacultades
    };
    console.log(datosResponsableFacultad)
    console.log(seleccionadosAsis)


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

        let Facultad = {
            idFacultad: "",
            codigoFacultad: codigo,
            nombreFacultad: nombre,
            correoFacultad: correo,
        }
        dispatch(addDatosFacultad(Facultad));
        console.log();
        props.cambiarComponenteAniadirFacultad(false);
        props.cambiarComponenteAniadirResFacultad(true);
        props.cambiarComponenteVerDetalleFacultad(false);
        props.cambiarComponenteAniadirAsisFacultad(false);
    };

    const handleButtonAñadirAsis = () => {
        setColor("#FFFFFF");
        setColorTexto("#000000");

        let Facultad = {
            idFacultad: "",
            codigoFacultad: codigo,
            nombreFacultad: nombre,
            correoFacultad: correo,
        }
        dispatch(addDatosFacultad(Facultad));
        console.log();
        props.cambiarComponenteAniadirFacultad(false);
        props.cambiarComponenteAniadirResFacultad(false);
        props.cambiarComponenteVerDetalleFacultad(false);
        props.cambiarComponenteAniadirAsisFacultad(true);
    };

    const handleButtonEditar = () => {
        setEditable(true);
    };
    const handleButtonGuardar = () => {
        setColor("#042354");
        valor = validarCampos();
        if (valor) {
            if(datosResponsableFacultad.ResponsablesFacultad.length === 0 || 
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
        <div className="contenedorPrincipalAAF">
            <div className="contenedorDatosSuperioresAAF">
                <div className="contenedor-descripcionAAF">
                    <div className="labelGen codigoAAF">Código de Facultad *</div>
                    <input className="inputGen inputAAF"
                        type="text" name="codigo"
                        value={codigo} onChange={handleChangeCodigo}
                        style={{ height: "27px", width: "80%" , borderColor: inputBorderColorCodigo }} />
                </div>

                <div className="contenedor-descripcionAAF">
                    <div className="labelGen descripcionAAF">Nombre de Facultad *</div>
                    <input className="inputGen inputAAF"
                        type="text" name="descripcion"
                        value={nombre} onChange={handleChangeNombres}
                        style={{ height: "27px", width: "80%" , borderColor: inputBorderColorNombre }} />
                </div>
                <div className="contenedor-descripcionAAF">
                    <div className="labelGen evidenciaAAF">Correo</div>
                    <input className="inputGen inputAAF"
                        type="text" name="evidencia"
                        value={correo} onChange={handleChangeCorreo}
                        style={{ height: "27px", width: "80%" , borderColor: inputBorderColorCorreo }} />
                </div>
                <input className="inputEspecial" name="txtTextoAviso" value={textoaviso} disabled></input>
                
                {/* 
                <div className="labelGen">
                    <label>
                        <input type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxEspecialidad}
                        /> Posee especialidad
                    </label>
                </div>
                 */}
            </div>
            

            <div className="contenedor-indicadoresAAF">
                <div className="contIndicAAF">
                    <h2 className="tituloTipo3 tituloGen tituloIDsAAF">Responsables de Facultad</h2>
                    <div style={{display: "flex"}}>
                        <input className="inputEspecial" name="txtTextoAvisoResp" style={{ width: "100%", maxWidth: "500px" }} value={textoavisoResp} disabled></input>
                        <div className="contenedor-botonesAAF">
                            <div className="botonesSuperioresAAF">
                                <div className="btnDivDisenio">
                                    <button className="btnDisenio btnAniadirAAF" onClick={handleButtonAñadir} >
                                        Añadir
                                    </button>
                                </div>
                                <div className="btnDivDisenio">
                                    <button className="btnDisenio btnEliminarAAF" onClick={handleButtonEliminar}
                                    style={seleccionado.length == 0?{backgroundColor:'gray'}:{}}
                                    disabled={seleccionado.length == 0?true:false} >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contenedorTablaF">
                        {datosResponsableFacultad.ResponsablesFacultad.length === 0 && <p>Sin Responsables</p>}
                        {datosResponsableFacultad.ResponsablesFacultad.length !== 0 && (

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
                                    {datosResponsableFacultad.ResponsablesFacultad.map((e, index) => (
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
                <div className="contIndicAAF">
                    <h2 className="tituloTipo3 tituloGen tituloIDsAAF">Asistentes de Facultad</h2>
                    <input className="inputEspecial" name="txtTextoAvisoAsis" style={{ width: "100%", maxWidth: "500px" }}  value={textoavisoAsis} disabled></input>
                    <div className="contenedor-botonesAAF">

                        <div className="botonesSuperioresAAF">
                            <div className="btnDivDisenio">
                                <button className="btnDisenio btnAniadirAAF2" onClick={handleButtonAñadirAsis} >
                                    Añadir
                                </button>
                            </div>
                            <div className="btnDivDisenio">
                                <button className="btnDisenio btnEliminarAAF" onClick={handleButtonEliminarAsis} 
                                style={seleccionadosAsis.length == 0?{backgroundColor:'gray'}:{}}
                                disabled={seleccionadosAsis.length == 0?true:false}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="contenedorTablaF">
                        {datosAsistenteFacultad.AsistentesFacultad.length === 0 && <p>Sin Asistentes</p>}
                        {datosAsistenteFacultad.AsistentesFacultad.length !== 0 && (

                            <Table bordered hover className='tablaF'>
                                <thead>
                                    <tr className="ColumnaAAF">
                                        <th className="SeleccionCol">Selección</th>
                                        <th className="CodigoAAF">Código</th>
                                        <th className="NombreAAF">Nombre Completo</th>
                                        <th className="CorreoAAF">Correo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosAsistenteFacultad.AsistentesFacultad.map((e, index) => (
                                        <tr key={index}>
                                            <td className="filaAAF">
                                                <input
                                                    className="checkboxGC"
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
                
                <div className="contenedor-guardarAAF">
                    <div className="btnDivDisenio">
                        <button className="btnDisenio btnGuardarAAF" type="button" onClick={handleButtonGuardar} style={{ background: colorBoton }}>
                            Guardar</button>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="contDatosAAF">
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea registrar la nueva facultad?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" className="botonModal btnDisenio botonCancelarAAF" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarAAF" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </div>
    );
}
