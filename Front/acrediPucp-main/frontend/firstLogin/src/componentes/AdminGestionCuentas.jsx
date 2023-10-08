import "../HojasDeEstilo/AdminGestionCuentas.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/FormBuscar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import { Table } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addDatosCuenta, addRoles, addNombreCuenta, addApellidoPCuenta, addApellidoMCuenta, addFoto } from "../Redux/CuentaSlice";

import { Modal, Button } from 'react-bootstrap';
import { getData, columns, formatRowData } from "./DataUsuarios";
import Table from "./TablaCuentas";
import Pagination from "../componentes/pagination/pagination";
import { useLocalStorage } from './useLocalStorage';

export default function AdminGestionCuenta(props) {

    const [cookies, setCookie] = useCookies();
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [mostrarModal, setmostrarModal] = useState(false);
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);

    const [flagActualizar, setFlagActualizar] = useState(false);

    const [prueba, setPrueba] = useLocalStorage("idAdmin");
    const [textoBusqueda, setTextoBusqueda] = useState("");

    const [data, setData] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [flagCheckeo, setFlagCheckeo] = useState(false);


    /****************** REDUX********************** */
    const dispatch = useDispatch();
    const datosAdmin = useSelector((state) => state.Administrador);
    const datosCuenta = useSelector((state) => state.Cuenta);
    const datosGeneral = useSelector((state) => state.General);



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
            nombre_id: textoBusqueda,
            paginaSolicitar: currentPage,
        }
        //console.log("configuracion:")
        //console.log(config);

        //console.log(data);

        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Usuario } = info;

            setPageData({
                isLoading: false,
                rowData: (Usuario.map((Usuario) => ({
                    seleccion: <input
                        className="checkboxGC"
                        type="checkbox"
                        id={Usuario.idUsuario}
                        // checked={verificarCheck}
                        defaultChecked={seleccionados.includes(Usuario.idUsuario)}
                        // onChange={handleCheckBoxChange}
                        onChange={(e) => toggleValue(e, Usuario.idUsuario)}
                    />,
                    codigo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.codigoPUCP}</div>,
                    nombre: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.nombre}</div>,
                    correo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.correo}</div>,
                    estado: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.estado}</div>,
                }))),
                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });

    }, [currentPage]);

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
            nombre_id: textoBusqueda,
            paginaSolicitar: currentPage,
        }
        //console.log("configuracion:")
        //console.log(config);

        //console.log(data);

        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Usuario } = info;

            setPageData({
                isLoading: false,
                rowData: (Usuario.map((Usuario) => ({
                    seleccion: <input
                        className="checkboxGC"
                        type="checkbox"
                        id={Usuario.idUsuario}
                        // checked={verificarCheck}
                        defaultChecked={seleccionados.includes(Usuario.idUsuario)}
                        // onChange={handleCheckBoxChange}
                        onChange={(e) => toggleValue(e, Usuario.idUsuario)}
                    />,
                    estado: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.estado}</div>,
                    codigo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.codigoPUCP}</div>,
                    nombre: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.nombre}</div>,
                    correo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.correo}</div>,
                    estado: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.estado}</div>,
                }))),
                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });

    }, [flagActualizar]);

    const handleModalAceptarHabilitar = async () => {


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
            if (respuesta.data.success) {
                console.log(respuesta.data);
                toast.success('Usuario(s) habilitado(s) correctamente.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setmostrarModal2(false);
                props.cambiarComponente2(false);
                setFlagActualizar(!flagActualizar);
                // setCurrentPage(currentPage);
                // flagBusqueda=!flagBusqueda;
                // obtenerNuevosDatos();
                // const boton=document.getElementById("boton-buscar-gc");
                // boton.click();
                setSeleccionados([]);
            }
            else {
                toast.error(respuesta.data.error.message, {
                    position: "top-right",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }

        } catch (error) {
            toast.error('No hay conexión. Intente de nuevo.', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            console.log(error)
        }
    }

    const handleModalAceptarDeshabilitar = async () => {


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
            const respuesta = await axios.post("http://localhost:3050/api/usuario/deshabilitarUsuario", objetoJSON, config);
            if (respuesta.data.success) {
                toast.success('Usuario(s) deshabilitado(s) correctamente.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                console.log(respuesta.data);

                setmostrarModal(false);
                props.cambiarComponente2(false);
                setFlagActualizar(!flagActualizar);
                setSeleccionados([]);
                //setCurrentPage(currentPage);
                // flagBusqueda=!flagBusqueda;
                // obtenerNuevosDatos();
                // const boton=document.getElementById("boton-buscar-gc");
                // boton.click();
            }
            else {
                toast.error(respuesta.data.error.message, {
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

    const handleButtonFila = async (idEnviado) => {

        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            nombre_id: idEnviado
        }
        //console.log("AQUI ESTA EL ID ENVIADO")
        //console.log("AQUI ESTA EL ID ENVIADO")
        console.log(idEnviado);
        //console.log("AQUI ESTA EL ID ENVIADO")
        //console.log("AQUI ESTA EL ID ENVIADO")

        console.log("configuracion:")
        console.log(config);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/usuario/mostrarUsuario", data, config);
            console.log("VER DETALLE CUENTAAAAAAA")
            console.log(respuesta.data.usuario[0]);
            console.log(respuesta.data);
            console.log("VER DETALLE CUENTAAAAAAA")
            dispatch(addDatosCuenta(respuesta.data.usuario[0]));
            dispatch(addRoles(respuesta.data.perfiles));
            dispatch(addNombreCuenta(respuesta.data.usuario[0].nombres));
            dispatch(addApellidoPCuenta(respuesta.data.usuario[0].apellidoPaterno));
            dispatch(addApellidoMCuenta(respuesta.data.usuario[0].apellidoMaterno));
            dispatch(addFoto(respuesta.data.Foto));
            console.log("AQUI ES CUENTA");
            console.log(datosCuenta.nombreCuenta);

        } catch (error) {
            console.log(error)
        }

        props.cambiarComponente(false);
        props.cambiarComponente2(true);

    }

    useEffect(() => {

        console.log("AYUDA AYUDA FERNANDO  Y LOS JSP:")
        console.log(prueba)
        setPageData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: true,
        }));


        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            nombre_id: textoBusqueda,
        }
        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Usuario } = info;
            setCurrentPage(1)
            setPageData({
                isLoading: false,
                rowData: (Usuario.map((Usuario) => ({
                    seleccion: <input
                        className="checkboxGC"
                        type="checkbox"
                        id={Usuario.idUsuario}
                        defaultChecked={seleccionados.includes(Usuario.idUsuario)}
                        //checked={verificarCheck}
                        //onChange={handleCheckBoxChange(Usuario.idUsuario)}
                        onChange={(e) => toggleValue(e, Usuario.idUsuario)}

                    />,
                    codigo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.codigoPUCP}</div>,
                    nombre: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.nombre}</div>,
                    correo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.correo}</div>,
                    estado: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.estado}</div>,
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

    const handleButtonImportar = () => {
        props.cambiarComponente(false);
        props.cambiarComponente2(false);
        props.cambiarComponente3(true);
    };
    const handleButtonAñadir = () => {
        setColor("#FFFFFF");
        setColorTexto("#000000");
        props.cambiarComponente(true);
    };
    const handleButtonHabilitar = () => {
        setmostrarModal2(true);

    };
    const handleButtonDeshabilitar = () => {

        setmostrarModal(true);

    };
    const handleCambio = async (e) => {
        setTextoBusqueda(e.target.value);
    }

    const obtenerNuevosDatos = (e) => {
        e.preventDefault();
        setFlagBusqueda(!flagBusqueda);
        console.log(flagBusqueda);
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

        <div className="contenedorTablaGC">

            <div className="barraSuperiorGC">
                <div className="contenedorBarraGCA">
                    <form className="input-groupBuscar ">
                        <input className="form-controlBuscar" type="search" placeholder="Buscar por código o nombre" aria-label="Buscar" onChange={handleCambio} value={textoBusqueda} />
                        <div className="input-group-appendBuscar m-0">
                            <button className="btn m-0 border-end border-top border-bottom borde-izquierdo-cuadrado" id="boton-buscar-gc" onClick={obtenerNuevosDatos}><i className="bi bi-search" ></i></button>
                        </div>
                    </form>
                </div>
                <div className="contenedorBotonesConBusc">
                    <div className="btnDivDisenio">
                        <button className="btnAniadirGCA btnDisenio" onClick={handleButtonAñadir} >
                            Añadir
                        </button>
                    </div>
                    <div className="btnDivDisenio">
                        <button className="btnImportarGCA btnDisenio" type="button"
                            onClick={handleButtonImportar} >
                            Importar
                        </button>
                    </div>
                </div>
            </div>
            <br />
            <p className="encontrLabel">Cuentas Encontradas: {pageData.totalPassengers || "No hay resultados para su busqueda"}</p>
            <div className="espacioTablaGC">

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
                        <div className="contenedorTablaGC contTablaCuentas" style={{ width: "100%", height: "480px" }}>
                            <Table
                                className="tablaGC"
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
            {/* <button type="button" className="btnDisenio btnGuardarRMEM"  onClick={handleButtonEnviar} 
                        style={seleccionados.length == 0?{backgroundColor:'gray'}:{}}
                        disabled={seleccionados.length == 0?true:false} >
                            Enviar
                        </button> */}
            <div className="barraIntermediaGC">
                <div className="btnDivDisenio">
                    <button className="btnHabilitarGCA btnDisenio" type="button"
                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                        style={seleccionados.length == 0 ? { backgroundColor: 'gray' } : {}}
                        disabled={seleccionados.length == 0 ? true : false}
                        onClick={handleButtonHabilitar}
                    >
                        Habilitar
                    </button>
                    <Modal show={mostrarModal2} onHide={handleModalDeshabilitar}>
                        <Modal.Body >
                            <p>¿Está seguro que desea Habilitar los usuarios seleccionados?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="botonModal btnDisenio botonCancelarGC" onClick={handleModalCancelar}>
                                Cancelar</Button>
                            <Button className="botonModal btnDisenio botonAceptarGC" onClick={handleModalAceptarHabilitar}>
                                Aceptar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <div className="btnDivDisenio">
                    <button className="btnDeshabilitarGCA btnDisenio" type="button"
                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                        style={seleccionados.length == 0 ? { backgroundColor: 'gray' } : {}}
                        disabled={seleccionados.length == 0 ? true : false}
                        onClick={handleButtonDeshabilitar} >
                        Deshabilitar
                    </button>
                    <Modal show={mostrarModal} onHide={handleModalDeshabilitar}>
                        <Modal.Body >
                            <p>¿Está seguro que desea Deshabilitar los usuarios seleccionados?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" className="botonModal btnDisenio botonCancelarGC" onClick={handleModalCancelar}>
                                Cancelar</Button>
                            <Button className="botonModal btnDisenio botonAceptarGC" onClick={handleModalAceptarDeshabilitar}>
                                Aceptar</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div >
    );
}
