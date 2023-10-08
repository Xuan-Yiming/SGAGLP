import React, { useEffect, useState, useCallback } from 'react'
import '../HojasDeEstilo/ResEspeCompetencias.css';
import '../HojasDeEstilo/ResEspeEditarPropuesta.css';
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/TablasFront.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
//import Table from "./TablaCuentas";
import { getData, columns, formatRowData } from "./DataPropuestas";
import Table from "./TablaCuentas";
import Pagination from "./pagination/pagination";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { addDatosPropuestas, addPagina, addData, limpiaCodigo, limpiaDescripcion } from '../Redux/PropuestaSlice';

import { addCodigoPM, addDescripcionPM } from '../Redux/PlanMejoraSlice';
import { limpiaActividades } from "../Redux/ActividadesSlice";
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResEspeEditarPlan(props) {

    const datosPlanMejora = useSelector((state) => state.PlanesMejora);
    const [textoBoton, setTextoBoton] = useState("Editar");
    const [mostrarModal, setmostrarModal] = useState(false);



    const [colorFondo, setColorFondo] = useState("rgb(242, 247, 249)");
    const [colorTexto, setColorTexto] = useState("rgb(120, 146, 164)");
    const [editable, setEditable] = useState(false);




    const [codigo, setCodigo] = useState(datosPlanMejora.codigoPlanMejora);
    const [descripcion, setDescripcion] = useState(datosPlanMejora.descripcionPlanMejora);
    const [cookies, setCookie] = useCookies();
    const [propuestas, setPropuestas] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);


    var [elementos, setElementos] = useState([{}]);
    const [flagActualizar, setFlagActualizar] = useState(false)

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [botonColor, setBotonColor] = useState("#ADADAD");
    const [botonColor2, setBotonColor2] = useState("#ADADAD");

    const [mostrarModal2, setmostrarModal2] = useState(false);
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




    const handleModalDeshabilitar = () => {

    }




    const handleButtonFila = async (idEnviado, propuesta) => {
        console.log("LA INFO DE COMPETENCIA ANTES DE ENVIAR AL REDUX");
        //   console.log(Competencia);
        console.log("LA INFO DE COMPETENCIA ANTES DE ENVIAR AL REDUX");
        //dispatch(addDatosCompetencias(Competencia));
        console.log(propuesta);
        dispatch(addData(propuesta));
        dispatch(addPagina(paginaActual))
        /*
                dispatch(addCodigoPM(codigo))
                dispatch(addDescripcionPM(descripcion))*/
        props.cambiarComponentePlanMejora1(false);
        props.cambiarComponentePlanMejora2(false);
        props.cambiarComponentePlanMejora3(false);
        props.cambiarComponentePlanMejora4(false);
        props.cambiarComponentePlanMejora5(true);

        props.segumiento(true);

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

            idPlanMejora: datosPlanMejora.idPlanMejora,
            paginaSolicitar: datosPlanMejora.paginaActual
        }
        //console.log("configuracion:")
        //console.log(config);

        //console.log(data);

        getData(config, data).then((info) => {
            const { totalFilas, totalPaginas, Propuesta } = info;
            setPageData({
                isLoading: false,
                rowData: (Propuesta.map((Propuesta) => ({
                    seleccion: <input
                        className="checkboxREC"
                        type="checkbox"
                        id={Propuesta.idPropuesta}
                        // checked={verificarCheck}
                        //  checked={checkboxesMarcados[index] || false}
                        defaultChecked={seleccionados.includes(Propuesta.idPropuesta)}
                        // onChange={handleCheckBoxChange}
                        onChange={(e) => toggleValue(e, Propuesta.idPropuesta)}
                    />,
                    codigo: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Propuesta.idPropuesta, Propuesta)}>{Propuesta.codigo}</div>,
                    Propuesta: <div className="seleccionableGC miTabla" onClick={() => handleButtonFila(Propuesta.idPropuesta, Propuesta)}>{Propuesta.descripcion}</div>,
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

        dispatch(limpiaCodigo(""));
        dispatch(limpiaDescripcion(""));
        dispatch(limpiaActividades([]));
        /* dispatch(addCodigoPM(codigo))
         dispatch(addDescripcionPM(descripcion))*/
        props.cambiarComponentePlanMejora1(false);
        props.cambiarComponentePlanMejora2(true);
        props.cambiarComponentePlanMejora3(false);
        props.cambiarComponentePlanMejora4(false);
        props.cambiarComponentePlanMejora5(false);
        props.seguimiento(true);
        props.modifica(false)
    }

    const handleGuardarCambios = async () => {

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            //idMuestraMedicion: datosMedicion.idMuestraMedicion
            idPlanMejora: datosPlanMejora.idPlanMejora,
            codigo: codigo,
            descripcion: descripcion

        }
        console.log("Enviando datos secundarios:")
        console.log(data)

        try {
            const respuesta = await axios.post("http://localhost:3050/api/planMejora/modificarPlanMejora", data, config);
            console.log("cambiosPlan")
            console.log(respuesta.data)
            props.cambiarComponentePlanMejora1(false);
            props.cambiarComponentePlanMejora2(false);
            props.cambiarComponentePlanMejora3(false);
            props.cambiarComponentePlanMejora4(false);
            props.cambiarComponentePlanMejora5(false);
            props.cambiarComponentePlanMejora6(false);
            props.cambiarComponentePlanMejora7(false);
            if (respuesta.data.success) {
                toast.success('Plan de mejora modificado correctamente.', {
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
            const respuesta = await axios.post("http://localhost:3050/api/propuesta/eliminarPropuesta", objetoJSON, config);

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

    return (

        <div className="contenedorPrincipalREAC" >

            <Modal show={mostrarModal2} onHide={() => setmostrarModal2(false)}>
                <Modal.Body >
                    <p>¿Está seguro que desea guardar los cambios?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="botonModal btnDisenio botonCancelarGC" onClick={handleModalCancelar}>
                        Cancelar</Button>
                    <Button className="botonModal btnDisenio botonAceptarGC" onClick={handleGuardarCambios}>
                        Aceptar</Button>
                </Modal.Footer>
            </Modal>

            <div className="contenedorDatosSuperioresREAC" >
                <div className="contenedor-codigoREAC">
                    <div className="labelGen codigoREAC">Código*</div>
                    <input className="inputGen form-control1REAC " type="text" name="codigo" placeholder='Código'
                        value={codigo} /*onChange={handleChangeCodigo}*/
                        style={{ height: "27px", width: "80%", backgroundColor: colorFondo, color: colorTexto }} onChange={handleCodigo} disabled={!editable} />
                </div>
                <br></br>
                <div className="contenedor-descripcionREAC">
                    <div className="labelGen descripcionREAC">Descripción*</div>
                    <input className="inputGen form-control2REAC" placeholder='Descripción'
                        type="text" name="descripcion"
                        value={descripcion}/*onChange={handleChangeDescripcion}*/
                        style={{ width: "80%", backgroundColor: colorFondo, color: colorTexto }} onChange={handleDescripcion} disabled={!editable} />
                </div>
                

            </div>



            <div className="contenedor-indicadoresREAC">
                <div className="rectanguloAzulREAC"></div>
                <div className="contIndicREAC" >
                    <h2 className="tituloGen tituloTipo3 tituloIDsREAC">Propuestas</h2>

                    <div className="botonesSuperioresREAC">
                                <div className='btnDivDisenio' >
                                    <button onClick={handleButtonAñadir} disabled={!editable} type="button" className="btnDisenio" style={{ backgroundColor: botonColor }}>
                                        Añadir
                                    </button>
                                </div>
                                <div className='btnDivDisenio'>
                                    <button onClick={handleButtonEliminar} disabled={!editable} type="button" className="btnDisenio" style={{ backgroundColor: botonColor2 }}>
                                        Eliminar
                                    </button>

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
                            Todavía no se han creado propuestas para este plan de mejora
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
                    <p>¿Está seguro que desea eliminar las propuestas seleccionadas?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" className="botonCancelarDC btn btn-danger" onClick={handleModalCancelar}>
                        Cancelar</Button>
                    <Button className="botonAceptarDC" onClick={handleModalAceptarDeshabilitar}>
                        Aceptar</Button>
                </Modal.Footer>
            </Modal>


        </div>





    )
}

export default ResEspeEditarPlan
