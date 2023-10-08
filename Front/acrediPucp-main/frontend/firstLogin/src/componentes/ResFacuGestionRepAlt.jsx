import React, { useState, useEffect } from 'react'
import "../HojasDeEstilo/ResFacuBase.css";
import "../HojasDeEstilo/ResFacuGestionRepAlt.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import logoBlanco from "../images/logoBlanco.png";
// import fotoPerfil from "../images/foto-perfil.jpg";
import axios from 'axios';
import { Accordion, Card, Button } from 'react-bootstrap';
import { Modal } from "react-bootstrap";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import DatePicker from 'react-datepicker';
import { useLocalStorage } from './useLocalStorage';
import 'react-datepicker/dist/react-datepicker.css';
import { addBandera } from "../Redux/CargandoSlice";

export default function ResFacuBase() {

    const [mostrarModal, setmostrarModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState("Ciclo inicio");
    const [selectedValue2, setSelectedValue2] = useState("Ciclo fin");
    const [selectedValue3, setSelectedValue3] = useState("");
    const [selectedValue4, setSelectedValue4] = useState("");
    const [selectedValue5, setSelectedValue5] = useState("");
    const [selectedCicloIniNum, setSelectedCicloIniNum] = useState(0);
    const [selectedCicloFinNum, setSelectedCicloFinNum] = useState(999999);
    const [bomboBox, setComboBox] = useState([]);
    const [bomboBox2, setComboBox2] = useState([]);
    const [espeBox, setEspeBox] = useState([]);
    const [cookies, setCookie] = useCookies();
    const [competenciaBox, setCompetenciaBox] = useState([]);
    const [cursoBox, setCursoBox] = useState([]);
    const [mostrarModal4, setmostrarModal4] = useState(false);
    const [cursoBox2, setCursoBox2] = useState([]);

    const dispatch = useDispatch();

    const datosCuenta = useSelector((state) => state.Cuenta);
    const [id, setId] = useLocalStorage("id");

    const [flagDataVacia, setFlagDataVacia] = useState(false);

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



    const handleModalResultadosGenerales = () => {
        setFlagDataVacia(false);
        setmostrarModal(true)
    };

    const handleModalClose = () => {
        setmostrarModal(false);
        setmostrarModal4(false);
    };

    const handleSelectChange = (optionKey, option) => {

        setSelectedValue(option.target.textContent);
        setSelectedCicloIniNum(optionKey)
        // onSelect(selectedValue);
    }

    const handleSelectChange5 = (event) => {

        setSelectedValue5(event.target.value);
        // setSelectedCicloIniNum(optionKey)
        // onSelect(selectedValue);
    }

    const handleSelectChange2 = (optionKey, option) => {

        setSelectedValue2(option.target.textContent);
        setSelectedCicloFinNum(optionKey)
    }

    const handleSelectChange3 = (event) => {
        // console.log(selectedValue3)
        event.preventDefault();
        setSelectedValue3(event.target.value);
        // onSelect(selectedValue2);
    }

    const handleSelectChange4 = (event) => {
        // console.log(selectedValue3)
        event.preventDefault();
        setSelectedValue4(event.target.value);
        // onSelect(selectedValue2);
    }
    const [selectedValueRadio, setSelectedValueRadio] = useState("");
    const handleRadioChange = (event) => {
        console.log(selectedValueRadio);
        setSelectedValueRadio(event.target.value);
    };


    const llenarComboBoxCiclos2 = async () => {

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
            setComboBox2(respuesta.data.data);
            // props.cambiarComponente(false);
        }
        catch (error) {
            console.log(error);
        }
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
            periodo: selectedValue5,
            nivel: selectedValueRadio,
            codCurso: selectedValue4,
            idEspecialidad: selectedValue3,

        }
        console.log("AQUI ESTA LA DATAAAAAAA");
        console.log(data);
        console.log(config);
        console.log("AQUI ESTA LA DATAAAAAAA");
        try {

            const respuesta = await axios.post("http://localhost:3050/api/medicion/exportarResultadoMedicion", data, config);
            console.log(respuesta.data.size)
            if (respuesta.data.size<=100) {
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



    const handleExportar = async () => {

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

                codCurso: selectedValue4,
                idEspecialidad: selectedValue3

            }
            console.log("AQUI ESTA LA DATAAAAAAA");
            console.log(data);
            console.log(config);
            console.log("AQUI ESTA LA DATAAAAAAA");
            try {

                const respuesta = await axios.post("http://localhost:3050/api/muestraMedicion/exportarResultadoGeneral", data, config);
                //   console.log(respuesta);


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


    }


    const llenarCursoBox = async () => {

        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: {
                Authorization: 'Bearer ' + cookies.jwt
            }
        }

        const data = {

            fidEspecialidad: selectedValue3
        }
        console.log("AQUI ESTA LA DATAAAAAAA PARTE 2" );
        // console.log(data);
        console.log(config);
        console.log("AQUI ESTA LA DATAAAAAAA PARTE2 ");
        try {

            const respuesta = await axios.post("http://localhost:3050/api/combobox/listarCursosXEspecialidad", data, config);
            console.log(respuesta);


            console.log(respuesta.data.data);
            setCursoBox(respuesta.data.data);
            // props.cambiarComponente(false);  
        }
        catch (error) {
            console.log(error);
        }
    }

    const llenarEspeBox = async () => {

        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: {
                Authorization: 'Bearer ' + cookies.jwt
            }
        }

        const data = {
            idFacultad: id
        }
        console.log("AQUI ESTA LA DATAAAAAAA");
        // console.log(data);
        console.log(config);
        console.log("AQUI ESTA LA DATAAAAAAA");
        try {

            const respuesta = await axios.post("http://localhost:3050/api/especialidad/listarEspecialidadXFacultad", data, config);
            console.log(respuesta);


            console.log(respuesta.data.data);
            setEspeBox(respuesta.data.data);
            // props.cambiarComponente(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        llenarCursoBox();
    }, [selectedValue3]);




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
        llenarCompetenciaBox();
        llenarComboBoxCiclos();
        llenarComboBoxCiclos2();
        llenarEspeBox();
        llenarCursoBox();
    }, []);

    const handleModalResultadosGenerales4 = () => {

        setFlagDataVacia(false);
        setmostrarModal4(true)
    };


    return (

        <div className="REGRContenedorPrincipal">

            <div className="REGRContenedorLineas">

                <div className="REGRContendorTabla">
                    <div className="opciones-sup">

                        <div className="REGRLineaOpcion">
                            <a href="#" className="nav-link align-middle px-3 referenciaRepResEsp"
                                onClick={handleModalResultadosGenerales}
                            >
                                <span className="textoHiperRRE">Reporte de Resultados de especialidad</span>
                            </a>

                            <Modal className='REGRmodalCargar'
                                show={mostrarModal}
                            >
                                <Modal.Body >
                                    <div className='REGRContenedorCancelar'>
                                        <button className="REGRbotonCancelar" type="button"
                                            data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                            onClick={handleModalClose}
                                        >
                                            <i class="bi bi-x-circle botonCircCancelar"></i> </button>
                                    </div>


                                    <div className="REGRContenedorEspacioGR">
                                        <div className="REGREncabezado">
                                            <div className="REGRContenedorEncabezado ">
                                                <div className="REGRTitulos tituloEspecial RFGRAtituloEspecial">Especialidades</div>
                                                <div className="REGRInicio ">
                                                    <div className="labelGen REGRTitulos REGRTitulos2 RFGRATitulo ">Inicio Ciclo</div>
                                                    <div className="RFGRAComboBox">
                                                        <DropdownButton title={selectedValue}>
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
                                                    <div className="labelGen REGRTitulos REGRTitulos2 RFGRATitulo">Fin Ciclo</div>
                                                    <div className="RFGRAComboBox">
                                                        <DropdownButton title={selectedValue2}>
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
                                                    <div className="labelGen REGRTitulos REGRTitulos2 RFGRATitulo">Especialidades</div>
                                                    <div className="RFGRAComboBox">
                                                        <select value={selectedValue3} onChange={handleSelectChange3} className='listaEspecialidades'>
                                                            <option value="">Selecciona una Especialidad</option>
                                                            {espeBox.map(option => (
                                                                <option key={option.idEspecialidad} value={option.idEspecialidad}>
                                                                    {option.nombreEspecialidad}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <br />
                                                <div className="REGRCurso">
                                                    <div className="labelGen REGRTitulos REGRTitulos2 RFGRATitulo">Muestras</div>
                                                    <div className="RFGRAComboBox">
                                                        <select value={selectedValue4} onChange={handleSelectChange4} >
                                                            <option value="">Selecciona un curso</option>
                                                            {cursoBox.map(option => (
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

                                    {/* <div className="REGRContenedor2">

                                        <div className="REGRTablaCarga">
                                            <div className="REGRBotonesCarga">
                                            </div>
                                            <div className="REGRTablaInterna">
                                            </div>
                                        </div>

                                    </div> */}

                                </Modal.Body>
                                <Modal.Footer>
                                    <div className="REGRContenedorExportar">

                                        {flagDataVacia ? <div className="REGRModalError">
                                            <div style={{ color: 'red' }}>
                                                No se pudo exportar debido a que no hay datos con los parametros ingresados*
                                            </div>
                                        </div> : ""}


                                        <Button className="btnDisenio botonExportar"
                                            onClick={handleExportar}
                                        >
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
                                                        <div className="labelGen REGRTitulos REGRTitulos2">Ciclo</div>
                                                        <div className="REGRComboBox">
                                                            <select value={selectedValue5} onChange={handleSelectChange5}>
                                                                <option value="">Selecciona un ciclo</option>
                                                                {bomboBox2.map(option => (
                                                                    <option key={option.id} value={option.ciclo}>
                                                                        {option.ciclo}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <br />
                                                    <div className="REGRInicio">
                                                        <div className="labelGen REGRTitulos REGRTitulos2">Nivel</div>
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

                                                    <div className="REGRCurso">
                                                        <div className="labelGen REGRTitulos RFGRATitulo REGRTitulos2">Especialidades</div>
                                                        <div className="RFGRAComboBox">
                                                            <select value={selectedValue3} onChange={handleSelectChange3}>
                                                                <option value="">Selecciona una Especialidad</option>
                                                                {espeBox.map(option => (
                                                                    <option key={option.idEspecialidad} value={option.idEspecialidad}>
                                                                        {option.nombreEspecialidad}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <br/>
                                                    <div className="REGRCurso">
                                                        <div className="labelGen REGRTitulos REGRTitulos2">Muestras</div>
                                                        <div className="REGRComboBox">
                                                            <select value={selectedValue4} onChange={handleSelectChange4}>
                                                                <option value="">Selecciona un curso</option>
                                                                {cursoBox.map(option => (
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
    );


}