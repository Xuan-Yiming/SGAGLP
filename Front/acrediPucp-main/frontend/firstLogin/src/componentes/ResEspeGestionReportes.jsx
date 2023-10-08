import "../HojasDeEstilo/ResEspeGestionReportes.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import axios from 'axios';
import { useState, useEffect } from 'react';   //para hooks estados
import { Accordion, Card, Button } from 'react-bootstrap';
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import DatePicker from 'react-datepicker';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { View } from 'react-native';
import 'react-datepicker/dist/react-datepicker.css';
import { addBandera } from "../Redux/CargandoSlice";
import { useLocalStorage } from './useLocalStorage';

const fileDownload = require('js-file-download');

function getFechaHoraActual() {
    const fechaHoraActual = new Date();

    // Obtener componentes de la fecha y hora
    const año = fechaHoraActual.getFullYear();
    const mes = (fechaHoraActual.getMonth() + 1).toString().padStart(2, '0');
    const día = fechaHoraActual.getDate().toString().padStart(2, '0');
    const hora = fechaHoraActual.getHours().toString().padStart(2, '0');
    const minutos = fechaHoraActual.getMinutes().toString().padStart(2, '0');
    const segundos = fechaHoraActual.getSeconds().toString().padStart(2, '0');

    // Formatear la fecha y hora
    const fechaHoraFormateada = `${día}/${mes}/${año} ${hora}:${minutos}:${segundos}`;

    return fechaHoraFormateada;
}

