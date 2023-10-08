import "../HojasDeEstilo/ResEspeBuscarIndicador.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/FormBuscar.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { addDatosIndicadores, addDatosIndicador, addDatosListaIndicadores } from '../Redux/MedicionResEspeSlice';
import { Modal, Button } from 'react-bootstrap';
import { getData, columns, formatRowData } from "./DataIndicadoresGeneral";
import Pagination from "../componentes/pagination/pagination";

import Table from "./TablaCuentas";
export default function BuscarIndicador(props) {

    const [cookies, setCookie] = useCookies();
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [mostrarModal, setmostrarModal] = useState(false);
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);
    const [mostrarModalAnadir, setmostrarModalAnadir] = useState(false);

    const [flagActualizar, setFlagActualizar] = useState(false);

    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [data, setData] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [flagCheckeo, setFlagCheckeo] = useState(false);
    const [modalDetalleObjetivo, setmodalDetalleObjetivo] = useState(false);
    const [selectedValue5, setSelectedValue5] = useState("");
    const [competenciaBox, setCompetenciaBox] = useState([]);

    const [indicadores, setIndicadores] = useState([]);
    const [selectedIndicadores, setSelectedIndicadores] = useState([]);
    const [codigoIndicador, setCodigoIndicador] = useState("");
    
    const [evidencia, setEvidencia] = useState("");
    const [idIndicador, setIdIndicador] = useState("");
    const [codCompetencia, setCodCompetencia] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const datosMedicion = useSelector((state) => state.Programa);

    const handleButtonAgregar = () => {
        setmostrarModal2(true);
    };

    /****************** REDUX********************** */
    const dispatch = useDispatch();
    const datosAdmin = useSelector((state) => state.Administrador);
    const datosCuenta = useSelector((state) => state.Cuenta);
    const datosGeneral = useSelector((state) => state.General);
    const datosIndicadores = useSelector((state) => state.MedicionEspe);
    /******************FIN DEL REDUX********************** */



    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
        totalPages: 0,
        totalPassengers: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        
    }, []);

    const handleModalCancelar = () => {
        console.log("cancelar");
        setmostrarModal2(false);
        setFlagActualizar(true);
    };
    useEffect(() => {
        if (evidencia !== "" && idIndicador !== "") {
            setBotonHabilitado(true);
        } else {
            setBotonHabilitado(false);
        }
    }, [evidencia, idIndicador])

    const handleModalAceptarAgregar = async () => {
        if (datosMedicion.banderaDetalle) {
            if (datosMedicion.banderaAñadir) {
                const nuevoIndicador = {
                    idIndicador: idIndicador,
                    codigo: codigoIndicador,
                    descripcion: descripcion,
                    codigoCompetencia: codCompetencia
                };
                const idIn = {
                    idIndicador: idIndicador,
                    evidencia: evidencia
                };
                const id = {
                    idIndicador: idIndicador
                };

                dispatch(addDatosListaIndicadores([...datosIndicadores.listaIndicadores, id]));
                dispatch(addDatosIndicador([...datosIndicadores.Indicadores, idIn]));
                dispatch(addDatosIndicadores([...datosIndicadores.datosIndicadores, nuevoIndicador]));

                console.log("alamos")
                props.cambiarComponenteMedicion1(false);
                props.cambiarComponenteMedicion2(true);
                props.cambiarComponenteMedicion3(false);
                props.cambiarComponenteMedicion4(false);
                props.cambiarComponenteMedicion5(false);
                props.cambiarComponenteMedicion6(false);
            } else {
                console.log("DETALLE INGRESA AQUI");
                console.log("Galleta:");
                console.log(cookies.jwt);

                const config = {
                    headers: { Authorization: 'Bearer ' + cookies.jwt }
                }
                const data = {
                    idEspacioMedicion: datosMedicion.idEspacio,
                    //indicadores: selectedIndicadores,
                    indicadores:[{idIndicador: idIndicador,evidencia: evidencia}]
                }
                console.log("AQUI ESTA LA DATAAAAAAA");
                console.log(data);
                console.log("AQUI ESTA LA DATAAAAAAA");
                try {
                    const respuesta = await axios.post("http://localhost:3050/api/indicador/insertarIndicadoresTodos", data, config);
                    console.log(respuesta.data);

                } catch (error) {
                    console.log(error)
                }
                
                props.cambiarComponenteMedicion1(false);
                props.cambiarComponenteMedicion2(false);
                props.cambiarComponenteMedicion3(false);
                props.cambiarComponenteMedicion4(false);
                props.cambiarComponenteMedicion5(true);
                props.cambiarComponenteMedicion6(false);
            }

        } else {
            const nuevoIndicador = {
                idIndicador: idIndicador,
                codigo: codigoIndicador,
                descripcion: descripcion,
                codigoCompetencia: codCompetencia
            };
            const idIn = {
                idIndicador: idIndicador,
                evidencia: evidencia
            };
            const id = {
                idIndicador: idIndicador
            };
            dispatch(addDatosListaIndicadores([...datosIndicadores.listaIndicadores, id]));
            dispatch(addDatosIndicador([...datosIndicadores.Indicadores, idIn]));
            dispatch(addDatosIndicadores([...datosIndicadores.datosIndicadores, nuevoIndicador]));

            props.cambiarComponenteMedicion1(false);
            props.cambiarComponenteMedicion2(true);
            props.cambiarComponenteMedicion3(false);
            props.cambiarComponenteMedicion4(false);
            props.cambiarComponenteMedicion5(false);
            props.cambiarComponenteMedicion6(false);
        }
    }

    const handleModalDeshabilitar = () => {
        
    }

    const llenarCompetenciaBox = async () => {
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: {
                Authorization: 'Bearer ' + cookies.jwt
            }
        }
        const data = {
            fidEspecialidad: datosCuenta.idEspecialidad
        }
        console.log("AQUI ESTA LA DATAAAAAAA COMPETENCIA");
        // console.log(data);
        console.log(config);
        console.log("AQUI ESTA LA DATAAAAAAA COMPETENCIA");
        try {

            const respuesta = await axios.post("http://localhost:3050/api/combobox/listarCompetenciasXEspecialidad", data, config);
            console.log("AQUI ESTA LA DATAAAAAAA CURSO 333");
            console.log(respuesta);


            console.log(respuesta.data.data);
            setCompetenciaBox(respuesta.data.data);
            // props.cambiarComponente(false);
        }
        catch (error) {
            console.log(error);
        }
            
    }
    const handleCambio = async (e) => {
        setTextoBusqueda(e.target.value);
    }

    const toggleValue = (event, idIndicador, cod, desc, codCom) => {
        if (event.target.checked) {
            console.log("DATOS INDICADOR");
            console.log(cod);
            console.log("DATOS INDICADOR");
            const nuevoIndicador = {
                codigo: cod,
                descripcion: desc,
                codigoCompetencia: codCom
            };

            setIndicadores(prevIndicadores => [...prevIndicadores, nuevoIndicador]);
            const idIn = {
                idIndicador: idIndicador
            };
            setSelectedIndicadores((prevSelectedIndicadores) => [...prevSelectedIndicadores, idIn]);
            //setIndicadoresID(prevIndicadoresID => [...prevIndicadoresID, idIndicador]);
        } else {
            setIndicadores(prevIndicadores => prevIndicadores.filter(ind => ind.codigo !== cod));
            setSelectedIndicadores((prevSelectedIndicadores) => prevSelectedIndicadores.filter((id) => id.idIndicador !== idIndicador));
            //setIndicadoresID(prevIndicadoresID => prevIndicadoresID.filter((id) => id !== idIndicador));
        }
    };


    const handleSelectChange = (event) => {
        event.preventDefault();
        setSelectedValue5(event.target.value);
        console.log(selectedValue5);
        // onSelect(selectedValue2);
    }


    const handleBuscarPorFiltros = (e) => {
        e.preventDefault();
        setFlagBusqueda(!flagBusqueda);
        console.log(flagBusqueda);
    }

    useEffect(() => {
        llenarCompetenciaBox();
    }, []);


    useEffect(() => {
        setPageData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: true,
        }));
        //console.log("Galleta:")
        //console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        let idM;
        if (datosMedicion.banderaDetalle) {
            if (datosMedicion.banderaAñadir) {
                idM=datosMedicion.idMedicion;
            } else {
                idM=datosMedicion.idMedicion;
            }
        } else {
            idM=0;
        }
        const data = {
            codigoIndicador: textoBusqueda,
            competencia: selectedValue5,
            idEspecialidad: datosCuenta.idEspecialidad,
            paginaSolicitar: currentPage,
            elementos: datosIndicadores.listaIndicadores,
            idMedicion: idM
        }

        console.log("data");
        console.log(data);
        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, indicador } = info;
            setPageData({
                isLoading: false,
                rowData: (indicador.map((indicador) => ({
                    // seleccion: <input
                    //     className="checkboxGC"
                    //     type="checkbox"
                    //     id={indicador.idIndicador}
                    //     defaultChecked={indicadoresID.includes(indicador.idIndicador)}
                    //     //checked={verificarCheck}
                    //     //onChange={handleCheckBoxChange(Usuario.idUsuario)}
                    //     onChange={(e) => toggleValue(e, indicador.idIndicador, indicador.codigo, indicador.descripcion, indicador.codigoCompetencia)}

                    // />,

                    codigo: <div className="" onClick={() => handleButtonFila(indicador.idIndicador, indicador.codigo,indicador.descripcion,indicador.codigoCompetencia)}>{indicador.codigo}</div>,
                    descripcion: <div className="seleccionableGC" onClick={() => handleButtonFila(indicador.idIndicador, indicador.codigo,indicador.descripcion,indicador.codigoCompetencia)}>{indicador.descripcion}</div>,
                    codigoCompetencia: <div className="seleccionableGC" onClick={() => handleButtonFila(indicador.idIndicador, indicador.codigo,indicador.descripcion,indicador.codigoCompetencia)}>{indicador.codigoCompetencia}</div>,
                }))),
                totalPages: totalPaginas,
                totalPassengers: totalFilas,
            });
        });

    }, [flagBusqueda, currentPage]);

    const handleButtonFila = (id,cod,desc,codC) => {
        setIdIndicador(id);
        setCodCompetencia(codC);
        setDescripcion(desc);
        setCodigoIndicador(cod);
        //setSelectedIndicadores([id]);
    }
    const handleChange = (e) => {
        const { name, value } = e?.target || {};

        switch (name) {
            case "muestraNombre":
                setEvidencia(value);
                break;
        }
    }
    return (
        <div className="contenedorTablaREOE">
            <div className="REAMMContenedorSuperiorBI">
                <div className="REAMMContenedorBuscadoresSecundariosBI">
                    <div className="REAMMContSecSup1BI REAMMContSecSup1SupBI">
                            <div className="labelGen REAMMContSecSup1NomBI REAMMContSecSup1Nom2BI">
                                Código del indicador *
                            </div>
                            <div className="REAMMContSecSup1BoxBI">
                                <input
                                    className=" inputGen REAMMinput" value={codigoIndicador}
                                    type="text" name="muestraNombre"  disabled={true}
                                    />

                            </div>

                    </div>

                    <div className="REAMMContenedorBuscadoresSecundariosBI">
                        <div className="REAMMContSecSup1BI REAMMContSecSup1BI3 ">
                            <div className="labelGen REAMMContSecSup1NomBI REAMMContSecSup1Nom2BI ">
                                Tipo de evidencia *
                            </div>
                            <div className="REAMMContSecSup1BoxBI2">

                                <input
                                    className="inputActivoGen REAMMinput" onChange={handleChange}
                                    value={evidencia} type="text" name="muestraNombre"
                                    />

                            </div>
                        </div>
                    </div>
                    <div className="REAMMContSecSup2">
                    </div>
                </div>

            </div>


            <label className='mensajeEleccionRepBI labelGen'> Seleccione los indicadores que desea añadir:</label>

            <div className="barraSuperiorREOE">
                <div className="contenedorBarraGM">
                    <form className="input-groupBuscar ">
                        <input className="form-controlBuscar formBuscador" type="search" placeholder="Buscar por código o indicador" aria-label="Buscar" onChange={handleCambio} value={textoBusqueda} />
                    </form>
                </div>

                <div className="REAMComboBox">
                    <select value={selectedValue5} onChange={handleSelectChange}>
                        <option value="">Selecciona una competencia</option>
                        {competenciaBox.map(option => (
                            <option key={option.id} value={option.compe}>
                                {option.competencia}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="botonesSuperioresREOE contenedorBarraREOE">
                    <div className="btnDivDisenio contBuscarREBI">
                        <button className="btnDisenio btnBuscarBI" onClick={handleBuscarPorFiltros} class="btnDisenio btnBuscarBI" href="#" role="button" >
                            Buscar
                        </button>
                    </div>
                </div>

            </div>

            <div className="espacioTablaREOE">
                <p>Indicadores Encontrados: {pageData.totalPassengers || "No hay resultados para su busqueda"}</p>
                {pageData.isLoading ? (
                    <div className="cargando d-flex flex-column align-items-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <br></br>
                        <p>  Cargando</p>
                    </div>

                ) : (
                    <>
                        {/* <button onClick={() => setCurrentPage(1)}>Reset</button> */}
                        <div className="contenedorTablaREOE " style={{ width: "100%", height: "450px" }}>
                            <Table className="miTabla"
                                columns={columns}
                                data={pageData.rowData}
                                isLoading={pageData.isLoading}
                                cambiarComponente={props.cambiarComponente}
                                cambiarComponente2={props.cambiarComponente2}
                            />
                        </div>
                        <Pagination
                            totalRows={pageData.totalPassengers}
                            pageChangeHandler={setCurrentPage}
                            rowsPerPage={10}
                            currentPage={currentPage} />

                    </>)
                }
            </div>

            <div className="barraIntermediaREOE">
                <div className="btnDivDisenio">
                    <button className="btnDisenio btnHabilitarBI" type="button"
                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                        onClick={handleButtonAgregar} disabled={!botonHabilitado} style={{ background: botonHabilitado ? '#042354' : '#adadad' }}>
                        Agregar
                    </button>
                    <Modal show={mostrarModal2} onHide={handleModalDeshabilitar}>
                        <Modal.Body >
                            <p>¿Está seguro que desea Agregar los indicadores seleccionados?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="botonModal btnDisenio botonCancelarGC" onClick={handleModalCancelar}>
                                Cancelar</Button>
                            <Button className="botonModal btnDisenio botonAceptarGC" onClick={handleModalAceptarAgregar}>
                                Aceptar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

            </div>
        </div >
    );
}
