import "../HojasDeEstilo/AdminGestionCuentas.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/FormBuscar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import { Table } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addDatosCuenta, addRoles, addNombreCuenta, addApellidoPCuenta, addApellidoMCuenta, addFoto } from "../Redux/CuentaSlice";

import { Modal, Button } from 'react-bootstrap';
import { getData, columns, formatRowData } from "./DataUsuarios";
import Table from "./TablaCuentas";
import { addDatosResponsablePlanMejora,addResponsablesPlanMejora } from '../Redux/ResponsablePlanMejoraSlice';
import { addDatosActividades } from '../Redux/ActividadesSlice';
import Pagination from "../componentes/pagination/pagination";

export default function ResEspeAniadirResPlanMejora(props) {

    let valor;
    const [cookies, setCookie] = useCookies();
    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [mostrarModal, setmostrarModal] = useState(false);
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);

    const [flagActualizar, setFlagActualizar] = useState(false);

    const [seleccionado, setSeleccionado] = useState(null);
    const [textoBusqueda, setTextoBusqueda] = useState("");

    const [data, setData] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [flagCheckeo, setFlagCheckeo] = useState(false);

    /****************** REDUX********************** */
    const dispatch = useDispatch();
    const datosAdmin = useSelector((state) => state.Administrador);
    const datosCuenta = useSelector((state) => state.Cuenta);
    const datosGeneral = useSelector((state) => state.General);

    const datosResponsablePlanMejora = useSelector((state) => state.ResponsablePlanMejora);
    const [usuariosID, setUsuariosID] = useState([]);
    const datosActividad = useSelector((state) => state.Actividades);
    console.log("datosFacultad")
    console.log(datosResponsablePlanMejora)
    console.log("datosActividad")
    console.log(datosActividad)

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
                    seleccion: 
                        <input
                            className="radioGC"
                            type="radio"
                            name="seleccionUsuario"
                            id={Usuario.idUsuario}
                            defaultChecked={seleccionado?(seleccionado.idUsuario === Usuario.idUsuario):(false)}
                            onChange={(e) => setSeleccionado(Usuario)}
                        />
                    ,
                    codigo: <div className="seleccionableGC miTabla" >{Usuario.codigoPUCP}</div>,
                    nombre: <div className="seleccionableGC miTabla" >{Usuario.nombre}</div>,
                    correo: <div className="seleccionableGC miTabla" >{Usuario.correo}</div>,
                    estado: <div className="seleccionableGC miTabla" >{Usuario.estado}</div>,
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
                    seleccion: 
                        <input
                            className="radioGC"
                            type="radio"
                            name="seleccionUsuario"
                            id={Usuario.idUsuario}
                            checked={seleccionado.idUsuario === Usuario.idUsuario}
                            onChange={(e) => setSeleccionado(Usuario)}
                        />
                    ,
                    estado: <div className="seleccionableGC miTabla" >{Usuario.estado}</div>,
                    codigo: <div className="seleccionableGC miTabla" >{Usuario.codigoPUCP}</div>,
                    nombre: <div className="seleccionableGC miTabla" >{Usuario.nombre}</div>,
                    correo: <div className="seleccionableGC miTabla" >{Usuario.correo}</div>,
                    estado: <div className="seleccionableGC miTabla" >{Usuario.estado}</div>,
                }))),
                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });

    }, [flagActualizar]);
    useEffect(() => {
        console.log("Aca es seleccionado:")
        console.log(seleccionado)

    }, [seleccionado]);
    const handleModalAceptar = async () => {
        console.log("datosActividad.banderaVerActividad")
        console.log(datosActividad.banderaVerActividad)
        if (datosActividad.banderaVerActividad) {
            setmostrarModal(false);
            /*
            var nuevosResponsablesFacultad = []
            if(datosResponsableFacultad.ResponsablesFacultad.length !== 0){
                nuevosResponsablesFacultad.push(...datosResponsableFacultad.ResponsablesFacultad);
            }
            nuevosResponsablesFacultad.push(...seleccionados);
            */
            let ResponsablesPlanMejora = {
                ResponsablePlanMejora:seleccionado,
            }
            console.log(ResponsablesPlanMejora)
            dispatch(addResponsablesPlanMejora(ResponsablesPlanMejora));
            console.log(datosResponsablePlanMejora)
            console.log("Antes los datos son datosResponsablePlanMejora")
            //console.log(nuevosResponsablesFacultad);
            props.cambiarComponentePlanMejora8(false);
            props.cambiarComponentePlanMejora6(true);
        } else {
            setmostrarModal(false);
            /*
            var nuevosResponsablesFacultad = []
            if(datosResponsableFacultad.ResponsablesFacultad.length !== 0){
                nuevosResponsablesFacultad.push(...datosResponsableFacultad.ResponsablesFacultad);
            }
            nuevosResponsablesFacultad.push(...seleccionados);
            */
            let ResponsablesPlanMejora = {
                ResponsablePlanMejora:seleccionado,
            }
            dispatch(addResponsablesPlanMejora(ResponsablesPlanMejora));
            console.log(datosResponsablePlanMejora)
            console.log("Antes los datos son datosResponsablePlanMejora")
            //console.log(nuevosResponsablesFacultad);
            props.cambiarComponentePlanMejora8(false);
            props.cambiarComponentePlanMejora3(true);
        }
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
    const handleButtonGuardar = () => {
        setColor("#042354");

        valor = validarCampos();
        if (valor) {
            setmostrarModal(true);
        } else {
            setmostrarModal(false);
        }
    };
    const validarCampos = (valorCodigo, valorDescripcion) => {
        if (valorDescripcion !== '') {
            setBotonHabilitado(true);
            valor = 1;
        } else {
            setBotonHabilitado(false);
            valor = 0;
        }
        return valor;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
    };

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
            nombre_id: textoBusqueda,
        }
        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Usuario } = info;
            setCurrentPage(1)
            setPageData({
                isLoading: false,
                rowData: (Usuario.map((Usuario) => ({
                    seleccion: 
                        <input
                            className="radioGC"
                            type="radio"
                            name="seleccionUsuario"
                            id={Usuario.idUsuario}
                            checked={seleccionado.idUsuario === Usuario.idUsuario}
                            onChange={(e) => setSeleccionado(Usuario)}
                        />
                    ,
                    codigo: <div className="seleccionableGC miTabla" >{Usuario.codigoPUCP}</div>,
                    nombre: <div className="seleccionableGC miTabla" >{Usuario.nombre}</div>,
                    correo: <div className="seleccionableGC miTabla" >{Usuario.correo}</div>,
                    estado: <div className="seleccionableGC miTabla" >{Usuario.estado}</div>,
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

    let toggleValue = useCallback((event,idResponsable, codigoResponsable, nombreResponsable, correoResponsable) => {
        if (event.target.checked) {
            setSeleccionados(value => [...value, { idResponsable, codigoResponsable, nombreResponsable, correoResponsable }])
            setUsuariosID(prevUsuariosID => [...prevUsuariosID, idResponsable]);
        } else {
            setSeleccionados(value => value.filter(it => it.idResponsable !== idResponsable))
            setUsuariosID(prevUsuariosID => prevUsuariosID.filter((id) => id !== idResponsable));
        }
    }, [setSeleccionados])
    console.log(seleccionado)
    return (

        <div className="contenedorTablaGC">
            <br></br>
            <div className="barraSuperiorGC">
                <div className="contenedorBarraGCA">
                    <form className="input-groupBuscar ">
                        <input className="form-controlBuscar" type="search" placeholder="Buscar por código o nombre" aria-label="Buscar" onChange={handleCambio} value={textoBusqueda} />
                        <div className="input-group-appendBuscar m-0">
                            <button className="btn m-0 border-end border-top border-bottom borde-izquierdo-cuadrado" id="boton-buscar-gc" onClick={obtenerNuevosDatos}><i className="bi bi-search" ></i></button>
                        </div>
                    </form>
                </div>
                <div className="contenedor-guardarAARF">
                    <div className="btnDivDisenio">
                        <button className="btnDisenio btnGuardarAARF" type="button" onClick={handleButtonGuardar} style={{ background: "#042354" }}>
                            Agregar</button>
                    </div>
                </div>
            </div>
            <br />

            <div className="espacioTablaGC">
                <p>Cuentas Encontradas: {pageData.totalPassengers || "No hay resultados para su busqueda"}</p>
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
                        <div className="contenedorTablaGC" style={{ width: "100%", height: "480px" }}>
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
            <form onSubmit={handleSubmit} className="contDatosAARF">
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea añadir los responsables seleccionados?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" className="botonModal btnDisenio botonCancelarAARF" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarAARF" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
            </form>
           
        </div >
    );
}
