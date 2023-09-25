import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../HojasDeEstilo/RespEspVerDetalleCompetencia.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import "../HojasDeEstilo/Reusable/TablasFront.css";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from 'react-redux';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import { getData, columns, formatRowData } from "./DataIndicadores";
import Table from "./TablaCuentas";
import { addDatosIndicadores } from '../Redux/IndicadoresSlice';
import { addBanderaIndicador,addBandera2 } from '../Redux/IndicadoresSlice';
import { addDatosCompetencias } from '../Redux/CompetenciasSlice';
import { addBanderaCargandoCompetencia,addBanderaCargandoIndicador } from '../Redux/CargandoSlice';
import axios from 'axios';
import { useLocalStorage } from './useLocalStorage';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from "react-redux";
import { faArrowsLeftRightToLine } from '@fortawesome/free-solid-svg-icons';

export default function ModificarCompetencias(props) {
    let valor;
    const [cookies, setCookie] = useCookies();
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [evidencia, setEvidencia] = useState('');
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [botonHabilitado, setBotonHabilitado] = useState(true);
    const [mostrarModal, setmostrarModal] = useState(false);
    const [mostrarModa2, setmostrarModal2] = useState(false);
    const [flagBusqueda, setFlagBusqueda] = useState(false);
    const [seleccionados, setSeleccionados] = useState([]);
    const [selectedIndicadores, setSelectedIndicadores] = useState([]);
    const [editable, setEditable] = useState(false);
    const [cambioCompetencia, setCambioCompetencia] = useState(0);
    const [niveles, setNivels] = useLocalStorage("niveles", "");

    const [idE, setIdE] = useLocalStorage("id")
    const datosCompetencia = useSelector((state) => state.Competencias);

    const dispatch = useDispatch();

    useEffect(() => {
        setDescripcion(datosCompetencia.descripcionCompetencia);
        setCodigo(datosCompetencia.codigoCompetencia);
        setEvidencia(datosCompetencia.evidenciaCompetencia);
        //setBotonHabilitado(datosCompetencia.botonHabilitado);
        props.cambiarBanderaIndicador(true);
        dispatch(addBanderaIndicador(true));
    }, []);

    const handleCheckboxChange = (index) => {
        if (seleccionados.includes(index)) {
            setSeleccionados(seleccionados.filter((item) => item !== index));
        } else {
            setSeleccionados([...seleccionados, index]);
        }
    };

    const handleButtonEliminar = () => {
        setmostrarModal2(true);
    };
    const handleModalAceptarEliminar = async () => {
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = new Set(selectedIndicadores);
        const objetoJSON = {};

        data.forEach(id => {
            objetoJSON[id] = true;
        });
        console.log("DATA ANTES DE ENVIAR:")
        console.log(data)
        try {
            const respuesta = await axios.post("http://localhost:3050/api/indicador/eliminarIndicador", objetoJSON, config);
            console.log("RESPUESTA DE API:")
            console.log(respuesta.data);

            setmostrarModal2(false);
            setFlagBusqueda(!flagBusqueda);

        } catch (error) {

            console.log(error)
        }
    };
    const handleModalCloseEliminar = () => {
        setmostrarModal2(false);
    };
    const toggleValue = (event, idIndicador) => {
        if (event.target.checked) {
            setSelectedIndicadores((prevSelectedIndicadores) => [...prevSelectedIndicadores, idIndicador]);
        } else {
            setSelectedIndicadores((prevSelectedIndicadores) => prevSelectedIndicadores.filter((id) => id !== idIndicador));
        }
    };

    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
    });

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
        if (descripcion !== '') {
            setBotonHabilitado(true);

        } else {
            setBotonHabilitado(false);
 
        }
    }, [descripcion]);

    const handleModalClose = () => {
        setmostrarModal(false);
        setEditable(false);
        setDescripcion(datosCompetencia.descripcionCompetencia);
        setEvidencia(datosCompetencia.evidenciaCompetencia);
    };

    const handleModalAceptar = async () => {
        setEditable(false);
        setmostrarModal(false);

        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {
            codigo: codigo,
            descripcion: descripcion,
            idCompetencia: datosCompetencia.idCompetencia,
            evidencia: ""
        }

        try {
            const respuesta = await axios.post("http://localhost:3050/api/competencia/modificarCompetencia", data, config);

            console.log(respuesta.data);

            setColor("#FFFFFF");
            setColorTexto("#7892A4");
            props.cambiarComponente2(false);
            if (respuesta.data.success) {
                toast.success('Competencia modificada correctamente.', {
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

        } catch (error) {

            console.log(error)
        }
        let Competencia = {
            idCompetencia: datosCompetencia.idCompetencia,
            codigoCompetencia: codigo,
            descripcion: descripcion,
            evidencia: evidencia
        };
        dispatch(addDatosCompetencias(Competencia));
    };

    const handleButtonFila = async (idIndicador, Indicador) => {
        dispatch(addBanderaCargandoIndicador(false));
        setTimeout(async () => {
            
            dispatch(addDatosIndicadores(Indicador));
            console.log("FILAAAAAAAAAAAAAAAA");
            console.log(Indicador);
            props.cambiarComponente(false);
            props.cambiarComponente2(false);
            props.cambiarComponente3(false);
            props.cambiarComponente4(true);
        },600);
    };

    const handleButtonAñadir = () => {
        dispatch(addBandera2(false))
        setColor("#FFFFFF");
        setColorTexto("#000000");
        props.cambiarComponente(false);
        props.cambiarComponente2(true);
        props.cambiarComponente3(false);
        props.cambiarComponente4(false);
    };

    const handleButtonEditar = () => {
        setEditable(true);
        setColorTexto("#000000");
    };

    const handleButtonGuardar = () => {
        setColor("#042354");
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
            fidCompetencia: datosCompetencia.idCompetencia,
        }
        getData(config, data).then((info) => {
            const { Indicador } = info;
            setPageData({
                isLoading: false,
                rowData: (Indicador.map((Indicador) => ({
                    seleccion: <input
                        className="checkboxGC"
                        type="checkbox"
                        id={Indicador.idIndicador}
                        defaultChecked={seleccionados.includes(Indicador.idIndicador)}
                        onChange={(e) => toggleValue(e, Indicador.idIndicador)}
                    />,
                    codigo: <div className="seleccionableGC" onClick={() => handleButtonFila(Indicador.idIndicador, Indicador)}>{Indicador.codigo}</div>,
                    descripcion: <div className="seleccionableGC" onClick={() => handleButtonFila(Indicador.idIndicador, Indicador)}>{Indicador.descripcion}</div>,
                }))),

            });
        });
    }, [flagBusqueda]);
    console.log(datosCompetencia.idCompetencia)




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

        dispatch(addBanderaCargandoCompetencia(true));


    }

    useEffect(() => {



        ConsultaParametros()
    
    }, [])


    return (

        <div className="contenedorPrincipalREVC">
            <div className="contenedorDatosSuperioresREVC">
                <div className="contenedor-codigoREVC">
                    <div className="labelGen codigoREVC">Código *</div>
                    <input className="inputGen form-control1REVC " type="text" name="codigo"
                        value={codigo} readOnly style={{ height: "27px", width: "80%" }} />
                </div>
                <br></br>
                <div className="contenedor-descripcionREVC">
                    <div className="labelGen descripcionREVC">Descripción *</div>
                    <input className="inputGen  form-control2REVC inputMenosPad"
                        type="text" name="descripcion" disabled={!editable}
                        value={descripcion} onChange={handleChangeDescripcion}
                        style={{ width: "80%", backgroundColor: editable ? "#ffffff" : "#F2F7F9", color:colorTexto}} />
                </div>
                {/* <div className="contenedor-evidenciaREVC">
                    <div className="labelGen evidenciaREVC">Evidencia *</div>
                    <input className="inputGen  form-control2REVC" placeholder='Evidencia'
                        type="text" name="evidencia" disabled={!editable}
                        value={evidencia} onChange={handleChangeEvidencia}
                        style={{ height: "27px", width: "80%", backgroundColor: editable ? "#ffffff" : "#F2F7F9" }} />
                </div> */}
                <div className="contenedor-guardarREVC">
                    <div className="btnDivDisenio">
                        {editable ?
                            <button className='btnDisenio btnGuardarREVC' type="button" onClick={handleButtonGuardar} disabled={!botonHabilitado} style={{ background: botonHabilitado ? '#042354' : '#adadad' }}>
                                Guardar
                            </button> :
                            <button className='btnDisenio btnGuardarREVC' type="button" onClick={handleButtonEditar} style={{ background: "#042354" }}>
                                Editar
                            </button>}
                    </div>
                </div>
            </div>
            
            <div className="contenedor-indicadoresREVC">

                <div className="contIndicREVC">
                    <h2 className="tituloGen tituloTipo3 tituloIDsREVC">Indicadores</h2>

                    <div className="contenedor-botonesREVC">

                        <div className="botonesSuperioresREVC">
                            <div className="btnDivDisenio">
                                <button className='btnDisenio btnAniadirREVC' onClick={handleButtonAñadir} >
                                    Añadir
                                </button>
                            </div>
                            <div className="btnDivDisenio">
                                <button className='btnDisenio btnEliminarREVC' onClick={handleButtonEliminar} >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="contenedorTablaF contenedor-indicadores-rellenoREVC">
                        <Table
                            className="tablaF"
                            columns={columns}
                            data={pageData.rowData}
                            isLoading={pageData.isLoading}
                            cambiarComponente={props.cambiarComponente}
                            cambiarComponente2={props.cambiarComponente2}
                        />
                    </div>


                </div>
            </div>
            <form onSubmit={handleSubmit} className="contDatosREVC">
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea guardar los cambios realizados?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonCancelarREVC" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarREVC" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={mostrarModa2} onHide={handleModalCloseEliminar}>
                    <Modal.Body >
                        <p>¿Está seguro que desea eliminar los indicadores seleccionados?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonCancelarREVC" onClick={handleModalCloseEliminar}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarREVC" onClick={handleModalAceptarEliminar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>


            </form>
            <br></br>
        </div>
    );
};
