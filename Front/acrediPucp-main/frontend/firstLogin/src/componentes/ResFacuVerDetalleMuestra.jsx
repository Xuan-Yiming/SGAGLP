
import "../HojasDeEstilo/ResEspeVerDetalleMuestraMedicion.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/TablasFront.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import React, { useEffect, useState, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addBanderaCargarMedicion,addBanderaCargandoEvidencia ,addBanderaGuardandoCambios, addBanderaCargarCalificacion} from "../Redux/CargandoSlice";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MiPerfil from './Perfil.jsx';
import axios from 'axios';
import { useLocalStorage } from './useLocalStorage';
import { useLayoutEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

export default function ResFacuVerDetalleMuestra(props) {
    let valor;
    const [competenciaActual, setCompetenciaActual] = useState(0);
    const [mostrarModal, setmostrarModal] = useState(false);
    const [nombre, setNombre] = useState("");
    const [menorId, setMenorId] = useState(9000);
    const [datosTablaMedicion, setDatosTablaMedcion] = useState(false);

    const [cookies, setCookie] = useCookies();

    const dispatch = useDispatch();
    const datosMedicion = useSelector((state) => state.Medicion);

    const [banderaRMV, setBanderaRMV] = useState(false);
    const [valido2, setValido2] = useState(false)
    const [logrado, setLogrado] = useState(true);
    const [bajos, setBajos] = useState([])
    const [esperado, setEsperado] = useState("");
    const [idE, setIdE] = useLocalStorage("idEspecialidad")
    const [nivel, setNivel] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [valido, setValido] = useState(false);
    const [datosCargados, setDatosCargados] = useState(false);
        
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    };

    const handleEditarDMM = () => {
        dispatch(addBanderaCargarCalificacion(false));
        setTimeout(async () => {
        props.cambiarDetalleMuestra(false);
        props.cambiarGestionAlumnos(true);
    },750);
    };

    const handleEvidenciasDMM = () => {
        dispatch(addBanderaCargandoEvidencia(false));
        setTimeout(async () => {



        props.cambiarDetalleMuestra(false);
        props.cambiarEvidencias(true);
    },500);
    };




    const handleModalClose = () => {
        setmostrarModal(false);
    };

    const handleModalAceptar = () => {
        props.cambiarComponente(false);
    };



    const handleGestioanrAlumnos = () => {
        props.cambiarComponente(false);
        props.cambiarComponente2(false);
        props.cambiarComponente3(true);
        // props.cambiarComponente4(false);
        // props.cambiarComponente5(false);
        // props.cambiarComponente6(true);
    };


    const cambiaDummy = async (idEnviado, mini) => {

        console.log("ENTRANDING")
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {
            idMuestraMedicion: datosMedicion.idMuestraMedicion,
            idCompetencia: idEnviado
        }
        console.log("configuracion:")
        console.log(config);

        console.log("AQUIIIIIIIIIIIIIIIIIIIIII")
        try {
            const respuesta = await axios.post("http://localhost:3050/api/muestraMedicion/listarIndicadoresCompetenciaMuestraMedicion", data, config);
            // console.log("configuracion:")

            console.log("MININI")
            console.log(mini)
            setTimeout(() => {
               verificaResultado(mini, respuesta.data.data)
              }, 0);
            console.log("ACA COMPETENCIA");

        } catch (error) {
            console.log("lgo paso aca");
            console.log(error)
        }
    }

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

            setNivel(respuesta.data.parametros[0].minimoAprobatorio)
            setCantidad(respuesta.data.parametros[0].niveles)
            setEsperado(respuesta.data.parametros[0].porcentajeMinimo)
            console.log("MINIOM")
            console.log(esperado)
            console.log(respuesta.data.parametros[0].porcentajeMinimo)
            setValido(true)

            for (const i of datosMedicion.competencias) {
                await cambiaDummy(i.idCompetencia, respuesta.data.parametros[0].porcentajeMinimo);
            }


            // setBanderaCI(true);
        } catch (error) {
            //console.log(error)
        }
    }



    const cambiaCompetencia = async (idEnviado) => {
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {
            idMuestraMedicion: datosMedicion.idMuestraMedicion,
            idCompetencia: idEnviado
        }
        console.log("configuracion:")
        console.log(config);
        setCompetenciaActual(idEnviado);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/muestraMedicion/listarIndicadoresCompetenciaMuestraMedicion", data, config);
            // console.log("configuracion:")
            setDatosTablaMedcion(respuesta.data.data);
            console.log(respuesta.data);
            console.log(datosTablaMedicion);
            setBanderaRMV(true);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        datosMedicion.competencias.map((i, index) => {
            console.log(i);
            console.log(index)
            index == 0 ? cambiaCompetencia(i.idCompetencia) : console.log(index)
        })

        
    }, []);

    useLayoutEffect(() => {
        const ejecutarFunciones = async () => {
            
            await ConsultaParametros();
            datosMedicion.competencias.map((i, index) => {
                console.log(i);
                console.log(index);
                index === 0 ? cambiaCompetencia(i.idCompetencia) : console.log(index);
            });

        };
        const fetchData = async () => {
            
            try {
                
                await ejecutarFunciones();
                setDatosCargados(true);
                setTimeout(async () => {
                dispatch(addBanderaGuardandoCambios(true));
            },750);
            } catch (error) {
                // Manejar el error si es necesario
            }
        };
        
        fetchData();
       
       
        
    }, []);

    useEffect(() => {
        console.log("Estamos viendo validacion")
        console.log(valido)
        console.log(datosTablaMedicion)
        console.log(logrado)
        console.log("Estamos finalizando validacion")
        if (valido && datosTablaMedicion && datosCargados) {
            setTimeout(async () => {
            dispatch(addBanderaCargarMedicion(true));
        },750);

        }
    }, [valido, datosTablaMedicion, logrado,datosCargados]);


    const verificaResultado = (minimo, resultados) => {
        console.log("MINIMO:")
        console.log(minimo)
        console.log("RESULTADOS:")
        console.log(resultados)
        resultados.map((item, index) => {
            console.log(item)
            console.log("VERIFICANDOMIN")
            console.log(minimo)
            if (item.porcentaje < minimo) {
                setLogrado(false)
                bajos.push({codigoIndicador: item.codigoIndicador, descripcion: item.descripcion})
            }


        })

        setValido2(true)

    }

    const BootstrapTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: theme.palette.common.black,
        },
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.black,
        },
    }));


    return (
        <div className="inicioPaginaDMM">
            <br></br>
            <div className="contenedorSuperiorDMM">
                <br></br>
                <div className="TituloGeneralDMM izquierdaDMM">
                    <label className="TituloPrinDMM labelDMM" htmlFor="codigo">
                        {datosMedicion.nombreCurso + " - " + datosMedicion.codigoMuestra}</label>
                </div>

                <div className="botonesVDM">
                    <div className="posBtnEditarVDM">

                        {/* <div className="btnDivDisenio">
                            <button className="btnDisenio btnEvidVDM" type="button"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleEvidenciasDMM} >
                                Evidencias </button>
                        </div>
                        <div className="btnDivDisenio">
                            <button className="btnDisenio btnEditarVDM" type="button"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleEditarDMM} >
                                Calificaciones Alumnos </button>
                        </div> */}
                    </div>
                </div>
            </div>
            <br></br>
            <form onSubmit={handleSubmit} className="contDatosDMM">
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea guardar los cambios realizados?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonCancelarDMM" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonAceptarDMM" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
                <br></br>

                    <div className="contPerfilVDMM contDatosDMM">
                        <h2 className="tituloDMM tituloTipo3 tituloGen">Datos Generales</h2>
                        <div className="contenedorDMM">

                            <div className="derechaDMM espacioTextoDMM">
                                <label className="labelGen labelVVDMM" htmlFor="tipoMedicion">
                                    Tipo de medición </label>

                                <input className="inputGen inputVDMMv " type="text" name="codigo" disabled
                                    style={{ height: "20px" }} value={datosMedicion.tipoMedicion} />
                                <br></br>
                                <br></br>
                                <label className="labelGen labelVVDMM" htmlFor="fechaInicio">
                                    Fecha inicio</label>

                                <input className="inputGen inputVDMMv" type="text" name="codigo" value={datosMedicion.fechaInicio.slice(0, 10)} disabled
                                    style={{ height: "20px" }} />
                            </div>

                            <div className="derechaDMM espacioTextoDMM alinearcCaja">

                                <div>
                                    <label className="labelGen labelVVDMM2" htmlFor="tipoMedicion">
                                        Fecha Fin </label>
                                    <br></br>
                                    <input className="inputGen inputVDMMv" type="text" name="codigo" value={datosMedicion.fechaFin.slice(0, 10)} disabled
                                        style={{ height: "20px" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <br/> */}
                    {/* <div className="contPerfilVDMM contDatosDMM">
                        <h2 className="tituloDMM">Gestionar Alumnos</h2>
                        <div className="contenedorDMM">
                            <div className="contenedorDMM izquierdaDMM">
                                <div className="izquierdaDMM">
                                    <button className="btnDisenio btnCargarRMVD" type="button"
                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleGestioanrAlumnos} >
                                        Gestionar </button>
                                </div>
                                <div className="derechaDMM">
                                </div>
                            </div>
                            <div className="derechaDMM espacioTextoDMM">
                            </div>
                        </div>
                    </div> */}
                <div className="contDatosDMM1">
                    <Tabs>
                        <TabList>
                            {datosMedicion.competencias.map((i, index) => {
                                console.log(i);
                                console.log(index)
                                return <Tab key={index} className={competenciaActual === i.idCompetencia ? "tabs active-tabs" : "tabs"} onClick={() => cambiaCompetencia(i.idCompetencia)}>{i.codigoCompetencia}</Tab>
                            })}
                        </TabList>


                    <div className="contPerfilVDMM contDatosDMM" style={{padding: "0px 17px"}}>
                        <div className="contenedorInferiorDMM">
                            <div id="contenedorDMM">

                                {banderaRMV === false && <p>Archivo no subido por ahora</p>}
                                {banderaRMV !== false && (

                                    <table className="tablaF tablaMuestras">
                                        <thead>
                                            <tr>
                                                <th>Indicador</th>
                                                <th>Promedio</th>
                                                <th>Porcentaje(%)</th>
                                                <th>Totales cumplidos</th>
                                                <th>#Alumnos</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {datosTablaMedicion.map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.codigoIndicador}</td>
                                                    <td>{item.promedio}</td>
                                                    <td>{item.porcentaje}</td>
                                                    <td>{item.totalesCumplidos}</td>
                                                    <td>{item.numeroAlumnos}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}




                            </div>
                        </div>
                    </div>
                </Tabs>
                    <br></br>
                    <div className="contPerfilVDMM contDatosDMM">
                        <h2 className="tituloDMM tituloGen tituloTipo3 titLargoResMedi">Resultado final de la medición</h2>
                        <div className="contenedorDMM">
                            <div className="contenedorDMM izquierdaDMM contDatDos">
                                <div className="izquierdaDMM">
                                    {valido2 && <label className="labelGen" htmlFor="tipoMedicion">
                                        {logrado === true ? <p>Se lograron los resultados esperados en todos los indicadores</p> : <p>No se logró el resultado esperado mínimo de {esperado}% en los indicadores: </p>}
                                            {!logrado && bajos.map((bajo) => {
                                                return  <BootstrapTooltip title={bajo.descripcion} placement="top">
                                                    <span className="indicFalla">{bajo.codigoIndicador}</span>
                                                </BootstrapTooltip>
                                            })}

                                    </label>

                                    }


                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </form>
            <br></br>
        </div>
    );
}