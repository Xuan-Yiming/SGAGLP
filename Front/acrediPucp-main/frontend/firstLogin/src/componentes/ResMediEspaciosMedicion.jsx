import '../HojasDeEstilo/ResMediEspaciosMedicion.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/FormBuscar.css";
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTextoBuscar, AddItem, removeItem } from "../Redux/GeneralSlice";
import {
    recibeDatosMedicion, recibeDatosCompetencias, addIdMuestraMedicion,
    addCiclo, addCodigoMuestra, addCodigoEspacio, addNombreCurso, addFechaInicio,
    addFechaFin, addEnviado, addTipoMedicion
} from "../Redux/MedicionSlice";
import { addDatosCuenta, addRoles, addNombreCuenta, addApellidoPCuenta, addApellidoMCuenta } from "../Redux/CuentaSlice";
import { getData, columns, formatRowData } from "./DataResMediMuestrasMedicion";
import { addEnviadoGeneral } from "../Redux/GeneralSlice";
import Table from "./TablaMedicion";
import Pagination from "./pagination/pagination";
import ResEspeBase from './ResEspeBase';
import { Modal, Button } from 'react-bootstrap';
import {addBanderaCargarMedicion } from "../Redux/CargandoSlice";
import { useLocalStorage } from './useLocalStorage';
export default function ResMediEspaciosMedicion(props) {

    const [cookies, setCookie] = useCookies();
    const [mostrarModal, setmostrarModal] = useState(false);
    const [flagBusqueda, setFlagBusqueda] = useState(false);

    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [idE, setIdE] = useLocalStorage("idEspecialidadxMuestra", "")

    const [data, setData] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [flagCheckeo, setFlagCheckeo] = useState(false);

    const [mostrarModal2, setmostrarModal2] = useState(false);

    const [muestra, setMuestra] = useLocalStorage("muestra", "")

    // useEffect(()=> {
    //     //here you will have correct value in userInput 
    // },[textoBusqueda])

    const [flagEnviado, setFlagEnviado] = useLocalStorage("flagEnviado", "")

    /****************** REDUX********************** */
    const dispatch = useDispatch();
    const datosAdmin = useSelector((state) => state.Administrador);
    const datosGeneral = useSelector((state) => state.General);
    const datosMedicion = useSelector((state) => state.Medicion);



    /******************FIN DEL REDUX********************** */

    var [elementos, setElementos] = useState([{}]);

    // useEffect(() => {
    //     obtenerDatosCuentas();
    // }, []);
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
            idUsuario: datosAdmin.idAdmin,
            codigo: textoBusqueda,
            paginaSolicitar: currentPage,
        }
        //console.log("configuracion:")
        //console.log(config);

        console.log("ADMIN ACAAAAAA");
        console.log(data);

        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Medicion } = info;
            console.log("ACA TENEMOS MEDICION PARA EL LOCAL STORAGE");
            console.log(Medicion)
            // setFlagEnviado(Medicion.enviado)
            setPageData({
                isLoading: false,
                rowData: (Medicion.map((Medicion) => ({
                    seleccion: <input
                        className="checkboxGC"
                        type="checkbox"
                        id={Medicion.idMuestraMedicion}
                        // checked={verificarCheck}
                        defaultChecked={seleccionados.includes(Medicion.idMuestraMedicion)}
                        // onChange={handleCheckBoxChange}
                        onChange={(e) => toggleValue(e, Medicion.idMuestraMedicion)}
                    />,
                    ciclo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Medicion.idMuestraMedicion, Medicion.enviado)}>{Medicion.ciclo}</div>,
                    fechaLimite: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Medicion.idMuestraMedicion, Medicion.enviado)}>{Medicion.fechaLimite.substr(8, 2) + "/" + Medicion.fechaLimite.substr(5, 2) + "/" + Medicion.fechaLimite.substr(0, 4)}</div>,
                    nombreCurso: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Medicion.idMuestraMedicion, Medicion.enviado)}>{Medicion.nombreCurso}</div>,
                    codigoMuestra: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Medicion.idMuestraMedicion, Medicion.enviado)}>{Medicion.codigoMuestra}</div>,
                    idMuestraMedicion: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Medicion.idMuestraMedicion, Medicion.enviado)}><p className="estadoActivo ">Activo</p></div>,
                    enviado: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Medicion.idMuestraMedicion, Medicion.enviado)}>{Medicion.enviado == 1 ? <p className="estado2 ">Enviado</p> : <p className="estado3">Pendiente</p>}</div>,
                }))),
                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });

    }, [currentPage,flagCheckeo,flagBusqueda]);

    function handleCheckBoxChange(event) {

        event.target.checked = !event.target.checked;
        console.log()
        if (event.target.checked) {
            console.log("hola", event.target.id);
            dispatch(AddItem(event.target.id));
        } else {
            console.log("adios", event.target.id);
            dispatch(removeItem(event.target.id));
        }

        verificarCheck(event);
        console.log(datosGeneral.arregloSeleccion.length);
    }

    function verificarCheck(event) {
        if (datosGeneral.arregloSeleccion.includes(event.target.id)) {
            console.log("incluye");
            return true;
        } else return false;
    }

    const handleButtonFila = async (idEnviado, enviado) => {
        dispatch(addBanderaCargarMedicion(false));
        setTimeout(async () => {
            console.log("Galleta:");
            console.log(cookies.jwt);

            const config = {
              headers: { Authorization: 'Bearer ' + cookies.jwt }
            };
            const data = {
              idMuestraMedicion: idEnviado
            };
            console.log(idEnviado);
            setFlagEnviado(enviado);
            console.log("configuracion:");
            console.log(config);

            dispatch(addEnviadoGeneral(enviado));
            try {
              const respuesta = await axios.post("http://localhost:3050/api/muestraMedicion/mostrarDetalleMuestraMedicion", data, config);
              console.log("configuracion COMPETENCIAS:");
              console.log(respuesta.data);
              console.log(respuesta.data.data);
              console.log(respuesta.data.data[0]);
              console.log(respuesta.data.data[0].ciclo);
            setIdE(respuesta.data.data[0].fidEspecialidad)

            setMuestra(respuesta.data.data[0].codigoMuestra);


              dispatch(recibeDatosCompetencias(respuesta.data.data[0]));

              dispatch(addCiclo(respuesta.data.data[0].ciclo));
              dispatch(addCodigoEspacio(respuesta.data.data[0].codigoEspacio));
              dispatch(addCodigoMuestra(respuesta.data.data[0].codigoMuestra));
              dispatch(addNombreCurso(respuesta.data.data[0].nombreCurso));
              dispatch(addFechaInicio(respuesta.data.data[0].fechaInicio));
              dispatch(addFechaFin(respuesta.data.data[0].fechaFin));
              dispatch(addEnviado(respuesta.data.data[0].enviado));
              dispatch(addTipoMedicion(respuesta.data.data[0].tipoMedicion));

              dispatch(addIdMuestraMedicion(idEnviado));

              dispatch(recibeDatosCompetencias(respuesta.data.data[0].competencias));

              console.log(datosMedicion.ciclo);
              console.log(datosMedicion.codigoEspacio);
              console.log(datosMedicion.codigoMuestra);
              console.log(datosMedicion.nombreCurso);
              console.log(datosMedicion.fechaInicio);
              console.log(datosMedicion.fechaFin);
              console.log(datosMedicion.enviado);
              console.log(datosMedicion.tipoMedicion);
              console.log(datosMedicion.competencias);
            console.log(datosMedicion.competencias);
            } catch (error) {
              console.log(error);
            }

            props.cambiarComponente(true);
          },250);

    }


    // Estado para almacenar la página actual
    var [paginaActual, setPaginaActual] = useState(0);
    // Cantidad de elementos por página
    var elementosPorPagina = 10;

    // Función para cambiar el estado de selección de un elemento
    function cambiarSeleccion(id) {
        setElementos(elementos =>
            elementos.map(e => {
                if (e.id === id) {
                    return { ...e, seleccionado: !e.seleccionado };
                } else {
                    return e;
                }
            })
        );
    }

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

    const handleButtonImportar = () => {
        props.cambiarComponente(false);
        props.cambiarComponente2(false);
        props.cambiarComponente3(true);
    };
    const handleEnviarMediciones = async () => {
        // setColor("#FFFFFF");
        // setColorTexto("#000000");
        // props.cambiarComponente(true);

        setmostrarModal2(false);

        console.log(seleccionados);

        console.log("Galleta:")
        console.log(cookies.jwt)


        console.log("SEBITAS")

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        setSeleccionados([]);

        const fcopia = flagCheckeo;

        setFlagCheckeo(!fcopia);

        for (let i = 0; i < seleccionados.length; i++) {
            console.log(seleccionados[i]);
            const data = {
                idMuestraMedicion: seleccionados[i],
            }
            // console.log(datosAdmin.idAdmin)	
            console.log("aqui datos de admin final")
            console.log("configuracion:")
            console.log(config);

            try {
                const respuesta = await axios.post("http://localhost:3050/api/muestraMedicion/enviarMuestraMedicion2", data, config);

                console.log(respuesta.data);
                setFlagBusqueda(true);

            } catch (error) {
                console.log(error)
            }
        }

    };

    const handleModalCancelar = () => {
        setmostrarModal(false);
        setmostrarModal2(false);
        // setFlagActualizar(true);
    };

    const handleButtonEnviar = () => {

        setmostrarModal2(true);
    };




    const handleCambio = async (e) => {

        // console.log(textoBusqueda)
        setTextoBusqueda(e.target.value);
    }


    const obtenerNuevosDatos = (e) => {
        e.preventDefault();
        setFlagBusqueda(!flagBusqueda);
        console.log(flagBusqueda);
        console.log("FLAG");
        console.log("FLAG");
    }

    let toggleValue = useCallback((event, id) => {
        if (event.target.checked) {
            setSeleccionados(value => [...value, id])
        } else {
            setSeleccionados(value => value.filter(it => it !== id))
        }
    }, [setSeleccionados])
    console.log(seleccionados)

    return (

        <div className="contenedorTablaRMEM">
            <div className="barraSuperiorEM">
                <div className="contenedorBarraEM">
                    <form className="input-groupBuscar ">
                        <input className="inputRMEM form-controlBuscar" type="search" placeholder="Buscar por codigo o nombre espacio" aria-label="Buscar" onChange={handleCambio} value={textoBusqueda} />
                        <div className="input-group-appendBuscar m-0">
                            <button className="btn m-0 border-end border-top border-bottom borde-izquierdo-cuadrado" onClick={obtenerNuevosDatos}><i className="bi bi-search" ></i></button>
                        </div>
                    </form>
                </div>
                <div className="botonesSuperioresEM">
                    <div className="btnDivDisenio">
                    {/* style={seleccionados==[]?{backgroundColor:'blue'}:{backgroundColor:'red'}} */}
                        <button type="button" className="btnDisenio btnGuardarRMEM"  onClick={handleButtonEnviar} 
                        style={seleccionados.length == 0?{backgroundColor:'gray'}:{}}
                        disabled={seleccionados.length == 0?true:false} >
                            Enviar
                        </button>
                        <Modal show={mostrarModal2} onHide={handleModalCancelar}>
                            <Modal.Body >
                                <p>¿Está seguro que desea enviar las muestras de medicion seleccionados?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="botonModal btnDisenio botonCancelarGC" onClick={handleModalCancelar}>
                                    Cancelar</Button>
                                <Button className="botonModal btnDisenio botonAceptarGC" onClick={handleEnviarMediciones}>
                                    Aceptar</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
            <br />
            <p className="encontrLabel">Muestras de Medición Encontrados: {pageData.totalPassengers || "No hay resultados para su busqueda"}</p>
            <div className="espacioTabla">
                
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
                        <div className="contenedorTablaGC" style={{ width: "100%", height: "510px" }}>
                            <Table
                                columns={columns}
                                data={pageData.rowData}
                                isLoading={pageData.isLoading}
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
        </div>
    );
}
