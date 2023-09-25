import 'bootstrap/dist/css/bootstrap.min.css';
import "../HojasDeEstilo/ResFacuAniadirResEspe.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/FormBuscar.css";
import "../HojasDeEstilo/Reusable/InputValidacion.css";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from 'react-redux';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import { getData, columns, formatRowData } from "./DataRespEspecialidad";
import Table from "./TablaCuentas";
import axios from 'axios';
import Pagination from "../componentes/pagination/pagination";
import { useDispatch } from "react-redux";
import { faArrowsLeftRightToLine } from '@fortawesome/free-solid-svg-icons';
import { addDatosEspecialidad, addBanderaVerEspe, addBotonGuardadoHab } from "../Redux/EspecialidadSlice";

import { addDatosResponsableEspecialidad } from '../Redux/ResponsableEspecialidadSlice';

export default function ResFacuAniadirResEspe(props) {

    let valor;
    const [cookies, setCookie] = useCookies();
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [mostrarModal, setmostrarModal] = useState(false);
    const [mostrarModa2, setmostrarModal2] = useState(false);
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [seleccionado, setSeleccionado] = useState([]);

    const [datosExtra, setDatosExtra] = useState([]);

    const [selectedIndicadores, setSelectedIndicadores] = useState([]);
    const [editable, setEditable] = useState(false);
    const [cambioCompetencia, setCambioCompetencia] = useState(0);
    const [flagActualizar, setFlagActualizar] = useState(false);
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [textoaviso, setTextoaviso] = useState("");
    const [colorBoton, setColorBoton] = useState("#042354");

    const datosCompetencia = useSelector((state) => state.Competencias);
    const datosAsistenteEspecialidad = useSelector((state) => state.AsistenteEspecialidad);
    const datosResponsableEspecialidad = useSelector((state) => state.ResponsableEspecialidad);
    const [usuariosID, setUsuariosID] = useState([]);
    const datosEspecialidad = useSelector((state) => state.Especialidad);

    console.log("datosEspecialidad");
    console.log(datosResponsableEspecialidad);

    const dispatch = useDispatch();

    var [elementos, setElementos] = useState([{}]);

    const arregloIds = [];
    for (let i = 0; i < datosAsistenteEspecialidad.AsistentesEspecialidad.length; i++) {
        arregloIds.push(datosAsistenteEspecialidad.AsistentesEspecialidad[i].idAsistente);
    }
    for (let i = 0; i < datosResponsableEspecialidad.ResponsablesEspecialidad.length; i++) {
        arregloIds.push(datosResponsableEspecialidad.ResponsablesEspecialidad[i].idResponsable);
    }

    useEffect(() => {
        if (seleccionado.length > 0) {
            setColorBoton("#042354"); // Cambia el color del botón a azul si está seleccionado
            setTextoaviso("");
        }else{
            setColorBoton("#ADADAD");
            setTextoaviso("Seleccione al menos un Responsable");
        }
    }, [seleccionado]);

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
            idEspecialidad: datosEspecialidad.idEspecialidad,
            codigo: textoBusqueda,
            idUsuarios: arregloIds,
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
            idEspecialidad: datosEspecialidad.idEspecialidad,
            codigo: textoBusqueda,
            idUsuarios: arregloIds,
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
        validarCampos(codigo, nombre, correo);
    };

    const handleChangeNombres = (event) => {
        setNombre(event.target.value);
        validarCampos(codigo, nombre, correo);
    };

    const handleChangeCorreo = (event) => {
        setCorreo(event.target.value);
        validarCampos(codigo, nombre, correo);
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
        if (datosEspecialidad.banderaVerEspe) {
            const config = {
                headers: { Authorization: 'Bearer ' + cookies.jwt }
            }
            const data = {
                idEspecialidad: datosEspecialidad.idEspecialidad,
                Responsables: usuariosID
            }
            console.log("data")
            console.log(data)
            try {
                const respuesta = await axios.post('http://localhost:3050/api/especialidad/insertarResponsablesEspecialidad', data, config);
                console.log("res")
                console.log(respuesta)
                if (respuesta.status === 200) {
                    setmostrarModal(false);
                    props.cambiarComponenteAniadirResEspecialidad(false);
                    props.cambiarComponenteAniadirAsisEspecialidad(false);
                    props.cambiarComponenteVerDetalleEspecialidad(true);
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            setmostrarModal(false);
            console.log("datosResponsableEspecialidad")
            console.log(datosResponsableEspecialidad)

            const nuevosResponsablesEspecialidad = [...datosResponsableEspecialidad.ResponsablesEspecialidad, ...seleccionado]
            let ResponsableEspecialidad = {
                idResponsable: "",
                codigoResponsable: "",
                nombreResponsable: "",
                correoResponsable: "",
                ResponsablesEspecialidad: nuevosResponsablesEspecialidad,
            }
            dispatch(addDatosResponsableEspecialidad(ResponsableEspecialidad));
            //console.log(nuevosResponsablesEspecialidad);
            props.cambiarComponenteAniadirEspecialidad(true);
            props.cambiarComponenteAniadirResEspecialidad(false);
        }
    };

    const handleButtonFila = async (idIndicador, Indicador) => {
        /*
        dispatch(addDatosIndicadores(Indicador));
        console.log("FILAAAAAAAAAAAAAAAA");
        console.log(Indicador);
        */
        props.cambiarComponente(false);
        props.cambiarComponente2(false);
        props.cambiarComponente3(false);
        props.cambiarComponente4(true);
    };

    const handleButtonAñadir = () => {
        setColor("#FFFFFF");
        setColorTexto("#000000");
        props.cambiarComponenteAniadirEspecialidad(false);
        props.cambiarComponenteAniadirResEspecialidad(true);
        props.cambiarComponenteVerDetalleEspecialidad(false);
    };
    const handleButtonEditar = () => {
        setEditable(true);
    };
    const handleButtonGuardar = () => {
        setColor("#042354");

        valor = validarCampos();
        if (valor) {
            if(seleccionado.length === 0){
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
        //setSeleccionado([]);
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
            idUsuarios: arregloIds,
            idEspecialidad: datosEspecialidad.idEspecialidad
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
            setSeleccionado(value => [...value, { idResponsable, codigoResponsable, nombreResponsable, correoResponsable }])
            setUsuariosID(prevUsuariosID => [...prevUsuariosID, idResponsable]);
        } else {
            setSeleccionado(value => value.filter(it => it.idResponsable !== idResponsable))
            setUsuariosID(prevUsuariosID => prevUsuariosID.filter((id) => id !== idResponsable));
        }
    }, [setSeleccionado])

    console.log(seleccionado);


    return (
        <div className="contenedorPrincipalAAF">
            <div className="barraSuperiorAFARE">
                <form className="input-groupBuscar input-groupBuscarRFARE">
                    <input className="form-controlBuscar" type="search" placeholder="Buscar por código, nombre o correo" aria-label="Buscar" onChange={handleCambio} value={textoBusqueda} />
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
            <form onSubmit={handleSubmit} className="contDatosAAF">
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea añadir al usuario seleccionado como responsable?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" className="botonModal btnDisenio  botonCancelarAAF" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio  botonAceptarAAF" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
            </form>
        </div>
    );
}