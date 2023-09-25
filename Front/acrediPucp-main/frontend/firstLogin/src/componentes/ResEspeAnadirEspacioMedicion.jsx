import 'bootstrap/dist/css/bootstrap.min.css';
import "../HojasDeEstilo/Reusable/TablasFront.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../HojasDeEstilo/ResEspeAnadirEspacioMedicion.css'
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import { useCookies } from "react-cookie";
import React, { useState, useEffect } from 'react';   //para hooks estados
import { Button, Modal } from "react-bootstrap";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { addDatosMuestra, addDatosResponsable, addDatosEspacio, addDatosEspacios, addDatosIndicador, addDatosIndicadores,addDatosListaIndicadores } from '../Redux/MedicionResEspeSlice';
import { addDatosAñadir } from '../Redux/ProgramaSlice';
import ReactPaginate from 'react-paginate';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import moment from 'moment';
import { useLocalStorage } from './useLocalStorage';

export default function ResEspeAnadirMedicion(props) {

    const datosMuestras = useSelector((state) => state.MedicionEspe);
    const datosMedicion = useSelector((state) => state.Programa);
    let cicloConst = datosMuestras.cicloAcademico || "Ciclo Académico";

    const [mostrarModal, setmostrarModal] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);
    const [mostrarModal3, setmostrarModal3] = useState(false);
    const [cookies, setCookie] = useCookies();

    const [comboBoxCiclo, setComboBoxCiclo] = useState([]);
    const [botonColor, setBotonColor] = useState("#ADADAD");
    const [mostrarCargaMasiva, setMostrarCargaMasiva] = useState(false);
    const [mostrarCargaManual, setMostrarCargaManual] = useState(false);
    const [seleccionarOpcion, setSeleccionarOpcion] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [guardando, setGuardando] = useState(false);
    const [seleccionados, setSeleccionados] = useState([]);
    const [seleccionados2, setSeleccionados2] = useState([]);
    const [listaIndicadores, setListaIndicadores] = useState([]);
    const [idIndicadoresAEliminar, setIdIndicadoresAEliminar] = useState([]);

    const [fech, setFecha] = useState("");
    const [codigo, setCodigo] = useState("");
    const [nombreCurso, setNombreCurso] = useState("");
    const [periodo, setPeriodo] = useState("");
    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [banderaCiclo, setBanderaCiclo] = useState(false);
    const [selectedCiclo, setSelectedCiclo] = useState(cicloConst);

    const [flagEnviado, setFlagEnviado] = useLocalStorage("flagEnviado");


    const dispatch = useDispatch();

    const mostrarCMas = () => {
        setMostrarCargaMasiva(true);
        setMostrarCargaManual(false);
    };

    useEffect(() => {
        mostrarCMas();
        fetchDataCiclo();

        setCodigo(datosMuestras.codigoEspacio);
        setNombreCurso(datosMuestras.nombreCurso);
        setPeriodo(datosMuestras.cicloAcademico);
        setSelectedDate(datosMuestras.fechaLimite || new Date());

        console.log("Ver lista indicadores")
        console.log(datosMuestras.listaIndicadores);
        console.log("Ver datos de los indicadores");

    }, []);

    const handleChange = (e) => {
        const { name, value } = e?.target || {};

        switch (name) {
            case "codigo":
                setCodigo(value);
                break;
            case "nombreCurso":
                setNombreCurso(value);
                break;
            case "periodo":
                setPeriodo(value);
                break;
            case "selectedDate":
                setSelectedDate(value);
                break;
        }
        console.log(codigo)
        console.log(nombreCurso)
        console.log(selectedDate)
        console.log(periodo)
        //validarCampos(codigo,nombreCurso,selectedDate,periodo);
    };
    useEffect(() => {
        if (codigo != "" && nombreCurso !== "" && selectedDate !== null && periodo !=="") {
            setBotonHabilitado(true);
        } else {
            setBotonHabilitado(false);
        }
    }, [codigo,nombreCurso,selectedDate,periodo]);
    const handleSeleccionarOpcion = (option) => {
        setSeleccionarOpcion(option);
    };

    const handleCheckboxChange = (index) => {
        if (seleccionados.includes(index)) {
            setSeleccionados(seleccionados.filter((item) => item !== index));
        } else {
            setSeleccionados([...seleccionados, index]);
        }
    };
    const handleCheckboxChangeIndicador = (index,idI) => {
        if (seleccionados2.includes(index)) {
            setSeleccionados2(seleccionados2.filter((item) => item !== index));
            setIdIndicadoresAEliminar(idIndicadoresAEliminar.filter((item) => item !== idI));
        } else { 
            setSeleccionados2([...seleccionados2, index]);
            setIdIndicadoresAEliminar([...idIndicadoresAEliminar, idI]);
        }

        console.log("IDS SELECCIONADOS")
        console.log(idIndicadoresAEliminar);
        console.log("IDS SELECCIONADOS")
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
            setBanderaCiclo(true)
        } catch (error) {
            console.log(error)
        }
    }


    const mostrarCMan = () => {
        setMostrarCargaMasiva(false);
        setMostrarCargaManual(true);
    };

    const handleSeleccionarCiclo = (optionKey, option) => {
        setSeleccionarOpcion(optionKey);
        setSelectedCiclo(option.target.textContent);
        setPeriodo(option.target.textContent);
        console.log(periodo);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const handleAñadir = async () => {

        console.log("AÑADIR INGRESA AQUI");
        let Espacio = {
            codigoEspacio: codigo,
            nombreCurso: nombreCurso,
            fechaLimite: selectedDate,
            tipoMedicion: "Directa",
            cicloAcademico: periodo
        }

        console.log("c guardaxd");
        console.log(Espacio);

        dispatch(addDatosEspacios(Espacio));

        console.log("BANDERA SI ES DETALLE");

        if (datosMedicion.banderaDetalle) {
            props.cambiarBanderaAñadir(true);
            dispatch(addDatosAñadir(true));
            console.log("ENTRA AQUI AÑADIR ESPACIO AÑADIR MUESTRA EN DETALLE TRUE");
        } else {
            props.cambiarBanderaAñadir(false);
            dispatch(addDatosAñadir(false));
            console.log("ENTRA AQUI AÑADIR ESPACIO AÑADIR MUESTRA FALSE");
        }

        props.cambiarComponenteMedicion1(false);
        props.cambiarComponenteMedicion2(false);
        props.cambiarComponenteMedicion3(true);
        props.cambiarComponenteMedicion4(false);
        props.cambiarComponenteMedicion5(false);
        props.cambiarComponenteMedicion6(false);

    };
    const handleAñadirIndicador = () => {

        console.log("listaIndicadores");
        console.log(listaIndicadores);

        let Espacio = {
            codigoEspacio: codigo,
            nombreCurso: nombreCurso,
            fechaLimite: selectedDate,
            tipoMedicion: "Directa",
            cicloAcademico: periodo
        }

        console.log("c guardaxd");
        console.log(Espacio);

        dispatch(addDatosEspacios(Espacio));

        if (datosMedicion.banderaDetalle) {
            props.cambiarBanderaAñadir(true);
            dispatch(addDatosAñadir(true));
            console.log("ENTRA AQUI AÑADIR ESPACIO AÑADIR MUESTRA EN DETALLE TRUE");
        } else {
            props.cambiarBanderaAñadir(false);
            dispatch(addDatosAñadir(false));
            console.log("ENTRA AQUI AÑADIR ESPACIO AÑADIR MUESTRA FALSE");
        }

        props.cambiarComponenteMedicion1(false);
        props.cambiarComponenteMedicion2(false);
        props.cambiarComponenteMedicion3(false);
        props.cambiarComponenteMedicion4(false);
        props.cambiarComponenteMedicion5(false);
        props.cambiarComponenteMedicion6(true);
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setFecha(formatDate(date));
        //validarCampos(codigo,nombreCurso,selectedDate,periodo);
        // console.log(selectedDate);
        // console.log("fecha in -->" + fechaInicio);
    };

    const handleModalClose = () => {
        setmostrarModal(false);
    };

    const handleModalAceptar = async () => {
        if (datosMedicion.banderaDetalle) {
            console.log("DETALLE INGRESA AQUI");
            console.log("Galleta:");
            console.log(cookies.jwt);

            const config = {
                headers: { Authorization: 'Bearer ' + cookies.jwt }
            }
            const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
            const data = {
                idMedicion: datosMedicion.idMedicion,
                codigoEspacio: codigo,
                nombreCurso: nombreCurso,
                fechaLimite: formattedDate,
                tipoMedicion: "Directa",
                cicloAcademico: periodo,
                MuestrasMedicion: datosMuestras.MuestrasMedicion,
                Indicadores: datosMuestras.Indicadores
            }
            console.log("AQUI ESTA LA DATAAAAAAA");
            console.log(data);
            console.log("AQUI ESTA LA DATAAAAAAA");
            try {
                const respuesta = await axios.post("http://localhost:3050/api/espacioMedicion/insertarEspacioMedicionTodo", data, config);
                console.log(respuesta.data);

            } catch (error) {
                console.log(error)
            }

            props.cambiarComponenteMedicion1(false);
            props.cambiarComponenteMedicion2(false);
            props.cambiarComponenteMedicion3(false);
            props.cambiarComponenteMedicion4(true);
            props.cambiarComponenteMedicion5(false);
            props.cambiarComponenteMedicion6(false);

        } else {
            const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
            let Espacio = {
                codigoEspacio: codigo,
                nombreCurso: nombreCurso,
                fechaLimite: formattedDate,
                tipoMedicion: "Directa",
                cicloAcademico: periodo,
                MuestrasMedicion: datosMuestras.MuestrasMedicion,
                Indicadores: datosMuestras.Indicadores
            };
            const nuevosEspacios = [...datosMuestras.EspaciosMedicion, Espacio];
            dispatch(addDatosEspacio(nuevosEspacios));

            props.cambiarComponenteMedicion1(true);
            props.cambiarComponenteMedicion2(false);
            props.cambiarComponenteMedicion3(false);
            props.cambiarComponenteMedicion4(false);
            props.cambiarComponenteMedicion5(false);
            props.cambiarComponenteMedicion6(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return "";

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');

        return `${year}-${formattedMonth}-${formattedDay}`;
    };
    const handleButtonElimina = () => {
        setmostrarModal2(true);
    };
    const handleButtonClick = () => {
        setmostrarModal(true);
    };
    const handleModalAceptarEliminar = () => {
        const nuevasMuestras = datosMuestras.MuestrasMedicion.filter(
            (_, index) => !seleccionados.includes(index)
        );
        const nuevosResponsables = datosMuestras.nombreResponsable.filter(
            (_, index) => !seleccionados.includes(index)
        );
        
        // Actualizar el estado de los indicadores
        setSeleccionados([]);
        // Actualizar el estado de los indicadores en el componente padre
        // o realizar la acción correspondiente para actualizar los datos en el estado global

        // Eliminar los elementos seleccionados del arreglo

        dispatch(addDatosMuestra(nuevasMuestras));
        dispatch(addDatosResponsable(nuevosResponsables));

        setmostrarModal2(false)
    };
    const handleModalCloseEliminar = async () => {
        setmostrarModal2(false)
    };
    // const validarCampos = (valorCodigo,valorNombre,valorDate,valorPeriodo) => {
    //     if (valorCodigo != "" && valorNombre !== "" && valorDate !== null && valorPeriodo !=="") {
    //         setBotonHabilitado(true);
    //     } else {
    //         setBotonHabilitado(false);
    //     }
    // };

    const handleButtonEliminaIndicador = () => {
        setmostrarModal3(true);
    };
    const handleModalAceptarEliminarIndicador = () => {
        const nuevosDatosIndicadores = datosMuestras.datosIndicadores.filter(
            (_, index) => !seleccionados2.includes(index)
        );
        const nuevosIndicadores = datosMuestras.Indicadores.filter(
            (_, index) => !seleccionados2.includes(index)
        );
        const nuevaListaIndicadores = datosMuestras.listaIndicadores.filter(indicador =>
            !idIndicadoresAEliminar.includes(indicador.idIndicador)
        );
        // Actualizar el estado de los indicadores
        setSeleccionados2([]);
        setIdIndicadoresAEliminar([]);

        // Actualizar el estado de los indicadores en el componente padre
        // o realizar la acción correspondiente para actualizar los datos en el estado global
        // Eliminar los elementos seleccionados del arreglo

        dispatch(addDatosIndicador(nuevosIndicadores));
        dispatch(addDatosIndicadores(nuevosDatosIndicadores));
        dispatch(addDatosListaIndicadores(nuevaListaIndicadores));

        setmostrarModal3(false)
    };
    const handleModalCloseEliminarIndicador = async () => {
        setmostrarModal3(false)
    };
    const filterDate = (date) => {
        const today = new Date();
        const fecha_limite = new Date('3000-12-31');
        return date >= today && date <= fecha_limite;
    };
    return (
        <div className="inicioPaginaREAEM">
            <form onSubmit={handleSubmit} className="contDatosREAM">
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea registrar el nuevo espacio?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonCancelarREAEM" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarREAEM" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
                
                <div className="contDatosREAM">
                    <div className="contMuestrasRAEM contDatosREAM">
                        <h2 className="tituloREAEM tituloGen tituloTipo3">Espacio Medición</h2>
                        <div className="contenedorREAEM">
                            <div className="derechaREAEM">
                                <div >
                                    <label className="labelGen labelREAEM" htmlFor="tipoMedicion">
                                        Codigo *</label>
                                    <input className="inputActivoGen inputDis" type="text" name="codigo"
                                        value={codigo} onChange={handleChange}
                                        style={{ height: "27px", width: "80%" }} />
                                </div>
                            </div>
                            <div className="derechaREAM contenedorREAEM">
                                <div className="derechaREAM" style={{ width: "45%" }}>
                                    <label className="labelGen labelREAEMperiodo" htmlFor="tipoMedicion">
                                        Periodo Medición *</label>
                                </div>

                                {comboBoxCiclo.length === 0 ? (<DropdownButton title={selectedCiclo} onSelect={handleSeleccionarCiclo}
                                > </DropdownButton>) : (

                                    <DropdownButton title={selectedCiclo} onSelect={handleSeleccionarCiclo}>
                                        {comboBoxCiclo.filter((option) => datosMuestras.cicloInicio <= option.id && option.id <= datosMuestras.cicloFin).map((option) => (
                                            <Dropdown.Item key={option.id} eventKey={option.ciclo}>
                                                {option.ciclo}
                                            </Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                )
                                }

                            </div>
                        </div>
                        <div className="contenedorREAEM">
                            <div className="derechaREAEM">
                                <label className="labelGen labelREAEM" htmlFor="tipoMedicion">
                                    Espacio Medición *</label>
                                <input className="inputActivoGen inputDis" type="text" name="nombreCurso" 
                                    value={nombreCurso} onChange={handleChange}
                                    style={{ height: "27px", width: "80%" }} />
                            </div>
                            <div className="derechaREAEM">
                                <label className="labelGen labelREAEM" htmlFor="tipoMedicion">
                                    Fecha Límite *
                                </label>
                                <br></br>
                                <DatePicker selected={selectedDate} value={selectedDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy" filterDate={filterDate} className="inputActivoGen " />
                            </div>
                        </div>


                    </div>

                    <div className="contMuestrasRAEM contDatosREAM">
                        <h2 className="tituloREAEM tituloGen">Muestras</h2>
                        <div className="contenedorREAEM">
                            <div className="derechaREAEM">

                            </div>
                            <div className="btnDivDisenio izquierdaREAEM">
                                <button className='btnDisenio buttonREAEM' onClick={handleAñadir}>Añadir</button>
                                <button className='btnDisenio buttonEliminarREAEM' onClick={handleButtonElimina}>Eliminar</button>
                                <Modal show={mostrarModal2} onHide={handleModalCloseEliminar}>
                                    <Modal.Body >
                                        <p>¿Está seguro que desea eliminar las filas seleccionadas?</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button className="botonModal btnDisenio botonCancelarREAEM" onClick={handleModalCloseEliminar}>
                                            Cancelar</Button>
                                        <Button className="botonModal btnDisenio botonAceptarREAEM" onClick={handleModalAceptarEliminar}>
                                            Aceptar</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                        <div className="contenedorTablaF">
                            <Table className="tablaF" bordered hover>
                                <thead>
                                    <tr className="ColumnaREAC">
                                        <th className="SeleccionCol">Selección</th>
                                        <th className="CodigoREAC">Muestra</th>
                                        <th className="NombreREAC">Responsable</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosMuestras.MuestrasMedicion.map((muestra, index) => (
                                        <tr key={index}>
                                            <td className="filaREAC">
                                                <input
                                                    type="checkbox"
                                                    checked={seleccionados.includes(index)}
                                                    
                                                    onChange={() => handleCheckboxChange(index)} />
                                            </td>
                                            <td className="filaREAC">{muestra.codigo}</td>
                                            <td className="filaREAC">{datosMuestras.nombreResponsable[index]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    <div className="contMuestrasRAEM contDatosREAM">
                        <h2 className="tituloREAEM tituloGen">Indicadores</h2>
                        <div className="contenedorREAEM">
                            <div className="derechaREAEM">

                            </div>
                            <div className="btnDivDisenio izquierdaREAEM">
                                <button className='btnDisenio buttonREAEM' onClick={handleAñadirIndicador}>Añadir</button>
                                <button className='btnDisenio buttonEliminarREAEM' onClick={handleButtonEliminaIndicador}>Eliminar</button>
                                <Modal show={mostrarModal3} onHide={handleModalCloseEliminar}>
                                    <Modal.Body >
                                        <p>¿Está seguro que desea eliminar las filas seleccionadas?</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button className="botonModal btnDisenio botonCancelarREAEM" onClick={handleModalCloseEliminarIndicador}>
                                            Cancelar</Button>
                                        <Button className="botonModal btnDisenio botonAceptarREAEM" onClick={handleModalAceptarEliminarIndicador}>
                                            Aceptar</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                        <div className="contenedor-indicadores-rellenoREAC">
                            <Table className="tablaF" bordered hover>
                                <thead>
                                    <tr className="ColumnaREAC">
                                        <th className="SeleccionCol">Selección</th>
                                        <th className="CodigoREAC">Código</th>
                                        <th className="NombreREAC">Indicador</th>
                                        <th className="CodigoREAC">Competencia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosMuestras.datosIndicadores.map((indicador, index) => (
                                        <tr key={index}>
                                            <td className="filaREAC">
                                                <input
                                                    type="checkbox"
                                                    checked={seleccionados2.includes(index)}
                                                    onChange={() => handleCheckboxChangeIndicador(index,indicador.idIndicador)} />
                                            </td>
                                            <td className="filaREAC">{indicador.codigo}</td>
                                            <td className="filaREAC">{indicador.descripcion}</td>
                                            <td className="filaREAC">{indicador.codigoCompetencia}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>

                </div>
                
                <div className="contDatosREAM">
                    <div className="contenedorREAEM">
                        <div className="btnDivDisenio izquierdaREAEM">
                            <button className='btnDisenio buttonREAEM' type="button"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                disabled={!botonHabilitado}
                                style={{ backgroundColor: botonHabilitado ? '#042354' : '#adadad' }} onClick={handleButtonClick}>Guardar</button>
                                

                                {/* {flagEnviado==0?<button className="btnDisenio btnAniadirMGC"
                                    onClick={handleCargarAlumnos}
                                >
                                    Añadir/Cargar
                                </button>:<div></div>} */}

                        </div>
                    </div>
                </div>
                
            </form>
        </div>
    );

}