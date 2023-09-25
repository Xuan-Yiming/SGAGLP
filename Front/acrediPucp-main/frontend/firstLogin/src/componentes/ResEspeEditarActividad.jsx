import React, { useEffect, useState, useCallback } from 'react'
import '../HojasDeEstilo/ResEspeCompetencias.css';
import '../HojasDeEstilo/ResEspeEditarActividad.css';
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import { useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
//import Table from "./TablaCuentas";
import { getData, columns, formatRowData } from "./DataActividades";
import Table from "./TablaCuentas";
import Pagination from "./pagination/pagination";
import { useDispatch } from "react-redux";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useCookies } from "react-cookie";
import ModalDragActividades from './ModalDragActividades';
import { addDatosPropuestas, addPagina, addData } from '../Redux/PropuestaSlice';
import { addDatosActividades,addEvidencia2 } from '../Redux/ActividadesSlice';
import { addBanderaCargandoEvidencia } from '../Redux/CargandoSlice';
import axios from 'axios';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';


function ResEspeEditarActividad(props) {
    
    
    const datosResponsablePlanMejora = useSelector((state) => state.ResponsablePlanMejora);
    const datosActividad = useSelector((state) => state.Actividades);
    console.log(datosActividad)
    const [cookies, setCookie] = useCookies();
    const [propuestas, setPropuestas] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [seleccionados, setSeleccionados] = useState([]);
    const [editable, setEditable] = useState(false);
    const [codigo, setCodigo] = useState(datosActividad.codigoActividad);
    const [descripcion, setDescripcion] = useState(datosActividad.descripcionActividad);
    const [responsable, setResponsable] = useState(datosActividad.responsableActividad);
    const [tipo, setTipo] = useState(datosActividad.evidencia)
    const [fechaIni, setFechaIni] = useState(datosActividad.fechaInicio)
    const [fechaFin, setFechaFin] = useState(datosActividad.fechaFin)

    const [colorFondo, setColorFondo] = useState("rgb(242, 247, 249)");
    const [colorTexto, setColorTexto] = useState("rgb(120, 146, 164)");

    const [idElegido, setIdElegido] = useState(datosActividad.idestado);
    const [textoBoton, setTextoBoton] = useState("Editar");
    const [mostrarModal2, setmostrarModal2] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEstado, setSelectedEstado] = useState(datosActividad.estado);
    var [elementos, setElementos] = useState([{}]);
    const [flagActualizar, setFlagActualizar] = useState(false)


    const [comboBoxEstado, setComboBoxEstado] = useState(["No iniciado", "En proceso", "Logrado"]);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const handleModalCancelar = () => {
        setmostrarModal2(false);

        // setFlagActualizar(true);
        //  handleButtonClick()
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

    const handleNuevaData = (actividad) => {
        console.log("handleNuevaData")
        console.log(actividad)
        const fechaFinal = formatoFecha(actividad.fechaFin)
        const fechaInicial = formatoFecha(actividad.fechaInicio)
        setFechaFin(fechaFinal)
        setFechaIni(fechaInicial)

    }
    const llamaDatos = async () => {

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            //idMuestraMedicion: datosMedicion.idMuestraMedicion
            idActividad: datosActividad.idActividad

        }
        console.log("Enviando datos secundarios en LlamaDAtos:")
        console.log(data)

        try {
            const respuesta = await axios.post("http://localhost:3050/api/actividad/listarActividadPorIdActividad", data, config);
            //console.log("ojo")
            //console.log(respuesta.data)
            setTimeout(() => {
                handleNuevaData(respuesta.data.data[0]) // llamamos a la función handleButtonClick una vez que el estado se ha actualizado y el modal se ha cerrado
            }, 0);
        } catch (error) {
            console.log(error)
        }
        // handleButtonClick()


    }


    const handleButtonClick = () => {


        if (textoBoton === "Editar") {
            setEditable(true)
            /*if (selectedEstado === "No iniciado" || idElegido === "1") {
                setComboBoxEstado(["No iniciado", "En proceso", "Logrado"])
            } else if (selectedEstado === "En proceso" || idElegido === "2") {

                setComboBoxEstado(["En proceso", "Logrado"])
            } else if (selectedEstado === "Logrado" || idElegido === "3") {
                setComboBoxEstado(["Logrado"])

            }*/

            setColorFondo("#FFFFFF");
            setColorTexto("#000000");
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
                datosActividad.actualizar(false);

                let Actividad = {
                    idActividad: datosActividad.idActividad,
                    codigo: "",
                    descripcion: descripcion,
                    evidencia: tipo,
                    estado: selectedEstado,
                    fidEstado: idElegido,
                    responsable: responsable,
                    Actividades: datosActividad.Actividades,
                    banderaVerActividad: false
                }
                dispatch(addEvidencia2(tipo))
                dispatch(addDatosActividades(Actividad));




                setmostrarModal2(false);
            } else {
                /*
                if (selectedEstado === "No iniciado" || idElegido === "1") {
                    setComboBoxEstado(["No iniciado", "En proceso", "Logrado"])
                } else if (selectedEstado === "En proceso" || idElegido === "2") {

                    setComboBoxEstado(["En proceso", "Logrado"])
                } else if (selectedEstado === "Logrado" || idElegido === "3") {
                    setComboBoxEstado(["Logrado"])

                }*/
                setmostrarModal2(true);
                // handleValidacion();
                //setmostrarModal(true);
            }

        }
    };



    const handleDateChange = () => {

    }

    const handleButtonCargar = () => {
        setOpenModal(true);
    }

    const handleButtonVer = () => {
        dispatch(addBanderaCargandoEvidencia(false));

        


        setTimeout(async () => {
        props.cambiarComponentePlanMejora1(false);
        props.cambiarComponentePlanMejora2(false);
        props.cambiarComponentePlanMejora3(false);
        props.cambiarComponentePlanMejora4(false);
        props.cambiarComponentePlanMejora5(false);
        props.cambiarComponentePlanMejora6(false);
        props.cambiarComponentePlanMejora7(true);
    },800);
    }

    const handleSeleccionar = (option) => {

        setSelectedEstado(option)
        if (option === "En proceso") {
            setIdElegido("2");
        } else if (option === "Logrado") {
            setIdElegido("3");
        } else if (option === "No iniciado") {
            setIdElegido("1")
        }
    }

    useEffect(() => {

        llamaDatos()
        dispatch(addBanderaCargandoEvidencia(true));
    }, [])



    const handleButtonAñadir = () => {
        console.log("datosActividad antes de aniadir")
        console.log(datosActividad)
        let Actividad = {
            idActividad: datosActividad.idActividad,
            codigo: "",
            descripcion: descripcion,
            evidencia: tipo,
            estado: selectedEstado,
            fidEstado: idElegido,
            responsable: responsable,
            Actividades: datosActividad.Actividades,
            banderaVerActividad: true
        }
        dispatch(addDatosActividades(Actividad));
        console.log();
        props.cambiarComponentePlanMejora6(false);
        props.cambiarComponentePlanMejora8(true);
        props.seguimiento(true);
    };


    const handleGuardarCambios = async () => {


        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        console.log(datosActividad)
        const data = {
            //idMuestraMedicion: datosMedicion.idMuestraMedicion
            idActividad: datosActividad.idActividad,
            codigo: codigo,
            descripcion: descripcion,
            evidencia: tipo,
            responsable: responsable,
            fidEstado: idElegido

        }
        console.log("Enviando datos secundarios en guaradar cambios:")
        console.log(data)

        try {
            const respuesta = await axios.post("http://localhost:3050/api/actividad/modificarActividad", data, config);
            // console.log("ojo")
            console.log(respuesta.data)
            setTimeout(() => {
                llamaDatos()
                handleButtonClick() // llamamos a la función handleButtonClick una vez que el estado se ha actualizado y el modal se ha cerrado
            }, 0);
        } catch (error) {
            console.log(error)
        }
        // handleButtonClick()


    }


    const handleCodigo = (event) => {
        const newValue = event.target.value;


        setCodigo(newValue);
    };
    const handleDescripcion = (event) => {
        const newValue = event.target.value;


        setDescripcion(newValue);
    };
    const handleResponsable = (event) => {
        const newValue = event.target.value;


        setResponsable(newValue);
    };
    const handleTipo = (event) => {
        const newValue = event.target.value;


        setTipo(newValue);
    };



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
            <div className="contenedorDatosSuperioresREAC">
                <div className="contenedor-codigoREAC">
                    <div className="labelGen codigoREAC">Estado</div>

                    <div>
                        {comboBoxEstado.length === 0 ? (
                            <DropdownButton title={selectedEstado} > </DropdownButton>
                        ) : (
                            <DropdownButton title={selectedEstado} disabled={!editable} onSelect={handleSeleccionar}>
                                {comboBoxEstado.map((option) => (
                                    <Dropdown.Item eventKey={option}>
                                        {option}
                                    </Dropdown.Item>
                                ))}
                            </DropdownButton>
                            //<select className="ddSeleccion" value={selectedCicloIni} onChange={handleSeleccionarCicloIni}>
                            //    <option className="ddSeleccion" value="">Selecciona un ciclo de inicio</option>
                            //    {comboBoxCiclo.map(option => (
                            //        <option className="ddSeleccion" key={option.id} value={option.id}>
                            //            {option.ciclo}
                            //        </option>
                            //    ))}
                            //</select>
                        )}
                    </div>


                </div>
                <br></br>
                <div className="contenedorREAEM" style={{ width: "112.5%" }}>

                    <div className="derechaREAEM">
                        <label className="labelGen labelREAEM2" htmlFor="tipoMedicion">
                            Fecha Inicio
                        </label>
                        <input className="inputGen " placeholder='Fecha inicial'
                            type="text" name="fechaIni"
                            value={fechaIni}/*onChange={handleChangeDescripcion}*/
                            style={{ width: "30%", backgroundColor: "rgb(242, 247, 249)", color: "rgb(120, 146, 164)", textAlign: "center" }} disabled={true} />
                    </div>
                    <div className="derechaREAEM" >
                        <label className="labelGen labelREAEM2" htmlFor="tipoMedicion">
                            Fecha Fin
                        </label>
                        <input className="inputGen  " placeholder='Fecha final'
                            type="text" name="fechaFin"
                            value={fechaFin}/*onChange={handleChangeDescripcion}*/
                            style={{ width: "30%", backgroundColor: "rgb(242, 247, 249)", color: "rgb(120, 146, 164)", textAlign: "center" }} disabled={true} />


                    </div>

                </div>

                <br></br>
                <br></br>
                <div className="contenedor-descripcionREAC">
                    <div className="labelGen descripcionREAC">Descripción</div>
                    <input className="inputGen inputMenosPad  form-control2REAC" placeholder='Descripción'
                        type="text" name="descripcion"
                        value={descripcion}/*onChange={handleChangeDescripcion}*/
                        style={{ width: "80%", backgroundColor: colorFondo, color: colorTexto }} onChange={handleDescripcion} disabled={!editable} />
                </div>
                <br></br>

                <div className="contenedor-descripcionREAC">
                    <div className="labelGen descripcionREAC">Responsable</div>
                    <input className="inputGen" 
                        type="text" name="responsable"
                        value={responsable} onChange={handleResponsable}
                        style={{  width: "40%" , backgroundColor: colorFondo, color: colorTexto }}  disabled={!editable} />
                </div>

                <br></br>

                <div className="contenedor-descripcionREAC">
                    <div className="labelGen descripcionREAC" >Tipo de evidencia</div>
                    <input className="inputGen inputMenosPad  form-control2REAC" placeholder='Tipo de evidencia'
                        type="text" name="descripcion"
                        value={tipo}/*onChange={handleChangeDescripcion}*/
                        style={{ width: "40%", backgroundColor: colorFondo, color: colorTexto }} onChange={handleTipo} disabled={!editable} />
                       
                    <div className="contenedor-botonesREAC2" style={{ marginTop: "1%", width: "29%" }}>
                        <div className="botonesSuperioresREAC2" /*style={{justifyContent: "space-between"}}*/ style={{ marginLeft: "60%" }}>
                            <div className="btnDivDisenio" style={{ marginRight: "15%" }}>
                                <button className='btnDisenio' style={{ backgroundColor: "#042354" }} onClick={handleButtonCargar}>
                                    Cargar
                                </button>
                            </div>

                            <div className="btnDivDisenio ">
                                <button className='btnDisenio' style={{ backgroundColor: "#0072BC" }} onClick={handleButtonVer} >
                                    Ver
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                <br></br>





            </div>


            <div className="contenedor-botonesREAC" >
                <div className="botonesSuperioresREAC">
                    <div className="btnDivDisenio">
                        <button className='btnDisenio' onClick={handleButtonClick} style={{ backgroundColor: "#042354" }}>
                            {textoBoton}
                        </button>
                    </div>

                </div>
            </div>

            {openModal && <ModalDragActividades closeModal={setOpenModal} idActividad={datosActividad.idActividad} idCod={datosActividad.codigoActividad} />}



        </div>





    )
}

export default ResEspeEditarActividad