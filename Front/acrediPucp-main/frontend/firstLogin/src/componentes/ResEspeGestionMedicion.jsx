import "../HojasDeEstilo/ResEspeGestionMedicion.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/FormBuscar.css";
// import { Table } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';
import { addDatosMedicion, addDatosEspacio } from '../Redux/MedicionResEspeSlice';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addDatosIndicadores, addDatosIndicador, addDatosListaIndicadores } from '../Redux/MedicionResEspeSlice';
import { addDatosPrograma, recibeDatosEspacios, addCompletada, addCodigoMedicion, addFechaCreacion, addCicloInicio, addCicloFin, addIdCicloInicio, addIdCicloFin, addIdMedicion } from "../Redux/ProgramaSlice";
import { resetMedicion } from '../Redux/MedicionResEspeSlice'
import { Modal, Button } from 'react-bootstrap';
import { getData, columns, formatRowData } from "./DataPrograma";
import Table from "./TablaCuentas";
import Pagination from "../componentes/pagination/pagination";
import ModalDragDuplicado from './ModalDragDuplicado';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResEspeGestionMedicion(props) {
    let valor;
    const [cookies, setCookie] = useCookies();
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [mostrarModal, setmostrarModal] = useState(false);
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);
    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [colorBotonEliminar, setColorBotonEliminar] = useState("#ADADAD");
    const [colorBotonDuplicar, setColorBotonDuplicar] = useState("#ADADAD");
    const [flagActualizar, setFlagActualizar] = useState(false);
    const [editable,setEditable]=useState(true);
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [idM,setIdM]=useState("")

    const [data, setData] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [verificarMismo, setVerificarMismo] = useState([]);
    const [flagCheckeo, setFlagCheckeo] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    const datosCuenta = useSelector((state) => state.Cuenta);

    var [elementos, setElementos] = useState([{}]);

    useEffect(() => {

        
        if(seleccionados.length===1){
            console.log("SELECCIONADOS")
            console.log(seleccionados)
            console.log("mismo")
            console.log(verificarMismo)
            console.log("mismo")
            setEditable(false)
            setColorBotonDuplicar("#042354")
        }else{
            setEditable(true)
            setColorBotonDuplicar("#ADADAD")

        }

        if (seleccionados.length > 0) {
            setColorBotonEliminar("#9E0520"); // Cambia el color del botón a azul si está seleccionado   
        }else{
            setColorBotonEliminar("#ADADAD");
        }
    }, [seleccionados]);

    useEffect(() => {
        let Medicion = {
            codigoMedicion: "",
            cicloInicio: "",
            cicloFin: "",
        };
        dispatch(addDatosMedicion(Medicion));
        dispatch(addDatosEspacio([]));
        dispatch(addDatosListaIndicadores([]));
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
        console.log("Galleta2:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            fidEspecialidad: datosCuenta.idEspecialidad,
            codigo: textoBusqueda,
            paginaSolicitar: currentPage,
        }
        //console.log("configuracion:")
        //console.log(config);

        //console.log(data);

        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Programa } = info;

            setPageData({
                isLoading: false,
                rowData: (Programa.map((Programa) => ({
                    seleccion: <input
                        className="checkboxGM"
                        type="checkbox"
                        id={Programa.idMedicion}
                        // checked={verificarCheck}
                        defaultChecked={seleccionados.includes(Programa.idMedicion)}
                        // onChange={handleCheckBoxChange}
                        onChange={(e) => toggleValue(e, Programa.idMedicion, Programa.mismoCiclo)}
                    />,
                    codigo: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Programa.idMedicion)}>{Programa.codigoMedicion}</div>,
                    cicloinicio: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Programa.idMedicion)}>{Programa.cicloInicio}</div>,
                    ciclofin: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Programa.idMedicion)}>{Programa.cicloFin}</div>,
                    creadopor: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Programa.idMedicion)}>{Programa.usuarioCreacion}</div>,
                    fechacreacion: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Programa.idMedicion)}>{Programa.fechaCreacion.substr(8, 2) + "/" + Programa.fechaCreacion.substr(5, 2) + "/" + Programa.fechaCreacion.substr(0, 4)}</div>,
                }))),
                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });

    }, [currentPage, flagActualizar]);

    const validarCampos = () => {
        if (seleccionados.length > 0) {
            setBotonHabilitado(true);
            valor = 1;
        } else {
            setBotonHabilitado(false);
            valor = 0;
        }
        return valor;
    };

    const handleModalAceptarHabilitar = async () => {
        /* Sin implmentar no creo q se tenga q
    
    
        console.log("Galleta:")
        console.log(cookies.jwt)
    
        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
    
        const data = new Set(seleccionados);
        const objetoJSON = {};
    
        data.forEach(id => {
            objetoJSON[id] = true;
        });
    
        console.log("valores json");
        console.log(objetoJSON);
    
        try {
            const respuesta = await axios.post("http://localhost:3050/api/usuario/habilitarUsuario", objetoJSON, config);
    
            console.log(respuesta.data);
    
            setmostrarModal2(false);
            props.cambiarComponente2(false);
            setFlagActualizar(!flagActualizar);
            // setCurrentPage(currentPage);
            // flagBusqueda=!flagBusqueda;
            // obtenerNuevosDatos();
            // const boton=document.getElementById("boton-buscar-gc");
            // boton.click();
    
    
        } catch (error) {
    
            console.log(error)
        }
        */
    }

    const handleModalAceptarEliminar = async () => {


        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = new Set(seleccionados);
        const objetoJSON = {};

        data.forEach(id => {
            objetoJSON[id] = true;
        });

        console.log("valores json");
        console.log(objetoJSON);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/medicion/deshabilitarMedicion", objetoJSON, config);

            console.log(respuesta.data);

            setmostrarModal(false);
            //props.cambiarComponente2(false);
            setFlagActualizar(!flagActualizar);
            //setCurrentPage(currentPage);
            // flagBusqueda=!flagBusqueda;
            // obtenerNuevosDatos();
            // const boton=document.getElementById("boton-buscar-gc");
            // boton.click();
            if (respuesta.data.success) {
                toast.success('Medición(es) eliminada(s) correctamente.', {
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


    const handleModalEliminar = () => {

    }

    const handleButtonFila = async (idEnviado) => {

        //console.log("Galleta:")
        //console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            idMedicion: idEnviado
        }
        console.log(idEnviado);

        console.log("configuracion:")
        console.log(config);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/medicion/mostrarDetalleMedicion", data, config);

            dispatch(addCompletada(respuesta.data.data[0].completada));
            dispatch(addCodigoMedicion(respuesta.data.data[0].codigoMedicion));
            dispatch(addFechaCreacion(respuesta.data.data[0].fechaCreacion));
            dispatch(addCicloInicio(respuesta.data.data[0].cicloInicio));
            dispatch(addCicloFin(respuesta.data.data[0].cicloFin));
            dispatch(addIdCicloInicio(respuesta.data.data[0].fidCicloInicio));
            dispatch(addIdCicloFin(respuesta.data.data[0].fidCicloFin));

            dispatch(addIdMedicion(idEnviado));

            dispatch(recibeDatosEspacios(respuesta.data.data[0].espacios));

        } catch (error) {
            console.log(error)
        }

        props.cambiarComponenteMedicion1(false);
        props.cambiarComponenteMedicion2(false);
        props.cambiarComponenteMedicion3(false);
        props.cambiarComponenteMedicion4(true);
        props.cambiarComponenteMedicion5(false);
        props.cambiarComponenteMedicion6(false);

    }

    useEffect(() => {
        setPageData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: true,
        }));
        console.log("Galleta1:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            fidEspecialidad: datosCuenta.idEspecialidad,
            codigo: textoBusqueda,
        }
        //console.log("configuracion:")
        //console.log(config);

        //console.log(data);

        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Programa } = info;
            setCurrentPage(1);
            setPageData({
                isLoading: false,
                rowData: (Programa.map((Programa) => ({
                    seleccion: <input
                        className="checkboxGM"
                        type="checkbox"
                        id={Programa.idMedicion}
                        // checked={verificarCheck}
                        defaultChecked={seleccionados.includes(Programa.idMedicion)}
                        // onChange={handleCheckBoxChange}
                        onChange={(e) => toggleValue(e, Programa.idMedicion, Programa.mismoCiclo)}
                    />,
                    codigo: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Programa.idMedicion)}>{Programa.codigoMedicion}</div>,
                    cicloinicio: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Programa.idMedicion)}>{Programa.cicloInicio}</div>,
                    ciclofin: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Programa.idMedicion)}>{Programa.cicloFin}</div>,
                    creadopor: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Programa.idMedicion)}>{Programa.usuarioCreacion}</div>,
                    fechacreacion: <div className="seleccionableGM miTabla" onClick={() => handleButtonFila(Programa.idMedicion)}>{Programa.fechaCreacion.substr(8, 2) + "/" + Programa.fechaCreacion.substr(5, 2) + "/" + Programa.fechaCreacion.substr(0, 4)}</div>,
                }))),
                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });

    }, [flagBusqueda]);


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
        dispatch(resetMedicion());
        props.cambiarComponenteMedicion1(true);
        props.cambiarComponenteMedicion2(false);
        props.cambiarComponenteMedicion3(false);
    };

    const handleButtonDuplicar = async () => {
        setIdM(seleccionados[0])
       setOpenModal(true)

    };
    const handleCambio = async (e) => {
        setTextoBusqueda(e.target.value);
    }


    const obtenerNuevosDatos = (e) => {
        e.preventDefault();
        setFlagBusqueda(!flagBusqueda);
        console.log(flagBusqueda);
    }

    let toggleValue = useCallback((event, id, mismoCiclo) => {
        if (event.target.checked) {
            setSeleccionados(value => [...value, id])
            setVerificarMismo(value => [...value, mismoCiclo])
        } else {
            setSeleccionados(value => value.filter(it => it !== id))
            setVerificarMismo(value => value.filter(it => it !== mismoCiclo))
        }
    }, [setSeleccionados])
    //console.log(seleccionados)

    const handleButtonEliminar = async () => {

        valor = validarCampos();
        if (valor) {
            setmostrarModal(true);
        } else {
            setmostrarModal(false);
        }

    };


    return (

        <div className="contenedorTablaGM">
            
            <div className="barraSuperiorGM">
                <div className="contenedorBarraGM">
                    <form className="input-groupBuscar ">
                        <input className="form-controlBuscar" type="search" placeholder="Buscar por código o nombre de creador" aria-label="Buscar" onChange={handleCambio} value={textoBusqueda} />
                        <div className="input-group-appendBuscar m-0">
                            <button className="btn m-0 border-end border-top border-bottom borde-izquierdo-cuadrado" id="boton-buscar-gc" onClick={obtenerNuevosDatos}><i className="bi bi-search" ></i></button>
                        </div>
                    </form>
                </div>
                <div className="contenedorBotonesConBusc">
                    <div className="btnDivDisenio">
                        <button type="button" className="btnDisenio btnAniadirGM " onClick={handleButtonDuplicar} disabled={editable} style={{ background: colorBotonDuplicar }}>
                            Duplicar
                        </button>
                    </div>
                    <div className="btnDivDisenio">
                        <button type="button" className="btnDisenio btnAniadirGM " onClick={handleButtonAñadir} >
                            Añadir
                        </button>
                    </div>
                    <div className="btnDivDisenio">
                        <button type="button" className="btnEliminarGM btnDisenio"
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                            onClick={handleButtonEliminar} style={{ background: colorBotonEliminar }}>
                            Eliminar
                        </button>
                        <Modal show={mostrarModal} onHide={handleModalEliminar}>
                            <Modal.Body >
                                <p>¿Está seguro que desea deshabilitar los programas de medicion seleccionados?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="button" className="botonCancelarGM btn btn-danger" onClick={handleModalCancelar}>
                                    Cancelar</Button>
                                <Button className="botonAceptarGM" onClick={handleModalAceptarEliminar}>
                                    Aceptar</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
            <br />
            <p className="encontrLabel">Programas de medición encontrados: {pageData.totalPassengers || "No hay resultados para su busqueda"}</p>
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
                        <div className="contenedorTablaGM" style={{ width: "100%", height: "510px" }}>
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
                {openModal && <ModalDragDuplicado closeModal={setOpenModal} idMedicion={idM} repetido={verificarMismo} actualiza={setFlagActualizar} item={flagActualizar}/>}
        </div >
    );
}
