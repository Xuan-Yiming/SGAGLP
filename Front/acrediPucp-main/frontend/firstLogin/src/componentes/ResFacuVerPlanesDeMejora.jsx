import '../HojasDeEstilo/ResEspeGestionPlanDeMejora.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/FormBuscar.css";

// import { Table } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addDatosCuenta, addRoles, addNombreCuenta, addApellidoPCuenta, addApellidoMCuenta, addFoto } from "../Redux/CuentaSlice";
import { Modal, Button } from 'react-bootstrap';
import { getData, columns, formatRowData } from "./DataPlanMejora";
import Table from "./TablaCuentas";
import Pagination from "./pagination/pagination";
import { addDatosIndicadores } from '../Redux/IndicadoresSlice';
import { addDatosPropuestas } from '../Redux/PropuestaSlice';
import { addDatosPlanMejora, addPlanSeleccionado, addPagina } from '../Redux/PlanMejoraSlice';
import { useLocalStorage } from './useLocalStorage';

// import { Table } from 'react-bootstrap';


export default function ResFacuVerPlanesDeMejora(props) {

    const datosEspecialidad = useSelector((state) => state.Especialidad);
    const [idE, setIdE] =  useState(datosEspecialidad.idEspecialidad);

    const [cookies, setCookie] = useCookies();
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [mostrarModal, setmostrarModal] = useState(false);
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);
    //const [checkboxesMarcados, setCheckboxesMarcados] = useState([]);
    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [flagActualizar, setFlagActualizar] = useState(false)
    const [deshabilitado, setDeshabilitado] = useState(true);
    const [botonColor, setBotonColor] = useState("#ADADAD");

    const [textoBusqueda, setTextoBusqueda] = useState("");

    const [data, setData] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [flagCheckeo, setFlagCheckeo] = useState(false);
    const datosCuenta = useSelector((state) => state.Cuenta);


    const dispatch = useDispatch();

    var [elementos, setElementos] = useState([{}]);

    useEffect(() => {
        let Propuesta = {
            idPropuesta: "",
            codigo: "",
            descripcion: "",
            actividades: [],
            Propuestas: []
        };
        dispatch(addDatosPropuestas(Propuesta));
        let PlanMejora = {
            idPlanMejora: "",
            codigoPlanMejora: "",
            descripcionPlanMejora: ""
        };
        dispatch(addDatosPlanMejora(PlanMejora));
    }, []);

    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
        totalPages: 0,
        totalPassengers: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);
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
        const data = {
            codigoPlanMejora: textoBusqueda,
            idEspecialidad: idE,
            paginaSolicitar: currentPage,
        }
        //console.log("configuracion:")
        //console.log(config);

        //console.log(data);

        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, PlanMejora } = info;
            setPageData({
                isLoading: false,
                rowData: (PlanMejora.map((PlanMejora) => ({
                    seleccion: <input
                        className="checkboxREC"
                        type="checkbox"
                        id={PlanMejora.idPlanMejora}
                        // checked={verificarCheck}
                        //  checked={checkboxesMarcados[index] || false}
                        defaultChecked={seleccionados.includes(PlanMejora.idPlanMejora)}
                        // onChange={handleCheckBoxChange}
                        onChange={(e) => toggleValue(e, PlanMejora.idPlanMejora)}
                    />,
                    codigo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(PlanMejora.idPlanMejora, PlanMejora)}>{PlanMejora.codigo}</div>,
                    planMejora: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(PlanMejora.idPlanMejora, PlanMejora)}>{PlanMejora.descripcion}</div>,
                    creadoPor: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(PlanMejora.idPlanMejora, PlanMejora)}>{PlanMejora.usuarioCreacion}</div>,
                    fechaCreacion: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(PlanMejora.idPlanMejora, PlanMejora)}>{PlanMejora.fechaCreacion.substr(8, 2) + "/" + PlanMejora.fechaCreacion.substr(5, 2) + "/" + PlanMejora.fechaCreacion.substr(0, 4)}</div>,
                    estado: <div className="seleccionableGC" onClick={() => handleButtonFila(PlanMejora.idPlanMejora, PlanMejora)}>{PlanMejora.activo === 1 ? "Vigente" : "Anulado"}</div>,
                    etapa: <div className="seleccionableGC" onClick={() => handleButtonFila(PlanMejora.idPlanMejora, PlanMejora)}>{PlanMejora.fidEstado === 1 ? "No iniciado" : PlanMejora.fidEstado === 2 ? "En progreso" : "Finalizado"}</div>
                }))),

                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });

    }, [flagActualizar, currentPage]);

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
        const data = {
            codigoPlanMejora: textoBusqueda,
            idEspecialidad: idE,
            paginaSolicitar: currentPage,
        }
        //console.log("configuracion:")
        //console.log(config);

        //console.log(data);

        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, PlanMejora } = info;
            setCurrentPage(1)
            setPageData({
                isLoading: false,
                rowData: (PlanMejora.map((PlanMejora) => ({
                    seleccion: <input
                        className="checkboxREC"
                        type="checkbox"
                        id={PlanMejora.idPlanMejora}
                        // checked={verificarCheck}
                        //  checked={checkboxesMarcados[index] || false}
                        defaultChecked={seleccionados.includes(PlanMejora.idPlanMejora)}
                        // onChange={handleCheckBoxChange}
                        onChange={(e) => toggleValue(e, PlanMejora.idPlanMejora)}
                    />,
                    codigo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(PlanMejora.idPlanMejora, PlanMejora)}>{PlanMejora.codigo}</div>,
                    planMejora: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(PlanMejora.idPlanMejora, PlanMejora)}>{PlanMejora.descripcion}</div>,
                    creadoPor: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(PlanMejora.idPlanMejora, PlanMejora)}>{PlanMejora.usuarioCreacion}</div>,
                    fechaCreacion: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(PlanMejora.idPlanMejora, PlanMejora)}>{PlanMejora.fechaCreacion.substr(8, 2) + "/" + PlanMejora.fechaCreacion.substr(5, 2) + "/" + PlanMejora.fechaCreacion.substr(0, 4)}</div>,
                    estado: <div className="seleccionableGC" onClick={() => handleButtonFila(PlanMejora.idPlanMejora, PlanMejora)}>{PlanMejora.activo === 1 ? "Vigente" : "Anulado"}</div>,
                    etapa: <div className="seleccionableGC" onClick={() => handleButtonFila(PlanMejora.idPlanMejora, PlanMejora)}>{PlanMejora.fidEstado === 1 ? "No iniciado" : PlanMejora.fidEstado === 2 ? "En progreso" : "Finalizado"}</div>
                }))),

                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });

    }, [flagBusqueda]);



    const handleModalAceptarDeshabilitar = async () => {
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = new Set(seleccionados);
        const objetoJSON = {};

        data.forEach(idAnulacion => {
            objetoJSON[idAnulacion] = true;
        });

        console.log("valores json");
        console.log(objetoJSON);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/planMejora/deshabilitarPlanMejora", objetoJSON, config);

            console.log(respuesta.data);

            setmostrarModal(false);
            setFlagActualizar(true);
            //setCurrentPage(currentPage);
            // flagBusqueda=!flagBusqueda;
            // obtenerNuevosDatos();
            // const boton=document.getElementById("boton-buscar-gc");
            // boton.click();


        } catch (error) {

            console.log(error)
        }
        setFlagBusqueda(!flagBusqueda);
    };

    const handleModalCancelar = () => {
        setmostrarModal(false);
        setmostrarModal2(false);
        setFlagActualizar(true);

        // setTextoBoton("Editar");
        // setEditable(false);
        // setColor("#F2F7F9");
        // setColorTexto("#7892A4");
    };

    const handleModalClose = () => {
        setmostrarModal(false);
    };


    const handleModalDeshabilitar = () => {

    }

    const handleButtonFila = async (idEnviado, PlanMejora) => {
        console.log("LA INFO DE PLAN ANTES DE ENVIAR AL REDUX");
        //   console.log(PlanMejora);
        console.log("LA INFO DE PLAN ANTES DE ENVIAR AL REDUX");
        //dispatch(addPlanSeleccionado(PlanMejora));
        console.log(PlanMejora);
        dispatch(addPlanSeleccionado(PlanMejora));
        props.cambiarComponenteVerPlanesMejora(false);
        props.cambiarComponenteVerDetallePlanMejora(true);
        dispatch(addPagina(paginaActual))

    }

    // Estado para almacenar la página actual
    var [paginaActual, setPaginaActual] = useState(0);
    // Cantidad de elementos por página
    var elementosPorPagina = 10;

    // Cálculo del índice del primer y último elemento de la página actual
    var indicePrimerElemento = paginaActual * elementosPorPagina;
    var indiceUltimoElemento = indicePrimerElemento + elementosPorPagina;

    // Obtener los elementos de la página actual
    var elementosPaginaActual = elementos.slice(
        indicePrimerElemento,
        indiceUltimoElemento
    );

    // Total de páginas
    var totalPaginas = Math.ceil(elementos.length / elementosPorPagina);

    // Función para cambiar la página actual
    function cambiarPagina(numeroPagina) {
        setPaginaActual(numeroPagina.selected);
    }


    const handleButtonAñadir = () => {
        setColor("#FFFFFF");
        setColorTexto("#000000");
        props.cambiarComponentePlanMejora1(true);
    };
    const handleButtonHabilitar = () => {
        setmostrarModal2(true);

    };
    const handleButtonDeshabilitar = async () => {
        let valor = 0;
        valor = validarCampos();
        if (valor) {
            setmostrarModal(true);
        } else {
            setmostrarModal(false);
        }

    };

    const validarCampos = () => {
        let valor = 0;
        if (seleccionados.length > 0) {
            setBotonHabilitado(true);
            valor = 1;
        } else {
            setBotonHabilitado(false);
            valor = 0;
        }
        return valor;
    };
    const handleCambio = async (e) => {
        setTextoBusqueda(e.target.value);
    }


    const obtenerNuevosDatos = (e) => {
        e.preventDefault();
        setFlagBusqueda(!flagBusqueda);
        console.log(flagBusqueda);
    }

    let toggleValue = useCallback((event, id, index) => {
        if (event.target.checked) {
            setSeleccionados(value => [...value, id])
        } else {
            setSeleccionados(value => value.filter(it => it !== id))
        }

        /* const checkboxes = [...checkboxesMarcados];
 
         checkboxes[index] = !checkboxes[index];
 
         setDeshabilitado(false)
         setBotonColor("#9E0520")
 
         setCheckboxesMarcados(checkboxes);*/


    }, [setSeleccionados])
    console.log(seleccionados)

    /*
    useEffect(() => {
        // Verificar si hay algún checkbox marcado
        const hayCheckboxMarcado = checkboxesMarcados.some((checkbox) => checkbox);
        // Actualizar el estado de "deshabilitado" en función de si hay algún checkbox marcado
        if (!hayCheckboxMarcado)
            setBotonColor("#ADADAD")
        setDeshabilitado(!hayCheckboxMarcado);
    }, [checkboxesMarcados]);
*/



    return (

        <div className="contenedorTablaGPM">
            <br></br>
            <div className="barraSuperiorC">
                {/* <div className="botonesSupIzquierdaC">
                        <div className="btnParametrosC">
                                <button>Parametros</button>  
                        </div> 
                    </div> */}
                <form className="input-groupBuscar">
                    <input className="form-controlBuscar" type="search" placeholder="Buscar por código o nombre de plan de mejora" aria-label="Buscar" onChange={handleCambio} value={textoBusqueda} />
                    <div className="input-group-appendBuscar m-0">
                        <button className="btn m-0 border-end border-top border-bottom borde-izquierdo-cuadrado" onClick={obtenerNuevosDatos}><i className="bi bi-search" ></i></button>
                    </div>
                </form>
                
            </div>
            <div className="contenedorCentralC">
                {/* Tones la tabla aqui */}
            </div>
            <br />

            <div className="espacioTabla">
                <p>Plan de Mejora Encontrados: {pageData.totalPassengers || "No hay resultados para su busqueda"}</p>
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
                        <div className="contenedorTablaGC" style={{ width: "100%", height: "520px" }}>
                            <Table
                                columns={columns}
                                data={pageData.rowData}
                                isLoading={pageData.isLoading}
                                cambiarComponente={props.cambiarComponente}
                                cambiarComponente2={props.cambiarComponente2}
                            />
                        </div>
                        <br></br>

                        <Pagination
                            totalRows={pageData.totalPassengers}
                            pageChangeHandler={setCurrentPage}
                            rowsPerPage={10}
                            currentPage={currentPage} />
                    </>)
                }
            </div>

            <div>
                {/* <div className="btnHabilitarGC">
                    <button type="button"
                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                        onClick={handleButtonHabilitar} >
                        Habilitar
                    </button>
                    <Modal show={mostrarModal2} onHide={handleModalDeshabilitar}>
                        <Modal.Body >
                            <p>¿Está seguro que desea guardar los cambios realizados?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="botonCancelarDC" onClick={handleModalCancelar}>
                            Cancelar</Button>
                            <Button className="botonAceptarDC" onClick={handleModalAceptarHabilitar}>
                            Aceptar</Button>
                        </Modal.Footer>
                    </Modal>
                </div> */}
                <div className="btnDeshabilitarC">
                    {/*<button type="button"
                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                        onClick={handleButtonDeshabilitar} >
                        Eliminar
                    </button>*/}

                    <Modal show={mostrarModal} onHide={handleModalDeshabilitar}>
                        <Modal.Body >
                            <p>¿Está seguro que desea deshabilitar los plan(es) seleccionados?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" className="botonCancelarDC btn btn-danger" onClick={handleModalCancelar}>
                                Cancelar</Button>
                            <Button className="botonAceptarDC" onClick={handleModalAceptarDeshabilitar}>
                                Aceptar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );

}