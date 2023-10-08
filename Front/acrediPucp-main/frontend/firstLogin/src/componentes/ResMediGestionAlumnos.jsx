import "../HojasDeEstilo/ResMediGestionAlumnos.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/FormBuscar.css";
import "../HojasDeEstilo/Reusable/TablasFront.css";
import React, { useEffect, useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import ReactPaginate from 'react-paginate';
import { getData, columns, formatRowData } from "./DataAlumnos";
import Table from "./TablaAlumnos";
import Pagination from "../componentes/pagination/pagination";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

import { useLocalStorage } from './useLocalStorage';


export default function ResMediGestionAlumnos(props) {

    const [cookies, setCookie] = useCookies();
    const dispatch = useDispatch();
    const datosMedicion = useSelector((state) => state.Medicion);
    const [arregloAlumno, setArregloAlumno] = useState([]);
    const [banderaCI, setBanderaCI] = useState(false);

    const [seleccionados, setSeleccionados] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [mostrarModal, setmostrarModal] = useState(false);
    const [flagActualizar, setFlagActualizar] = useState(false);

    const [flagEnviado, setFlagEnviado] = useLocalStorage("flagEnviado");




    const handleCargarAlumnos = () => {
        props.cambiarComponente(false);
        props.cambiarComponente2(false);
        props.cambiarComponente3(false);
        props.cambiarComponente4(false);
        props.cambiarComponente5(true);
        props.cambiarComponente6(false);
    };

    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
        totalPages: 0,
        totalPassengers: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);

    const handleButtonEliminar = () => {

        setmostrarModal(true);

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
            codigoNombre: textoBusqueda,
            idMuestraMedicion: datosMedicion.idMuestraMedicion,
            paginaSolicitar: currentPage,
        }

        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Alumnos } = info;
            // console.log(seleccionados);
            setPageData({
                isLoading: false,
                rowData: (Alumnos.map((Alumno) => ({
                    seleccion: flagEnviado==0?(<input
                        className="checkboxGC"
                        type="checkbox"
                        id={Alumno.idAlumno}
                        defaultChecked={seleccionados.includes(Alumno.idAlumno)}
                        onChange={(e) => toggleValue(e, Alumno.idAlumno)
                        }
                    />):<div></div>
                    ,
                    codigo: <div className="seleccionableGC miTabla" >{Alumno.codigo}</div>,
                    nombre: <div className="seleccionableGC miTabla" >{Alumno.nombre}</div>
                    // POR SI SE IMPLEMENTA LA EDICION
                    // codigo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.codigoPUCP}</div>,
                    // nombre: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Usuario.idUsuario)}>{Usuario.nombre}</div>
                }))),
                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });

        // console.log(seleccionados);

    }, [currentPage, flagBusqueda, flagActualizar]);

    const obtenerNuevosDatos = (e) => {
        e.preventDefault();
        setFlagBusqueda(!flagBusqueda);
        setCurrentPage(1);
        console.log(flagBusqueda);
    }

    let toggleValue = useCallback((event, id) => {

        if (event.target.checked) {
            setSeleccionados(value => [...value, id])
        } else {
            setSeleccionados(value => value.filter(it => it !== id))
        }
        // console.log(seleccionados);
    }, [setSeleccionados])

    const handleCambio = async (e) => {
        setTextoBusqueda(e.target.value);
    }

    const handleModalCancelar = () => {
        setmostrarModal(false);
    };



    const handleModalAceptarDeshabilitar = async () => {


        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        // const elementos = [...seleccionados]
        const arrregloJson = [];

        for (var i = 0; i < seleccionados.length; i++) {
            var parjson = { idAlumno: seleccionados[i] };

            arrregloJson.push(parjson)

        }

        const data = {
            idMuestraMedicion: datosMedicion.idMuestraMedicion,
            elementos: arrregloJson,
        }

        // const data = new Set(seleccionados);



        // data.forEach(id => {
        //     objetoJSON[id] = true;
        // });

        // console.log("valores json");
        console.log(data);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/alumno/eliminarAlumno", data, config);

            console.log(respuesta.data);

            setmostrarModal(false);
            props.cambiarComponente2(false);
            setFlagActualizar(!flagActualizar);

        } catch (error) {

            console.log(error)
        }
        setFlagBusqueda(!flagBusqueda);
    };


    return (
        <div className="contenedorTablaGC">
            <br></br>
            <div className="barraSuperiorGC">
                <div className="contenedorBarraGCA">
                    <form className="input-groupBuscar ">
                        <input className="form-controlBuscar" type="search" placeholder="Buscar por código o nombre" aria-label="Buscar"
                            onChange={handleCambio} value={textoBusqueda}
                        />
                        <div className="input-group-appendBuscar m-0">
                            <button className="btn m-0 border-end border-top border-bottom borde-izquierdo-cuadrado" id="boton-buscar-gc"
                                onClick={obtenerNuevosDatos}
                            ><i className="bi bi-search" ></i></button>
                        </div>
                    </form>
                </div>
                <div className="contenedorBotonesConBusc">
                    <div className="btnDivDisenio">
                        {flagEnviado==0?<button className="btnDisenio btnAniadirMGC"
                            onClick={handleCargarAlumnos}
                        >
                            Añadir/Cargar
                        </button>:<div></div>}
                    </div>
                </div>
            </div>
            <br />

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
                        <div className="contenedorTablaF" style={{ width: "95%" }}>
                            <Table
                                className="tablaF"
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

            <div className="barraIntermediaGC">
                <div className="btnDivDisenio">
                    {flagEnviado==0?<button className="btnDisenio btnDeshabilitarMGC" type="button"
                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                        onClick={handleButtonEliminar}
                    >
                        Eliminar
                    </button>:<div></div>}
                    <Modal show={mostrarModal} onHide={handleButtonEliminar}>
                        <Modal.Body >
                            <p>¿Está seguro que desea Eliminar los alumnos seleccionados?</p>
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