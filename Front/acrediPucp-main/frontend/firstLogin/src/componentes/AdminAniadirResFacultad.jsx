import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../HojasDeEstilo/AdminAniadirResFacultad.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/FormBuscar.css";
import "../HojasDeEstilo/Reusable/InputValidacion.css";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from 'react-redux';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import { getData, columns, formatRowData } from "./DataRespFacultad";
import Table from "./TablaCuentas";
import { addDatosIndicadores } from '../Redux/IndicadoresSlice';
import { addBanderaIndicador } from '../Redux/IndicadoresSlice';
import { addDatosCompetencias } from '../Redux/CompetenciasSlice';
import axios from 'axios';
import Pagination from "../componentes/pagination/pagination";
import { useDispatch } from "react-redux";
import { faArrowsLeftRightToLine } from '@fortawesome/free-solid-svg-icons';

import { addDatosResponsableFacultad } from '../Redux/ResponsableFacultadSlice';
import { addDatosAsistenteFacultad } from '../Redux/AsistenteFacultadSlice';

export default function AdminAniadirResFacultad(props) {

    let valor;
    const [cookies, setCookie] = useCookies();
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [evidencia, setEvidencia] = useState('');
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [mostrarModal, setmostrarModal] = useState(false);
    const [mostrarModa2, setmostrarModal2] = useState(false);
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [seleccionados, setSeleccionados] = useState([]);
    const [editable, setEditable] = useState(false);
    const [cambioCompetencia, setCambioCompetencia] = useState(0);
    const [flagActualizar, setFlagActualizar] = useState(false);
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const datosResponsableFacultad = useSelector((state) => state.ResponsableFacultad);
    const datosAsistenteFacultad = useSelector((state) => state.AsistenteFacultad);
    const [usuariosID, setUsuariosID] = useState([]);
    const datosFacultad = useSelector((state) => state.Facultad);
    const datosCuenta = useSelector((state) => state.Cuenta);
    const [textoaviso, setTextoaviso] = useState("");
    const [colorBoton, setColorBoton] = useState("#042354");
    const dispatch = useDispatch();

    const arregloIds = [];
    for (let i = 0; i < datosResponsableFacultad.ResponsablesFacultad.length; i++) {
        arregloIds.push(datosResponsableFacultad.ResponsablesFacultad[i].idResponsable);
    }
    for (let i = 0; i < datosAsistenteFacultad.AsistentesFacultad.length; i++) {
        arregloIds.push(datosAsistenteFacultad.AsistentesFacultad[i].idAsistente);
    }
    /*
    if(datosCuenta.idFacultad == null){
        datosCuenta.idFacultad = 0;
    }
    */
    /******************FIN DEL REDUX********************** */

    var [elementos, setElementos] = useState([{}]);

    useEffect(() => {
        if (seleccionados.length > 0) {
            setColorBoton("#042354"); // Cambia el color del botón a azul si está seleccionado
            setTextoaviso("");
        }else{
            setColorBoton("#ADADAD");
            setTextoaviso("Seleccione al menos un Responsable");
        }
    }, [seleccionados]);


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
            idFacultad: datosFacultad.idFacultad,
            idUsuarios: arregloIds,
            codigo: textoBusqueda,
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
                        type="checkbox"
                        className="checkboxGC"
                        id={Usuario.idUsuario}

                        //value={Usuario.idUsuario}
                        defaultChecked={usuariosID.includes(Usuario.idUsuario)}
                        onChange={(e) => toggleValue(e, Usuario.idUsuario, Usuario.codigo, Usuario.nombreCompleto, Usuario.correo)}
                    />,
                    codigo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.codigo}</div>,
                    nombreCompleto: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.nombreCompleto}</div>,
                    correo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.correo}</div>,
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
            idFacultad: datosFacultad.idFacultad,
            idUsuarios: arregloIds,
            codigo: textoBusqueda,
            paginaSolicitar: currentPage,
        }
        //console.log("configuracion:")
        console.log("DATAAAAAAAAAAA IWI");
        console.log(data);

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
                        defaultChecked={usuariosID.includes(Usuario.idUsuario)}
                        // onChange={handleCheckBoxChange}
                        onChange={(e) => toggleValue(e, Usuario.idUsuario, Usuario.codigo, Usuario.nombreCompleto, Usuario.correo)}
                    />,
                    codigo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.codigo}</div>,
                    nombreCompleto: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.nombreCompleto}</div>,
                    correo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.correo}</div>,
                }))),
                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });

    }, [flagActualizar]);


    const handleButtonEliminar = () => {
        setmostrarModal2(true);
    };
    const handleModalAceptarEliminar = async () => {
        /* */
    };
    const handleModalCloseEliminar = () => {
        setmostrarModal2(false);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const handleChangeCodigo = (event) => {
        setCodigo(event.target.value);
        validarCampos(codigo, descripcion, evidencia);
    };

    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
        validarCampos(codigo, descripcion, evidencia);
    };

    const handleChangeEvidencia = (event) => {
        setEvidencia(event.target.value);
        validarCampos(codigo, descripcion, evidencia);
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

    const handleModalClose = () => {
        setmostrarModal(false);
        setEditable(false);
        /*
        setDescripcion(datosCompetencia.descripcionCompetencia);
        setEvidencia(datosCompetencia.evidenciaCompetencia);*/
    };
    const handleModalAceptar = async () => {
        if (datosFacultad.banderaVerFacu) {
            const config = {
                headers: { Authorization: 'Bearer ' + cookies.jwt }
            }
            const data = {
                idFacultad: datosFacultad.idFacultad,
                Responsables: usuariosID
            }
            console.log("data")
            console.log(data)
            try {
                const respuesta = await axios.post('http://localhost:3050/api/facultad/insertarResponsablesFacultad', data, config);
                console.log("res")
                console.log(respuesta)
                if (respuesta.status === 200) {
                    setmostrarModal(false);
                    props.cambiarComponenteAniadirResFacultad(false);
                    props.cambiarComponenteAniadirAsisFacultad(false);
                    props.cambiarComponenteVerDetalleFacultad(true);
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            setmostrarModal(false);
            console.log("datosResponsableFacultad")
            console.log(datosResponsableFacultad)
            /*
            var nuevosResponsablesFacultad = []
            if(datosResponsableFacultad.ResponsablesFacultad.length !== 0){
                nuevosResponsablesFacultad.push(...datosResponsableFacultad.ResponsablesFacultad);
            }
            nuevosResponsablesFacultad.push(...seleccionados);
            */
            const nuevosResponsablesFacultad = [...datosResponsableFacultad.ResponsablesFacultad, ...seleccionados]
            let ResponsableFacultad = {
                idResponsable: "",
                codigoResponsable: "",
                nombreResponsable: "",
                correoResponsable: "",
                ResponsablesFacultad: nuevosResponsablesFacultad,
            }
            dispatch(addDatosResponsableFacultad(ResponsableFacultad));
            //console.log(nuevosResponsablesFacultad);
            props.cambiarComponenteAniadirResFacultad(false);
            props.cambiarComponenteAniadirFacultad(true);
        }
    };

    const handleButtonFila = async (idIndicador, Indicador) => {
        dispatch(addDatosIndicadores(Indicador));
        console.log("FILAAAAAAAAAAAAAAAA");
        console.log(Indicador);
        props.cambiarComponente(false);
        props.cambiarComponente2(false);
        props.cambiarComponente3(false);
        props.cambiarComponente4(true);
    };

    const handleButtonAñadir = () => {
        setColor("#FFFFFF");
        setColorTexto("#000000");
        props.cambiarComponenteAniadirFacultad(false);
        props.cambiarComponenteAniadirResFacultad(true);
        props.cambiarComponenteVerDetalleFacultad(false);
    };
    const handleButtonEditar = () => {
        setEditable(true);
    };

    const handleButtonGuardar = () => {
        setColor("#042354");

        valor = validarCampos();
        if (valor) {
            if(seleccionados.length === 0){
                setmostrarModal(false);
            }else{
                setmostrarModal(true);
            }
        } else {
            setmostrarModal(false);
        }
    };


    const handleCambio = async (e) => {
        setTextoBusqueda(e.target.value);
    }
    const obtenerNuevosDatos = (e) => {
        e.preventDefault();
        setFlagBusqueda(!flagBusqueda);
        console.log(flagBusqueda);
        //setSeleccionados([]);
    }

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
            codigo: textoBusqueda,
            idFacultad: datosFacultad.idFacultad,
            idUsuarios: arregloIds,
        }
        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Usuario } = info;
            setCurrentPage(1)
            setPageData({
                isLoading: false,
                rowData: (Usuario.map((Usuario) => ({
                    seleccion: <input
                        type="checkbox"
                        className="checkboxGC"
                        id={Usuario.idUsuario}

                        defaultChecked={usuariosID.includes(Usuario.idUsuario)}
                        onChange={(e) => toggleValue(e, Usuario.idUsuario, Usuario.codigo, Usuario.nombreCompleto, Usuario.correo)}
                    />,
                    codigo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.codigo}</div>,
                    nombreCompleto: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.nombreCompleto}</div>,
                    correo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.correo}</div>,
                }))),
                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });
    }, [flagBusqueda]);

    let toggleValue = useCallback((event, idResponsable, codigoResponsable, nombreResponsable, correoResponsable) => {
        if (event.target.checked) {
            setSeleccionados(value => [...value, { idResponsable, codigoResponsable, nombreResponsable, correoResponsable }])
            setUsuariosID(prevUsuariosID => [...prevUsuariosID, idResponsable]);
        } else {
            setSeleccionados(value => value.filter(it => it.idResponsable !== idResponsable))
            setUsuariosID(prevUsuariosID => prevUsuariosID.filter((id) => id !== idResponsable));
        }
    }, [setSeleccionados])
    console.log(seleccionados)


    return (
        <div className="contenedorPrincipalAARF">
            <div className="contenedorBotonesConBusc contSup">
                <form className="input-groupBuscar ">
                    <input className="form-controlBuscar" type="search" placeholder="Buscar por código o nombre" aria-label="Buscar" onChange={handleCambio} value={textoBusqueda} />
                    <div className="input-group-appendBuscar m-0">
                        <button className="btn m-0 border-end border-top border-bottom borde-izquierdo-cuadrado" id="boton-buscar-gc" onClick={obtenerNuevosDatos}><i className="bi bi-search" ></i></button>
                    </div>
                </form>
                <div className="btnDivDisenio">
                    <button className="btnDisenio btnGuardarAARF" type="button" onClick={handleButtonGuardar} style={{ background: colorBoton }}>
                        Agregar</button>
                </div>

            </div>
            <input className="inputEspecial" name="txtTextoAviso" value={textoaviso} disabled></input>
            <div className="espacioTabla">
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
                        <p>¿Está seguro que desea añadir al responsable seleccionado?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" className="botonModal btnDisenio botonCancelarAARF" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarAARF" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
            </form>
            
            
        </div>
    );
}
