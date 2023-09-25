import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../HojasDeEstilo/ResEspeAñadirCompetencia.css'
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import "../HojasDeEstilo/Reusable/TablasFront.css";
import { useState } from 'react';   //para hooks estados
import { Button, Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect } from 'react';
import { addDatosCompetencias } from '../Redux/CompetenciasSlice';
import { addDatosIndicadores } from '../Redux/IndicadoresSlice';
import { addBanderaIndicador,addIndex,addBandera2 } from '../Redux/IndicadoresSlice';
import { addBanderaGuardandoCambios } from '../Redux/CargandoSlice';
import { addDatosDetalle } from '../Redux/ProgramaSlice';
import { addIdEspecialidad } from '../Redux/CuentaSlice';
import { useDispatch } from "react-redux";
import { useLocalStorage } from './useLocalStorage';

export default function ResEspeAñadirCompetencia(props) {
    let valor;

    const [cookies, setCookie] = useCookies();
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [evidencia, setEvidencia] = useState('');
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [mostrarModal, setmostrarModal] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);
    const [seleccionados, setSeleccionados] = useState([]);
    const [token, setToken] = useState();
    const [niveles, setNivels] = useLocalStorage("niveles", "");
    const [mostrarModal3, setmostrarModal3] = useState(false);
    const [mensajeError, setMensajeError] = useState(false);
    const [inputBorderColorCodigo, setInputBorderColorCodigo] = useState("black");
    const [inputBorderColorDescripcion, setInputBorderColorDescripcion] = useState("black");
    const [colorBoton, setColorBoton] = useState("#042354");
    const [idE, setIdE] = useLocalStorage("id")
    const dispatch = useDispatch();

    const [botonHabilitadoEliminar, setBotonHabilitadoEliminar] = useState(false);
    const [colorBotonEliminar,setColorBotonEliminar] = useState("#ADADAD");
    const datosIndicador = useSelector((state) => state.Indicadores);
    const datosCuenta = useSelector((state) => state.Cuenta);
    const datosCompetencia = useSelector((state) => state.Competencias);
    console.log(datosIndicador)

    useEffect(() => {
        if(codigo.trim().length !=0  && descripcion.trim().length !=0){
            setColorBoton("#042354");
        }else{
            setColorBoton("#ADADAD");
        }
        if(codigo.trim().length !=0){
            setInputBorderColorCodigo("black");
        }
        if(descripcion.trim().length !=0){
            setInputBorderColorDescripcion("black");
        }
    }, [codigo,descripcion]);
    
    useEffect(() => {
        if(seleccionados.length == 0){
            setColorBotonEliminar("#ADADAD");
            setBotonHabilitadoEliminar(false);
        }else{
            setColorBotonEliminar("#9E0520");
            setBotonHabilitadoEliminar(true);
        }
    }, [seleccionados]);

    useEffect(() => {
        setDescripcion(datosCompetencia.descripcionCompetencia);
        setCodigo(datosCompetencia.codigoCompetencia);
        setEvidencia(datosCompetencia.evidenciaCompetencia);
        setBotonHabilitado(datosCompetencia.botonHabilitado);
        props.cambiarBanderaIndicador(false);
        dispatch(addDatosDetalle(true));
        dispatch(addBanderaIndicador(false));
    }, []);

    const handleCheckboxChange = (index) => {
        if (seleccionados.includes(index)) {
            setSeleccionados(seleccionados.filter((item) => item !== index));
        } else {
            setSeleccionados([...seleccionados, index]);
        }
    };

    const handleButtonElimina = () => {
        setmostrarModal2(true);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const handleChangeCodigo = (event) => {
        setCodigo(event.target.value);
        //validarCampos(codigo, descripcion, evidencia);
    };

    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
        //validarCampos(codigo, descripcion, evidencia);
    };
    const handleChangeEvidencia = (event) => {
        setEvidencia(event.target.value);
        //validarCampos(codigo, descripcion, evidencia);
    };

    useEffect(() => {
        if (codigo !== "" && descripcion !== '') {
            setBotonHabilitado(true);
            valor = 1;
        } else {
            setBotonHabilitado(false);
            valor = 0;
        }
    }, [codigo, descripcion])

    const handleModalClose = () => {
        setmostrarModal(false);
    };

    const handleModalClose3 = () => {
        setmostrarModal3(false);
    };

    const hasDuplicates = (array) => {
        const codigoSet = new Set();
        for (let obj of array) {
            if (codigoSet.has(obj.codigo.trim())) {
                return true;
            }
            codigoSet.add(obj.codigo.trim());
        }
        return false;
    }

    const handleModalAceptar = async () => {

        dispatch(addBanderaGuardandoCambios(false));

        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            fidEspecialidad: datosCuenta.idEspecialidad,
            codigo: codigo,
            descripcion: descripcion,
            Indicadores: datosIndicador.Indicadores,
            evidencia: ""
        }
        var errorMessage = "";
        var mensajeCompleto = "";
        if (hasDuplicates(datosIndicador.Indicadores)) {
            setMensajeError("Hay indicadores con codigos repetidos");
            setmostrarModal3(true);
            setmostrarModal(false);
        } else {
            console.log("AQUI ESTA LA DATAAAAAAA");
            console.log(data);
            console.log("AQUI ESTA LA DATAAAAAAA");
            
        try {
                const respuesta = await axios.post("http://localhost:3050/api/competencia/insertarCompetencia", data, config);
                console.log(respuesta.data);
                if (respuesta.data.success) {
                    setmostrarModal(false);
                    toast.success('Competencia creada correctamente.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    props.cambiarComponente(false);
                    
        props.cambiarComponente(false);
                } else {
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
                    //setmostrarModal3(true);
                    setmostrarModal(false);
                }
            } catch (error) {
                console.log(error)
            }
        }
        dispatch(addBanderaGuardandoCambios(true));
        
    };

    const handleModalAceptarEliminar = () => {
        const nuevosIndicadores = datosIndicador.Indicadores.filter(
            (_, index) => !seleccionados.includes(index)
        );

        // Actualizar el estado de los indicadores
        setSeleccionados([]);
        // Actualizar el estado de los indicadores en el componente padre
        // o realizar la acción correspondiente para actualizar los datos en el estado global

        console.log("Indicadores antes de eliminar:", datosIndicador.Indicadores);
        console.log("Elementos seleccionados:", seleccionados);

        // Eliminar los elementos seleccionados del arreglo
        const nuevosDatosIndicador = {
            ...datosIndicador,
            Indicadores: nuevosIndicadores
        };
        let Indicador = {
            idIndicador: "",
            codigo: "",
            descripcion: "",
            rubricas: [],
            Indicadores: nuevosIndicadores
        };

        dispatch(addDatosIndicadores(Indicador));
        // Aquí puedes realizar la acción correspondiente para actualizar los datos
        // en el estado global utilizando Redux u otra solución similar
        // dispatch(actualizarDatosIndicador(nuevosDatosIndicador));

        console.log("Indicadores después de eliminar:", nuevosIndicadores);
        setmostrarModal2(false)
    };
    const handleModalCloseEliminar = async () => {
        setmostrarModal2(false)
    };
    const aniadeCompetenciaRedux = async (Competencia) => {
        dispatch(addDatosCompetencias(Competencia));
    };
    const handleButtonAñadir = () => {
        
        dispatch(addBandera2(false))
        let Competencia = {
            idCompetencia: "",
            codigoCompetencia: codigo,
            descripcion: descripcion,
            evidencia: "",
            botonHabilitado: botonHabilitado
        };
        // console.log("AQUIIIIII COMPETENCIAaaaaa");
        // console.log(Competencia);
        // console.log("AQUIIIIII COMPETENCIAaaaaa");
        aniadeCompetenciaRedux(Competencia);
        setColor("#FFFFFF");
        setColorTexto("#000000");
        props.cambiarComponente(false);
        props.cambiarComponente2(true);
    };

    const handleButtonGuardar = async () => {
        setColor("#042354");
        if(codigo.trim().length !=0  && descripcion.trim().length !=0){
            setmostrarModal(true);
        }else{
            setmostrarModal(false);
        }
        if(codigo.trim().length ==0){
            setInputBorderColorCodigo("red");
        }
        if(descripcion.trim().length ==0){
            setInputBorderColorDescripcion("red");
        }
    };


    const ConsultaParametros = async () => {

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }


        //console.log("ESTE ES EL ID ENVIADO " + idEnviado);
        const data = {
            idEspecialidad: idE,
            idIndicador: ""
        }
        //console.log("configuracion:")
        //console.log(config);

        console.log("data:")
        console.log(data);

        //await funcionTry(data,config,posicion);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/indicador/listarParametrosIndicador", data, config);
            // console.log("configuracion:")
            // setDatosTablaMedcion(respuesta.data.data);

            console.log("PARAMETROS ACTUALES AQUI")
            console.log(respuesta.data)
            //   setIndicadores(respuesta.data.data)
            //  await pushear(respuesta.data.data)
            //  setValido(respuesta.data.success)

            setNivels(respuesta.data.parametros[0].niveles)
            console.log(niveles)

            // setBanderaCI(true);
        } catch (error) {
            //console.log(error)
        }




    }

    useEffect(() => {


        ConsultaParametros()

    }, [])


    const veDetalleIndicador=(index)=>{

        dispatch(addIndex(index))
        dispatch(addBandera2(true))
        props.cambiarComponente(false);
        props.cambiarComponente2(true);



    }

    return (

        <div className="contenedorPrincipalREAC">
            <div className="contenedorDatosSuperioresREAC">

                <div className="contenedor-descripcionREAC">
                    <div className=" labelGen descripcionREAC">Código *</div>
                    <input className="inputActivoGen" type="text" name="codigo"
                        value={codigo} onChange={handleChangeCodigo}
                        style={{ height: "27px", width: "80%" , borderColor: inputBorderColorCodigo}} placeholder='Código' />
                </div>

                <div className="contenedor-descripcionREAC">
                    <div className="labelGen descripcionREAC">Descripción *</div>
                    <input className="inputActivoGen"
                        type="text" name="descripcion"
                        value={descripcion} onChange={handleChangeDescripcion}
                        style={{ width: "80%" , borderColor: inputBorderColorDescripcion}} placeholder='Descripción' />
                </div>

                {/* <div className="contenedor-descripcionREAC">
                    <div className="labelGen evidenciaREAC">Evidencia *</div>
                    <input className="inputActivoGen"
                        type="text" name="evidencia"
                        value={evidencia} onChange={handleChangeEvidencia}
                        style={{ height: "27px", width: "80%" }} />
                </div> */}
            </div>



            <div className="contenedor-indicadoresREAC">

                <div className="contIndicREAC">
                    <h2 className="tituloIDsREAC tituloGen">Indicadores</h2>

                    <div className="contenedor-botonesREAC">
                        <div className="botonesSuperioresREAC">
                            <div className=" btnDivDisenio">
                                <button className="btnDisenio btnAniadirREAC" onClick={handleButtonAñadir} >
                                    Añadir
                                </button>
                            </div>
                            <div className="btnDivDisenio">
                                <button className="btnDisenio btnEliminarREAC" onClick={handleButtonElimina} style={{ background:colorBotonEliminar}} disabled={!botonHabilitadoEliminar}>
                                    Eliminar
                                </button>

                            </div>
                        </div>
                    </div>



                    {/* <label>
              Todavía no se han creado indicadores para esta competencia.
            </label> */}
                    {datosIndicador.Indicadores.length === 0 ? (

                        <div className="contenedor-indicadores-rellenoREAC">
                            Todavía no se han creado indicadores para esta competencia.
                        </div>

                    ) : (
                        <div className="contenedorTablaF contenedor-indicadores-rellenoREAC">
                            <Table className='tablaF' bordered hover>
                                <thead>
                                    <tr className="ColumnaREAC">
                                        <th className="SeleccionREAC">Seleccion</th>
                                        <th className="CodigoREAC">Código</th>
                                        <th className="NombreREAC">Indicador</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosIndicador.Indicadores.map((indicador, index) => (
                                        <tr key={index}>
                                            <td className="filaREAC">
                                                <input
                                                    type="checkbox"
                                                    checked={seleccionados.includes(index)}
                                                    onChange={() => handleCheckboxChange(index)} />
                                            </td>
                                            <td className="filaREAC" style={{cursor:"pointer"}} onClick={()=>veDetalleIndicador(index)}>{indicador.codigo}</td>
                                            <td className="filaREAC" style={{cursor:"pointer"}} onClick={()=>veDetalleIndicador(index)}>{indicador.descripcion}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}

                </div>
            </div>
            <form onSubmit={handleSubmit} className="contDatosREAC">
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea registrar la nueva competencia?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonCancelarREAC" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarREAC" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
            </form>
            <div className="contenedor-guardarREAC">

                <div className="btnDivDisenio btnGuardarCont">
                    <button className="btnDisenio btnGuardarREAC" onClick={handleButtonGuardar} style={{ background: colorBoton }}>
                        Guardar
                    </button>
                </div>
            </div>
            <Modal show={mostrarModal3} onHide={handleModalClose3}>
                <Modal.Body >
                    <p>{mensajeError}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="botonAceptarAC" onClick={handleModalClose3}>
                        Aceptar</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={mostrarModal2} onHide={handleModalCloseEliminar}>
                <Modal.Body >
                    <p>¿Está seguro que desea eliminar las filas seleccionadas?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="botonModal btnDisenio botonCancelarREAC" onClick={handleModalCloseEliminar}>
                        Cancelar</Button>
                    <Button className="botonModal btnDisenio botonAceptarREAC" onClick={handleModalAceptarEliminar}>
                        Aceptar</Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
};


