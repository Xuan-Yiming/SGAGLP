import '../HojasDeEstilo/ResEspeCompetencias.css';
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
import { getData, columns, formatRowData } from "./DataCompetencia";
import Table from "./TablaCuentas";
import Pagination from "../componentes/pagination/pagination";
import { addDatosIndicadores } from '../Redux/IndicadoresSlice';
import { addDatosCompetencias } from '../Redux/CompetenciasSlice';
import { addBanderaCargandoCompetencia } from '../Redux/CargandoSlice';
import ModalDragParametros from './ModalDragParametros';
import { useLocalStorage } from './useLocalStorage';
import { addIdEspecialidad } from "../Redux/CuentaSlice";
import { addIdAdmin } from "../Redux/AdministradorSlice";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResEspeCompetencias(props) {

    const [cookies, setCookie] = useCookies();
    const [openModal, setOpenModal] = useState(false);
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

    const dispatch = useDispatch();

    const datosCuenta = useSelector((state) => state.Cuenta);
    const [id, setId] = useLocalStorage("id");
    const [idU, setIdU] = useLocalStorage("idUsuario");
    var [elementos, setElementos] = useState([{}]);

    dispatch(addIdEspecialidad(id));
    dispatch(addIdAdmin(idU));

    useEffect(() => {
        let Indicador = {
            idIndicador: "",
            codigo: "",
            descripcion: "",
            rubricas: [],
            Indicadores: []
        };
        dispatch(addDatosIndicadores(Indicador));
        let Competencia = {
            idCompetencia: "",
            codigoCompetencia: "",
            descripcion: "",
            evidencia: ""
        };
        dispatch(addDatosCompetencias(Competencia));

        dispatch(addIdEspecialidad(id));
        dispatch(addIdAdmin(idU));
    }, []);

    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
        totalPages: 0,
        totalPassengers: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        dispatch(addIdEspecialidad(id));
        dispatch(addIdAdmin(idU));

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
            codigoCompetencia: textoBusqueda,
            fidEspecialidad: datosCuenta.idEspecialidad,
            paginaSolicitar: currentPage,
        }
        //console.log("configuracion:")
        //console.log(config);

        //console.log(data);

        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Competencia } = info;
            setPageData({
                isLoading: false,
                rowData: (Competencia.map((Competencia) => ({
                    seleccion: <input
                        className="checkboxREC"
                        type="checkbox"
                        id={Competencia.idCompetencia}
                        // checked={verificarCheck}
                        // checked={checkboxesMarcados[index] || false}

                        defaultChecked={seleccionados.includes(Competencia.idCompetencia)}
                        // onChange={handleCheckBoxChange}
                        onChange={(e) => toggleValue(e, Competencia.idCompetencia)}
                    />,
                    codigo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Competencia.idCompetencia, Competencia)}>{Competencia.codigoCompetencia}</div>,
                    descripcion: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Competencia.idCompetencia, Competencia)}>{Competencia.descripcion}</div>,
                    creadopor: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Competencia.idCompetencia, Competencia)}>{Competencia.usuarioCreacion}</div>,
                    // estado: <div className="seleccionableGC" onClick={() => handleButtonFila(Competencia.idCompetencia, Competencia)}>{Competencia.activo === 1 ? "Activo" : "Inactivo"}</div>,
                }))),

                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });

    }, [flagActualizar, currentPage]);

    useEffect(() => {
        dispatch(addIdEspecialidad(id));
        dispatch(addIdAdmin(idU));

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
            codigoCompetencia: textoBusqueda,
            fidEspecialidad: datosCuenta.idEspecialidad,
            paginaSolicitar: currentPage,
        }
        //console.log("configuracion:")
        //console.log(config);

        //console.log(data);

        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Competencia } = info;
            setCurrentPage(1)
            setPageData({
                isLoading: false,
                rowData: (Competencia.map((Competencia) => ({
                    seleccion: <input
                        className="checkboxREC"
                        type="checkbox"
                        id={Competencia.idCompetencia}
                        // checked={verificarCheck}
                        //  checked={checkboxesMarcados[index] || false}
                        defaultChecked={seleccionados.includes(Competencia.idCompetencia)}
                        // onChange={handleCheckBoxChange}
                        onChange={(e) => toggleValue(e, Competencia.idCompetencia)}
                    />,
                    codigo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Competencia.idCompetencia, Competencia)}>{Competencia.codigoCompetencia}</div>,
                    descripcion: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Competencia.idCompetencia, Competencia)}>{Competencia.descripcion}</div>,
                    creadopor: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Competencia.idCompetencia, Competencia)}>{Competencia.usuarioCreacion}</div>,
                    // estado: <div className="seleccionableGC" onClick={() => handleButtonFila(Competencia.idCompetencia, Competencia)}>{Competencia.activo === 1 ? "Activo" : "Inactivo"}</div>,
                }))),

                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });

    }, [flagBusqueda]);
    dispatch(addIdEspecialidad(id));
    dispatch(addIdAdmin(idU));
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
            const respuesta = await axios.post("http://localhost:3050/api/competencia/deshabilitarCompetencias", objetoJSON, config);

            console.log(respuesta.data);

            setmostrarModal(false);
            setFlagActualizar(true);
            if (respuesta.data.success) {
                toast.success('Competencia(s) eliminada(s) correctamente.', {
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
        setFlagBusqueda(!flagBusqueda);
        setSeleccionados([]);
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

    const handleButtonFila = async (idEnviado, Competencia) => {
        console.log("LA INFO DE COMPETENCIA ANTES DE ENVIAR AL REDUX");
        console.log(Competencia);
        console.log("LA INFO DE COMPETENCIA ANTES DE ENVIAR AL REDUX");
        dispatch(addDatosCompetencias(Competencia));
        dispatch(addBanderaCargandoCompetencia(false));
        setTimeout(async () => {
        props.cambiarComponente(false);
        props.cambiarComponente2(false);
        props.cambiarComponente3(true);
    },500);

    }
    dispatch(addIdEspecialidad(id));
    dispatch(addIdAdmin(idU));
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


    const verificaExistenciaParametros=async()=>{
        
      const config = {
          headers: { Authorization: 'Bearer ' + cookies.jwt }
      }


      //console.log("ESTE ES EL ID ENVIADO " + idEnviado);
      const data = {
              idEspecialidad:id
      }
      //console.log("configuracion:")
      //console.log(config);

      console.log("data:")
      console.log(data);

      //await funcionTry(data,config,posicion);
      var errorMessage = "";
      var mensajeCompleto = "";

      try {
          const respuesta = await axios.post("http://localhost:3050/api/especialidad/verificarParametrosExistentes", data, config);
        console.log("VERIFICANDO")
          console.log(respuesta.data)
          
          if (respuesta.data.success) {
              
             setColor("#FFFFFF");
             setColorTexto("#000000");
             props.cambiarComponente(true);
          } else {
              errorMessage = respuesta.data.error.message;
              mensajeCompleto = "Error: " + errorMessage+ " Configúrelos para poder continuar";
              //setmostrarModal2(true);
              toast.error(mensajeCompleto, {
                  position: "top-right",
                  autoClose: false,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
              });
              console.log("AQUI NO ACEPTA");
          }
          // console.log("configuracion:")
          // setDatosTablaMedcion(respuesta.data.data);
             console.log("DUPLICADO GA")
          console.log(respuesta.data)
          //   setIndicadores(respuesta.data.data)
          //  await pushear(respuesta.data.data)
          


          // setBanderaCI(true);
      } catch (error) {
          //console.log(error)
      }
  


    }


    const handleButtonAñadir = () => {
        verificaExistenciaParametros()


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

    const handleParametros = () => {
        setOpenModal(true);
    }
    dispatch(addIdEspecialidad(id));
    dispatch(addIdAdmin(idU));

    return (

        <div className="contenedorTablaEC">
            
            <div className="barraSuperiorC">
                <form className="input-groupBuscar">
                    <input className="form-controlBuscar" type="search" placeholder="Buscar por código o nombre de competencia" aria-label="Buscar" onChange={handleCambio} value={textoBusqueda} />
                    <div className="input-group-appendBuscar m-0">
                        <button className="btn m-0 border-end border-top border-bottom borde-izquierdo-cuadrado" onClick={obtenerNuevosDatos}><i className="bi bi-search" ></i></button>
                    </div>
                </form>
                <div className="contenedorBotonesConBusc">
                    <div className="btnDivDisenio">
                        <button type="button" className='btnAniadirC btnDisenio' onClick={handleButtonAñadir}>
                            Añadir</button>
                    </div>
                    <div className="btnDivDisenio">
                        <button type="button" className="btnDeshabilitarC btnDisenio" /*disabled={deshabilitado} style={{ borderWidth: '0px', backgroundColor: botonColor }}*/
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                            style={seleccionados.length == 0?{backgroundColor:'gray'}:{}}
                            disabled={seleccionados.length == 0?true:false}
                            onClick={handleButtonDeshabilitar} >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
            <br></br>
            <div className="contenedorCentralC">
                {/* Tones la tabla aqui */}

            </div>
            <div className='contAlignCenter'> 
            <p className="encontrLabel">Competencias Encontradas: {pageData.totalPassengers || "No hay resultados para su busqueda"}</p></div>
            <div className="espacioTabla">
                {/*<div className="botonesSupIzquierdaC ">
                    <div className="btnDivDisenio botonesSupIzquierdaC" >
                        <button onClick={handleParametros} className='btnParametrosC btnDisenio' style={{ backgroundColor: "#042354" }}>Parámetros</button>
                    </div>
    </div>*/}
                

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
                            <p>¿Está seguro que desea eliminar las competencias seleccionadas?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" className="botonCancelarDC botonModal btnDisenio " onClick={handleModalCancelar}>
                                Cancelar</Button>
                            <Button className="botonModal btnDisenio  botonAceptarDC" onClick={handleModalAceptarDeshabilitar}>
                                Aceptar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            {openModal && <ModalDragParametros closeModal={setOpenModal} />}


        </div>
    );
}
