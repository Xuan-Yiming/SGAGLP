import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../HojasDeEstilo/ResEspeVerDetalleMedicion.css'
import "../HojasDeEstilo/Reusable/InputBase.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import React, { useState, useEffect, useCallback } from 'react';   //para hooks estados
import { Button, Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { getData, columns, formatRowData } from "./DataEspacios";
import axios from 'axios';
import moment from 'moment';
import Table from "./TablaCuentas";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addCicloInicio, addCicloFin, addDatosEspacio, addDatosDetalle } from '../Redux/ProgramaSlice';
import { addDatosMuestra, addDatosResponsable, addDatosEspacios, addDatosIndicador, addDatosIndicadores, addDatosMedicion } from '../Redux/MedicionResEspeSlice';
import { addIDMedicion } from '../Redux/MedicionResEspeSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResEspeVerDetalleMedicion(props) {
    let valor;

    const [mostrarModal, setmostrarModal] = useState(false);
    const [seleccionados, setSeleccionados] = useState([]);
    const [cookies, setCookie] = useCookies();
    const [mostrarCargaMasiva, setMostrarCargaMasiva] = useState(false);
    const [mostrarCargaManual, setMostrarCargaManual] = useState(false);
    const [seleccionarOpcion1, setSeleccionarOpcion1] = useState(null);
    const [seleccionarOpcion2, setSeleccionarOpcion2] = useState(null);
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [editable, setEditable] = useState(false);
    const [color, setColor] = useState("#F2F7F9");
    const [selectedEspacios, setSelectedEspacios] = useState([]);

    const datosMedicion = useSelector((state) => state.Programa);

    const dispatch = useDispatch();
    const [mostrarModa2, setmostrarModal2] = useState(false);
    const datosCuenta = useSelector((state) => state.Cuenta);
    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [codigo, setCodigo] = useState("#F2F7F9");
    const [comboBoxCiclo, setComboBoxCiclo] = useState([]);
    const [selectedCicloIni, setSelectedCicloIni] = useState(datosMedicion.cicloInicio);
    const [selectedCicloFin, setSelectedCicloFin] = useState(datosMedicion.cicloFin);

    useEffect(() => {
        console.log("DATOS INICIALES")
        console.log(datosMedicion.cicloInicio);
        console.log(datosMedicion.cicloFin);
        console.log(datosMedicion.fidCicloInicio);
        console.log(datosMedicion.fidCicloFin);

        setSelectedCicloIni(datosMedicion.cicloInicio);
        setSelectedCicloFin(datosMedicion.cicloFin);
        setSeleccionarOpcion1(datosMedicion.fidCicloInicio);
        setSeleccionarOpcion2(datosMedicion.fidCicloFin);
        setCodigo(datosMedicion.codigoMedicion);
        fetchDataCiclo();
        props.cambiarBanderaEspacio(true);
        mostrarCMas();
    }, []);

    const mostrarCMas = () => {
        setMostrarCargaMasiva(true);
        setMostrarCargaManual(false);
    };

    const handleSeleccionarCicloIni = (optionKey, option) => {
        setSeleccionarOpcion1(optionKey);
        setSelectedCicloIni(option.target.textContent);
    };

    const handleSeleccionarCicloFin = (optionKey, option) => {
        setSeleccionarOpcion2(optionKey);
        setSelectedCicloFin(option.target.textContent);
    };

    const mostrarCMan = () => {
        setMostrarCargaMasiva(false);
        setMostrarCargaManual(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const validarCampos = (valorCicloIni, valorCicloFin, valorEspacios) => {
        if (valorCicloIni !== '' && valorCicloFin !== '' && valorEspacios.length === 0) {
            setBotonHabilitado(true);
            valor = 1;
        } else {
            setBotonHabilitado(false);
            valor = 0;
        }
        return valor;
    };

    const handleButtonGuardar = async () => {
        setColor("#042354");
        valor = validarCampos();
        if (valor) {
            setmostrarModal(true);
        } else {
            setmostrarModal(false);
        }
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
    const toggleValue = (event, idEs) => {
        if (event.target.checked) {
            setSelectedEspacios((prevSelectedEspacios) => [...prevSelectedEspacios, { "idEspacioMedicion": idEs }]);
        } else {
            setSelectedEspacios((prevSelectedEspacios) => prevSelectedEspacios.filter((espacio) => espacio.idEspacioMedicion !== idEs));
        }
        console.log("ARREGLO DE ESPACIOS");
        console.log(selectedEspacios);
    };
    const handleButtonFila = async (idEspacio, Espacio) => {
        let EspacioEnviar = {
            idEspacio: Espacio.idEspacioMedicion,
            codigoEspacio: Espacio.codigo,
            nombreCurso: Espacio.nombreCurso,
            fechaLimite: Espacio.fechaLimite,
            cicloAcademico: Espacio.cicloAcademico,
            idcicloAcademico: Espacio.idcicloAcademico
        }
        console.log("ANTES DEL CAMBIO")
        console.log(datosMedicion.banderaDetalle);
        console.log("ANTES DEL CAMBIO")
        dispatch(addDatosDetalle(true));
        console.log("DESPUES DEL CAMBIO")
        console.log(datosMedicion.banderaDetalle);
        console.log("DESPUES DEL CAMBIO")
        dispatch(addDatosEspacio(EspacioEnviar));

        props.cambiarComponenteMedicion1(false);
        props.cambiarComponenteMedicion2(false);
        props.cambiarComponenteMedicion3(false);
        props.cambiarComponenteMedicion4(false);
        props.cambiarComponenteMedicion5(true);

    };
    useEffect(() => {
        setPageData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: true,
        }));

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        };
        const data = {
            fidMedicion: datosMedicion.idMedicion
        };
        getData(config, data).then((info) => {
            const { Espacio } = info;
            setPageData({
                isLoading: false,
                rowData: Espacio.map((Espacio) => {
                    const formattedDate = moment(Espacio.fechaLimite).format('YYYY-MM-DD');
                    return {
                        seleccion: <input
                            className="checkboxGC"
                            type="checkbox"
                            id={Espacio.idEspacioMedicion}
                            defaultChecked={seleccionados.includes(Espacio.idEspacioMedicion)}
                            onChange={(e) => toggleValue(e, Espacio.idEspacioMedicion)}
                        />,
                        codigo: <div className="seleccionableGC" onClick={() => handleButtonFila(Espacio.idEspacioMedicion, Espacio)}>{Espacio.codigo}</div>,
                        espaciomedicion: <div className="seleccionableGC" onClick={() => handleButtonFila(Espacio.idEspacioMedicion, Espacio)}>{Espacio.nombreCurso}</div>,
                        cicloacademico: <div className="seleccionableGC" onClick={() => handleButtonFila(Espacio.idEspacioMedicion, Espacio)}>{Espacio.cicloAcademico}</div>,
                        fechalimite: <div className="seleccionableGC" onClick={() => handleButtonFila(Espacio.idEspacioMedicion, Espacio)}>{formattedDate}</div>,
                    };
                }),
            });
        });
    }, [flagBusqueda]);

    const handleModalClose = () => {
        setmostrarModal(false);
        setEditable(false);
        setSelectedCicloIni(datosMedicion.cicloInicio);
        setSelectedCicloFin(datosMedicion.cicloFin);
    };

    const handleModalAceptar = async () => {
        setmostrarModal(false);
        setEditable(false);

        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {
            idMedicion: datosMedicion.idMedicion,
            idCicloInicio: seleccionarOpcion1,
            idCicloFin: seleccionarOpcion2
        };

        try {
            const respuesta = await axios.post("http://localhost:3050/api/medicion/modificarPeriodoMedicion", data, config);

            console.log(respuesta.data);

            // setColor("#FFFFFF");
            // setColorTexto("#000000'");
            if (respuesta.data.success) {
                toast.success('Medición modificada correctamente.', {
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

        } catch (error) {

            console.log(error)
        }

        dispatch(addCicloInicio(selectedCicloIni));
        dispatch(addCicloFin(selectedCicloFin));
    };

    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
    });
    const handleAñadir = () => {
        let Espacio = {
            codigoEspacio: "",
            nombreCurso: "",
            fechaLimite: "",
            tipoMedicion: "Directa",
            cicloAcademico: ""
        }

        dispatch(addDatosEspacios(Espacio));

        let Medicion = {
            codigoMedicion: codigo,
            cicloInicio: seleccionarOpcion1,
            cicloFin: seleccionarOpcion2,
            cicloInicioNombre: selectedCicloIni,
            cicloFinNombre: selectedCicloFin,
        };
        console.log("AQUI ESTA LA MEDICION");
        console.log(Medicion);

        dispatch(addDatosMedicion(Medicion));

        dispatch(addDatosMuestra([]));
        dispatch(addDatosResponsable([]));
        dispatch(addDatosIndicador([]));
        dispatch(addDatosIndicadores([]));
        console.log("ANTES DEL CAMBIO")
        console.log(datosMedicion.banderaDetalle);
        console.log("ANTES DEL CAMBIO")
        dispatch(addDatosDetalle(true));
        console.log("DESPUES DEL CAMBIO")
        console.log(datosMedicion.banderaDetalle);
        console.log("DESPUES DEL CAMBIO")
        props.cambiarComponenteMedicion1(false);
        props.cambiarComponenteMedicion2(true);
        props.cambiarComponenteMedicion3(false);
        props.cambiarComponenteMedicion4(false);
        props.cambiarComponenteMedicion5(false);
        props.cambiarComponenteMedicion6(false);
    }
    const handleButtonEliminar = () => {
        setmostrarModal2(true);
    };
    const handleModalCloseEliminar = () => {
        setmostrarModal2(false);
    };
    const handleModalAceptarEliminar = async () => {
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {
            idMedicion: datosMedicion.idMedicion,
            elementos: selectedEspacios
        }
        console.log("DATA ANTES DE ENVIAR:")
        console.log(data)
        console.log("DATA ANTES DE ENVIAR:")
        try {
            const respuesta = await axios.post("http://localhost:3050/api/espacioMedicion/eliminarEspacioMedicionTodo", data, config);
            console.log("RESPUESTA DE API:")
            console.log(respuesta.data);

            setmostrarModal2(false);
            setFlagBusqueda(!flagBusqueda);

        } catch (error) {

            console.log(error)
        }
    };
    const handleButtonEditar = () => {
        setEditable(true);
    };
    const handleButtonGuardarMedicion = () => {
        setmostrarModal(true);
        console.log("IDINI");
        console.log(seleccionarOpcion1);
        console.log("IDFIN");
        console.log(seleccionarOpcion2);
    };
    return (
        <div className="inicioPaginaREAM">
            
            <form onSubmit={handleSubmit} className="contDatosDMM">
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea guardar los cambios realizados?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonCancelarDMM" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarDMM" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
                <div className="contDatosDMM ">
                
                    <div className="contPerfilDMM contDatosDMM">
                        <h2 className="tituloGen tituloREAM">Datos de Medición</h2>

                        <div className="contenedorDVM">
                            <div className="contenedor-codigoREAM">
                                    <div className="labelGen codigoREAM2" htmlFor="tipoMedicion">Código</div>
                                    <input className="inputREVDM inputGen" type="text" name="codigo" disabled
                                        value={codigo} 
                                        style={{ height: "25px", width: "80%",  marginLeft: "30px", marginTop: "15px" }} />
                            </div>

                                <div className="contenedorDVM2">
                                    <div className="contenedor-cmboREAM contennComboBox">
                                        <div>
                                            <label className="labelGen labelAM" htmlFor="tipoMedicion"> Inicio </label>
                                        </div>
                                        <div >
                                        <DropdownButton title={selectedCicloIni} disabled={editable ? false : true}>
                                            {comboBoxCiclo.filter((option) => option.id <= seleccionarOpcion2).map((option) => (
                                                <Dropdown.Item
                                                    key={option.id}
                                                    eventKey={option.ciclo}
                                                    onClick={(e) => handleSeleccionarCicloIni(option.id, e)}
                                                >
                                                    {editable ? option.ciclo : selectedCicloIni}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </div>
                                    </div>
                                    <div className="contenedor-cmboREAM">
                                        <div>
                                            <label className="labelGen labelAM" htmlFor="tipoMedicion"> Fin</label>
                                        </div>
                                        <DropdownButton title={selectedCicloFin} disabled={editable ? false : true}>
                                        {comboBoxCiclo.filter((option) => option.id >= seleccionarOpcion1).map((option) => (
                                            <Dropdown.Item
                                                key={option.id}
                                                eventKey={option.ciclo}
                                                onClick={(e) => handleSeleccionarCicloFin(option.id, e)}
                                            >
                                                {option.ciclo}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                    </div>
                                    

                                </div>
                                

                            </div>
                            <div className='contBotGuardEditar'>
                                <div className="btnDivDisenio" onClick={handleButtonGuardar} disabled={!botonHabilitado} style={{ marginLeft: "17%" }} >
                                            {editable ?
                                                <button className='btnDisenio ' type="button" onClick={handleButtonGuardarMedicion} style={{ background: "#042354" }}>
                                                    Guardar
                                                </button> :
                                                <button className='btnDisenio ' type="button" onClick={handleButtonEditar} style={{ background: "#042354" }}>
                                                    Editar
                                                </button>}
                                </div>
                            </div>

                    </div>
                </div>

                <div className="contDatosDMM">

                    <div className="contPerfilDMM contDatosDMM">
                        <h2 className="tituloGen tituloREAM">Espacios de Medición</h2>

                        <div className='contenedorDCV'>
                            <div className='izquierdaREAM d-flex justify-content-end botonesAlinREAM'>
                                <div className="btnDivDisenio ">
                                    <button className="btnDisenio btnAniadirRVCEM" class="btnDisenio btnAniadirRVCEM" href="#" role="button" onClick={handleAñadir}>
                                        Añadir
                                    </button>
                                </div>
                                <div className=" btnDivDisenio">
                                    <button class=" btnDisenio btnDeshabilitarRECEM " href="#" role="button" type="button"
                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleButtonEliminar}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Modal show={mostrarModa2} onHide={handleModalCloseEliminar}>
                            <Modal.Body >
                                <p>¿Está seguro que desea eliminar los espacios seleccionados?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="botonModal btnDisenio botonCancelarREVC" onClick={handleModalCloseEliminar}>
                                    Cancelar</Button>
                                <Button className="botonModal btnDisenio botonAceptarREVC" onClick={handleModalAceptarEliminar}>
                                    Aceptar</Button>
                            </Modal.Footer>
                        </Modal>
                       
                        <div className='contenedorTablaF'>
                            <Table
                                columns={columns}
                                data={pageData.rowData}
                                isLoading={pageData.isLoading}
                            />
                        </div>

                       
                        <div className='contenedorDCV'>
                        </div>
                    </div>
                </div>

            </form>

        </div>
    );

}