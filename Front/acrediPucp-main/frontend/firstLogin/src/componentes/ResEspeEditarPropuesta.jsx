import React, { useEffect, useState, useCallback } from 'react'
import '../HojasDeEstilo/ResEspeCompetencias.css';
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/TablasFront.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import { useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
//import Table from "./TablaCuentas";
import { getData, columns, formatRowData } from "./DataActividades";
import Table from "./TablaActividades";
import Pagination from "./pagination/pagination";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { addData, addFechaInicio, addFechaFin, addActualizar,limpiaDescripcion,limpiaEvidencia } from '../Redux/ActividadesSlice';
import { addCodigoP, addDescripcionP } from "../Redux/PropuestaSlice"
import { addDatosResponsablePlanMejora } from "../Redux/ResponsablePlanMejoraSlice"
import axios from 'axios';
import '../HojasDeEstilo/ResEspeEditarPropuesta.css';


function ResEspeEditarPropuesta(props) {


    const datosPropuestas = useSelector((state) => state.Propuestas);
    const [textoBoton, setTextoBoton] = useState("Editar");
    const [editable, setEditable] = useState(false);
    const [mostrarModal, setmostrarModal] = useState(false);

    const [colorFondo, setColorFondo] = useState("rgb(242, 247, 249)");
    const [colorTexto, setColorTexto] = useState("rgb(120, 146, 164)");




    const [codigo, setCodigo] = useState(datosPropuestas.codigoPropuesta);
    const [descripcion, setDescripcion] = useState(datosPropuestas.descripcionPropuesta);


    const [mostrarModal2, setmostrarModal2] = useState(false);

    const [botonColor, setBotonColor] = useState("#ADADAD");
    const [botonColor2, setBotonColor2] = useState("#ADADAD");
    const [cookies, setCookie] = useCookies();
    const [propuestas, setPropuestas] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);

    var [elementos, setElementos] = useState([{}]);
    const [flagActualizar, setFlagActualizar] = useState(false)

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
        totalPages: 0,
        totalPassengers: 0,
    });

    const handleModalCancelar = () => {
        setmostrarModal2(false);
        setmostrarModal(false);

        // setFlagActualizar(true);
        //  handleButtonClick()
    };

    const handleButtonClick = () => {
        if (textoBoton === "Editar") {
            setEditable(true)

            setColorFondo("#FFFFFF");
            setColorTexto("#000000");
            setBotonColor("#0072BC")

            setBotonColor2("#9E0520")
            //  handleEdit();
            // handleClick();
            //  setColor("#FFFFFF");
            // setColorTexto("#000000");
            setTextoBoton("Guardar")
        } else {


            if (mostrarModal2) {
                setEditable(false)

                setColorFondo("rgb(242, 247, 249)");
                setColorTexto("rgb(120, 146, 164)");

                //  handleEdit();
                // handleClick();
                //  setColor("#FFFFFF");
                // setColorTexto("#000000");
                setTextoBoton("Editar")




                setmostrarModal2(false);
            } else {
                setmostrarModal2(true);
                // handleValidacion();
                //setmostrarModal(true);
            }

        }
    };

    const formatoFecha = (valor) => {

        if (valor == null)
            return "No registrado"
        else {
            const fecha = new Date(valor);
            const dia = fecha.getDate();
            const mes = fecha.getMonth() + 1;
            const anio = fecha.getFullYear();

            const nuevaFecha = `${dia.toString().padStart(2, '0')}/${mes
                .toString()
                .padStart(2, '0')}/${anio}`;

            return nuevaFecha;
        }
    };

    const handleButtonFila = async (idEnviado, actividad) => {

        const fechaFin = formatoFecha(actividad.fechaFin)
        const fechaIni = formatoFecha(actividad.fechaInicio)
        dispatch(addFechaInicio(fechaIni))
        dispatch(addFechaFin(fechaFin))

        /*  dispatch(addCodigoP(codigo))
          dispatch(addDescripcionP(descripcion))*/

        console.log("LA INFO DE COMPETENCIA ANTES DE ENVIAR AL REDUX");
        //   console.log(Competencia);
        console.log("LA INFO DE COMPETENCIA ANTES DE ENVIAR AL REDUX");
        //dispatch(addDatosCompetencias(Competencia));
        console.log(actividad);
        let ResponsablePlanMejora = {
            idUsuario: actividad.idResponsable,
            codigoResponsable: actividad.codigoResponsable,
            nombre: actividad.nombreCompletoResponsable,
            correoResponsable: actividad.correoResponsable
        };
        let ResponsablePlanMejoraEditar = {
            idResponsable: "",
            codigoResponsable: "",
            nombreResponsable: "",
            correoResponsable: "",
            ResponsablePlanMejora: ResponsablePlanMejora
        };
        dispatch(addDatosResponsablePlanMejora(ResponsablePlanMejoraEditar));
        dispatch(addData(actividad));
        dispatch(addActualizar(setFlagActualizar))
        props.cambiarComponentePlanMejora1(false);
        props.cambiarComponentePlanMejora2(false);
        props.cambiarComponentePlanMejora3(false);
        props.cambiarComponentePlanMejora4(false);
        props.cambiarComponentePlanMejora5(false);
        props.cambiarComponentePlanMejora6(true);

        //dispatch(addPagina(paginaActual))

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

            idPropuesta: datosPropuestas.idPropuesta,
            paginaSolicitar: datosPropuestas.paginaActual
        }
        //console.log("configuracion:")
        //console.log(config);

        //console.log(data);

        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Actividad } = info;
            setPageData({
                isLoading: false,
                rowData: (Actividad.map((actividad) => ({
                    seleccion: <input
                        className="checkboxREC"
                        type="checkbox"
                        id={actividad.idActividad}
                        // checked={verificarCheck}
                        //  checked={checkboxesMarcados[index] || false}
                        defaultChecked={seleccionados.includes(actividad.idActividad)}
                        // onChange={handleCheckBoxChange}
                        onChange={(e) => toggleValue(e, actividad.idActividad)}
                    />,
                    actividad: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(actividad.idActividad, actividad)}>{actividad.descripcion}</div>,
                    estado: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(actividad.idActividad, actividad)}>{actividad.descripcionEstado}</div>,
                }))),

                totalPages: totalPaginas,
                totalPassengers: totalFilas,

            });
        });

    }, [flagActualizar, currentPage]);





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
    const handleCodigo = (event) => {
        const newValue = event.target.value;


        setCodigo(newValue);
    };
    const handleDescripcion = (event) => {
        const newValue = event.target.value;


        setDescripcion(newValue);
    };


    const handleButtonAñadir = () => {
        /*  dispatch(addCodigoP(codigo))
          dispatch(addDescripcionP(descripcion))*/
        dispatch(limpiaDescripcion(""));
        dispatch(limpiaEvidencia(""));
        props.cambiarComponentePlanMejora1(false);
        props.cambiarComponentePlanMejora2(false);
        props.cambiarComponentePlanMejora3(true);
        props.cambiarComponentePlanMejora4(false);
        props.cambiarComponentePlanMejora5(false);
        props.seguimiento(true);
        props.modifica(true)
    }




    const handleGuardarCambios = async () => {

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            //idMuestraMedicion: datosMedicion.idMuestraMedicion
            idPropuesta: datosPropuestas.idPropuesta,
            codigo: codigo,
            descripcion: descripcion

        }
        console.log("Enviando datos secundarios:")
        console.log(data)

        try {
            const respuesta = await axios.post("http://localhost:3050/api/propuesta/modificarPropuesta", data, config);
            console.log("cambiosPlan")
            console.log(respuesta.data)

            props.cambiarComponentePlanMejora1(false);
            props.cambiarComponentePlanMejora2(false);
            props.cambiarComponentePlanMejora3(false);
            props.cambiarComponentePlanMejora4(true);
            props.cambiarComponentePlanMejora5(false);
            props.cambiarComponentePlanMejora6(false);
            props.cambiarComponentePlanMejora7(false);

            /*
            setTimeout(() => {
                handleButtonClick() // llamamos a la función handleButtonClick una vez que el estado se ha actualizado y el modal se ha cerrado
            }, 0);*/
        } catch (error) {
            console.log(error)
        }
        // handleButtonClick()

    }


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
            const respuesta = await axios.post("http://localhost:3050/api/actividad/eliminarActividad", objetoJSON, config);

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
    };



    const handleButtonEliminar = () => {

        setmostrarModal(true);
    }
    const handleModalDeshabilitar = () => {

    }

    return (

        <div className="contenedorPrincipalREAC">

            <Modal show={mostrarModal2} onHide={() => setmostrarModal2(false)}>
                <Modal.Body >
                    <p>¿Está seguro que desea guardar los cambios?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="botonModal btnDisenio" style={{ backgroundColor: "#9E0520" }} onClick={handleModalCancelar}>
                        Cancelar</Button>
                    <Button className="botonModal btnDisenio" style={{ backgroundColor: "#042354" }} onClick={handleGuardarCambios}>
                        Aceptar</Button>
                </Modal.Footer>
            </Modal>
            <div className="contenedorDatosSuperioresREAC">
                <div className="contenedor-codigoREAC">
                    <div className="labelGen codigoREAC">Código</div>
                    <input className="inputGen form-control1REAC " type="text" name="codigo" placeholder='Código'
                        value={codigo} /*onChange={handleChangeCodigo}*/
                        style={{ height: "27px", width: "80%", backgroundColor: colorFondo, color: colorTexto }} onChange={handleCodigo} disabled={!editable} />
                </div>
                <br></br>
                <div className="contenedor-descripcionREAC">
                    <div className="labelGen descripcionREAC">Descripción</div>
                    <input className="inputGen  form-control2REAC" placeholder='Descripción'
                        type="text" name="descripcion"
                        value={descripcion}/*onChange={handleChangeDescripcion}*/
                        style={{ width: "80%", backgroundColor: colorFondo, color: colorTexto }} onChange={handleDescripcion} disabled={!editable} />
                </div>

            </div>



            <div className="contenedor-indicadoresREAC">
                <div className="rectanguloAzulREAC"></div>
                <div className="contIndicREAC">
                    <h2 className="tituloIDsREAC">Actividades</h2>
                    <div className="contenedor-botonesREAC" style={{ marginTop: 10 }}>

                        
                        <div className="botonesSuperioresREAC">
                            <div className="btnDivDisenio">
                                <button onClick={handleButtonAñadir} disabled={!editable} type="button" className="btnDisenio" style={{ backgroundColor: botonColor }}>
                                    Añadir
                                </button>
                            </div>
                            <div className="btnDivDisenio">
                                <button onClick={handleButtonEliminar} disabled={!editable} type="button" className="btnDisenio" style={{ backgroundColor: botonColor2 }}>
                                    Eliminar
                                </button>

                            </div>
                        </div>
                    </div>
                    <div className="espacioTabla" >
                   
                        

                        {pageData.isLoading ? (
                            <div className="cargando d-flex flex-column align-items-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Cargando...</span>
                                </div>
                                <br></br>
                                <p>  Cargando</p>
                            </div>


                        ) : ((pageData.rowData.length===0)?(<>
                            <div className="contenedor-indicadores-rellenoREAC">
                            Todavía no se han creado actividades para esta propuesta
                        </div>
                        
                        
                        </>):(
                            <>
                                {/* <button onClick={() => setCurrentPage(1)}>Reset</button> */}
                                <div className="contenedorTablaF" style={{ marginTop: 0 }}>
                                    <Table className="tablaF"
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
                            </>))
                        }
                    </div>





                </div>
                <div className="contenedorBotones" style={{ height: '15%' }}>
                    <div className="btnDivDisenio" >
                        <button className='btnDisenio' onClick={handleButtonClick} style={{ backgroundColor: "#042354" }}>
                            {textoBoton}
                        </button>
                    </div>

                </div>
            </div>

            <Modal show={mostrarModal} onHide={handleModalDeshabilitar}>
                <Modal.Body >
                    <p>¿Está seguro que desea eliminar las actividades seleccionadas?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" className="botonModal btnDisenio " style={{ backgroundColor: "#9E0520" }} onClick={handleModalCancelar}>
                        Cancelar</Button>
                    <Button className="botonModal btnDisenio" style={{ backgroundColor: "#042354" }} onClick={handleModalAceptarDeshabilitar}>
                        Aceptar</Button>
                </Modal.Footer>
            </Modal>



        </div>





    )
}

export default ResEspeEditarPropuesta
