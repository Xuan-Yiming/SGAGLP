import '../HojasDeEstilo/ResEspeCrearActividad.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../HojasDeEstilo/Reusable/InputBase.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

// import { Table } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addDatosCuenta, addRoles, addNombreCuenta, addApellidoPCuenta, addApellidoMCuenta, addFoto } from "../Redux/CuentaSlice";
import { Modal, Button } from 'react-bootstrap';
import { getData, columns, formatRowData } from "./DataCompetencia";

import Pagination from "./pagination/pagination";
import { addDatosPropuestas } from '../Redux/PropuestaSlice';
import { addDatosActividades } from '../Redux/ActividadesSlice';
import ModalDragActividades2 from './ModalDragActividades2';


export default function ResEspeCrearActividad(props) {
    let valor;
    let ActividadP, Actividad;
    const datosPropuestas = useSelector((state) => state.Propuestas);
    const dispatch = useDispatch();
    const datosActividades = useSelector((state) => state.Actividades);
    const datosResponsablePlanMejora = useSelector((state) => state.ResponsablePlanMejora);
    const [cookies, setCookie] = useCookies();
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [evidencia, setEvidencia] = useState('');
    const [responsable, setResponsable] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const [guardando, setGuardando] = useState(false);
    const [botonColor, setBotonColor] = useState("#ADADAD");
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [mostrarModal, setmostrarModal] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);
    const [seleccionados, setSeleccionados] = useState([]);
    const [token, setToken] = useState();

    console.log("datosActividades")
    console.log(datosActividades)
    //const datosCuenta = useSelector((state) => state.Cuenta);
    //const datosPlanMejora = useSelector((state) => state.PlanesMejora);
    console.log(datosResponsablePlanMejora)
    useEffect(() => {
        console.log(datosActividades.descripcionActividad)
        console.log(datosActividades.evidenciaActividad)
        setDescripcion(datosActividades.descripcionActividad);
        setEvidencia(datosActividades.evidenciaActividad);
        //props.cambiarBanderaIndicador(false);

        //dispatch(addBanderaIndicador(false));
    }, []);
    const handleChange = (e) => {
        const { name, value } = e?.target || {};
        let descripcion2= descripcion.trim();
    let evidencia2 = evidencia.trim();
    let responsable2 = responsable.trim();


        switch (name) {
            case "codigo":
                setCodigo(value);
                break;
            case "descripcion":
                setDescripcion(value);
                
                descripcion2 = value.trim();
                break;
            case "evidencia":
                setEvidencia(value);
                evidencia2=value.trim();
                break;
            case "responsable":
                setResponsable(value);
                responsable2=value.trim();
                break;
        }
        if (descripcion2.length > 0 && evidencia2.length > 0 && responsable2.length>0) {
            setBotonColor("#042354");
            setGuardando(true);
            setBotonHabilitado(true)
            valor = 1;

        } else {
            setBotonColor("#ADADAD");
            setGuardando(false);
            setBotonHabilitado(false)
            valor = 0;
        }

        return valor;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
    };
    const handleButtonClick = () => {
        valor = handleChange();
        if (valor) {
            setmostrarModal(true);
        } else {
            setmostrarModal(false);
        }
    };
    const handleModalClose = () => {
        setmostrarModal(false);
    };
    const handleModalCloseEliminar = async () => {
        setmostrarModal2(false)
    };

    // const handleButtonGuardar = async () => {
    //     setColor("#042354");
    //     valor = validarCampos();
    //     if (valor) {
    //         setmostrarModal(true);
    //     } else {
    //         setmostrarModal(false);
    //     }
    // };
    const handleButtonCargar = () => {
        setOpenModal(true);
    }

    const handleButtonAñadir = () => {
        setColor("#FFFFFF");
        setColorTexto("#000000");

        let Actividad = {
            idActividad: "",
            codigo: "",
            descripcion: descripcion,
            evidencia: evidencia,
            estado: "",
            responsable: "",
            Actividades: datosActividades.Actividades,
            banderaVerActividad: false
        }
        dispatch(addDatosActividades(Actividad));
        console.log();
        props.cambiarComponentePlanMejora3(false);
        props.cambiarComponentePlanMejora8(true);

    };


    const insertarActividad = async () => {

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            //idMuestraMedicion: datosMedicion.idMuestraMedicion
            idPropuesta: datosPropuestas.idPropuesta,
            codigo: codigo.trim(),
            descripcion: descripcion.trim(),
            evidencia: evidencia.trim(),
            responsable: responsable.trim(),

        }
        console.log("INSERTANDO :")
        console.log(data)

        try {
            const respuesta = await axios.post("http://localhost:3050/api/actividad/insertarActividad", data, config);
            console.log("cambiosPlan")
            console.log(respuesta.data)
            if (respuesta.data.success) {

                props.cambiarComponentePlanMejora1(false);
                props.cambiarComponentePlanMejora2(false);
                props.cambiarComponentePlanMejora3(false);
                props.cambiarComponentePlanMejora4(false);
                props.cambiarComponentePlanMejora5(true);
                props.cambiarComponentePlanMejora6(false);
                props.cambiarComponentePlanMejora7(false);
            }

            /* setTimeout(() => {
                 handleButtonClick() // llamamos a la función handleButtonClick una vez que el estado se ha actualizado y el modal se ha cerrado
             }, 0);*/
        } catch (error) {
            console.log(error)
        }
        // handleButtonClick()

    }

    const handleModalAceptar = async () => {
        console.log("AÑADIR INGRESA AQUI");
        ActividadP = {
            codigo: codigo.trim(),
            descripcion: descripcion.trim(),
            evidencia: evidencia.trim(),
            responsable: responsable.trim(),
        };

        if (props.esSeguimiento && props.modificaPropuesta) {


            insertarActividad()

        } else {

            const nuevasActividades = [...datosActividades.Actividades, ActividadP];

            Actividad = {
                idActividad: "",
                codigo: "",
                descripcion: "",
                evidencia: "",
                estado:"",
                responsable: "",
                Actividades: nuevasActividades
            };
            console.log("Actividad")
            console.log(Actividad)
            dispatch(addDatosActividades(Actividad));

            props.cambiarComponentePlanMejora2(true);
            props.cambiarComponentePlanMejora3(false);
        }
    };

    return (

        <div className="contenedorPrincipalRECA">
            <br></br>
            <div className="contenedorDatosSuperioresRECA">
                {/* <br></br>
                <div className="contenedorCodigoRECA">
                    <label className="codigoRECA" htmlFor="codigo"> Código*</label>
                    <input className="form-control1AAF inputAAF" type="text" name="codigo"
                        value={codigo} onChange={handleChange}
                        style={{ height: "27px", width: "80%" }} />
    </div>*/}
                <br></br>
                <div className="contenedorActividadRECA">
                    <label className="labelGen actividadRECA" htmlFor="nombre"> Actividad*</label>
                    <textarea className="inputActivoGen inputDisRCA"
                        type="text" name="descripcion"
                        value={descripcion} onChange={handleChange}
                        style={{ width: "80%", height: "20%" }} />
                </div>
                <br></br>
                <div className="contenedorResponsableRECA">
                    <label className="labelGen responsableRECA" htmlFor="responsable"> Responsable*</label>
                    <textarea className="inputActivoGen inputDisRCA"
                        type="text" name="responsable"
                        value={responsable}
                         onChange={handleChange}
                        style={{ height: "80%", width: "80%" }} />
                   
                </div>
                <br></br>

                <div className="contenedorEvidenciaRECA">
                    <label className="labelGen evidenciaRECA" htmlFor="evidencia"> Tipo de evidencia*</label>
                    <textarea className="inputActivoGen inputDisRCA" type="text" name="evidencia"
                        value={evidencia} onChange={handleChange}
                        style={{ height: "80%", width: "80%" }} />

                    {/*
                         <div className="contenedor-botonesREAC2">
                        <div className="botonesSuperioresREAC2">
                            <div className="btnAniadirREAC btnAniadirREAC2">
                                <button style={{ backgroundColor: "#042354" }} onClick={handleButtonCargar}>
                                    Cargar
                                </button>
                            </div>

                    
                        </div>
    </div>*/}
                </div>


            </div>
            <form onSubmit={handleSubmit} className="contDatosAI ">
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea registrar la nueva actividad?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonCancelarAI" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarAI" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
                <br></br>

                <div className='contGuardarCA'>
                    <div className="btnDivDisenio ">
                        <button className="btnDisenio btnGuardarCA" type="button"
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                            style={{ backgroundColor: botonColor }} onClick={handleButtonClick} disabled={!botonHabilitado}>
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
            <br></br>
            {/*openModal && <ModalDragActividades2 closeModal={setOpenModal} />*/}

        </div>

    );

}
