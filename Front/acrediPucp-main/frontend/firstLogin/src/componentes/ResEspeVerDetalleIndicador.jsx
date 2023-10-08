
import "../HojasDeEstilo/ResEspeVerDetalleIndicador.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { useCookies } from "react-cookie";
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { addDatosIndicadores } from '../Redux/IndicadoresSlice';
import { addBanderaGuardandoCambios,addBanderaCargandoIndicador } from '../Redux/CargandoSlice';
import { useDispatch } from "react-redux";

export default function ResEspeVerDetalleIndicador(props) {
    let valor;
    const [rubricas, setRubricas] = useState([]);
    const [mostrarModal, setmostrarModal] = useState(false);
    const [botonColor, setBotonColor] = useState("#ADADAD");
    const [token, setToken] = useState();
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [colorTexto, setColorTexto] = useState("#7892A4");

    const [guardando, setGuardando] = useState(false);
    const [editable, setEditable] = useState(false);
    const textoBoton = "Aceptar";
    const [cookies, setCookie] = useCookies();
    const [resultado, setResultado] = useState({});

    const dispatch = useDispatch();

    props.cambiarBanderaIndicador(true);

    const datosIndicador = useSelector((state) => state.Indicadores);

    const handleChange = (e) => {
        const { name, value } = e?.target || {};

        switch (name) {
            case "codigo":
                setCodigo(value);
                break;
            case "nombre":
                setNombre(value);
                break;
        }

        if (nombre.length > 0) {
            setBotonColor("#042354");
            setGuardando(true);
            valor = 1;

        } else {
            setBotonColor("#ADADAD");
            setGuardando(false);
            valor = 0;
        }

        return valor;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    };
    const handleButtonEditar = () => {
        setEditable(true);
        setColorTexto("#000000");
    };
    const handleButtonGuardar = () => {
        setmostrarModal(true);
        
    };
    const handleChangeDescripcion = (event) => {
        setNombre(event.target.value);
        validarCampos(nombre, rubricas);
    };
    const handleChangeRubricas = (index, event) => {
        const { value } = event.target;
        setRubricas((prevRubricas) => {
            const updatedRubricas = [...prevRubricas];
            updatedRubricas[index].descripcion = value;
            return updatedRubricas;
        });
        validarCampos(nombre, rubricas);
    };
    const validarCampos = (valorCodigo, valorRubricas) => {
        if (valorRubricas !== '') {

        } else {
            setEditable(false);
            valor = 0;
        }
        return valor;
    };
    const handleButtonClick = () => {
        valor = handleChange();
        if (valor) {
            setmostrarModal(true);
        } else {
            setmostrarModal(false);
        }
        props.cambiarComponente(false);
        props.cambiarComponente2(false);
        props.cambiarComponente3(true);
        props.cambiarComponente4(false);
    };


    const handleModalClose = () => {
        setmostrarModal(false);
        setEditable(false);

        setNombre(datosIndicador.descripcionIndicador);
        setRubricas(resultado.data.map(rubrica => ({
            idRubrica: rubrica.idRubrica,
            descripcion: rubrica.descripcion
        })));
    };
    const handleModalAceptar = async () => {
        dispatch(addBanderaGuardandoCambios(false));
        setEditable(false);
        setmostrarModal(false);

        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {
            idIndicador: datosIndicador.idIndicador,
            codigo: datosIndicador.codigoIndicador,
            descripcion: nombre,
            Rubricas: rubricas.slice(0, -1)
        }
        console.log("AQUI ESTA DATAAAAAAAAAA");
        console.log("AQUI ESTA DATAAAAAAAAAA");
        console.log(data);
        console.log("AQUI ESTA DATAAAAAAAAAA");
        console.log("AQUI ESTA DATAAAAAAAAAA");
        try {
            const respuesta = await axios.post("http://localhost:3050/api/indicador/modificarIndicador", data, config);

            console.log(respuesta.data);
            setColorTexto("#7892A4");

            

        } catch (error) {

            console.log(error)
        }
        let Indicador = {
            idIndicador: datosIndicador.idIndicador,
            codigoIndicador: datosIndicador.codigoIndicador,
            descripcionIndicador: nombre,
            rubricas: rubricas,
        };
        dispatch(addBanderaGuardandoCambios(true));
        props.cambiarComponente2(false);
    

        dispatch(addDatosIndicadores(Indicador));
    };

    const obtenerDatosRubrica = async () => {

        setToken(cookies.jwt)
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            fidIndicador: datosIndicador.idIndicador,
        }
        console.log("configuracion:")
        console.log(config);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/rubrica/listarRubrica", data, config)
            console.log("AQUI ESTAN LOS DATOS DE RUBRICASSSSSSSS");
            console.log(respuesta.data);
            setRubricas(respuesta.data.data.map(rubrica => ({
                idRubrica: rubrica.idRubrica,
                descripcion: rubrica.descripcion
            })));
            console.log("AQUI ESTAN LOS DATOS DE RUBRICASSSSSSSS EN FRONT");
            console.log(rubricas);

            setResultado(respuesta.data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        //   setBandera(true)
        obtenerDatosRubrica();
        setNombre(datosIndicador.descripcionIndicador);
        setCodigo(datosIndicador.codigoIndicador);
        dispatch(addBanderaCargandoIndicador(true));
    }, []);
    return (
        <div className="inicioPaginaDI">
           
            <div className="contenedorSuperiorAI contenedorDatosSuperioresREAC">
                
                 <div className="contenedor-descripcionREAC">
                    <div className=" labelGen descripcionREAC" htmlFor="codigo">Código *</div>
                    <input className="inputGen" type="text" name="codigo"  disabled
                        value={codigo}
                        style={{ height: "27px", width: "80%" }} />
                </div>

                <div className="contenedor-descripcionREAC">
                    <div className="labelGen descripcionREAC" htmlFor="nombre">Descripción *</div>
                    <input className="inputGen" 
                        type="text" name="nombre"
                        value={nombre} onChange={handleChangeDescripcion} disabled={!editable}
                        style={{ height: "27px", width: "80%", backgroundColor: editable ? "#ffffff" : "#F2F7F9",color:colorTexto }}/>
                </div>

            </div>

            <form onSubmit={handleSubmit} className="contDatosDI">
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea guardar los cambios realizados?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonCancelarDI" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarDI" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>

                <div className="contDatosDI">
                    
                    <div className="contIndicadoresAI">
                        <h2 className="tituloTipo3 tituloGen tituloDI">Rúbricas</h2>
                        <div className="contenedorInferiorDI">
                            <div className="ingresoCodigoDI izquierdaDI" /*style={{ overflowY: "scroll", maxHeight: 350 }}*/>
                                {/* <div className="contenedor-rub">
                                <label className="ingresoCodigoDI izquierdaDI labelDI" htmlFor="num1">1.</label>
                                <textarea rows="4" cols="50" className="ingresoNombreDI derechaDI inputDI"type="text" name="rubrica1"
                                style={{ height: "60px" , width: "100%",
                                overflowWrap: "break-word" , whiteSpace: "pre-wrap"}}/>
                              </div>
                              <br></br>
                              <div className="contenedor-rub">
                                <label className="ingresoCodigoDI izquierdaDI labelDI" htmlFor="num1">2.</label>
                                <textarea rows="4" cols="50" className="ingresoNombreDI derechaDI inputDI"type="text" name="rubrica2"
                                style={{ height: "60px" , width: "100%",
                                overflowWrap: "break-word" , whiteSpace: "pre-wrap"}}/>
                              </div>
                              <br></br>
                              <div className="contenedor-rub">
                                <label className="ingresoCodigoDI izquierdaDI labelDI" htmlFor="num1">3.</label>
                                <textarea rows="4" cols="50" className="ingresoNombreDI derechaDI inputDI"type="text" name="rubrica3"
                                style={{ height: "60px" , width: "100%",
                                overflowWrap: "break-word" , whiteSpace: "pre-wrap"}}/>
                              </div>
                              <br></br>
                              <div className="contenedor-rub">
                                <label className="ingresoCodigoDI izquierdaDI labelDI" htmlFor="num1">4.</label>
                                <textarea rows="4" cols="50" className="ingresoNombreDI derechaDI inputDI"type="text" name="rubrica4"
                                style={{ height: "60px" , width: "100%",
                                overflowWrap: "break-word" , whiteSpace: "pre-wrap"}}/>
                              </div> */}
                                {
                                    resultado.success && resultado.data.map((rubrica, index) => {

                                        if (index !== resultado.data.length - 1) {
                                            return (
                                                <div className="contenedor-rub" key={index}>
                                                    <label className="labelGen ingresoCodigoAI izquierdaAI labelAI numMargin" htmlFor="num1">
                                                        {index + 1}
                                                    </label>
                                                    <textarea rows="4" cols="50" className="ingresoNombreDI inputGen "
                                                        type="text"
                                                        name="rubrica4"
                                                        style={{
                                                            height: "100px",
                                                            width: "100%",
                                                            overflowWrap: "break-word",
                                                            whiteSpace: "pre-wrap",
                                                            backgroundColor: editable ? "#ffffff" : "#F2F7F9",
                                                            color:colorTexto,

                                                        }}
                                                        disabled={!editable}
                                                        onChange={(event) => handleChangeRubricas(index, event)}
                                                        value={rubricas[index].descripcion}
                                                        readOnly={!editable}
                                                    />
                                                </div>
                                            );
                                        }
                                        return null; // No se retorna nada cuando es el último índice
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="posBtnGuardarAI">
                        {editable ?
                            <button className="btnDisenio btnGuardarAI" type="button " onClick={handleButtonGuardar} style={{ background: "#042354" }}>
                                Guardar
                            </button> :
                            <button className="btnDisenio btnGuardarAI" type="button" onClick={handleButtonEditar} style={{ background: "#042354" }}>
                                Editar
                            </button>}
                    </div>
                </div>

            </form>
        </div>
    );
}