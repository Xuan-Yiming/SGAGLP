import React, { useEffect } from "react";
import fotoPerfil from "../images/FotoPerfil.png";
import "../HojasDeEstilo/ResEspeAniadirIndicador.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import { addDatosIndicadores,updateRubricaDescription,addIndex2,updateIndicadoresDescription } from '../Redux/IndicadoresSlice';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { useCookies } from "react-cookie";
import axios from 'axios';
import { useLocalStorage } from './useLocalStorage';


export default function ResEspeAniadirIndicador(props) {
    const datosIndicador = useSelector((state) => state.Indicadores);
    let valor;
    let IndicadorP, Indicador;
    const [mostrarModal, setmostrarModal] = useState(false);
    const [botonColor, setBotonColor] = useState("#ADADAD");
    const [rubricas, setRubricas] = useState([])
    const [codigo, setCodigo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [rubrica1, setRubrica1] = useState("");
    const [rubrica2, setRubrica2] = useState("");
    const [rubrica3, setRubrica3] = useState("");
    const [rubrica4, setRubrica4] = useState("");
    const [indicadores, setIndicadores] = useState([]);
    const [cookies, setCookie] = useCookies();
    const [guardando, setGuardando] = useState(false);
    const textoBoton = "Aceptar";
    const [niveles, setNivels] = useLocalStorage("niveles");
    const [valido, setValido] = useState(false)
    const [inputBorderColorCodigo, setInputBorderColorCodigo] = useState("black");
    const [inputBorderColorDescripcion, setInputBorderColorDescripcion] = useState("black");

    
    const datosCompetencia = useSelector((state) => state.Competencias);

    const dispatch = useDispatch();
    const [seleccionados, setSeleccionados] = useState([]);

    // Funcion para guardar los datos ingresados en los input

    useEffect(() => {
        if(codigo.trim().length !=0  && descripcion.trim().length !=0){
            setBotonColor("#042354");
        }else{
            setBotonColor("#ADADAD");
        }
        if(codigo.trim().length !=0){
            setInputBorderColorCodigo("black");
        }
        if(descripcion.trim().length !=0){
            setInputBorderColorDescripcion("black");
        }
    }, [codigo,descripcion]);


    useEffect(()=>{
                if(datosIndicador.bandera2){
                    setRubricas(datosIndicador.Indicadores[datosIndicador.index].Rubricas);
                    setCodigo(datosIndicador.Indicadores[datosIndicador.index].codigo)
                    setDescripcion(datosIndicador.Indicadores[datosIndicador.index].descripcion)
                }


    },[])


    const creaArreglo = () => {

        for (let i = 0; i < niveles; i++) {
            let objeto = {
                idRubrica: i,
                descripcion: ""
            }
            rubricas.push(objeto)
        }
        console.log(rubricas)
        setValido(true)

    }

    useEffect(() => {
        creaArreglo()

    }, [])

    const handleChange = (e) => {
        const { name, value } = e?.target || {};

        switch (name) {
            case "codigo":
                setCodigo(value);
                break;
            case "descripcion":
                setDescripcion(value);
                break;
            /* case "rubrica1":
                 setRubrica1(value);
                 break;
             case "rubrica2":
                 setRubrica2(value);
                 break;
             case "rubrica3":
                 setRubrica3(value);
                 break;
             case "rubrica4":
                 setRubrica4(value);
                 break;*/
        }
        if (codigo.length > 0 && descripcion.length > 0) {
            setBotonColor("#042354");
            valor = 1;

        } else {
            setBotonColor("#ADADAD");
            valor = 0;
        }

        return valor;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    };


    const handleButtonClick = () => {
        valor = handleChange();
        if(codigo.trim().length ==0){
            setInputBorderColorCodigo("red");
        }
        if(descripcion.trim().length ==0){
            setInputBorderColorDescripcion("red");
        }
        if (valor) {
            setmostrarModal(true);
        } else {
            setmostrarModal(false);
        }
    };

    // Funciones para abrir y cerrar el modal
    const handleModalClose = () => {
        setmostrarModal(false);
    };
    const handleModalAceptar = async () => {

        if (datosIndicador.bandera) {
            console.log("DETALLE INGRESA AQUI");
            console.log("Galleta:");
            console.log(cookies.jwt);

            const config = {
                headers: { Authorization: 'Bearer ' + cookies.jwt }
            }
            const data = {
                codigo: codigo,
                descripcion: descripcion,
                idCompetencia: datosCompetencia.idCompetencia,
                Rubricas: rubricas
            }
            console.log("AQUI ESTA LA DATAAAAAAA");
            console.log(data);
            console.log("AQUI ESTA LA DATAAAAAAA");


            try {

                const respuesta = await axios.post("http://localhost:3050/api/indicador/insertarIndicador", data, config);
                console.log(respuesta.data);

            } catch (error) {
                console.log(error)
            }

            props.cambiarComponente(false);
            props.cambiarComponente2(false);
            props.cambiarComponente3(true);

        } else {
            console.log("AÑADIR INGRESA AQUI");
            IndicadorP = {
                codigo: codigo,
                descripcion: descripcion,
                Rubricas: rubricas
            };

            if(datosIndicador.bandera2){


                dispatch(updateIndicadoresDescription({ index:datosIndicador.index, indicador: IndicadorP }))



                props.cambiarComponente(true);
                props.cambiarComponente2(false);
                props.cambiarComponente3(false);


            }else{
                const nuevosIndicadores = [...datosIndicador.Indicadores, IndicadorP];

                console.log(nuevosIndicadores)
                Indicador = {
                    idIndicador: "",
                    codigo: "",
                    descripcion: "",
                    rubricas: [],
                    Indicadores: nuevosIndicadores
                };
    
                dispatch(addDatosIndicadores(Indicador));
                props.cambiarComponente(true);
                props.cambiarComponente2(false);
                props.cambiarComponente3(false);

            }
          
        }

    };

    useEffect(() => {
        if(datosIndicador.bandera2) {
          setRubricas(datosIndicador.Indicadores[datosIndicador.index].Rubricas);
        }
      }, [datosIndicador.Indicadores]);
    const handleChangeRubrica = (index, event) => {
        let valor = event.target.value;


        if(datosIndicador.bandera2){
           /* let nuevasRubricas = [...rubricas];
            nuevasRubricas[index].descripcion = valor;
            setRubricas(nuevasRubricas);*/

  
            dispatch(updateRubricaDescription({ index:index, description: valor }));
            
     

        }else{

        let nuevasRubricas = [...rubricas];

        nuevasRubricas[index].descripcion = valor;

        setRubricas(nuevasRubricas);
        }

    }
    return (
        <div className="inicioPaginaAI">

            <div className="contenedorSuperiorAI contenedorDatosSuperioresREAC">
            
                <div className="contenedor-descripcionREAC">
                    <div className=" labelGen descripcionREAC">Código *</div>
                    <input className="inputActivoGen" type="text" name="codigo" 
                        value={codigo} onChange={handleChange}
                        style={{ height: "27px", width: "80%" , borderColor: inputBorderColorCodigo}} placeholder='Código'/>
                </div>

                <div className="contenedor-descripcionREAC">
                    <div className="labelGen descripcionREAC">Descripción *</div>
                    <input className="inputActivoGen" 
                        type="text" name="descripcion"
                        value={descripcion} onChange={handleChange}
                        style={{ width: "80%" , borderColor: inputBorderColorDescripcion}} placeholder='Descripción'/>
                </div>

            </div>

            <form onSubmit={handleSubmit} className="formContDatosAI">
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea registrar el nuevo indicador a la competencia?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonCancelarAI" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarAI" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
                
                <div className="contDatosAI">

                    <div className="contIndicadoresEAI "  >
                        <h2 className="tituloTipo3 tituloGen tituloAI">Rúbricas</h2>
                        <div className="contenedorInferiorAI" >

                            {valido && rubricas.map((rub, index) => {
                                return <div className="contenedor-rub">
                                    <label className="labelGen ingresoCodigoAI izquierdaAI labelAI numMargin" htmlFor="num1">{rub.idRubrica + 1}</label>
                                    <textarea className="inputActivoGen ingresotextoAI derechaAI inputAI" type="text" name="rubrica1" value={rub.descripcion} onChange={(event) => handleChangeRubrica(index, event)}
                                        style={{
                                            height: "100px", width: "100%",
                                            overflowWrap: "break-word", whiteSpace: "pre-wrap"
                                        }} />
                                </div>


                            })

                            }



                        </div>
                    </div>
                </div>

            </form>

            <div className="posBtnGuardarAI ">
                <button className="btnDisenio btnGuardarAI" type="button"
                    data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                    style={{ backgroundColor: botonColor }} onClick={handleButtonClick}>
                    Guardar
                </button>
            </div>
        </div>
    );
}

