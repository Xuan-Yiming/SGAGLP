import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../HojasDeEstilo/AdminVerDetalleFacultad.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from 'react-redux';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import { getDataResFacu, getDataAsisFacu, columns, formatRowData } from "./DataUsuarioFacEspe";
import Table from "./TablaCuentas";
import axios from 'axios';

import { addDatosFacultad, addBanderaVerFacu } from '../Redux/FacultadSlice';
import { addDatosResponsableFacultad, addIdPerfilResponsableFacu } from '../Redux/ResponsableFacultadSlice';

import { useDispatch } from "react-redux";
import { faArrowsLeftRightToLine } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AdminVerDetalleFacultad(props) {
    let valor;
    const [cookies, setCookie] = useCookies();
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [mostrarModal, setmostrarModal] = useState(false);
    const [mostrarModa0, setmostrarModal0] = useState(false);
    const [mostrarModa2, setmostrarModal2] = useState(false);
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [seleccionadosRes, setSeleccionadosRes] = useState([]);
    const [seleccionadosAsis, setSeleccionadosAsis] = useState([]);
    const [selectedResponsables, setSelectedResponsables] = useState([]);
    const [selectedAsistentes, setSelectedAsistentes] = useState([]);
    const [editable, setEditable] = useState(false);
    const [cambioCompetencia, setCambioCompetencia] = useState(0);
    const [tieneEspecialidad, setTieneEspecialidad] = useState('');
    const [colorBoton, setColorBoton] = useState("#042354");
    const [textoavisoResp, setTextoavisoResp] = useState("");
    const [inputBorderColorNombre, setInputBorderColorNombre] = useState('#000000');
    const [inputBorderColorCodigo, setInputBorderColorCodigo] = useState('#000000');
    const [inputBorderColorCorreo, setInputBorderColorCorreo] = useState('#000000');
    const [numRes, setNumRes] = useState(1);

    const datosFacultad = useSelector((state) => state.Facultad);
    const datosResponsableFacultad = useSelector((state) => state.ResponsableFacultad);
    const datosAsistenteFacultad = useSelector((state) => state.AsistenteFacultad);

    console.log("DATOS FACULTAD:")
    console.log(datosFacultad);

    const dispatch = useDispatch();

    const valCodigo = /^[\w\sÁÉÍÓÚÜÑáéíóúüñ]+$/u;
    const valNombre = /^[a-zA-ZÀ-ÿ\s]+$/;
    const valCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

    
    useEffect(() => {
        if ((valCodigo.test(codigo) && codigo.trim().length !==0)  && 
            (valCorreo.test(correo) && correo.trim().length !==0) && 
            (valNombre.test(nombre) && nombre.trim().length !==0)) {
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
            setInputBorderColorNombre("white")
        }else{
            if(nombre.length===0){
                setInputBorderColorNombre("white")
            }else{
                setInputBorderColorNombre("red")
            }
        }
        if(datosResponsableFacultad.ResponsablesFacultad.length === 0 && numRes === 0){
            setTextoavisoResp("Debe haber al menos un Responsable");
        }
    }, [codigo, nombre, correo, datosResponsableFacultad, numRes]);
    

    useEffect(() => {
        setCodigo(datosFacultad.codigoFacultad);
        setNombre(datosFacultad.nombreFacultad);
        setCorreo(datosFacultad.correoFacultad);
        setTieneEspecialidad(datosFacultad.tieneEspecialidad);
        setBotonHabilitado(datosFacultad.botonGuardarHab);
        props.cambiarEstadoVerFacu(true);
        dispatch(addBanderaVerFacu(true));
    }, []);


    const handleModalAceptarEliminarRes = () => {
        handleModalAceptarEliminar(selectedResponsables)
        setSelectedResponsables([]);
    }

    const handleModalAceptarEliminarAsis = () => {
        handleModalAceptarEliminar(selectedAsistentes)
        setSelectedAsistentes([]);
    }

    const handleModalAceptarEliminar = async (selected) => {
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {
            idPerfiles: selected
        }
        console.log("DATA ANTES DE ENVIAR:")
        console.log(data)
        try {
            const respuesta = await axios.post("http://localhost:3050/api/facultad/deshabilitarPerfilFacultad", data, config);
            console.log("RESPUESTA DE API:")
            console.log(respuesta.data);

            setmostrarModal0(false);
            setmostrarModal2(false);
            setFlagBusqueda(!flagBusqueda);

        } catch (error) {

            console.log(error)
        }
    };

    const handleModalCloseEliminarRes = () => {
        setmostrarModal0(false);
    };

    const handleModalCloseEliminarAsis = () => {
        setmostrarModal2(false);
    };

    const toggleValueRes = (event, idPerfil) => {
        if (event.target.checked) {
            setSelectedResponsables((prevSelectedPerfiles) => [...prevSelectedPerfiles, idPerfil]);
        } else {
            setSelectedResponsables((prevSelectedPerfiles) => prevSelectedPerfiles.filter((id) => id !== idPerfil));
        }
    };

    const toggleValueAsis = (event, idPerfil) => {
        if (event.target.checked) {
            setSelectedAsistentes((prevSelectedPerfiles) => [...prevSelectedPerfiles, idPerfil]);
        } else {
            setSelectedAsistentes((prevSelectedPerfiles) => prevSelectedPerfiles.filter((id) => id !== idPerfil));
        }
    };
    console.log("SELECCIONADOS ASIS:")
    console.log(selectedAsistentes)

    const handleButtonEliminarAsis = () => {
        setmostrarModal2(true);
    };

    const handleButtonAñadirAsis = () => {
        setColor("#FFFFFF");
        setColorTexto("#000000");

        props.cambiarComponenteAniadirFacultad(false);
        props.cambiarComponenteAniadirResFacultad(false);
        props.cambiarComponenteVerDetalleFacultad(false);
        props.cambiarComponenteAniadirAsisFacultad(true);
    };

    const [resPageData, setResPageData] = useState({
        rowData: [],
        isLoading: false,
    });

    const [asisPageData, setAsisPageData] = useState({
        rowData: [],
        isLoading: false,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const handleChangeCodigo = (event) => {
        setCodigo(event.target.value);
        validarCampos(nombre, codigo, correo);
    };

    const handleChangeNombre = (event) => {
        setNombre(event.target.value);
        validarCampos(nombre, codigo, correo);
    };

    const handleChangeCorreo = (event) => {
        setCorreo(event.target.value);
        validarCampos(nombre, codigo, correo);
    };

    const validarCampos = (valorNombre, valorCodigo, valorCorreo) => {
        if (valorNombre !== '' && valorCorreo !== '' && valorCodigo !== '') {
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
    };

    const handleModalAceptar = async () => {
        setmostrarModal(false);

        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {
            idFacultad: datosFacultad.idFacultad,
            nombreFacultad: nombre,
            codigoFacultad: codigo,
            correo: correo,
            tieneEspecialidad: tieneEspecialidad
        }
        var errorMessage = "";
        var mensajeCompleto = "";

        try {
            const respuesta = await axios.post("http://localhost:3050/api/facultad/modificarFacultad", data, config);

            console.log(respuesta.data);

            if (respuesta.data.success) {
                toast.success('Facultad modificada correctamente.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setEditable(false);
                setColor("#FFFFFF");
                setColorTexto("#000000'");
                //props.cambiarComponente2(false);
    
                let Facultad = {
                    idFacultad: datosFacultad.idFacultad,
                    nombreFacultad: nombre,
                    codigoFacultad: codigo,
                    correoFacultad: correo,
                    tieneEspecialidad: tieneEspecialidad
                };
                dispatch(addDatosFacultad(Facultad));
            } else {
                errorMessage = respuesta.data.error.message;
                mensajeCompleto = "Error: " + errorMessage;
                toast.error(mensajeCompleto, {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
            }
        } catch (error) {

            console.log(error)
        }
    };

    const handleButtonFila = async (idFacultad, Facultad) => {
        /*
        dispatch(addDatosIndicadores(Indicador));
        console.log("FILAAAAAAAAAAAAAAAA");
        console.log(Indicador);
        props.cambiarComponente(false);
        props.cambiarComponente2(false);
        props.cambiarComponente3(false);
        props.cambiarComponente4(true);
        */
    };

    const handleButtonEliminar = () => {
        setmostrarModal0(true);
    };

    const handleButtonAñadir = () => {
        setColor("#FFFFFF");
        setColorTexto("#000000");

        props.cambiarComponenteAniadirFacultad(false);
        props.cambiarComponenteAniadirResFacultad(true);
        props.cambiarComponenteVerDetalleFacultad(false);
        props.cambiarComponenteAniadirAsisFacultad(false);
    };

    const handleButtonEditar = () => {
        setEditable(true);
    };

    const handleButtonCancelar = () => {
        setEditable(false);
        setCodigo(datosFacultad.codigoFacultad);
        setNombre(datosFacultad.nombreFacultad);
        setCorreo(datosFacultad.correoFacultad);
        setTieneEspecialidad(datosFacultad.tieneEspecialidad);
    };

    const handleButtonGuardar = () => {
        setColor("#042354");
        if(codigo.trim().length ==0){
            setInputBorderColorCodigo("red")
        }
        if(correo.trim().length ==0){
            setInputBorderColorCorreo("red")
        }
        if(nombre.trim().length ==0){
            setInputBorderColorNombre("red")
        }
        valor = validarCampos();
        console.log("LLEGUE")
        console.log(codigo);
        console.log(correo);
        console.log(nombre);
        console.log(datosResponsableFacultad.ResponsablesFacultad);
        if (valor) {
            if ((valCodigo.test(codigo) && codigo.trim().length !==0)  && 
            (valCorreo.test(correo) && correo.trim().length !==0) && 
            (valNombre.test(nombre) && nombre.trim().length !==0)) {
                setmostrarModal(true);
            }else{
                setmostrarModal(false);
            }
        } else {
            setmostrarModal(false);
        }
    };

    useEffect(() => {
        setResPageData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: true,
        }));

        setAsisPageData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: true,
        }));

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            idFacultad: datosFacultad.idFacultad,
        }
        getDataResFacu(config, data).then((info) => {
            const { Usuario } = info;
            setNumRes(Usuario.length);
            setResPageData({
                isLoading: false,
                rowData: (Usuario.map((Usuario) => ({
                    seleccion: <input
                        className="checkboxGC"
                        type="checkbox"
                        id={Usuario.idUsuario}
                        defaultChecked={seleccionadosRes.includes(Usuario.idUsuario)}
                        onChange={(e) => toggleValueRes(e, Usuario.idPerfil)}
                    />,
                    codigo: <div className="seleccionableGC">{Usuario.codigo}</div>,
                    nombre: <div className="seleccionableGC">{Usuario.nombre}</div>,
                    correo: <div className="seleccionableGC">{Usuario.correo}</div>,
                }))),
            });
        });
        getDataAsisFacu(config, data).then((info) => {
            const { Usuario } = info;
            setAsisPageData({
                isLoading: false,
                rowData: (Usuario.map((Usuario) => ({
                    seleccion: <input
                        className="checkboxGC"
                        type="checkbox"
                        id={Usuario.idUsuario}
                        defaultChecked={seleccionadosAsis.includes(Usuario.idUsuario)}
                        onChange={(e) => toggleValueAsis(e, Usuario.idPerfil)}
                    />,
                    codigo: <div className="seleccionableGC">{Usuario.codigo}</div>,
                    nombre: <div className="seleccionableGC">{Usuario.nombre}</div>,
                    correo: <div className="seleccionableGC">{Usuario.correo}</div>,
                }))),
            });
        });
    }, [flagBusqueda]);


    return (
        <div className="contenedorPrincipalAVDF">
            <div className="contenedorDatosSuperioresAVDF">
                <div className='contenedorDivisionAAVDF'>
                    <div className='derechaAVDF'>
                        <input className="inputAVDF form-control1AVDF tituloPrimFacu"
                            type="text" name="nombre" disabled={!editable}
                            value={nombre} onChange={handleChangeNombre}
                            style={{ padding: '20px', width: '100%', height: "27px", backgroundColor: "#ffffff", borderColor: inputBorderColorNombre}} />
                    </div>
                    {
                        editable &&
                        <div className="btnDivDisenio" style={{ width: "140px", transition: "opacity 0.3s ease"}}>
                            <button
                                className='btnDisenio btnGuardarAVDF'
                                type="button"
                                onClick={handleButtonCancelar}
                                style={{ background: "#9E0520" }}
                            >
                                Cancelar
                            </button>   
                        </div>
                    }
                    {editable ?
                        <div className="btnDivDisenio" style={{ width: "auto", transition: "opacity 0.3s ease"}}>
                            <button className='btnDisenio btnGuardarAVDF' type="button" onClick={handleButtonGuardar} style={{ background: colorBoton }}>
                                Guardar
                            </button> 
                        </div> :
                        <div className="btnDivDisenio" style={{ width: "140px"}}>
                            <button className='btnDisenio btnGuardarAVDF' type="button" onClick={handleButtonEditar} style={{ background: "#042354" }}>
                                Editar
                            </button>
                        </div>
                    }
                </div>
                
                <div className="contenedor-indicadoresAVDF contenedorDatosSuperioresAVDF">
                    <div className="contIndicAVDF">
                        <h2 className="tituloGen tituloTipo3 tituloIDsAVDF">Datos Generales</h2>
                       
                        <div className='contenedorDivisionAVDF2'>
                            <div className="contenedor-codigoAVDF derechaAVDF">
                                <div className="codigoAVDF labelGen">Código</div>
                                <input className="form-control1AVDF inputAVDF inputEspAVDF"
                                    type="text" name="codigo" disabled={!editable}
                                    value={codigo} onChange={handleChangeCodigo}
                                    style={{ height: "27px", backgroundColor: editable ? "#ffffff" : "#F2F7F9" , borderColor: inputBorderColorCodigo}} />
                            </div>
                            
                            <div className="contenedor-descripcionAVDF izquierdaAVDF">
                                <div className="labelGen descripcionAVDF">Correo Electrónico</div>
                                <input className="inputAVDF form-control1AVDF inputEspAVDF"
                                    type="text" name="correo" disabled={!editable}
                                    value={correo} onChange={handleChangeCorreo}
                                    style={{ height: "27px", backgroundColor: editable ? "#ffffff" : "#F2F7F9" , borderColor: inputBorderColorCorreo}} />
                            </div>
                        </div>
                        {/*
                        <div className='contenedorDivisionAVDF'>
                            <div className="contenedor-evidenciaAVDF derechaAVDF">
                                <div className="evidenciaAVDF">Fecha de Creación </div>
                                <input className="inputAVDF form-control1AVDF" type="text" name="evidencia"
                                    value={evidencia} readOnly style={{ height: "27px" }} />
                            </div>
                            <div className="contenedor-evidenciaAVDF izquierdaAVDF"></div>
                        </div>
                        */}
                    </div>
                </div>
            </div>
           
            
            <div className="contenedor-indicadoresAVDF">
                <div className="contIndicAVDF">
                    <h2 className="tituloGen tituloTipo3 tituloIDsAVDF titRespFac">Responsable de Facultad</h2>
                    <div style={{display: "flex"}}>
                        <input className="inputEspecial" name="txtTextoAvisoResp" style={{ width: "100%", maxWidth: "500px" }} value={textoavisoResp} disabled></input>
                        <div className="contenedor-botonesAVDF">
                            <div className="botonesSuperioresAVDF">
                                <div className="btnDivDisenio">
                                    <button type="button" className="btnAniadirAVDF btnDisenio" onClick={handleButtonAñadir} >
                                        Añadir
                                    </button>
                                </div>
                                <div className="btnDivDisenio">
                                    <button type="button" className="btnEliminarAVDF btnDisenio" onClick={handleButtonEliminar} 
                                        style={selectedResponsables.length == 0?{backgroundColor:'gray'}:{}}
                                        disabled={selectedResponsables.length == 0?true:false}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contenedor-indicadores-rellenoAVDF">
                        <Table
                            columns={columns}
                            data={resPageData.rowData}
                            isLoading={resPageData.isLoading}
                        />
                    </div>
                </div>
            </div>
            
            
            <div className="contenedor-indicadoresAVDF">
                <div className="contIndicAVDF">
                    <h2 className="tituloGen tituloTipo3 tituloIDsAVDF">Asistentes de Facultad</h2>
                    <div style={{display: "flex"}}>
                        <input className="inputEspecial" name="txtTextoAvisoResp" style={{ width: "100%", maxWidth: "500px" }} value={""} disabled></input>
                        <div className="contenedor-botonesAVDF">
                            <div className="botonesSuperioresAVDF">
                                <div className="btnDivDisenio">
                                    <button type="button" className="btnAniadirAVDF btnDisenio" onClick={handleButtonAñadirAsis} >
                                        Añadir
                                    </button>
                                </div>
                                <div className="btnDivDisenio">
                                    <button type="button" className="btnEliminarAVDF btnDisenio" onClick={handleButtonEliminarAsis}
                                        style={selectedAsistentes.length == 0?{backgroundColor:'gray'}:{}}
                                        disabled={selectedAsistentes.length == 0?true:false}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contenedor-indicadores-rellenoAVDF">
                        {asisPageData && asisPageData.rowData.length === 0 && <div><p>No hay asistentes asignados.</p></div>}
                        {asisPageData.rowData.length != 0 && <Table
                            columns={columns}
                            data={asisPageData.rowData}
                            isLoading={asisPageData.isLoading}
                        />}
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="contDatosAVDF">
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea guardar los cambios realizados?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" className="botonModal btnDisenio botonCancelarAVDF" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarAVDF" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={mostrarModa0} onHide={handleModalCloseEliminarRes}>
                    <Modal.Body >
                        <p>¿Está seguro que desea eliminar a los responsables seleccionados?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonCancelarREVC" onClick={handleModalCloseEliminarRes}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarREVC" onClick={handleModalAceptarEliminarRes}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={mostrarModa2} onHide={handleModalCloseEliminarAsis}>
                    <Modal.Body >
                        <p>¿Está seguro que desea eliminar a los asistentes seleccionados?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonCancelarREVC" onClick={handleModalCloseEliminarAsis}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarREVC" onClick={handleModalAceptarEliminarAsis}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
            </form>
            
        </div>
    );
}
