import React, { useEffect, useState, useCallback } from 'react';
import fotoPerfil from "../images/FotoPerfil.png";
import "../HojasDeEstilo/ResEspeAniadirMuestraMedicion.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/FormBuscar.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import { Button, Modal } from "react-bootstrap";
import { addDatosMuestra } from '../Redux/MedicionResEspeSlice';
import { addDatosResponsable } from '../Redux/MedicionResEspeSlice';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import Table from "./TablaCuentas";
import Pagination from "../componentes/pagination/pagination";
import { getData, columns, formatRowData } from "./DataUsuarioMuestraMedicion";
import { useCookies } from "react-cookie";
import axios from 'axios';

export default function ResEspeAniadirMuestraMedicion(props) {


    const [cookies, setCookie] = useCookies();
    const [muestraMedNombre, setMuestraMedNombre] = useState("");
    // const [semestre, setMuestraMedNombre] = useState("");
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [mostrarModal, setmostrarModal] = useState(false);

    const [usuarioSeleccionado, setUsuarioSelecionado] = useState("");
    const [selectedRow, setSelectedRow] = useState("");
    const [nombre, setNombre] = useState('');
    const [flagActualizar, setFlagActualizar] = useState(false);
    const dispatch = useDispatch();

    const datosMuestras = useSelector((state) => state.MedicionEspe);
    const datosMedicion = useSelector((state) => state.Programa);
    const datosCuenta = useSelector((state) => state.Cuenta);

    useEffect(() => {

    }, []);

    const handleButtonFila = (idUsuario, name) => {
        console.log("ID USUARIO SELECCIONADO");
        console.log(idUsuario);
        setUsuarioSelecionado(idUsuario);
        setNombre(name);
        setSelectedRow(idUsuario); // Marcar la fila actual como seleccionada
    };



    const handleChange = (e) => {
        const { name, value } = e?.target || {};

        switch (name) {
            case "muestraNombre":
                setMuestraMedNombre(value);
                break;
        }
    }
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
                    // seleccion: <input
                    //     className="checkboxGC"
                    //     type="checkbox"
                    //     id={Usuario.idUsuario}
                    //     // checked={verificarCheck}
                    //     defaultChecked={seleccionados.includes(Usuario.idUsuario)}
                    //     // onChange={handleCheckBoxChange}
                    //     onChange={(e) => toggleValue(e, Usuario.idUsuario)}
                    // />,
                    codigo: <div className=" miTabla"  onClick={() => handleButtonFila(Usuario.codigoPUCP, Usuario.nombre)}>{Usuario.codigoPUCP}</div>,
                    nombre: <div className="seleccionableGC miTabla"  onClick={() => handleButtonFila(Usuario.codigoPUCP, Usuario.nombre)}>{Usuario.nombre}</div>,
                    correo: <div className="seleccionableGC miTabla"  onClick={() => handleButtonFila(Usuario.codigoPUCP, Usuario.nombre)}>{Usuario.correo}</div>,
                    // estado: <div className="seleccionableGC" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.estado}</div>,
                }))),
                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });

    }, [currentPage]);

    const handleCambio = async (e) => {
        setTextoBusqueda(e.target.value);
    }
    const obtenerNuevosDatos = (e) => {
        e.preventDefault();
        setCurrentPage(!currentPage);
        console.log(currentPage);
    }

    const handleButtonAñadir = () => {
        setmostrarModal(true);

        const data = {
            idEspacioMedicion: datosMedicion.idEspacioMedicion,
            horario: muestraMedNombre,
            codDocente: usuarioSeleccionado,
            idUsuarioCreacion: datosCuenta.idCuenta
        }
        console.log("AQUI ESTA LA DATAAAAAAA");
        console.log(data);
        console.log("AQUI ESTA LA DATAAAAAAA");
    };
    const handleModalClose = () => {
        setmostrarModal(false);
    };
    const handleModalAceptar = async () => {
        if (datosMedicion.banderaDetalle) {
            console.log("1 PRIMER PASO")
            if (datosMedicion.banderaAñadir) {
                console.log("2 PRIMER PASO")
                let MuestraP = {
                    codigo: muestraMedNombre,
                    codigoResponsable: usuarioSeleccionado
                };
                const nuevasMuestras = [...datosMuestras.MuestrasMedicion, MuestraP];
                const nuevosResponsables = [...datosMuestras.nombreResponsable, nombre];
                dispatch(addDatosMuestra(nuevasMuestras));
                dispatch(addDatosResponsable(nuevosResponsables));

                console.log("alamos")
                props.cambiarComponenteMedicion1(false);
                props.cambiarComponenteMedicion2(true);
                props.cambiarComponenteMedicion3(false);
                props.cambiarComponenteMedicion4(false);
                props.cambiarComponenteMedicion5(false);
                props.cambiarComponenteMedicion6(false);
            } else {
                console.log("3 PRIMER PASO")
                console.log("DETALLE INGRESA AQUI");
                console.log("Galleta:");
                console.log(cookies.jwt);

                const config = {
                    headers: { Authorization: 'Bearer ' + cookies.jwt }
                }
                const data = {
                    idEspacioMedicion: datosMedicion.idEspacio,
                    horario: muestraMedNombre,
                    codDocente: usuarioSeleccionado,
                }
                console.log("AQUI ESTA LA DATAAAAAAA");
                console.log(data);
                console.log("AQUI ESTA LA DATAAAAAAA");
                try {
                    const respuesta = await axios.post("http://localhost:3050/api/muestraMedicion/insertarMuestrasTodos", data, config);
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
            console.log("4 PRIMER PASO")
            let MuestraP = {
                codigo: muestraMedNombre,
                codigoResponsable: usuarioSeleccionado
            };
            const nuevasMuestras = [...datosMuestras.MuestrasMedicion, MuestraP];
            const nuevosResponsables = [...datosMuestras.nombreResponsable, nombre];
            dispatch(addDatosMuestra(nuevasMuestras));
            dispatch(addDatosResponsable(nuevosResponsables));

            console.log("alamos")
            props.cambiarComponenteMedicion1(false);
            props.cambiarComponenteMedicion2(true);
            props.cambiarComponenteMedicion3(false);
            props.cambiarComponenteMedicion4(false);
            props.cambiarComponenteMedicion5(false);
            props.cambiarComponenteMedicion6(false);
        }
    };
    return (
        <div className="REAMMinicioPaginaAI">
            {/* <h1>Añadir Muestra dasfaddaasdsd Medición</h1> */}

            <div className="REAMMContenedorSuperior">
                <div className="REAMMContenedorBuscadoresSecundarios">
                    <div className="REAMMContSecSup1 REAMMContSecSup1Sup">
                            <div className="labelGen REAMMContSecSup1Nom REAMMContSecSup1Nom2">
                                Responsable de Muestra *
                            </div>
                            <div className="REAMMContSecSup1Box">
                                <input
                                    className=" inputGen REAMMinput"
                                    type="text" name="docenteNombre" onChange={handleChange} disabled={true}
                                    value={nombre} />

                            </div>

                    </div>


                    <div className="REAMMContSecSup1">
                        <div className="labelGen REAMMContSecSup1Nom REAMMContSecSup1Nom3">
                            Muestra *
                        </div>
                        <div className="REAMMContSecSup1Box">

                            <input
                                className="inputActivoGen REAMMinput"
                                type="text" name="muestraNombre" onChange={handleChange}
                                value={muestraMedNombre} />

                        </div>
                    </div>
                    <div className="REAMMContSecSup2">
                        {/* <div className="REAMMContSecSup2Nom">
                                Semestre * 
                            </div>
                            <div className="REAMMContSecSup2Box">

                                                        <div className="REGRComboBox">
                                                            <select value={selectedValue} onChange={handleSelectChange}>
                                                                <option value="">Selecciona un ciclo</option>
                                                                {bomboBox.map(option => (
                                                                    <option key={option.id} value={option.ciclo}>
                                                                        {option.ciclo}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>

                            </div> */}
                    </div>
                </div>

            </div>
            {/* <label className="labelGen REAMMContSecSup1Nom">
                            Seleccione un responsable para la muestra
            </label> */}
            <div className="REAMMContenedorInferior">
                <div className='contDatosBusqREAMM'>
                    <label className='mensajeEleccionRep labelGen'> Seleccione al representante de la muestra:</label>
                    <div className="contenedorBarraREAMM">
                        <form className="input-groupBuscar ">
                            <input className="form-controlBuscar formChiqui" type="search" placeholder="Buscar por codigo o nombre" aria-label="Buscar" onChange={handleCambio} value={textoBusqueda} />
                            <div className="input-group-appendBuscar m-0">
                                <button className="btn m-0 border-end border-top border-bottom borde-izquierdo-cuadrado" id="boton-buscar-gc" onClick={obtenerNuevosDatos}><i className="bi bi-search" ></i></button>
                            </div>
                        </form>

                        <div className="btnDivDisenio botonDiseñoREAMM">
                            <button className="btnDisenio REAMMbtnAniadir" onClick={handleButtonAñadir} disabled={muestraMedNombre != "" && nombre != "" ? false : true} style={{ backgroundColor: (muestraMedNombre != "" && nombre != "") ? "#042354" : "#ADADAD" }}>
                                Añadir
                            </button>
                        </div>
                        <Modal show={mostrarModal} onHide={handleModalClose}>
                            <Modal.Body >
                                <p>¿Está seguro que desea registrar la nueva muestra?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="botonModal btnDisenio botonCancelarAI" onClick={handleModalClose}>
                                    Cancelar</Button>
                                <Button className="botonModal btnDisenio botonAceptarAI" onClick={handleModalAceptar}>
                                    Aceptar</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
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
                            <div className="contenedorTablaGC tablaCabeceLeft" style={{ width: "100%", height: "450px" }}>
                                <Table
                                    className="tablaGC "
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


            </div>
        </div>
    );
}

