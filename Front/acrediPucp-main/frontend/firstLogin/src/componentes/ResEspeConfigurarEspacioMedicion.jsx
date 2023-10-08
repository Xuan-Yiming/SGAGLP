import '../HojasDeEstilo/ResEspeConfigurarEspacioMedicion.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { getData, columns } from "./DataResEspeIndicadores";
import { getDataMuestra, columnsMuestra } from "./DataResEspeMuestras";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { addDatosIndicador, addDatosIndicadores,addDatosMuestras,addDatosListaIndicadores } from "../Redux/MedicionResEspeSlice.js"
import { addDatosAñadir } from '../Redux/ProgramaSlice';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Dropdown, DropdownButton } from 'react-bootstrap';
// import {Table} from "react-bootstrap";
import Table from "./TablaCuentas";
import moment from 'moment';
import 'moment/locale/es';
import DatePicker from 'react-datepicker';
import Pagination from "./pagination/pagination";
import ResEspeBase from './ResEspeBase';
import { Modal, Button } from 'react-bootstrap';

export default function ResEspeConfigurarEspacioMedicion(props) {
    const [bandera, setBandera] = useState(false)
    const [mostrarModal, setmostrarModal] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);
    const [mostrarModal3, setmostrarModal3] = useState(false);
    const [seleccionados, setSeleccionados] = useState([]);
    const [cookies, setCookie] = useCookies();
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [selectedIndicadores, setSelectedIndicadores] = useState([]);
    const [selectedMuestras, setSelectedMuestras] = useState([]);
    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [listaIndicadores, setListaIndicadores] = useState([]);
    const [cicloAcademico, setCicloAcademico] = useState("");
    const [idCicloAcademico, setIdCicloAcademico] = useState("");
    const [seleccionarOpcion, setSeleccionarOpcion] = useState(null);
    const [comboBoxCiclo, setComboBoxCiclo] = useState([]);
    const [fechaLimite, setFechaLimite] = useState(null);
    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [fechaLimiteSeleccionada, setFechaLimiteSeleccionada] = useState(null);
    const dispatch = useDispatch();
    const datosEspacio = useSelector((state) => state.Programa);
    const datosMuestras = useSelector((state) => state.MedicionEspe);
    const [editable, setEditable] = useState(false);

    const toggleValue = (event, idEs) => {
        if (event.target.checked) {
            setSelectedMuestras((prevSelectedMuestras) => [...prevSelectedMuestras, { "idMuestra": idEs }]);
        } else {
            setSelectedMuestras((prevSelectedMuestras) => prevSelectedMuestras.filter((espacio) => espacio.idMuestra !== idEs));
        }
        console.log("ARREGLO DE MUESTRAS");
        console.log(selectedMuestras);
    };
    const toggleValue2 = (event, idEs) => {
        if (event.target.checked) {
            setSelectedIndicadores((prevSelectedIndicadores) => [...prevSelectedIndicadores, { "idIndicador": idEs }]);
        } else {
            setSelectedIndicadores((prevSelectedIndicadores) => prevSelectedIndicadores.filter((espacio) => espacio.idIndicador !== idEs));
        }
        console.log("ARREGLO DE INDICADORES");
        console.log(selectedIndicadores);
    };
    const handleButtonFila = async (idMuestra,cod,nombre) => {
        let muestra ={
            idMuestra:idMuestra,
            codigoMuestra:cod,
            responsableMuestra:nombre
        }

        dispatch(addDatosMuestras(muestra));

        props.cambiarComponenteMedicion1(false);
        props.cambiarComponenteMedicion2(false);
        props.cambiarComponenteMedicion3(false);
        props.cambiarComponenteMedicion4(false);
        props.cambiarComponenteMedicion5(false);
        props.cambiarComponenteMedicion6(false);
        props.cambiarComponenteMedicion7(true);

    };
    const fetchDataCiclo = async () => {
        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
        }
        try {

            const respuesta = await axios.post("http://localhost:3050/api/cicloAcademico/listarCicloAcademico", data, config);

            console.log(respuesta.data);
            console.log("aqui");
            console.log("data es" + respuesta)

            setComboBoxCiclo(respuesta.data.data)

            console.log("comboBoxCiclo")
            console.log(comboBoxCiclo)
            console.log("comboBoxCiclo")
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const formattedDate = moment(datosEspacio.fechaLimite).format('DD/MM/YYYY');
        setCodigo(datosEspacio.codigoEspacio);
        setNombre(datosEspacio.nombreCurso);
        setCicloAcademico(datosEspacio.cicloAcademico);
        setSeleccionarOpcion(datosEspacio.idcicloAcademico);

        console.log("VALOR DE FECHA");
        console.log(formattedDate);
        console.log("VALOR DE FECHA");
        setFechaLimite(formattedDate);
        console.log("VALOR DE FECHA EN FECHA LIMITE");
        console.log(fechaLimite);
        console.log("VALOR DE FECHA EN FECHA LIMITE");

        fetchDataCiclo();
        dispatch(addDatosIndicador([]));
        dispatch(addDatosIndicadores([]));

        console.log("BANDERA DE DETALLE");
        console.log(datosEspacio.banderaDetalle);

        props.cambiarBanderaAñadir(false);
        dispatch(addDatosAñadir(false));
        setBandera(true)

    }, []);

    useEffect(() => {
        setPageData2((prevState2) => ({
            ...prevState2,
            rowData2: [],
            isLoading2: true,
        }));

        const config2 = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data2 = {
            idEspacioMedicion: datosEspacio.idEspacio
        }
        getDataMuestra(config2, data2).then((info) => {
            const { data } = info;
            setPageData2({
                isLoading2: false,
                rowData2: (data.map((Muestra) => ({
                    seleccion: <input
                        className="checkboxGC"
                        type="checkbox"
                        id={Muestra.idMuestraMedicion}
                        defaultChecked={seleccionados.includes(Muestra.idMuestraMedicion)}
                        onChange={(e) => toggleValue(e, Muestra.idMuestraMedicion)}
                    />,
                    muestra: <div className="seleccionableGC" >{Muestra.codigo}</div>,
                    encargado: <div className="seleccionableGC">{Muestra.nombreResponsable}</div>,
                    edicion: <i class="bi bi-pencil-square iconoEdicion" onClick={() => handleButtonFila(Muestra.idMuestraMedicion,Muestra.codigo,Muestra.nombreResponsable)}></i>
                }))),

            });
        });
    }, [flagBusqueda]);

    useEffect(() => {
        setPageData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: true,
        }));

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            idEspacioMedicion: datosEspacio.idEspacio
        }
        getData(config, data).then((info) => {
            const { data } = info;
            setPageData({
                isLoading: false,
                rowData: (data.map((Indicador) => ({
                    seleccion: <input
                        className="checkboxGC"
                        type="checkbox"
                        id={Indicador.idIndicador}
                        defaultChecked={seleccionados.includes(Indicador.idIndicador)}
                        onChange={(e) => toggleValue2(e, Indicador.idIndicador)}
                    />,
                    codigo: <div className="seleccionableGC">{Indicador.codigo}</div>,
                    descripcion: <div className="seleccionableGC">{Indicador.descripcion}</div>,
                    codigoCompetencia: <div className="seleccionableGC">{Indicador.codigoCompetencia}</div>,
                }))),

            });

            const indicadorIds = data.map((Indicador) => Indicador.idIndicador);
            const indicadoresArray = indicadorIds.map((id) => ({ idIndicador: id }));
            setListaIndicadores(indicadoresArray);

            console.log("listaIndicadores");
            console.log(listaIndicadores);
        });
    }, [flagBusqueda]);


    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
    });
    const [pageData2, setPageData2] = useState({
        rowData2: [],
        isLoading2: false,
    });

    const handleAñadirMuestra = () => {
        props.cambiarComponenteMedicion1(false);
        props.cambiarComponenteMedicion2(false);
        props.cambiarComponenteMedicion3(true);
        props.cambiarComponenteMedicion4(false);
        props.cambiarComponenteMedicion5(false);
        props.cambiarComponenteMedicion6(false);
    };
    const handleAñadirIndicador = () => {
        
        dispatch(addDatosListaIndicadores(listaIndicadores));
        console.log("listaIndicadores");
        console.log(listaIndicadores);

        props.cambiarComponenteMedicion1(false);
        props.cambiarComponenteMedicion2(false);
        props.cambiarComponenteMedicion3(false);
        props.cambiarComponenteMedicion4(false);
        props.cambiarComponenteMedicion5(false);
        props.cambiarComponenteMedicion6(true);
    };
    const handleEliminarMuestra = () => {
        setmostrarModal(true);
    };

    const handleEliminarIndicador = () => {
        setmostrarModal2(true);
    };
    const handleModalClose = () => {
        setmostrarModal(false);
    };
    const handleModalClose2 = () => {
        setmostrarModal2(false);
    };
    const handleModalClose3 = () => {
        const formattedDate = moment(datosEspacio.fechaLimite).format('DD/MM/YYYY');

        setEditable(false);
        setmostrarModal3(false);

        setCodigo(datosEspacio.codigoEspacio);
        setNombre(datosEspacio.nombreCurso);
        setCicloAcademico(datosEspacio.cicloAcademico);
        setFechaLimite(formattedDate);

    };
    const handleModalAceptar = async () => {
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {
            idEspacioMedicion: datosEspacio.idEspacio,
            elementos: selectedMuestras
        }
        console.log("DATA ANTES DE ENVIAR:")
        console.log(data)
        console.log("DATA ANTES DE ENVIAR:")
        try {
            const respuesta = await axios.post("http://localhost:3050/api/muestraMedicion/eliminarMuestrasTodos", data, config);
            console.log("RESPUESTA DE API:")
            console.log(respuesta.data);

            setmostrarModal(false);
            setFlagBusqueda(!flagBusqueda);

        } catch (error) {

            console.log(error)
        }
    };
    const handleModalAceptar2 = async () => {
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {
            idEspacioMedicion: datosEspacio.idEspacio,
            elementos: selectedIndicadores
        }
        console.log("DATA ANTES DE ENVIAR:")
        console.log(data)
        console.log("DATA ANTES DE ENVIAR:")
        try {
            const respuesta = await axios.post("http://localhost:3050/api/indicador/eliminarIndicadoresTodos", data, config);
            console.log("RESPUESTA DE API:")
            console.log(respuesta.data);

            setmostrarModal2(false);
            setFlagBusqueda(!flagBusqueda);

        } catch (error) {
            console.log(error)
        }
    };
    const handleModalAceptar3 = async () => {
        const formattedDate = moment(fechaLimite).format('YYYY-MM-DD');
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {
            idEspacioMedicion: datosEspacio.idEspacio,
            codigoEspacio: codigo,
            idCiclo: seleccionarOpcion,
            descripcionEspacio: nombre,
            fechaLimite: formattedDate
        }
        console.log("DATA ANTES DE ENVIAR:")
        console.log(data)
        console.log("DATA ANTES DE ENVIAR:")
        try {
            const respuesta = await axios.post("http://localhost:3050/api/espacioMedicion/modificarEspacioMedicionTodo", data, config);
            console.log("RESPUESTA DE API:")
            console.log(respuesta.data);

            setmostrarModal3(false);
            setEditable(false);

        } catch (error) {
            console.log(error)
        }
    };
    const handleButtonGuardarMedicion = () => {
        setmostrarModal3(true);
    };
    const handleButtonEditar = () => {
        setEditable(true);
    };
    const handleChangeCodigo = (event) => {
        setCodigo(event.target.value);
    };
    const handleChangeNombre = (event) => {
        setNombre(event.target.value);
    };
    const handleSeleccionarCicloIni = (optionKey, option) => {
        setSeleccionarOpcion(optionKey);
        setCicloAcademico(option.target.textContent);
    };
    const handleDateChange = (date) => {
        setFechaLimite(date);
        setFechaLimiteSeleccionada(date);
        // console.log(selectedDate);
        // console.log("fecha in -->" + fechaInicio);
    };

    useEffect(() => {
        if (codigo != "" && nombre !== "" && fechaLimite !== null && cicloAcademico !=="") {
            setBotonHabilitado(true);
        } else {
            setBotonHabilitado(false);
        }
    }, [codigo,nombre,fechaLimite,cicloAcademico]);

    const filterDate = (date) => {
        const today = new Date();
        const fecha_limite = new Date('3000-12-31');
        return date >= today && date <= fecha_limite;
    };
    return (
        <div className="inicioPaginaRECEM">
            <div className='centroRECEM'>
                <div className="contDatosRECEM">

                    <div className="contPerfilRECEM contDatosRECEM">
                        <h2 className="tituloREAEM tituloGen tituloTipo3">Espacio Medición</h2>
                        <div className="contenedorREAEM">
                            <div className="derechaREAEM">
                                <div >
                                    <label className="labelGen labelREAEM" htmlFor="tipoMedicion">
                                        Código</label>
                                        <input className="inputGen" type="text" name="codigo" disabled={editable ? false : true}
                                        style={{ height: "27px", width: "80%" , backgroundColor: editable ? "#ffffff" : "#F2F7F9" }} value={codigo} onChange={handleChangeCodigo} /> 

                                        
                                </div>
                            </div>
                            <div className="derechaREAM contenedorREAEM">
                                <div className="derechaREAM" style={{ width: "45%" }}>
                                    <label className="labelGen labelREAEMperiodo" htmlFor="tipoMedicion">
                                        Periodo Medición</label>
                                </div>
                                <DropdownButton title={cicloAcademico} disabled={editable ? false : true}>
                                    {comboBoxCiclo.filter((option) => datosMuestras.cicloInicio <= option.id && option.id <= datosMuestras.cicloFin).map((option) => (
                                        <Dropdown.Item key={option.id} eventKey={option.ciclo} onClick={(e) => handleSeleccionarCicloIni(option.id, e)}>
                                            {editable ? option.ciclo : cicloAcademico}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>

                            </div>

                        </div>

                        <div className="contenedorREAEM">
                            <div className="derechaREAEM">
                                <label className="labelGen labelREAEM" htmlFor="tipoMedicion">
                                    Espacio Medición </label>
                                    <input className="inputGen  inputDis" type="text" name="nombre" disabled={editable ? false : true}
                                    style={{ height: "27px", width: "80%" , backgroundColor: editable ? "#ffffff" : "#F2F7F9" }} value={nombre} onChange={handleChangeNombre} />
                            </div>
                            <div className="derechaREAEM noFlex">
                                <label className="labelGen labelREAEM" htmlFor="tipoMedicion">
                                    Fecha Límite 
                                </label>
                                <br></br>
                                {bandera && <DatePicker  className={editable ? "inputGenDate" : "inputGenDate2"} selected={fechaLimiteSeleccionada} value={fechaLimite} onChange={handleDateChange} disabled={editable ? false : true} 
                                                filterDate={filterDate} dateFormat="dd/MM/yyyy" />}
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className='botonInferiorRECEM'>
                                <div className='btnDivDisenio'>
                                    {editable ?
                                        <button className='btnDisenio' type="button" onClick={handleButtonGuardarMedicion} style={{ backgroundColor: botonHabilitado ? '#042354' : '#adadad' }} disabled={!botonHabilitado}>
                                            Guardar
                                        </button> :
                                        <button className='btnDisenio' type="button" onClick={handleButtonEditar} style={{ background: "#042354" }} >
                                            Editar
                                        </button>}
                                </div>
                            </div>
                            <Modal show={mostrarModal3} onHide={handleModalClose3}>
                                <Modal.Body >
                                    <p>¿Está seguro que desea guardar los cambios realizados?</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button className="botonModal btnDisenio  botonCancelarAI" onClick={handleModalClose3}>
                                        Cancelar</Button>
                                    <Button className="botonModal btnDisenio  botonAceptarAI" onClick={handleModalAceptar3}>
                                        Aceptar</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        
                    </div>
                </div>

                <div className="contDatosRECEM">

                    <div className="contPerfilRECEM contDatosRECEM">
                        <h2 className="tituloTipo3 tituloGen ">Muestras</h2>
                        <div className="botonesSuperioresRECEM contenedorBarraRECEM">
                            <div className="btnDivDisenio ">
                                <button class="btnDisenio btnAniadirRECEM" href="#" role="button" onClick={handleAñadirMuestra}>
                                    Añadir
                                </button>
                            </div>
                            <div className="btnDivDisenio ">
                                <button class="btnDisenio btnDeshabilitarRECEM " href="#" role="button" type="button"
                                    data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleEliminarMuestra}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                        <div>
                            <Table
                                columns={columnsMuestra}
                                data={pageData2.rowData2}
                                isLoading={pageData2.isLoading2}
                            />
                        </div>
                    </div>
                </div>
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea eliminar las muestras seleccionadas?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio  botonCancelarAI" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio  botonAceptarAI" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>

                <div className="contDatosRECEM">

                    <div className="contPerfilRECEM contDatosRECEM">
                        <h2 className="tituloTipo3  tituloGen">Indicadores</h2>
                        <div className="botonesSuperioresRECEM contenedorBarraRECEM">
                            <div className="btnDivDisenio">
                                <button class="btnDisenio btnAniadirRECEM" href="#" role="button" onClick={handleAñadirIndicador}>
                                    Añadir
                                </button>
                            </div>
                            <div className=" btnDivDisenio">
                                <button class="btnDeshabilitarRECEM btnDisenio" href="#" role="button" type="button"
                                    data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleEliminarIndicador}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                        <div>
                            <Table
                                columns={columns}
                                data={pageData.rowData}
                                isLoading={pageData.isLoading}
                            />
                        </div>
                    </div>
                </div>
                <Modal show={mostrarModal2} onHide={handleModalClose2}>
                    <Modal.Body >
                        <p>¿Está seguro que desea eliminar los indicadores seleccionados?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio  botonCancelarAI" onClick={handleModalClose2}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio  botonAceptarAI" onClick={handleModalAceptar2}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>

                <div className='botonInferiorRECEM'>

                </div>
            </div>

        </div>
    );
}
