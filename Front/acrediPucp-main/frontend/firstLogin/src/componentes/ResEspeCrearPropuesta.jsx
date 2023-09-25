import '../HojasDeEstilo/ResEspeCrearPropuesta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/TablasFront.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
// import { Table } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';
import { vaciarDatosResponsablePlanMejora} from '../Redux/ResponsablePlanMejoraSlice';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addDatosCuenta, addRoles, addNombreCuenta, addApellidoPCuenta, addApellidoMCuenta, addFoto } from "../Redux/CuentaSlice";
import { Modal, Button } from 'react-bootstrap';
import { getData, columns, formatRowData } from "./DataCompetencia";
import { Table } from 'react-bootstrap';
import Pagination from "./pagination/pagination";
import { addDatosPropuestas } from '../Redux/PropuestaSlice';
import { addDatosActividades, vaciarDatosActividades,vaciarDatosActividadesSinArreglo,limpiaEvidencia } from '../Redux/ActividadesSlice';

export default function ResEspeCrearPropuesta(props) {
    const datosPlanMejora = useSelector((state) => state.PlanesMejora);
    let valor;
    let PropuestaP, Propuesta;
    const dispatch = useDispatch();
    const datosPropuestas = useSelector((state) => state.Propuestas);
    const datosActividades = useSelector((state) => state.Actividades);
    const [cookies, setCookie] = useCookies();
    const [codigo2, setCodigo2] = useState('');
    const [habilitado,setHabilitado]=useState(false)
    const [descripcion, setDescripcion] = useState('');
    const [colorBotonEliminar,setColorBotonEliminar] = useState("#ADADAD");
    const [guardando, setGuardando] = useState(false);
    const [botonColor, setBotonColor] = useState("#ADADAD");
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [mostrarModal, setmostrarModal] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);
    const [seleccionados, setSeleccionados] = useState([]);
    const [token, setToken] = useState();
    const [inputBorderCodigo, setInputBorderCodigo] = useState('#000000');
    const [inputBorderDescripcion, setInputBorderDescripcion] = useState('#000000');
    const [colorBoton, setColorBoton] = useState("#042354");


    useEffect(() => {
        if(seleccionados.length === 0){
            console.log("GRIS")
            setColorBotonEliminar("#ADADAD");
            setHabilitado(false)
        }else{
            setColorBotonEliminar("rgb(158, 5, 32)");
            console.log("ROJO")
            setHabilitado(true)
        }
    }, [seleccionados]);
    //const datosCuenta = useSelector((state) => state.Cuenta);
    //const datosPlanMejora = useSelector((state) => state.PlanesMejora);
    useEffect(() => {
        if(codigo2.trim().length !== 0 && 
        descripcion.trim().length !== 0){
            setColorBoton("#042354");
        }else{
            setColorBoton("#ADADAD");
        }
        if(codigo2.trim().length !== 0){
            setInputBorderCodigo('#000000');
        }
        if(descripcion.trim().length !== 0){
            setInputBorderDescripcion('#000000');
        }
    }, [codigo2, descripcion]);

    useEffect(() => {
        setDescripcion(datosPropuestas.descripcionPropuesta);
        setCodigo2(datosPropuestas.codigoPropuesta);
        console.log("datosPropuestas en useEffct")

        if (datosPropuestas.codigoPropuesta != "" && datosPropuestas.descripcionPropuesta != "") {
            setBotonColor("#042354");
            setGuardando(true);

            setBotonHabilitado(true);
            valor = 1;
        }
        //props.cambiarBanderaIndicador(false);

        //dispatch(addBanderaIndicador(false));
    }, []);
    const handleChange = (e) => {
        const { name, value } = e?.target || {};

        let descripcion2 = descripcion.trim();
        let codigo3 = codigo2.trim();
        switch (name) {
            case "codigo":
                setCodigo2(value);
                codigo3=value.trim()
                break;
            case "descripcion":
                setDescripcion(value);
                descripcion2=value.trim()
                break;
        }
        if (codigo3.length > 0 && descripcion2.length > 0) {
            setBotonColor("#042354");
            setGuardando(true);
            setBotonHabilitado(true);
            valor = 1;

        } else {
            setBotonColor("#ADADAD");
            setGuardando(false);
            setBotonHabilitado(false);
            valor = 0;
        }

        return valor;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const handleButtonClick = async () => {
        console.log("RAAAAAAAA1")
        if(codigo2.trim().length == 0){
            setInputBorderCodigo("red");
            console.log("RAAAAAAAA2")
        }
        if(descripcion.trim().length == 0){
            setInputBorderDescripcion("red");
            console.log("RAAAAAAAA3")
        }
        valor = handleChange();
        if (valor) {
            if(codigo2.trim().length != 0 && descripcion.trim().length != 0){
                setmostrarModal(true);
                console.log("RAAAAAAAA4")
            }else{
                setmostrarModal(false);
                console.log("RAAAAAAAA5")
            }
        } else {
            setmostrarModal(false);
            console.log("RAAAAAAAA6")
        }
    };
    const handleModalClose = () => {
        setmostrarModal(false);
    };
    const handleModalAceptarEliminar = () => {
        const nuevasActividades = datosActividades.Actividades.filter(
            (_, index) => !seleccionados.includes(index)
        );

        // Actualizar el estado de los indicadores
        setSeleccionados([]);
        // Actualizar el estado de los indicadores en el componente padre
        // o realizar la acción correspondiente para actualizar los datos en el estado global

        console.log("Actividades antes de eliminar:", datosActividades.Actividades);
        console.log("Elementos seleccionados:", seleccionados);

        // Eliminar los elementos seleccionados del arreglo
        const nuevosDatosActividades = {
            ...datosActividades,
            Actividades: nuevasActividades
        };
        let Actividad = {
            idActividad: "",
            codigoActividad: "",
            descripcionActividad: "",
            evidenciaActividad: "",
            estado:"",
            responsableActividad: "",
            Actividades: nuevasActividades
        };

        dispatch(addDatosActividades(Actividad));
        // Aquí puedes realizar la acción correspondiente para actualizar los datos
        // en el estado global utilizando Redux u otra solución similar
        // dispatch(actualizarDatosIndicador(nuevosDatosIndicador));

        console.log("Indicadores después de eliminar:", nuevasActividades);
        setmostrarModal2(false)
    };
    const handleModalCloseEliminar = async () => {
        setmostrarModal2(false)
    };
    const aniadePropuestaRedux = async (Propuesta) => {
        dispatch(addDatosPropuestas(Propuesta));
    };
    const handleButtonAñadir = () => {
        let Propuesta = {
            idPropuesta: "",
            codigo: codigo2.trim(),
            descripcion: descripcion.trim(),
            actividades: [],
            Propuestas: datosPropuestas.Propuestas,
        };
        dispatch(vaciarDatosActividadesSinArreglo())
        dispatch(vaciarDatosResponsablePlanMejora())
        dispatch(limpiaEvidencia(""))
        aniadePropuestaRedux(Propuesta);
        setColor("#FFFFFF");
        setColorTexto("#000000");
        props.cambiarComponentePlanMejora1(false);
        props.cambiarComponentePlanMejora2(false);
        props.cambiarComponentePlanMejora3(true);
    };
    const handleButtonElimina = () => {
        setmostrarModal2(true);
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
    const handleCheckboxChange = (index) => {
        if (seleccionados.includes(index)) {
            setSeleccionados(seleccionados.filter((item) => item !== index));
        } else {
            setSeleccionados([...seleccionados, index]);
        }
    };

    const insertarPropuesta = async () => {

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            //idMuestraMedicion: datosMedicion.idMuestraMedicion
            idPlanMejora: datosPlanMejora.idPlanMejora,
            codigo: codigo2.trim(),
            descripcion: descripcion.trim(),
            Actividades: PropuestaP.actividades

        }
        console.log("INSERTANDO :")
        console.log(data)

        try {
            const respuesta = await axios.post("http://localhost:3050/api/propuesta/insertarPropuesta", data, config);
            console.log("cambiosPlan")
            console.log(respuesta.data)

            if (respuesta.data.success) {
                props.cambiarComponentePlanMejora1(false);
                props.cambiarComponentePlanMejora2(false);
                props.cambiarComponentePlanMejora3(false);
                props.cambiarComponentePlanMejora4(true);
                props.cambiarComponentePlanMejora5(false);
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
        PropuestaP = {
            codigo: codigo2.trim(),
            descripcion: descripcion.trim(),
            actividades: datosActividades.Actividades
        };

        if (props.esSeguimiento) {

            insertarPropuesta()




        } else {

            console.log("DatosPropuesta")
            console.log(datosPropuestas)
            const nuevasPropuestas = [...datosPropuestas.Propuestas, PropuestaP];

            Propuesta = {
                idPropuesta: "",
                codigo: "",
                descripcion: "",
                actividades: [],
                Propuestas: nuevasPropuestas
            };
            console.log("Propuesta")
            console.log(Propuesta)
            dispatch(addDatosPropuestas(Propuesta));

            props.cambiarComponentePlanMejora1(true);
            props.cambiarComponentePlanMejora2(false);
        }

    };

    return (

        <div className="contenedorPrincipalRECP">
            <div className="contenedorDatosSuperioresRECP">
                <div className="contenedor-codigoRECP">
                    <div className="labelGen codigoRECP">Código *</div>
                    <input className="inputActivoGen " type="text" name="codigo"
                        value={codigo2} onChange={handleChange}
                        style={{ height: "27px", width: "80%" , borderColor: inputBorderCodigo}} />
                </div>
                <br></br>
                <div className="contenedor-descripcionRECP">
                    <div className="labelGen descripcionRECP">Descripción *</div>
                    <input className="inputActivoGen form-control2RECP inputMenosPad"
                        type="text" name="descripcion"
                        value={descripcion} onChange={handleChange}
                        style={{ width: "80%" , borderColor: inputBorderDescripcion}} />
                </div>
            </div>

            <div className="contenedor-indicadoresRECP">

                <div className="contIndicRECP">
                    <h2 className="tituloGen tituloTipo3">Actividades</h2>

                    <div className="contenedor-botonesRECP">
                        <div className="botonesSuperioresRECP">
                            <div className=" btnDivDisenio ">
                                <button className='btnDisenio btnAniadirRECP' onClick={handleButtonAñadir} >
                                    Añadir
                                </button>
                            </div>
                            <div className="btnDivDisenio ">
                                <button style={{ background:colorBotonEliminar}}  className='btnDisenio btnEliminarRECP' onClick={handleButtonElimina} disabled={!habilitado} >
                                    Eliminar
                                </button>

                            </div>
                        </div>
                    </div>
                    {datosActividades.Actividades.length === 0 ? (

                        <div className="contenedor-indicadores-rellenoREAC">
                            Todavía no se han creado actividades para esta propuesta.
                        </div>

                    ) : (
                        <div className="contenedorTablaF contTablaCP">
                            <Table className='tablaF' bordered hover>
                                <thead>
                                    <tr className="ColumnaREAC" style={{ textAlign: "center" }}>
                                        <th className="SeleccionREAC">Seleccion</th>
                                        <th className="NombreREAC">Actividad</th>
                                        <th className="NombreREAC">Responsable</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosActividades.Actividades && datosActividades.Actividades.map((e, index) => (
                                        <tr key={index}>
                                            <td className="filaREAC">
                                                <input
                                                    type="checkbox"
                                                    checked={seleccionados.includes(index)}
                                                    onChange={() => handleCheckboxChange(index)} />
                                            </td>
                                            <td className="filaREAC" style={{textAlign: "center"}}>{e.descripcion}</td>
                                            <td className="filaREAC" style={{textAlign: "center"}}  >{e.responsable}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
            <form onSubmit={handleSubmit} className="contDatosAI">
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea registrar la nueva propuesta?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonCancelarAI" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarAI" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
            </form>
            <div className='contGuardarFinal'>
                <div className="btnDivDisenio  ">
                    <button className="btnDisenio" type="button"
                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                        style={{ backgroundColor: colorBoton }} onClick={handleButtonClick}>
                        Guardar
                    </button>
                </div>
            </div>
            <Modal show={mostrarModal2} onHide={handleModalCloseEliminar}>
                <Modal.Body >
                    <p>¿Está seguro que desea eliminar las filas seleccionadas?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="botonModal btnDisenio botonCancelarRECPM" onClick={handleModalCloseEliminar}>
                        Cancelar</Button>
                    <Button className="botonModal btnDisenio botonAceptarRECPM" onClick={handleModalAceptarEliminar}>
                        Aceptar</Button>
                </Modal.Footer>
            </Modal>
        </div>

    );

}
