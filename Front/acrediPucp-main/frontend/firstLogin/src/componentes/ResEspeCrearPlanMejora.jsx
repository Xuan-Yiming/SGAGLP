import '../HojasDeEstilo/ResEspeCrearPlanMejora.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/TablasFront.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
// import { Table } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addDatosCuenta, addRoles, addNombreCuenta, addApellidoPCuenta, addApellidoMCuenta, addFoto } from "../Redux/CuentaSlice";
import { Modal, Button } from 'react-bootstrap';
import { getData, columns, formatRowData } from "./DataCompetencia";
import { Table } from 'react-bootstrap';

import Pagination from "./pagination/pagination";
import { addDatosPropuestas, limpiaCodigo, limpiaDescripcion } from '../Redux/PropuestaSlice';
import { addDAtosActividades, vaciarDatosActividades } from '../Redux/ActividadesSlice';
import { vaciarDatosResponsablePlanMejora} from '../Redux/ResponsablePlanMejoraSlice';
import { addDatosPlanMejora } from '../Redux/PlanMejoraSlice';
import { useLocalStorage } from './useLocalStorage';

export default function ResEspeCrearPlanMejora(props) {

    const dispatch = useDispatch();
    const datosActividades = useSelector((state) => state.actividades);
    const datosPropuestas = useSelector((state) => state.Propuestas);
    const datosCuenta = useSelector((state) => state.Cuenta);
    const datosPlanMejora = useSelector((state) => state.PlanesMejora);
    
    let valor;
    const [mensajeError, setMensajeError] = useState(false);
    const [mostrarModal3, setmostrarModal3] = useState(false);
    const [cookies, setCookie] = useCookies();
    const [codigo, setCodigo] = useState('');
    const [habilitado,setHabilitado]=useState(false)
    const [descripcion, setDescripcion] = useState('');
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [mostrarModal, setmostrarModal] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);
    const [seleccionados, setSeleccionados] = useState([]);
    const [token, setToken] = useState();
    const [colorBotonEliminar,setColorBotonEliminar] = useState("#ADADAD");
    const [inputBorderCodigo, setInputBorderCodigo] = useState('#000000');
    const [inputBorderDescripcion, setInputBorderDescripcion] = useState('#000000');
    const [colorBoton, setColorBoton] = useState("#042354");

    const [idE, setIdE] = useLocalStorage("id");

    useEffect(() => {
        if(seleccionados.length === 0){
            setColorBotonEliminar("#ADADAD");
            setHabilitado(false)
        }else{
            setColorBotonEliminar("rgb(158, 5, 32)");
            setHabilitado(true)
        }
    }, [seleccionados]);

    useEffect(() => {
        if(codigo.trim().length !== 0 && 
        descripcion.trim().length !== 0){
            setColorBoton("#042354");
        }else{
            setColorBoton("#ADADAD");
        }
        if(codigo.trim().length !== 0){
            setInputBorderCodigo('#000000');
        }
        if(descripcion.trim().length !== 0){
            setInputBorderDescripcion('#000000');
        }
    }, [codigo, descripcion]);


    useEffect(() => {
        setDescripcion(datosPlanMejora.descripcionPlanMejora);
        setCodigo(datosPlanMejora.codigoPlanMejora);
        setBotonHabilitado(datosPlanMejora.botonHabilitado);
        console.log("datosPropuestas en useEffct")
        console.log(datosPropuestas)
        dispatch(vaciarDatosActividades())
        console.log("voya vaciar")
        dispatch(vaciarDatosResponsablePlanMejora())
        //props.cambiarBanderaIndicador(false);

        //dispatch(addBanderaIndicador(false));
    }, []);

    const handleCheckboxChange = (index) => {
        if (seleccionados.includes(index)) {
            setSeleccionados(seleccionados.filter((item) => item !== index));
        } else {
            setSeleccionados([...seleccionados, index]);
        }
    };
    
    const handleModalClose3 = () => {
        setmostrarModal3(false);
    };
    const handleButtonElimina = () => {
        setmostrarModal2(true);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const handleChangeCodigo = (event) => {
        setCodigo(event.target.value);
        validarCampos(codigo, descripcion);
    };

    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
        validarCampos(codigo, descripcion);
    };

    const validarCampos = (valorCodigo, valorDescripcion) => {
        if (valorCodigo !== '' && valorDescripcion !== '') {
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
    };
    const handleModalAceptar = async () => {
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            fidEspecialidad: idE,
            codigo: codigo.trim(),
            descripcion: descripcion.trim(),
            Propuestas: datosPropuestas.Propuestas
        }
        console.log("AQUI ESTA LA DATAAAAAAA");
        console.log(data);
        console.log("AQUI ESTA LA DATAAAAAAA");
        var errorMessage = "";
        var mensajeCompleto = "";
        try {

            const respuesta = await axios.post("http://localhost:3050/api/planMejora/insertarPlanMejora", data, config);
            console.log(respuesta.data);
            if (respuesta.data.success){
                toast.success('Plan de Mejora creado correctamente.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                props.cambiarComponentePlanMejora1(false);
                console.log("AQUI SI ACEPTA");
            }else{
                //setMensajeError(respuesta.data.error.message);
                errorMessage = respuesta.data.error.message;
                mensajeCompleto = "Error: " + errorMessage;
                toast.error(mensajeCompleto, {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setmostrarModal(false)
                //setmostrarModal3(true);
                
                console.log("AQUI NO ACEPTA");
            }
            
        } catch (error) {
            console.log(error)
        }
        
    };
    const handleModalAceptarEliminar = () => {
        const nuevasPropuestas = datosPropuestas.Propuestas.filter(
            (_, index) => !seleccionados.includes(index)
        );

        // Actualizar el estado de los indicadores
        setSeleccionados([]);
        // Actualizar el estado de los indicadores en el componente padre
        // o realizar la acción correspondiente para actualizar los datos en el estado global

        console.log("Propuestas antes de eliminar:", datosPropuestas.Propuestas);
        console.log("Elementos seleccionados:", seleccionados);

        // Eliminar los elementos seleccionados del arreglo
        const nuevosDatosPropuestas = {
            ...datosPropuestas,
            Propuestas: nuevasPropuestas
        };
        let Propuesta = {
            idPropuesta: "",
            codigoPropuesta: "",
            descripcionPropuesta: "",
            actividades: [],
            Propuestas: nuevasPropuestas
        };

        dispatch(addDatosPropuestas(Propuesta));
        // Aquí puedes realizar la acción correspondiente para actualizar los datos
        // en el estado global utilizando Redux u otra solución similar
        // dispatch(actualizarDatosIndicador(nuevosDatosIndicador));

        console.log("Indicadores después de eliminar:", nuevasPropuestas);
        setmostrarModal2(false)
    };
    const handleModalCloseEliminar = async () => {
        setmostrarModal2(false)
    };
    const aniadePlanMejoraRedux = async (PlanMejora) => {
        dispatch(addDatosPlanMejora(PlanMejora));
        dispatch(limpiaCodigo(""));
        dispatch(limpiaDescripcion(""));
    };
    const handleButtonAñadir = () => {
        let PlanMejora = {
            idPlanMejora: "",
            codigoPlanMejora: codigo.trim(),
            descripcionPlanMejora: descripcion.trim(),
            botonHabilitado: botonHabilitado
        };
        
        aniadePlanMejoraRedux(PlanMejora);

        setColor("#FFFFFF");
        setColorTexto("#000000");
        props.cambiarComponentePlanMejora1(false);
        props.cambiarComponentePlanMejora2(true);
        props.seguimiento(false);
        props.modifica(false);
    };

    const handleButtonGuardar = async () => {
        setColor("#042354");
        valor = validarCampos();
        if(codigo.trim().length == 0){
            setInputBorderCodigo("red");
        }
        if(descripcion.trim().length == 0){
            setInputBorderDescripcion("red");
        }
        if (valor) {
            if(codigo.trim().length !== 0 && 
            descripcion.trim().length !== 0){
                setmostrarModal(true);
            }else{
                setmostrarModal(false);
            }
        } else {
            setmostrarModal(false);
        }
    };
    return (

        <div className="contenedorPrincipalRECPM" >
            <div className="contenedorDatosSuperioresRECPM">
                <div className="contenedor-codigoRECPM">
                    <div className="labelGen codigoRECPM">Código *</div>
                    <input className=" inputActivoGen" type="text" name="codigo"
                        value={codigo} onChange={handleChangeCodigo}
                        style={{ height: "27px", width: "80%" , borderColor: inputBorderCodigo}} />
                </div>
                <br></br>
                <div className="contenedor-descripcionRECPM">
                    <div className="labelGen descripcionRECPM">Descripción *</div>
                    <input className=" inputActivoGen inputRECPM form-control2RECPM"
                        type="text" name="descripcion"
                        value={descripcion} onChange={handleChangeDescripcion}
                        style={{ width: "80%", borderColor: inputBorderDescripcion}} />
                </div>
            </div>

            <div className="contenedor-indicadoresRECPM">

                <div className="contIndicRECPM">
                    <h2 className="  tituloGen tituloTipo3">Propuestas</h2>

                    <div className="contenedor-botonesRECPM">
                        <div className="botonesSuperioresRECPM">
                            <div className="btnDivDisenio ">
                                <button className='btnDisenio btnAniadirRECPM' onClick={handleButtonAñadir} >
                                    Añadir
                                </button>
                            </div>
                            <div className="btnDivDisenio ">
                                <button style={{ background:colorBotonEliminar}} className='btnDisenio btnEliminarRECPM' onClick={handleButtonElimina} disabled={!habilitado} >
                                    Eliminar
                                </button>

                            </div>
                        </div>
                    </div>
                    {datosPropuestas.Propuestas.length === 0 ? (

                        <div className="contenedor-indicadores-rellenoRECPM">
                            Todavía no se han creado propuestas para este plan de mejora.
                        </div>

                    ) : (
                        <div className="contenedorTablaF contTablaCPM">
                            <Table className='tablaF' bordered hover>
                                <thead>
                                    <tr className="ColumnaRECPM" style={{ textAlign: "center" }}>
                                        <th className="SeleccionRECPM">Seleccion</th>
                                        <th className="CodigoRECPM">Código</th>
                                        <th className="NombreRECPM">Propuesta</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosPropuestas.Propuestas && datosPropuestas.Propuestas.map((e, index) => (
                                        <tr key={index}>
                                            <td className="filaRECPM">
                                                <input
                                                    type="checkbox"
                                                    checked={seleccionados.includes(index)}
                                                    onChange={() => handleCheckboxChange(index)} />
                                            </td>
                                            <td className="filaRECPM">{e.codigo}</td>
                                            <td className="filaRECPM">{e.descripcion}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
            <form onSubmit={handleSubmit} className="contDatosRECPM">
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea registrar el nuevo plan de mejora?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonCancelarRECPM" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarRECPM" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={mostrarModal3} onHide={handleModalClose3}>
                    <Modal.Body >
                        <p>{mensajeError}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonAceptarAC" onClick={handleModalClose3}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
            </form>
            <div className="contGuardarFinal">
                <div className="btnDivDisenio">
                    <button className='btnDisenio btnGuardarRECPM' onClick={handleButtonGuardar} style={{ background: colorBoton }}>
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
