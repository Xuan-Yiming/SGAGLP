import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../HojasDeEstilo/ResFacuVerDetalleEspe.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from 'react-redux';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import { getDataResEsp, getDataAsisEsp, columns, formatRowData } from "./DataUsuarioFacEspe";
import Table from "./TablaCuentas";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addDatosEspecialidad, addBanderaVerEspe, addBotonGuardadoHab } from "../Redux/EspecialidadSlice";
import { addDatosResponsableEspecialidad, addIdPerfilResponsableEspe } from '../Redux/ResponsableEspecialidadSlice';

import { useDispatch } from "react-redux";
import { faArrowsLeftRightToLine } from '@fortawesome/free-solid-svg-icons';
import { useLocalStorage } from './useLocalStorage';

export default function ResFacuVerDetalleEspe(props) {
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
    const [colorBoton, setColorBoton] = useState("#042354");
    const datosCuenta = useSelector((state) => state.Cuenta);
    const datosEspecialidad = useSelector((state) => state.Especialidad);
    const datosResponsableEspecialidad = useSelector((state) => state.ResponsableEspecialidad);
    const datosAsistenteEspecialidad = useSelector((state) => state.AsistenteEspecialidad);

    const [inputBorderColorNombre, setInputBorderColorNombre] = useState('#000000');
    const [inputBorderColorCodigo, setInputBorderColorCodigo] = useState('#000000');
    const [inputBorderColorCorreo, setInputBorderColorCorreo] = useState('#000000');
    const dispatch = useDispatch();
    const [textoavisoResp, setTextoavisoResp] = useState("");

    const valCodigo = /^[\w\sÁÉÍÓÚÜÑáéíóúüñ]+$/u;
    const valNombre = /^[a-zA-ZÀ-ÿ\s]+$/;
    const valCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;


    const [idEspecialidad, setidEspecialidad] = useLocalStorage("idEspecialidad");

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
        if(datosResponsableEspecialidad.ResponsablesEspecialidad.length === 0){
            setTextoavisoResp("Debe haber al menos un Responsable");
        }
    }, [codigo, nombre, correo, datosResponsableEspecialidad]);
    

    useEffect(() => {
        setNombre(datosEspecialidad.nombreEspecialidad);
        setCodigo(datosEspecialidad.codigoEspecialidad);
        setCorreo(datosEspecialidad.correoEspecialidad);
        setBotonHabilitado(datosEspecialidad.botonHabilitado);
        props.cambiarEstadoVerEspe(true);
        dispatch(addBanderaVerEspe(true));
    }, []);

    /*
    const handleCheckboxChangeRes = (index) => {
        if (seleccionadosRes.includes(index)) {
            setSeleccionadosRes(seleccionadosRes.filter((item) => item !== index));
        } else {
            setSeleccionadosRes([...seleccionadosRes, index]);
        }
    };

    const handleCheckboxChangeAsis = (index) => {
        if (seleccionadosAsis.includes(index)) {
            setSeleccionadosAsis(seleccionadosAsis.filter((item) => item !== index));
        } else {
            setSeleccionadosAsis([...seleccionadosAsis, index]);
        }
    };
     */

    const handleModalAceptarEliminarRes = () => {
        handleModalAceptarEliminar(selectedResponsables);
    };

    const handleModalAceptarEliminarAsis = () => {
        handleModalAceptarEliminar(selectedAsistentes);
    };

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
            const respuesta = await axios.post("http://localhost:3050/api/especialidad/deshabilitarPerfilEspecialidad", data, config);
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

    const handleButtonEliminarAsis = () => {
        setmostrarModal2(true);
    };

    const handleButtonAñadirAsis = () => {
        setColor("#FFFFFF");
        setColorTexto("#000000");

        props.cambiarComponenteAniadirEspecialidad(false);
        props.cambiarComponenteAniadirResEspecialidad(false);
        props.cambiarComponenteVerDetalleEspecialidad(false);
        props.cambiarComponenteAniadirAsisEspecialidad(true);
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

    const handleChangeCorreo = (event) => {
        setCorreo(event.target.value);
        validarCampos(nombre, codigo, correo);
    };
    const handleChangeNombre = (event) => {
        setNombre(event.target.value);
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
            idEspecialidad: datosEspecialidad.idEspecialidad,
            nombreEspecialidad: nombre,
            idFacultad: datosCuenta.idFacultad,
            codigoEspecialidad: codigo,
            correo: correo
        }
        var errorMessage = "";
        var mensajeCompleto = "";

        try {
            const respuesta = await axios.post("http://localhost:3050/api/especialidad/modificarEspecialidad", data, config);

            console.log(respuesta.data);


            if (respuesta.data.success) {
                toast.success('Cambios registrados exitosamente.', {
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

                let Especialidad = {
                    idEspecialidad: datosEspecialidad.idEspecialidad,
                    nombreEspecialidad: nombre,
                    codigoEspecialidad: codigo,
                    correoEspecialidad: correo
                };
                dispatch(addDatosEspecialidad(Especialidad));
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

    const handleButtonFila = async (idIndicador, Indicador) => {
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

        props.cambiarComponenteAniadirEspecialidad(false);
        props.cambiarComponenteAniadirResEspecialidad(true);
        props.cambiarComponenteVerDetalleEspecialidad(false);
        props.cambiarComponenteAniadirAsisEspecialidad(false);
    };
    const handleButtonVerPlanes = () => {
        
        props.cambiarComponenteVerPlanesMejora(true);
        props.cambiarComponenteVerDetalleEspecialidad(false);
    };

    const handleButtonEditar = () => {
        setEditable(true);
    };


    const handleGestionMuestras = () => {

        props.cambiarComponenteVerDetalleEspecialidad(false);
        props.cambiarComponente(true);

    };

    const handleButtonCancelar = () => {
        setEditable(false);
        setCodigo(datosEspecialidad.codigoEspecialidad);
        setNombre(datosEspecialidad.nombreEspecialidad);
        setCorreo(datosEspecialidad.correoEspecialidad);
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
            idEspecialidad: datosEspecialidad.idEspecialidad
        }
        console.log("ID ESPECIALIDAD:" + datosEspecialidad.idEspecialidad)
        getDataResEsp(config, data).then((info) => {
            const { Usuario } = info;
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
        getDataAsisEsp(config, data).then((info) => {
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
        <div className="contenedorPrincipalRFVDE">
            <div className="contenedorDatosSuperioresRFVDE">
                <div className='contenedorDivisionRFVDE'>
                    <div className='derechaRFVDE'>
                        <input className=" tituloPrim inputAVDF form-control1AVDF"
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
                                <button className="btnDisenio btnGuardarRFVDE" type="button" onClick={handleButtonGuardar} style={{ background: colorBoton }}>
                                    Guardar
                                </button>
                            </div> :
                            <div className="btnDivDisenio" style={{ width: "140px"}}>
                                <button className="btnDisenio btnGuardarRFVDE" type="button" onClick={handleButtonEditar} style={{ background: "#042354" }}>
                                    Editar
                                </button>
                            </div>
                        }
                </div>
                <div className='contenedorDivisionRFVDE4'>
                    <div className="contenedor-guardarRFVDE izquierdaRFVDE">
                        {
                        !editable &&
                        <div className="btnDivDisenio" style={{ width: "185px" }}>
                            <button className="btnDisenio btnGuardarRFVDE"
                                type="button"
                                style={{ background: "#0072bc" }}
                                onClick={handleGestionMuestras}
                            >
                                Ver Muestras
                            </button>
                        </div>
                        }
                        {
                        !editable &&
                        <div className="btnDivDisenio" style={{ width: "185px" }}>

                            <button className="btnDisenio btnGuardarRFVDE"
                                type="button"
                                style={{ background: "#fbb917", width: "450px", margin: "5px", padding: "10px 0px" }}
                                onClick={handleButtonVerPlanes}
                            >
                                Ver Planes de Mejora
                            </button>

                        </div>
                        }
                        {
                        editable &&
                        <div className="btnDivDisenio" style={{ width: "185px" }}>

                            <button className="btnDisenio btnGuardarRFVDE"
                                type="button"
                                style={{ background: "#ffffff", width: "10px", margin: "5px", padding: "10px 0px" }}
                                onClick={handleButtonVerPlanes}
                                disabled={true}
                            >
                                .
                            </button>

                        </div>
                        }
                    </div>
                </div>


                <div className="contenedor-indicadoresRFVDE contenedorDatosSuperioresRFVDE">
                    <div className="contIndicRFVDE">
                        <h2 className="tituloGen tituloTipo3 tituloIDsRFVDE">Datos Generales</h2>

                        <div className='contenedorDivisionRFVDE2'>
                            <div className="contenedor-codigoRFVDE derechaRFVDE">
                                <div className="labelGen codigoRFVDE">Código</div>
                                <input className="form-control1RFVDE inputRFVDE inputEsp"
                                    type="text" name="codigo" disabled={!editable}
                                    value={codigo} onChange={handleChangeCodigo}
                                    style={{ height: "27px", backgroundColor: editable ? "#ffffff" : "#F2F7F9"  , borderColor: inputBorderColorCodigo}} />
                            </div>

                            <div className="contenedor-descripcionRFVDE izquierdaRFVDE">
                                <div className="labelGen descripcionRFVDE">Correo Electrónico</div>
                                <input className="inputRFVDE form-control1RFVDE inputEsp"
                                    type="text" name="correo" disabled={!editable}
                                    value={correo} onChange={handleChangeCorreo}
                                    style={{ height: "27px", backgroundColor: editable ? "#ffffff" : "#F2F7F9" , borderColor: inputBorderColorCorreo}} />
                            </div>
                        </div>
                        {/*
                        <div className='contenedorDivisionRFVDE'>
                            <div className="contenedor-evidenciaRFVDE derechaRFVDE">
                                <div className="evidenciaRFVDE">Fecha de Creación </div>
                                <input className="inputRFVDE form-control1RFVDE"
                                    type="text" name="evidencia" disabled={!editable}
                                    value={evidencia} onChange={handleChangeEvidencia}
                                    style={{ height: "27px", backgroundColor: editable ? "#ffffff" : "#F2F7F9" }} />
                            </div>
                            <div className="contenedor-evidenciaRFVDE izquierdaRFVDE"></div>
                        </div>
                         */}
                    </div>
                </div>
            </div>

            <div className="contenedor-indicadoresRFVDE">
                <div className="contIndicRFVDE">
                    <h2 className="tituloGen tituloTipo3 tituloIDsRFVDE">Responsable de Especialidad</h2>
                    <div className="contenedor-botonesRFVDE">
                        <div className="botonesSuperioresRFVDE">
                            <div className="btnDivDisenio">
                                <button type="button" className="btnAniadirRFVDE btnDisenio" onClick={handleButtonAñadir} >
                                    Añadir
                                </button>
                            </div>
                            <div className="btnDivDisenio">
                                <button type="button" className="btnEliminarRFVDE btnDisenio" onClick={handleButtonEliminar} >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="contenedor-indicadores-rellenoRFVDE">
                        <Table
                            columns={columns}
                            data={resPageData.rowData}
                            isLoading={resPageData.isLoading}
                        />
                    </div>
                </div>
            </div>

            <div className="contenedor-indicadoresRFVDE">
                <div className="contIndicRFVDE" style={{marginBottom:"0px"}}>
                    <h2 className="tituloGen tituloTipo3  tituloIDsRFVDE">Asistentes de Especialidad</h2>
                    <div className="contenedor-botonesRFVDE">
                        <div className="botonesSuperioresRFVDE">
                            <div className="btnDivDisenio">
                                <button className="btnDisenio btnAniadirRFVDE" onClick={handleButtonAñadirAsis} >
                                    Añadir
                                </button>
                            </div>
                            <div className="btnDivDisenio">
                                <button className="btnDisenio btnEliminarRFVDE" onClick={handleButtonEliminarAsis} >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="contenedor-indicadores-rellenoRFVDE">
                        {asisPageData && asisPageData.rowData.length === 0 && <div><p>No hay asistentes asignados.</p></div>}
                        {asisPageData.rowData.length != 0 && <Table
                            columns={columns}
                            data={asisPageData.rowData}
                            isLoading={asisPageData.isLoading}
                        />}
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="contDatosRFVDE">
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea guardar los cambios realizados?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" className="botonCancelarRFVDE botonModal btnDisenio" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarRFVDE" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={mostrarModa0} onHide={handleModalCloseEliminarRes}>
                    <Modal.Body >
                        <p>¿Está seguro que desea eliminar a los responsables seleccionados?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonCancelarRFVDE" onClick={handleModalCloseEliminarRes}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarRFVDE" onClick={handleModalAceptarEliminarRes}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={mostrarModa2} onHide={handleModalCloseEliminarAsis}>
                    <Modal.Body >
                        <p>¿Está seguro que desea eliminar a los asistentes seleccionados?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonCancelarRFVDE" onClick={handleModalCloseEliminarAsis}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarRFVDE" onClick={handleModalAceptarEliminarAsis}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </div>
    );
}