export default function ResEspeGestionReportes(props) {

    const [selectedValue, setSelectedValue] = useState("Ciclo inicio");
    const [selectedValue2, setSelectedValue2] = useState("Ciclo fin");
    const [selectedValue3, setSelectedValue3] = useState("");
    const [selectedValue4, setSelectedValue4] = useState("");
    const [selectedValue5, setSelectedValue5] = useState("");
    const [selectedValue6, setSelectedValue6] = useState("");
    const [selectedCicloIniNum, setSelectedCicloIniNum] = useState(0);
    const [selectedCicloFinNum, setSelectedCicloFinNum] = useState(999999);
    const [cookies, setCookie] = useCookies();

    //const [completed, setcompleted] = useState(true);
    const [mostrarModal, setmostrarModal] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);
    const [mostrarModal3, setmostrarModal3] = useState(false);
    const [mostrarModal4, setmostrarModal4] = useState(false);
    const [mostrarModal5, setmostrarModal5] = useState(false);
    const [mostrarModal6, setmostrarModal6] = useState(false);

    const [flagFecha, setFlagFecha] = useState(false);


    const dispatch = useDispatch();
    const datosCuenta = useSelector((state) => state.Cuenta);
    const completed = useSelector((state) => state.Cargando);
    /*fecha*/
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDate2, setSelectedDate2] = useState(null);

    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFinal, setFechaFinal] = useState("");

    const [id, setId] = useLocalStorage("id");


    const [flagDataVacia, setFlagDataVacia] = useState(false);
    


    //http://localhost:3050/api/combobox/listarCompetencias

    // const [bomboBox, setComboBox] = useState([{ id: 1, ciclo: "2022-1" }, { id: 2, ciclo: "2022-2" }, { id: 3, ciclo: "2023-0" }, { id: 4, ciclo: "2023-1" }, { id: 5, ciclo: "2023-2" }]);
    const [bomboBox, setComboBox] = useState([]);
    // const [cursoBox, setCursoBox] = useState([{ id: 1, curso: "INF238" }, { id: 2, curso: "1inf06" }, { id: 3, curso: 'TODOS' }]);
    const [cursoBox, setCursoBox] = useState([]);
    const [cursoBox2, setCursoBox2] = useState([]);
    // const [competenciaBox, setCompetenciaBox] = useState([{ id: 1, compe: "RE.11" }, { id: 2, compe: "RE. 2" }, { id: 3, compe: 'RE 5' }, { id: 4, compe: 'RE 5' }
    //     , { id: 5, compe: 'RE 4' }, { id: 6, compe: 'RE 3' }, { id: 7, compe: 'RE. 19' }, { id: 8, compe: 'RE. 21' }, { id: 9, compe: 'RE.22' }, { id: 10, compe: 'TODOS' }]);
    const [competenciaBox, setCompetenciaBox] = useState([]);
    const [estadoBox, setEstadoBox] = useState([{ id: 1, estado: "ACTIVOS" }, { id: 2, estado: "INACTIVOS" }, { id: 3, estado: 'TODOS' }]);
    // const [estadoBox, setEstadoBox] = useState([]);
    // se debe usar este formato para los estados o sino se muere


    const handleModalResultadosGenerales = () => {
        setFlagDataVacia(false);
        setmostrarModal(true);
    };

    const handleModalResultadosGenerales2 = () => {
        setFlagDataVacia(false);
        setmostrarModal2(true)
    };

    const handleModalResultadosGenerales3 = () => {
        setFlagDataVacia(false);
        setmostrarModal3(true)
    };

    const handleModalResultadosGenerales4 = () => {

        setFlagDataVacia(false);
        setmostrarModal4(true)
    };

    const handleModalResultadosGenerales5 = () => {
        setFlagDataVacia(false);
        setmostrarModal5(true)
    };
    const handleModalResultadosGenerales6 = () => {
        setFlagDataVacia(false);
        setmostrarModal6(true)

    };


    const handleModalClose = () => {
        setmostrarModal(false);
        setmostrarModal2(false);
        setmostrarModal3(false);
        setmostrarModal4(false);
        setmostrarModal5(false);
        setmostrarModal6(false);
    };



    const llenarCursoBox2 = async () => {

        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: {
                Authorization: 'Bearer ' + cookies.jwt
            }
        }

        const data = {

            fidEspecialidad: id
        }
        console.log("AQUI ESTA LA DATAAAAAAA CURSO 2");
        // console.log(data);
        console.log(config);
        console.log("AQUI ESTA LA DATAAAAAAA CURSO 2");
        try {

            const respuesta = await axios.post("http://localhost:3050/api/combobox/listarCursosXEspecialidad", data, config);
            console.log("AQUI ESTA LA DATAAAAAAA CURSO 333");
            console.log(respuesta);


            console.log(respuesta.data.data);
            setCursoBox2(respuesta.data.data);
            // props.cambiarComponente(false);
        }
        catch (error) {
            console.log(error);
        }
    }



    const llenarCompetenciaBox2 = async () => {

        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: {
                Authorization: 'Bearer ' + cookies.jwt
            }
        }

        const data = {

            fidEspecialidad: id
        }
        console.log("AQUI ESTA LA DATAAAAAAA COMPETENCIA");
        // console.log(data);
        console.log(config);
        console.log("AQUI ESTA LA DATAAAAAAA COMPETENCIA");
        try {

            const respuesta = await axios.post("http://localhost:3050/api/combobox/listarCompetenciasXEspecialidad", data, config);
            console.log("AQUI ESTA LA DATAAAAAAA CURSO 333");
            console.log(respuesta);


            console.log(respuesta.data.data);
            setCompetenciaBox(respuesta.data.data);
            // props.cambiarComponente(false);
        }
        catch (error) {
            console.log(error);
        }
    }



    const llenarCursoBox = async () => {

        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: {
                Authorization: 'Bearer ' + cookies.jwt
            }

        }
        console.log("AQUI ESTA LA DATAAAAAAA");
        // console.log(data);
        console.log(config);
        console.log("AQUI ESTA LA DATAAAAAAA");
        try {

            const respuesta = await axios.get("http://localhost:3050/api/combobox/listarCursos", config);
            console.log(respuesta);


            console.log(respuesta.data);
            setCursoBox(respuesta.data.data);
            // props.cambiarComponente(false);
        }
        catch (error) {
            console.log(error);
        }
    }


    const llenarCompetenciaBox = async () => {

        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: {
                Authorization: 'Bearer ' + cookies.jwt
            }

        }
        console.log("AQUI ESTA LA DATAAAAAAA");
        // console.log(data);
        console.log(config);
        console.log("AQUI ESTA LA DATAAAAAAA");
        try {

            const respuesta = await axios.get("http://localhost:3050/api/combobox/listarCompetencias", config);
            console.log(respuesta);


            console.log(respuesta.data);
            setCompetenciaBox(respuesta.data.data);
            // props.cambiarComponente(false);
        }
        catch (error) {
            console.log(error);
        }
    }


    const llenarComboBoxCiclos = async () => {

        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: {
                Authorization: 'Bearer ' + cookies.jwt
            }

        }
        console.log("AQUI ESTA LA DATAAAAAAA");
        // console.log(data);
        console.log(config);
        console.log("AQUI ESTA LA DATAAAAAAA");
        try {

            const respuesta = await axios.get("http://localhost:3050/api/combobox/listarCiclos", config);
            console.log(respuesta);


            console.log(respuesta.data);
            setComboBox(respuesta.data.data);
            // props.cambiarComponente(false);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        llenarCursoBox2();
        //llenarCompetenciaBox();
        llenarComboBoxCiclos();
        llenarCursoBox();
        llenarCompetenciaBox2();
    }, []);



    const handleExportar = async () => {
        dispatch(addBandera(false))
        console.log("Galleta:")
        console.log(cookies.jwt)

        var algo = [];
        algo.push(selectedValue[0] + selectedValue[1] + selectedValue[2] + selectedValue[3] + selectedValue[5])
        algo = parseInt(algo);
        console.log(algo);
        var algo2 = [];
        algo2.push(selectedValue2[0] + selectedValue2[1] + selectedValue2[2] + selectedValue2[3] + selectedValue2[5])
        algo2 = parseInt(algo2);
        console.log(algo2);

        const verdad = algo <= algo2 ? true : false
        console.log(verdad);

        if (verdad) {
            const config = {
                responseType: 'blob',
                headers: {
                    Authorization: 'Bearer ' + cookies.jwt
                }

            }
            const data = {
                periodoI: selectedValue,
                periodoF: selectedValue2,

                codCurso: selectedValue3,
                idEspecialidad: datosCuenta.idEspecialidad

            }
            console.log("AQUI ESTA LA DATAAAAAAA");
            console.log(data);
            console.log(config);
            console.log("AQUI ESTA LA DATAAAAAAA");
            try {

                const respuesta = await axios.post("http://localhost:3050/api/muestraMedicion/exportarResultadoGeneral", data, config);

                console.log(respuesta.data.size)

                // Verificar si la respuesta está vacía o incorrecta
                if (respuesta.data.size == 2) {
                    // console.log()
                    setFlagDataVacia(true)
                    // console.log("La respuesta está vacía.");
                } else {
                    const fechaHora = getFechaHoraActual();
                    const decodedFilename = 'Reporte Resultados General' + fechaHora + '.xlsx'
                    const blob = new Blob([respuesta.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = decodedFilename;
                    document.body.appendChild(link);
                    link.target = "_blank";
                    link.click();
                    setFlagDataVacia(false)
                }


            }
            catch (err) {
                return false;
            }
        }

        dispatch(addBandera(true))


    }

    const handleExportarIndicadores = async () => {
        dispatch(addBandera(false))
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            responseType: 'blob',
            headers: {
                Authorization: 'Bearer ' + cookies.jwt
            }

        }


        // console.log(fechaInicio);
        const f1 = formatDate2(selectedDate);
        const f2 = formatDate2(selectedDate2);

        console.log("prueba verdadero falso");

        // parseInt(f1)>parseInt(f2)?set:console.log("falso");
        


        console.log(fechaFinal);

        const data = {
            estado: selectedValue4,
            fechaD: fechaInicio,
            fechaH: fechaFinal,

            competencia: selectedValue5,
            idEspecialidad: datosCuenta.idEspecialidad
        }
        console.log("AQUI ESTA LA DATAAAAAAA");
        console.log(data);
        console.log(config);
        console.log("AQUI ESTA LA DATAAAAAAA");

        if(parseInt(f1)<=parseInt(f2)){
            setFlagFecha(false);
            try {

                const respuesta = await axios.post("http://localhost:3050/api/competencia/exportarCompetencia", data, config);
                console.log(respuesta);
    
                console.log(respuesta.data.size)
    
    
    
                if (respuesta.data.size == 2) {
                    // console.log()
                    setFlagDataVacia(true)
                    // console.log("La respuesta está vacía.");
                } else {
                    const fechaHora = getFechaHoraActual();
                    const decodedFilename = 'Reporte Histórico de Indicadores ' + fechaHora + '.xlsx'
                    const blob = new Blob([respuesta.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = decodedFilename;
                    document.body.appendChild(link);
                    link.target = "_blank";
                    link.click();
                    setFlagDataVacia(false)
                }
    
    
            }
            catch (err) {
                return false;
            }
        }else{
            setFlagFecha(true);
        }

        dispatch(addBandera(true))

    }




    const handleExportarResultadosMedicion = async () => {
        dispatch(addBandera(false))
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            responseType: 'blob',
            headers: {
                Authorization: 'Bearer ' + cookies.jwt
            }

        }
        const data = {
            periodo: selectedValue6,
            nivel: selectedValueRadio,
            codCurso: selectedValue3,
            idEspecialidad: datosCuenta.idEspecialidad,

        }
        console.log("AQUI ESTA LA DATAAAAAAA");
        console.log(data);
        console.log(config);
        console.log("AQUI ESTA LA DATAAAAAAA");
        try {

            const respuesta = await axios.post("http://localhost:3050/api/medicion/exportarResultadoMedicion", data, config);
            console.log(respuesta.data.size)
            if (respuesta.data.size<=200) {
                // console.log()
                setFlagDataVacia(true)
                // console.log("La respuesta está vacía.");
            } else {

                console.log(respuesta);
                const fechaHora = getFechaHoraActual();
                const decodedFilename = 'Reporte de Mediciones ' + fechaHora + '.xlsx';
                const blob = new Blob([respuesta.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = decodedFilename;
                document.body.appendChild(link);
                link.target = "_blank";
                link.click();
                setFlagDataVacia(false)
            }

        }
        catch (err) {
            return false;
        }

        dispatch(addBandera(true))

    }



    const handleExportarSeguimientoMuestras = async () => {
        dispatch(addBandera(false))
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            responseType: 'blob',
            headers: {
                Authorization: 'Bearer ' + cookies.jwt
            }

        }

        const f1 = formatDate2(selectedDate);
        const f2 = formatDate2(selectedDate2);

        console.log("prueba verdadero falso");

        const data = {
            estado: selectedValue4,
            fechaD: fechaInicio,
            fechaH: fechaFinal,
            fidEspecialidad: datosCuenta.idEspecialidad

        }
        console.log("AQUI ESTA LA DATAAAAAAA");
        console.log(data);
        console.log(config);
        console.log("AQUI ESTA LA DATAAAAAAA");

        if(parseInt(f1)<=parseInt(f2)){
            setFlagFecha(false);
            try {

                const respuesta = await axios.post("http://localhost:3050/api/muestraMedicion/exportarSeguimientoMuestras", data, config);
                console.log(respuesta.data.size)
                if (respuesta.data.size <= 100) {
                    // console.log()
                    setFlagDataVacia(true)
                    // console.log("La respuesta está vacía.");
                } else {
    
                    console.log(respuesta);
                    const fechaHora = getFechaHoraActual();
                    const decodedFilename = 'Seguimiento de Muestras ' + fechaHora + '.xlsx';
                    const blob = new Blob([respuesta.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = decodedFilename;
                    document.body.appendChild(link);
                    link.target = "_blank";
                    link.click();
                    setFlagDataVacia(false)
                }
    
            }
            catch (err) {
                return false;
            }
        }else{
            setFlagFecha(true);
        }

        

        dispatch(addBandera(true))
    }


    const handleExportarPlanMejora = async () => {
        dispatch(addBandera(false))
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            responseType: 'blob',
            headers: {
                Authorization: 'Bearer ' + cookies.jwt
            }

        }
        const data = {
            estado: selectedValue4,
            fechaD: fechaInicio,
            fechaH: fechaFinal,
            fidEspecialidad: datosCuenta.idEspecialidad

        }

        const f1 = formatDate2(selectedDate);
        const f2 = formatDate2(selectedDate2);


        console.log("AQUI ESTA LA DATAAAAAAA");
        console.log(data);
        console.log(config);
        console.log("AQUI ESTA LA DATAAAAAAA");


        if(parseInt(f1)<=parseInt(f2)){
            setFlagFecha(false);
            try {

                const respuesta = await axios.post("http://localhost:3050/api/planMejora/exportarPlanMejora", data, config);
                console.log(respuesta.data.size)
                if (respuesta.data.size <= 100) {
                    // console.log()
                    setFlagDataVacia(true)
                    // console.log("La respuesta está vacía.");
                } else {
    
                    console.log(respuesta);
                    const fechaHora = getFechaHoraActual();
                    const decodedFilename = 'Plan de Mejora ' + fechaHora + '.xlsx';
                    const blob = new Blob([respuesta.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = decodedFilename;
                    document.body.appendChild(link);
                    link.target = "_blank";
                    link.click();
                    setFlagDataVacia(false)
                }
    
            }
            catch (err) {
                return false;
            }
        }else{
            setFlagFecha(true);
        }


        dispatch(addBandera(true))
    }



    const handleExportarObjetivosEducacionales = async () => {
        dispatch(addBandera(false))
        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            responseType: 'blob',
            headers: {
                Authorization: 'Bearer ' + cookies.jwt
            }

        }
        const data = {
            estado: selectedValue4,
            fechaD: fechaInicio,
            fechaH: fechaFinal,
            fidEspecialidad: datosCuenta.idEspecialidad

        }
        console.log("AQUI ESTA LA DATAAAAAAA");
        console.log(data);
        console.log(config);
        console.log("AQUI ESTA LA DATAAAAAAA");

        const f1 = formatDate2(selectedDate);
        const f2 = formatDate2(selectedDate2);

        if(parseInt(f1)<=parseInt(f2)){
            setFlagFecha(false);
            try {


                const respuesta = await axios.post("http://localhost:3050/api/objetivoEducacional/exportarObjetivoEducacional", data, config);
                console.log(respuesta.data.size)
                if (respuesta.data.size == 45) {
                    // console.log()
                    setFlagDataVacia(true)
                    // console.log("La respuesta está vacía.");
                } else {
    
                    console.log(respuesta);
                    const fechaHora = getFechaHoraActual();
                    const decodedFilename = 'Reporte Histórico de Objetivos Educacionales ' + fechaHora + '.xlsx';
                    const blob = new Blob([respuesta.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = decodedFilename;
                    document.body.appendChild(link);
                    link.target = "_blank";
    
                    link.click();
                    setFlagDataVacia(false)
                }
    
    
            }
            catch (err) {
                return false;
            }
        }else{
            setFlagFecha(true);
        }

        dispatch(addBandera(true))
    }


    const handleSelectChange6 = (event) => {


        
        event.preventDefault();
        setSelectedValue6(event.target.value);
        // onSelect(selectedValue);
    }

    const handleSelectChange = (optionKey, option) => {


        
        setSelectedValue(option.target.textContent);
        setSelectedCicloIniNum(optionKey)
        // onSelect(selectedValue);
    }

    const handleSelectChange2 = (optionKey, option) => {

        setSelectedValue2(option.target.textContent);
        setSelectedCicloFinNum(optionKey)
        // onSelect(selectedValue2);
    }

    const handleSelectChange3 = (event) => {
        event.preventDefault();
        setSelectedValue3(event.target.value);
        // onSelect(selectedValue2);
    }

    const handleSelectChange4 = (event) => {
        event.preventDefault();
        setSelectedValue4(event.target.value);
        console.log(selectedValue4);
        // onSelect(selectedValue2);
    }


    const handleSelectChange5 = (event) => {
        event.preventDefault();
        setSelectedValue5(event.target.value);
        console.log(selectedValue5);
        // onSelect(selectedValue2);
    }

    const handleDateChange = (date) => {
        setFlagFecha(false);
        setSelectedDate(date);
        setFechaInicio(formatDate(date));
        // console.log(selectedDate);
        // console.log("fecha in -->" + fechaInicio);
    };

    const handleDateChange2 = (date) => {
        setSelectedDate2(date);
        setFlagFecha(false);
        setFechaFinal(formatDate(date));
        // formatDate(date)
        // console.log(selectedDate);
        // console.log("fecha fin -->" + fechaFinal);
    };

    // llenarComboBoxCiclos();



    const formatDate = (date) => {
        if (!date) return ""; // Handle null or undefined values

        // Get day, month, and year from the date object
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();

        // Pad single-digit day and month with leading zeros if necessary
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');

        // Return the formatted date string in "dd/mm/yyyy" format
        // setFechaInicio(`${year}-${formattedMonth}-${formattedDay}`);
        // console.log("fecha in -->" + fechaInicio);
        return `${year}-${formattedMonth}-${formattedDay}`;
    };



    const formatDate2 = (date) => {
        if (!date) return ""; // Handle null or undefined values

        // Get day, month, and year from the date object
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();

        // Pad single-digit day and month with leading zeros if necessary
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');

        // Return the formatted date string in "dd/mm/yyyy" format
        // setFechaInicio(`${year}-${formattedMonth}-${formattedDay}`);
        // console.log("fecha in -->" + fechaInicio);
        return `${year}${formattedMonth}${formattedDay}`;
    };

    /* FECHAS */

    /* CHECKBOX */




    const [selectedValueRadio, setSelectedValueRadio] = useState("");
    const handleRadioChange = (event) => {
        console.log(selectedValueRadio);
        setSelectedValueRadio(event.target.value);
    };
    /* CHECKBOX */
    /* CHECKBOX */
    return (
        <>

            <div className="REGRContenedorPrincipal">

                <div className="REGRContenedorLineas">

                    <div className="REGRContendorTabla">
                        <div className="opciones-sup">

                            <div className="REGRLineaOpcion">
                                <a href="#" className="nav-link align-middle px-3 referenciaResGen" onClick={handleModalResultadosGenerales}>
                                    <span className="textoHiper">Resultados General</span>
                                </a>

                                <Modal className='REGRmodalCargar' show={mostrarModal}>
                                    <Modal.Body >
                                        <div className='REGRContenedorCancelar'>
                                            <button className="REGRbotonCancelar" type="button"
                                                data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleModalClose} >
                                                <i class="bi bi-x-circle botonCircCancelar"></i> </button>
                                        </div>


                                        <div className="REGRContenedorEspacioGR">
                                            <div className="REGREncabezado">
                                                <div className="REGRContenedorEncabezado">
                                                    <div className="REGRTitulos tituloEspecial">Espacios de Medición</div>
                                                    <div className="REGRInicio">
                                                        <div className="labelGen REGRTitulos REGRTitulos2">Inicio Ciclo</div>
                                                        <div className="REGRComboBox">
                                                            <DropdownButton title ={selectedValue}>
                                                                {bomboBox.filter(option => option.id <= selectedCicloFinNum).map(option => (
                                                                <Dropdown.Item 
                                                                    key={option.id}
                                                                    eventKey={option.ciclo} 
                                                                    onClick={(e) => handleSelectChange(option.id, e)}
                                                                >
                                                                    {option.ciclo}
                                                                </Dropdown.Item>
                                                                ))}
                                                            </DropdownButton>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    {/* <br/> */}
                                                    <div className="REGRFinal">
                                                        <div className="labelGen REGRTitulos REGRTitulos2">Fin Ciclo</div>
                                                        <div className="REGRComboBox">
                                                            <DropdownButton title ={selectedValue2}>
                                                                {bomboBox.filter(option => option.id >= selectedCicloIniNum).map(option => (
                                                                <Dropdown.Item
                                                                    key={option.id}
                                                                    eventKey={option.ciclo}
                                                                    onClick={(e) => handleSelectChange2(option.id, e)}
                                                                >
                                                                    {option.ciclo}
                                                                </Dropdown.Item>
                                                                ))}
                                                            </DropdownButton>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="REGRCurso">
                                                        <div className="labelGen REGRTitulos REGRTitulos2">Cursos</div>
                                                        <div className="REGRComboBox">
                                                            <select value={selectedValue3} onChange={handleSelectChange3}>
                                                                <option value="">Selecciona un curso</option>
                                                                {cursoBox2.map(option => (
                                                                    <option key={option.id} value={option.curso}>
                                                                        {option.curso}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="REGRContenedor2">

                                            <div className="REGRTablaCarga">
                                                <div className="REGRBotonesCarga">
                                                </div>
                                                <div className="REGRTablaInterna">
                                                </div>
                                            </div>

                                        </div>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <div className="REGRContenedorExportar">
                                            {flagDataVacia ? <div className="REGRModalError">
                                                <div style={{ color: 'red' }}>
                                                    No se pudo exportar debido a que no hay datos con los parametros ingresados*
                                                </div>
                                            </div> : ""}
                                            <Button className="btnDisenio botonExportar" onClick={handleExportar}>
                                                Exportar</Button>
                                        </div>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div className="REGRLineaOpcion">
                                <a href="#" className="nav-link align-middle px-3 referenciaIndicadores" onClick={handleModalResultadosGenerales2}>
                                    <span className="textoHiper">Indicadores</span>
                                </a>
                                <Modal className='custom-modal' show={mostrarModal2}>
                                    <Modal.Body >
                                        <div className='REGRContenedorCancelar'>
                                            <button className="REGRbotonCancelar" type="button"
                                                data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleModalClose} >
                                                <i class="bi bi-x-circle botonCircCancelar"></i> </button>
                                        </div>


                                        <div className="REGRContenedorEspacioGR">
                                            <div className="REGREncabezado REGREncabezadoIndicadores">
                                                <div className="REGRContenedorEncabezado">
                                                    <div className="REGRTitulos tituloEspecial">Indicadores</div>

                                                    <div className="REGRInicio">
                                                        <div className="labelGen REGRTitulos titEspeIndic">Estado</div>
                                                        <div className="REGRComboBox">
                                                            <select value={selectedValue4} onChange={handleSelectChange4}>
                                                                <option value="">Selecciona un estado</option>
                                                                {estadoBox.map(option => (
                                                                    <option key={option.id} value={option.estado}>
                                                                        {option.estado}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <br />
                                                    {/* <br/> */}
                                                    <div className="REGRFinal desdeDate">
                                                        <div className="labelGen REGRTitulos titEspeIndic">DESDE:</div>
                                                        <DatePicker selected={selectedDate} onChange={handleDateChange} className="custom-date-picker" dateFormat="dd/MM/yyyy"/>
                                                    </div>
                                                    <div className="REGRFinal">
                                                        <div className="labelGen REGRTitulos titEspeIndic">HASTA:</div>
                                                        <DatePicker selected={selectedDate2} onChange={handleDateChange2} className="custom-date-picker" dateFormat="dd/MM/yyyy"/>
                                                    </div>

                                                    {flagFecha?
                                                    <div style={{color: 'red'}}>Los datos de fecha estan errados o no vacios </div>
                                                    :<br/>}

                                                    <div className="REGRCurso">
                                                        <div className=" labelGen REGRTitulos titEspeIndic">Competencia</div>
                                                        <div className="REGRComboBox">
                                                            <select value={selectedValue5} onChange={handleSelectChange5}>
                                                                <option value="">Selecciona una competencia</option>
                                                                {competenciaBox.map(option => (
                                                                    <option key={option.id} value={option.compe}>
                                                                        {option.competencia}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="REGRContenedor2">

                                            <div className="REGRTablaCarga">
                                                <div className="REGRBotonesCarga">
                                                </div>
                                                <div className="REGRTablaInterna">
                                                </div>
                                            </div>

                                        </div>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <div className="REGRContenedorExportar">
                                            {flagDataVacia ? <div className="REGRModalError">
                                                <div style={{ color: 'red' }}>
                                                    No se pudo exportar debido a que no hay datos con los parametros ingresados*
                                                </div>
                                            </div> : ""}
                                            <Button className="btnDisenio botonExportar" onClick={handleExportarIndicadores}>
                                                Exportar</Button>
                                        </div>
                                    </Modal.Footer>
                                </Modal>
                            </div>

                            <div className="REGRLineaOpcion">
                                <a href="#" className="nav-link align-middle px-3 referenciaPlanMejora" onClick={handleModalResultadosGenerales6}>
                                    <span className="textoHiper">Plan de Mejora</span>
                                </a>
                                <Modal className='REGRmodalCargar' show={mostrarModal6}>
                                    <Modal.Body >
                                        <div className='REGRContenedorCancelar'>
                                            <button className="REGRbotonCancelar" type="button"
                                                data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleModalClose} >
                                                <i class="bi bi-x-circle botonCircCancelar"></i> </button>
                                        </div>


                                        <div className="REGRContenedorEspacioGR">
                                            <div className="REGREncabezado">
                                                <div className="REGRContenedorEncabezado">
                                                    <div className="REGRTitulos tituloEspecial">Plan de Mejora</div>

                                                    <div className="REGRInicio">
                                                        <div className="labelGen REGRTitulos">Estado</div>
                                                        <div className="REGRComboBox">
                                                            <select value={selectedValue4} onChange={handleSelectChange4}>
                                                                <option value="">Selecciona un estado</option>
                                                                {estadoBox.map(option => (
                                                                    <option key={option.id} value={option.estado}>
                                                                        {option.estado}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <br />
                                                    {/* <br/> */}
                                                    <div className="REGRFinal desdeDate">
                                                        <div className="labelGen REGRTitulos">DESDE:</div>
                                                        <DatePicker selected={selectedDate} onChange={handleDateChange} className="custom-date-picker" dateFormat="dd/MM/yyyy"/>
                                                    </div>
                                                    <div className="REGRFinal">
                                                        <div className="labelGen REGRTitulos">HASTA:</div>
                                                        <DatePicker selected={selectedDate2} onChange={handleDateChange2} className="custom-date-picker" dateFormat="dd/MM/yyyy"/>
                                                    </div>
                                                    {flagFecha?
                                                    <div style={{color: 'red'}}>Los datos de fecha estan errados o no vacios </div>
                                                    :<br/>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="REGRContenedor2">

                                            <div className="REGRTablaCarga">
                                                <div className="REGRBotonesCarga">
                                                </div>
                                                <div className="REGRTablaInterna">
                                                </div>
                                            </div>

                                        </div>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <div className="REGRContenedorExportar">
                                            {flagDataVacia ? <div className="REGRModalError">
                                                <div style={{ color: 'red' }}>
                                                    No se pudo exportar debido a que no hay datos con los parametros ingresados*
                                                </div>
                                            </div> : ""}
                                            <Button className="btnDisenio botonExportar" onClick={handleExportarPlanMejora}>
                                                Exportar</Button>
                                        </div>
                                    </Modal.Footer>
                                </Modal>

                            </div>

                        </div>
                        <div className="opciones-inf">
                            <div className="REGRLineaOpcion">
                                <a href="#" className="nav-link align-middle px-3 referenciaSegMuestra" onClick={handleModalResultadosGenerales5}>
                                    <span className="textoHiper">Seguimiento de Muestras</span>
                                </a>
                                <Modal className='REGRmodalCargar' show={mostrarModal5}>
                                    <Modal.Body >
                                        <div className='REGRContenedorCancelar'>
                                            <button className="REGRbotonCancelar" type="button"
                                                data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleModalClose} >
                                                <i class="bi bi-x-circle botonCircCancelar"></i> </button>
                                        </div>


                                        <div className="REGRContenedorEspacioGR">
                                            <div className="REGREncabezado">
                                                <div className="REGRContenedorEncabezado">
                                                    <div className="REGRTitulos tituloEspecial">Seguimiento de Muestras</div>

                                                    <div className="REGRInicio">
                                                        <div className="labelGen REGRTitulos">Estado</div>
                                                        <div className="REGRComboBox">
                                                            <select value={selectedValue4} onChange={handleSelectChange4}>
                                                                <option value="">Selecciona un estado</option>
                                                                {estadoBox.map(option => (
                                                                    <option key={option.id} value={option.estado}>
                                                                        {option.estado}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <br />
                                                    {/* <br/> */}
                                                    <div className="REGRFinal desdeDate">
                                                        <div className="labelGen REGRTitulos">DESDE:</div>
                                                        <DatePicker selected={selectedDate} onChange={handleDateChange} className="custom-date-picker" dateFormat="dd/MM/yyyy"/>
                                                    </div>
                                                    <div className="REGRFinal">
                                                        <div className="labelGen REGRTitulos">HASTA:</div>
                                                        <DatePicker selected={selectedDate2} onChange={handleDateChange2} className="custom-date-picker" dateFormat="dd/MM/yyyy"/>
                                                    </div>
                                                    {flagFecha?
                                                    <div style={{color: 'red'}}>Los datos de fecha estan errados o no vacios </div>
                                                    :<br/>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="REGRContenedor2">

                                            <div className="REGRTablaCarga">
                                                <div className="REGRBotonesCarga">
                                                </div>
                                                <div className="REGRTablaInterna">
                                                </div>
                                            </div>

                                        </div>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <div className="REGRContenedorExportar">
                                            {flagDataVacia ? <div className="REGRModalError">
                                                <div style={{ color: 'red' }}>
                                                    No se pudo exportar debido a que no hay datos con los parametros ingresados*
                                                </div>
                                            </div> : ""}
                                            <Button className="btnDisenio botonExportar" onClick={handleExportarSeguimientoMuestras}>
                                                Exportar</Button>
                                        </div>
                                    </Modal.Footer>
                                </Modal>

                            </div>
                            <div className="REGRLineaOpcion">
                                <a href="#" className="nav-link align-middle px-3 referenciaObjEduc" onClick={handleModalResultadosGenerales3}>
                                    <span className="textoHiper">Objetivos Educacionales</span>
                                </a>
                                <Modal className='REGRmodalCargar' show={mostrarModal3}>
                                    <Modal.Body >
                                        <div className='REGRContenedorCancelar'>
                                            <button className="REGRbotonCancelar" type="button"
                                                data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleModalClose} >
                                                <i class="bi bi-x-circle botonCircCancelar"></i> </button>
                                        </div>


                                        <div className="REGRContenedorEspacioGR">
                                            <div className="REGREncabezado">
                                                <div className="REGRContenedorEncabezado">
                                                    <div className="REGRTitulos tituloEspecial">Objetivos educacionales</div>

                                                    <div className="REGRInicio">
                                                        <div className="labelGen REGRTitulos">Estado</div>
                                                        <div className="REGRComboBox">
                                                            <select value={selectedValue4} onChange={handleSelectChange4}>
                                                                <option value="">Selecciona un estado</option>
                                                                {estadoBox.map(option => (
                                                                    <option key={option.id} value={option.estado}>
                                                                        {option.estado}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <br />
                                                    {/* <br/> */}
                                                    <div className="REGRFinal desdeDate">
                                                        <div className="labelGen REGRTitulos">DESDE:</div>
                                                        <DatePicker selected={selectedDate} onChange={handleDateChange} className="custom-date-picker" dateFormat="dd/MM/yyyy"/>
                                                    </div>
                                                    <div className="REGRFinal">
                                                        <div className="labelGen REGRTitulos">HASTA:</div>
                                                        <DatePicker selected={selectedDate2} onChange={handleDateChange2} className="custom-date-picker" dateFormat="dd/MM/yyyy"/>
                                                    </div>
                                                    {flagFecha?
                                                    <div style={{color: 'red'}}>Los datos de fecha estan errados o no vacios </div>
                                                    :<br/>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="REGRContenedor2">

                                            <div className="REGRTablaCarga">
                                                <div className="REGRBotonesCarga">
                                                </div>
                                                <div className="REGRTablaInterna">
                                                </div>
                                            </div>

                                        </div>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <div className="REGRContenedorExportar">
                                            {flagDataVacia ? <div className="REGRModalError">
                                                <div style={{ color: 'red' }}>
                                                    No se pudo exportar debido a que no hay datos con los parametros ingresados*
                                                </div>
                                            </div> : ""}
                                            <Button className=" btnDisenio botonExportar" onClick={handleExportarObjetivosEducacionales}>
                                                Exportar</Button>
                                        </div>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div className="REGRLineaOpcion">
                                <a href="#" className="nav-link align-middle px-3 referenciaResMuest" onClick={handleModalResultadosGenerales4}>
                                    <span className="textoHiper">Resultados Medición</span>
                                </a>
                                <Modal className='REGRmodalCargar' show={mostrarModal4}>
                                    <Modal.Body >
                                        <div className='REGRContenedorCancelar'>
                                            <button className="REGRbotonCancelar" type="button"
                                                data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleModalClose} >
                                                <i class="bi bi-x-circle botonCircCancelar"></i> </button>
                                        </div>
                                        <div className="REGRContenedorEspacioGR">
                                            <div className="REGREncabezado">
                                                <div className="REGRContenedorEncabezado">
                                                    <div className="REGRTitulos tituloEspecial">RESULTADOS MEDICIÓN</div>


                                                    <div className="REGRInicio">
                                                        <div className="labelGen REGRTitulos">Ciclo</div>
                                                        <div className="REGRComboBox">
                                                            <select value={selectedValue6} onChange={handleSelectChange6}>
                                                                <option value="">Selecciona un ciclo</option>
                                                                {bomboBox.map(option => (
                                                                    <option key={option.id} value={option.ciclo}>
                                                                        {option.ciclo}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <br />
                                                    <div className="REGRInicio">
                                                        <div className="labelGen REGRTitulos">Nivel</div>
                                                        <div className="REGRRadioButton">
                                                            <label>
                                                                <input
                                                                    className='primerRB'
                                                                    type="radio"
                                                                    name="options"
                                                                    value="1"
                                                                    checked={selectedValueRadio === "1"}
                                                                    onChange={handleRadioChange}
                                                                />
                                                                Espacios de medición
                                                            </label>
                                                            <label>
                                                                <input
                                                                    type="radio"
                                                                    name="options"
                                                                    value="2"
                                                                    checked={selectedValueRadio === "2"}
                                                                    onChange={handleRadioChange}
                                                                />
                                                                Muestra
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <br />
                                                    {/* <br/> */}
                                                    <div className="REGRCurso">
                                                        <div className="labelGen REGRTitulos">Cursos</div>
                                                        <div className="REGRComboBox">
                                                            <select value={selectedValue3} onChange={handleSelectChange3}>
                                                                <option value="">Selecciona un curso</option>
                                                                {cursoBox2.map(option => (
                                                                    <option key={option.id} value={option.curso}>
                                                                        {option.curso}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="REGRContenedor2">

                                            <div className="REGRTablaCarga">
                                                <div className="REGRBotonesCarga">
                                                </div>
                                                <div className="REGRTablaInterna">
                                                </div>
                                            </div>

                                        </div>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <div className="REGRContenedorExportar">
                                            {flagDataVacia ? <div className="REGRModalError">
                                                <div style={{ color: 'red' }}>
                                                    No se pudo exportar debido a que no hay datos con los parametros ingresados*
                                                </div>
                                            </div> : ""}
                                            <Button className="btnDisenio botonExportar" onClick={handleExportarResultadosMedicion}>
                                                Exportar</Button>
                                        </div>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </>
    );
}
