import React, { useEffect } from "react";
import "../HojasDeEstilo/ResMediMuestraMedicion.css";
import "../HojasDeEstilo/Reusable/TablasFront.css";
import "../HojasDeEstilo/TablaCuenta.css";
import "../HojasDeEstilo/TablaActividades.css";
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MiPerfil from './Perfil.jsx';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { useCookies } from "react-cookie";
import { addParejas, resetParejas } from "../Redux/MedicionSlice";
import { addBanderaCargarCalificacion } from "../Redux/CargandoSlice";
import { string } from "prop-types";
import { useLocalStorage } from './useLocalStorage';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

//export default function ResMediMuestraMedicion(props) 

export default function ResEspeGestionAlumnos(props) {
    const [indiceActivo, setIndiceActivo] = useState(0);
    const [contenidoActivo, setContenidoActivo] = useState("contenido1");
    const [cuenta, setCuenta] = useState("RE1");
    const textos = ["Texto 1", "Texto 2", "Texto 3", "Texto 4", "Texto 5"];
    const [cookies, setCookie] = useCookies();
    const [indicadorBoton, setIndicadorBoton] = useState([]);
    const [indicadorTodos, setIndicadorTodos] = useState([]);
    const [arregloAlumno, setArregloAlumno] = useState([]);
    const [dataRubrica, setDataRubrica] = useState([]);
    const [bandera, setBandera] = useState(false);
    const [dummyind, setDummyInd] = useState(1);
    const [muestraModal, setMuestraModal] = useState(false);
    const [estadoTab, setEstadoTab] = useState(0);
    const [indicadorActual, setIndicadorActual] = useState(0);
    const [longitud, setLongitud] = useState();
    const [codigoActual, setCodigoActual] = useState('');
    const [datosTablaEstudiantes, setDatosTablaEstudiantes] = useState(false);
    const [descripcion, setDescripcion] = useState('')
    // const [listaAlumnos, setPuntuacionesEstudiantes] = useState([]);
    const [textoBoton, setTextoBoton] = useState("Guardar");
    const [editable, setEditable] = useState(false);
    const [color, setColor] = useState("#F2F7F9");
    const [colorTexto, setColorTexto] = useState("#7892A4");
    const [mostrarModal, setmostrarModal] = useState(false);
    const [banderaCI, setBanderaCI] = useState(false);
    const [nivel, setNivel] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [porcentaje, setPorcentaje] = useState("");
    const dispatch = useDispatch();
    const datosMedicion = useSelector((state) => state.Medicion);
    const datosUsuario = useSelector((state) => state.Usuario);
    const datosAdmin = useSelector((state) => state.Administrador);
    const datosEnviado = useSelector((state) => state.General);
    const [selectedRow, setSelectedRow] = useState(null);
    const [idE, setIdE] = useLocalStorage("id")
    const [valido, setValido] = useState(false)
    const [puntos, setPuntos] = useState([])
    


    const [flagEnviado, setFlagEnviado] = useLocalStorage("flagEnviado");

    useEffect(() => {
        cambiarDivActual();
    }, [cuenta, contenidoActivo]);


    const creaArreglo = (total) => {

        for (let i = 0; i < total; i++) {
            let objeto = {
                numero: i + 1,
            }
            puntos.push(objeto)
        }
        console.log(puntos)
        setValido(true)

    }


    

    const cambiarDivActual = () => {
        // desactivar el div actual
        const divActual = document.querySelector(`#div-${cuenta}`);
        if (divActual) {
            divActual.classList.remove("activo");
        }

        // activar el nuevo div
        const nuevoDiv = document.querySelector(`#div-${cuenta}-${contenidoActivo}`);
        if (nuevoDiv) {
            nuevoDiv.classList.add("activo");
        }
    };

    const handleModalCancelar = () => {
        setmostrarModal(false);
        setEditable(false);
        setColor("#F2F7F9");
        setColorTexto("#7892A4");
    };

    const handleModalClose = () => {
        setMuestraModal(false);
    };
    const handleButtonClick = () => {
        //////console.log("Click en Guardar")
        setmostrarModal(true);
    };
    const mostrarContenido = (id) => {
        setContenidoActivo(id);
    };

    const cargarTodosIndicadores = async () => {
        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            idMuestraMedicion: datosMedicion.idMuestraMedicion
        }
        try {
            const respuesta = await axios.post("http://localhost:3050/api/muestraMedicion/listarIndicadoresMuestraMedicion", data, config);
            // //////console.log("configuracion:")
            // setDatosTablaMedcion(respuesta.data.data);
            console.log(data)
            setIndicadorTodos(respuesta.data.data);
        } catch (error) {
            console.log(error)
        }
    }
    const cambiaIndicador = async (idEnviado) => {





        ////////console.log("Galleta:")
        ////////console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }


        ////////console.log("ESTE ES EL ID ENVIADO " + idEnviado);
        const data = {
            idMuestraMedicion: datosMedicion.idMuestraMedicion,
            idCompetencia: idEnviado
        }
        ////////console.log("configuracion:")
        ////////console.log(config);

        //////console.log("data:")
        //////console.log(data);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/muestraMedicion/listarIndicadoresCompetenciaMuestraMedicion", data, config);
            // //////console.log("configuracion:")
            // setDatosTablaMedcion(respuesta.data.data);
            console.log("respuesta.data de listasrindicadpres")
            console.log(respuesta.data)
            cargaDescripcionIndicador(respuesta.data.data[0].fidIndicador);
            setIndicadorBoton(respuesta.data.data);
            //////console.log(respuesta.data);
            setCodigoActual(respuesta.data.data[0].codigoIndicador)
            console.log("estoy cambiando indicador")
            console.log(respuesta.data.data[0].posicionResultado)
            setIndicadorActual(respuesta.data.data[0].posicionResultado)
            //////console.log("hola auqi esta rspuesta");
            //////console.log(1);
            // //////console.log(datosTablaMedicion);

            // setBanderaCI(true);
        } catch (error) {
            ////////console.log(error)
        }
    }

    const cargaAlumnos = async () => {

        //////console.log("Galleta: GALLETA ACA ")
        //////console.log(cookies.jwt)
        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            idMuestraMedicion: datosMedicion.idMuestraMedicion
        }
        try {
            
            const respuesta = await axios.post("http://localhost:3050/api/muestraMedicion/listarAlumnoMuestraMedicion", data, config);
            // //////console.log("configuracion:")
            // setDatosTablaMedcion(respuesta.data.data);
            setDatosTablaEstudiantes(respuesta.data.data);

        
            // //////console.log(datosMedicion.alumnosPuntuacion);
            // dispatch(resetParejas());
            // dispatch(addParejas(respuesta.data.data));
            // //////console.log(datosMedicion.alumnosPuntuacion);

            setArregloAlumno([]);
            // console.log(arregloAlumno);
            setArregloAlumno(respuesta.data.data);

            console.log("Estamos listando alumnos");
            console.log(respuesta.data);

            ////////console.log("ASDADDSDSADASDASDSADASDSDS")
            setBanderaCI(true);
        } catch (error) {
            ////////console.log(error)
        }
    }

    const cargaDescripcionIndicador = async (indicador) => {




        //////console.log("Galleta: GALLETA ACA ")
        //////console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        //////console.log("INDICADOR ÚLTIMO")
        //////console.log(indicador)
        const data = {
            fidIndicador: indicador
        }
        //////console.log("configuracion:")
        //////console.log(config);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/rubrica/listarRubrica", data, config);
            // //////console.log("configuracion:")
            // setDatosTablaMedcion(respuesta.data.data);


            // //////console.log(datosMedicion.alumnosPuntuacion);
            // dispatch(resetParejas());
            // dispatch(addParejas(respuesta.data.data));
            // //////console.log(datosMedicion.alumnosPuntuacion);

            // //////console.log(arregloAlumno);
            // //////console.log(arregloAlumno);
            console.log("AQUI NIVELES OJO   ")
            console.log(respuesta.data)
            setDescripcion(respuesta.data.data.pop().descripcionIndicador)
            setBandera(true)
            //////console.log(respuesta.data);
            setDataRubrica(respuesta.data.data)
            setLongitud(respuesta.data.data.length - 1)
            //////console.log("datadescripcionindicador")
            setBandera(true)
        } catch (error) {
            //////console.log(error)
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
            setPorcentaje(respuesta.data.parametros[0].porcentajeMinimo)
            creaArreglo(respuesta.data.parametros[0].niveles)

            // setBanderaCI(true);
        } catch (error) {
            //console.log(error)
        }

    }

    useEffect(() => {
        const fetchData = async () => {
        ////////console.log("aca paso algo ANTES ")
        // indicadorBoton.map((i,index)=>{
        //     //////console.log(i);
        //     //////console.log(index)
        //     // index==0?cambiaIndicador(i.idCompetencia): //////console.log(index)
        //     index==0? cambiaIndicador(datosMedicion.competencias[indiceActivo].idCompetencia): //////console.log(index)
        //     //////console.log("aca paso algo ")
        //  })

        ConsultaParametros()

        cambiaIndicador(datosMedicion.competencias[indiceActivo].idCompetencia)
        //  cambiaIndicador(datosMedicion.competencias[indiceActivo].idCompetencia)
        await cargarTodosIndicadores();

        await cargaAlumnos();
    };
        fetchData().then(() => {
        dispatch(addBanderaCargarCalificacion(true));
    });
    }, []);

    useEffect(() => {
        console.log("arreglo alumno:")
        //////console.log(arregloAlumno)
        console.log(arregloAlumno)
    }, [arregloAlumno]);



    const navegarIndicador = (indicador, codigo, id) => {
        //setIndicadorActual(id);
        cargaDescripcionIndicador(id);

        setCodigoActual(codigo)

        //////console.log("COOOOOOOOOOOOOOOOOOOOOOOOOONSOLA INDEX "+  indiceActivo +"   " +indicador);
        console.log("estoy cambiando indicador")
        console.log(indicador)

        setIndicadorActual(indicador);
        //////console.log(indicador)
    };



    const manejarIncremento = () => {

        /*
         * RECORDATORIO METER DATOS EN EL ARREGLO DEL ALGORITMO DE SAMANTHA
         *
         *
         *  I M P O R T A N T E
         *
         * CADA VEZ QUE HACES UN SET, ESA WEA SE RENDERIZA, POR LO TANTO ,SI HAGO EL SET ANTES DE MANDAR LA FUNCION
         *  ENTONCES SE REDENDERIZA EL SET Y LA FUNCION CORRES DESPUES POR LO TANTO SE MUESTRRA LO ANTERIOR, NO LO ACTUAL
         *
         * LA SOLUCION ES MANDAR EL CAMBIO
         *
         * s
         */

        //////console.log("indice activo incremeneto " + indiceActivo)
        if (indiceActivo < datosMedicion.competencias.length - 1) {
            console.log("datosMedicion.competencias[indiceActivo+1].idCompetencia:   " + datosMedicion.competencias[indiceActivo + 1].idCompetencia)
            cambiaIndicador(datosMedicion.competencias[indiceActivo + 1].idCompetencia);

            setIndiceActivo(indiceActivo + 1);
            //////console.log("indice activo incremeneto 3 " + indiceActivo)
            //////console.log(datosMedicion.competencias);
            //////console.log("ENTRO")
        }
        //   manejarIncremento();
        //////console.log("indice activo incremeneto 2 " + indiceActivo)

        //   cambiaIndicador(datosMedicion.competencias[indiceActivo].idCompetencia);
        //   handleChangeCuenta(1);
    };

    const manejarDecremento = () => {
        if (indiceActivo > 0) {
            cambiaIndicador(datosMedicion.competencias[indiceActivo - 1].idCompetencia);
            setIndiceActivo(indiceActivo - 1);
        }

        //   handleChangeCuenta(-1);
    };

    const guardar = () => {
        setMuestraModal(true)



    }

    const handleModalAceptar = async () => {
        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        //////console.log(arregloAlumno)
        const data = {
            alumnos: arregloAlumno
        }
        //////console.log("configuracion:")
        console.log(data);
        try {
            const respuesta = await axios.post("http://localhost:3050/api/muestraMedicion/insertarNotaAlumnoMuestraMedicion", data, config);
            //////console.log(respuesta.data);
        } catch (error) {
            //////console.log(error)
        }
        //cambiar IndicadorBoton por IndicadoresTodos
        indicadorTodos.map(async (i, index) => {
            //////console.log(i.fidIndicador);
            var totalAlumnosAprob = 0, totalNotasIndicador = 0, j = 0;
            var minimoAprobatorioe = nivel;
            for (j = 0; j < arregloAlumno.length; j++) {
                let str = arregloAlumno[j].resultados.split('');
                //////console.log(minimoAprobatorioe)
                if (parseInt(str[i.posicionResultado]) >= minimoAprobatorioe) {
                    totalAlumnosAprob++;
                }
                totalNotasIndicador += parseInt(str[i.posicionResultado]);
            }
            var porcentajeAprob = (totalAlumnosAprob / j) * 100;
            var promedio = totalNotasIndicador / j;
            console.log(i.fidIndicador)
            const data2 = {
                porcentaje: porcentajeAprob,
                totalesCumplidos: totalAlumnosAprob,
                promedio: promedio,
                fidMuestraMedicion: datosMedicion.idMuestraMedicion,
                fidIndicador: i.fidIndicador
            }
            //////console.log("le envio yo:");
            //////console.log(data2);
            try {
                const respuesta = await axios.post("http://localhost:3050/api/muestraMedicion/registrarIndicadoresMuestra", data2, config);
                //////console.log(respuesta.data);
            } catch (error) {
                //////console.log(error)
            }

        })
        props.cambiarComponente(true);
        props.cambiarComponente2(false);


    }


    const cambiarArreglo = (e,indiceAlumno, valor) => {

        // const modifiedArray = [
        //     ...arregloAlumno.slice(indiceArreglo, indexToChange), // Copy the elements before the index
        //     '2023-05-20', // Updated value
        //     ...arregloAlumno.slice(indiceArreglo + 1) // Copy the elements after the index
        //   ];

        e.preventDefault();
        console.log("estoy cambiando arrelgos")
        console.log("mi indicador actual")
        console.log(indicadorActual)
        let array = [...arregloAlumno]
        //////console.log("indiceActivo :" + indicadorActual)
        for (let i = 0; i < array.length; i++) {
            if (array[i].idAlumnosMuestra === indiceAlumno) {

                let str = array[i].resultados.split('');
                str[indicadorActual] = String(valor);

                array[i].resultados = str.join('');

            }
        }
        setArregloAlumno(array)

        // for(let i = 0; i < arregloAlumno[indiceAlumno].resultados.length; i++){
        //     arregloAlumno[indiceAlumno].resultados[i]
        // }


        // arregloAlumno[indiceAlumno].resultados[indiceActivo]=String(valor);

        // arregloAlumno[0].resultados="2222222222";
        ////////console.log(arregloAlumno);
    }


    return (
        <div className="inicioPaginaMM">

            {muestraModal &&
                <Modal show={muestraModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea guardar los cambios de su muestra de medición?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonCancelarAC" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarAC" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>
            }

            <br></br>
            <div className="contenedorSuperiorMM"></div>
            <div className="TituloGeneralMM">
                <label className="TituloPrinMM labelMM" htmlFor="codigo">
                    Responsable: {datosUsuario.nombreUsuario + " " + datosUsuario.aPaterno + " " + datosUsuario.aMaterno}</label>
                <div className="contenedorMM">
                    <div className="txtResultado">
                        <label className="TituloPrinMM labelMM labelResu" htmlFor="codigo">
                            Resultados {"(" + datosMedicion.nombreCurso + " - " + datosMedicion.codigoMuestra + ")"}</label>
                    </div>
                    <div className="resultadoBoton">
                        <button className={indiceActivo === 0 ? "antBtnMMGris" : "antBtnMM"} onClick={manejarDecremento}></button>

                        <div className="cuentaMM">{datosMedicion.competencias[indiceActivo].codigoCompetencia}</div>
                        <button className={indiceActivo === datosMedicion.competencias.length - 1 ?"sigBtnMMGris" : "sigBtnMM"}onClick={manejarIncremento}></button>

                    </div>
                </div>

                <br></br>
                {/* {contenido[indiceActivo]} */}
                <div id={`div-RE1`} className="activo">

                <div className="contenedorTablaIndicadores">
                    <table className="tablaMM tablaMM3" style={{letterSpacing:"0.2px", fontSize:"1em"}}>
                        <thead>
                            <tr className="tablaSuperiorMM" style={{ "background-color": "#A7C0D2", "color": "white" }}>
                                <th style={{ width: '140px', fontWeight:"bold",fontSize:"0.9em" }}>Indicador de Desempeño</th>
                                <th style={{ width: '55px', fontWeight:"bold",fontSize:"0.9em" }}>Nivel</th>
                                <th style={{ fontWeight:"bold",fontSize:"0.9em" }}>Rúbrica</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataRubrica.map((i, index) => {
                                    return <tr className="tablaInferiorMM">
                                        {
                                            index === 0 ? (
                                                <td rowSpan={dataRubrica.length}><span style={{fontWeight:"bold", fontSize:"15px"}}>{codigoActual}</span> <span>{descripcion}</span></td>
                                            ) : null
                                        }
                                         <td style={{fontWeight:"bold", fontSize:"15px", border: '1px solid #A7C0D2'}}>{i.nivel}</td>
                                        <td style={{ border: '1px solid #A7C0D2' }}>{i.descripcion}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                        {/*
                        <tbody>
                            <tr className="tablaSuperiorMM" style={{ "background-color": "#042354", "color": "white" }}>
                                <td className="rectanIndic" style={{ "background-color": "#A7C0D2" }}>
                                    <div className="rectanguloBorder"> {codigoActual}
                                    </div>
                                </td>
                                <td className="rectanIndic2" style={{ "background-color": "#042354", "color": "white" }} colspan={cantidad}>NIVEL</td>
                            </tr>

                            <tr className="tablaEncabezadoMM">
                                <td style={{ "background-color": "#042354", "color": "white" }}>Indicador de desempeño</td>


                                {
                                    dataRubrica.map((i, index) => {
                                        return <td className="cabeceraIndic" style={{ "background-color": "#042354", "color": "white" }}>{i.nivel}</td>
                                })}


                            </tr>
                            <tr className="tablaInferiorMM">
                                <td>{bandera && descripcion}</td>


                                {dataRubrica.map((i, index) => {
                                    return <td className="indicadoresClass">{i.descripcion}</td>
                                })}
                            </tr>
                        </tbody>
                        */}
                    </table>                 
                </div>                            



                    <div className="contDatosMM">
{/* 
                        <div className="bloc-tabs">
 */}
                            {/* {banderaCI===false&&<p>Cargando</p>}
                                    
                                    {banderaCI!==false&&indicadorBoton.map((i,index)=>{
                                                //////console.log(i);
                                                //////console.log(index)
                                            return <div  className="botoncontenedorRMV"><button className="botones" key={index} >{i.codigoIndicador}</button></div>
                                        })} */}
                            {/* {//////console.log("valor de indice al principio " + indiceActivo)} */}
                            {/* 
                            {
                                indicadorBoton.map((i, index) => {
                                    //////console.log("MAP:")
                                    //////console.log(i);
                                    //////console.log(index)
                                    // onClick={() => cambiaIndicador(datosMedicion.competencias[indiceActivo].idCompetencia)}
                                    return <div className="botoncontenedorRMV"><button className={indicadorActual === i.posicionResultado ? "tabs active-tabs" : "tabs"} key={index} onClick={() => navegarIndicador(i.posicionResultado, i.codigoIndicador, i.fidIndicador)}>{i.codigoIndicador}</button></div>
                                })}
                        </div>
                         */}
                        <Tabs>
                            <TabList>
                                {indicadorBoton.map((i, index) => {
                                    return <Tab className={indicadorActual === i.posicionResultado ? "tabs active-tabs" : "tabs"} key={index} onClick={() => navegarIndicador(i.posicionResultado, i.codigoIndicador, i.fidIndicador)}>{i.codigoIndicador} </Tab>
                                })}
                            </TabList>
                            <div id="contenido1" style={{ display: contenidoActivo === "contenido1" ? "block" : "none", width: "95%" }}>
                                <div id="contenedorMM">

                                    <div className="contPerfilMM contDatosMM">
                                        <div className="contenedorTablaGC contTablaIndInf">
                                            {banderaCI === false && <p>Archivo no subido por ahora</p>}
                                            {banderaCI !== false && (
                                                <table className="tablaGC">
                                                    <thead>
                                                        <tr>
                                                            <th>Codigo</th>
                                                            <th>Estudiante</th>
                                                            <th>Puntuación</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {arregloAlumno.map((item) => (
                                                            <tr key={item.idAlumnosMuestra}
                                                                className={selectedRow === item.idAlumnosMuestra ? "selected" : ""}
                                                                onClick={() => setSelectedRow(item.idAlumnosMuestra)}>
                                                                <td>{item.codigo}</td>
                                                                <td>{item.nombre}</td>
                                                                {/* <td>{item.resultados[indicadorActual]}</td> */}
                                                                <td><div>
                                                                    <form>
                                                                        {/* <div class="checkboxgroup">
                                                                            <input type="radio" id={indiceActivo * 10 + indicadorActual + 100 * 1} value="1" name="options" checked={("1" === item.resultados[indicadorActual]) ? true : false}
                                                                                onChange={() => cambiarArreglo(item.idAlumnosMuestra, 1)} />
                                                                            <label for="punt1">

                                                                                1</label>
                                                                        </div>
                                                                        &nbsp;
                                                                        <div class="checkboxgroup">
                                                                            <input type="radio" id={indiceActivo * 10 + indicadorActual + 100 * 2} value="2" name="options" checked={("2" === item.resultados[indicadorActual]) ? true : false}
                                                                                onChange={() => cambiarArreglo(item.idAlumnosMuestra, 2)} />
                                                                            <label for="punt2">

                                                                                2</label>
                                                                        </div>
                                                                        &nbsp;
                                                                        <div class="checkboxgroup">
                                                                            <input type="radio" id={indiceActivo * 10 + indicadorActual + 100 * 3} value="3" name="options" checked={("3" === item.resultados[indicadorActual]) ? true : false}
                                                                                onChange={() => cambiarArreglo(item.idAlumnosMuestra, 3)} />
                                                                            <label for="punt3">

                                                                                3</label>
                                                                        </div>
                                                                        &nbsp;
                                                                        <div class="checkboxgroup">
                                                                            <input type="radio" id={indiceActivo * 10 + indicadorActual + 100 * 4} value="4" name="options" checked={("4" === item.resultados[indicadorActual]) ? true : false}
                                                                                onChange={(event) => cambiarArreglo(item.idAlumnosMuestra, 4)} />
                                                                            <label for="punt4">

                                                                                4</label>
                                                                        </div>
                                                        */}
                                                                        {valido && puntos.map((punto) => {
                                                                            return <div class="checkboxgroup">
                                                                                {/* <input type="radio" id={indiceActivo * 10 + indicadorActual + 100 * punto.numero} value={punto.numero.toString()} name="options" checked={(punto.numero.toString() === item.resultados[indicadorActual]) ? true : false}
                                                                                    onChange={() => cambiarArreglo(item.idAlumnosMuestra, punto.numero)} disabled={flagEnviado == 1 ? true : false} />
                                                                                <label for="punt1">

                                                                                    {punto.numero}</label> */}

                                                                                    <button className={(punto.numero.toString() === item.resultados[indicadorActual]) ? "punts active-punts" : "punts"} key={indiceActivo * 10 + indicadorActual + 100 * punto.numero} onClick={(e) => cambiarArreglo(e,item.idAlumnosMuestra, punto.numero)}
                                                                                    disabled={true}
                                                                                    > {punto.numero}</button>
                                                                                &nbsp;
                                                                            </div>



                                                                        })}



                                                                    </form>
                                                                </div></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>)}
                                            {/* <table className="tablaMM">
                                                                <tbody>
                                                                <tr className="tablaEncabezadoMM">
                                                                    <td>Codigo</td>
                                                                    <td>Estudiante</td>
                                                                    <td>Puntuación</td>
                                                                </tr>
                                                                <tr className="tablaInferiorMM">
                                                                    <td>20181267</td>
                                                                    <td>Palma Salas, Carlos Irving</td>
                                                                    <td>
                                                                        
                                                                    <div class="form-check form-check-inline">
                                                                        <input class="form-check-input" type="radio" name="inlineRadioOptions1.1" id="inlineRadio1" value="option1"/>
                                                                            <label class="form-check-label" for="inlineRadio1.2">1</label>
                                                                        </div>
                                                                        <div class="form-check form-check-inline">
                                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions1.1" id="inlineRadio2" value="option2"/>
                                                                            <label class="form-check-label" for="inlineRadio1.2">2</label>
                                                                        </div>
                                                                        <div class="form-check form-check-inline">
                                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions1.1" id="inlineRadio2" value="option2"/>
                                                                            <label class="form-check-label" for="inlineRadio1.2">3</label>
                                                                        </div>
                                                                        <div class="form-check form-check-inline">
                                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions1.1" id="inlineRadio2" value="option2"/>
                                                                            <label class="form-check-label" for="inlineRadio1.2">4</label>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table> */}
                                        </div>
                                    </div>
                                    <br></br>
                                    
                                    <div className="contGuardarFinal contGuardarRMMM">
                                        {/* <div className="btnDivDisenio">
                                            {flagEnviado==1?"":(<button className="btnDisenio btnGuardarMedi1" type="button" onClick={guardar}>
                                                Guardar </button>)}
                                        </div> */}
                                    </div>

                                </div>
                            </div>
                        </Tabs>
                    </div>

                </div>
                <br></br>
            </div>
        </div>
    );
}
