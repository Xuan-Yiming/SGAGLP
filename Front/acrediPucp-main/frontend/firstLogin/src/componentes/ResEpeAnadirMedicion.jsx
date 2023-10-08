import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../HojasDeEstilo/ResEspeAñadirMedicion.css'
import "../HojasDeEstilo/Reusable/TablasFront.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import React, { useState, useEffect } from 'react';   //para hooks estados
import { Button, Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addDatosDetalle } from '../Redux/ProgramaSlice';
import { addDatosMuestra, addDatosResponsable, addDatosEspacios, addDatosEspacio, addDatosIndicador, addDatosIndicadores, addDatosMedicion , addDatosListaIndicadores} from '../Redux/MedicionResEspeSlice';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import * as XLSX from 'xlsx';
import { set } from 'date-fns';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResEspeAnadirMedicion(props) {

    const controlPoint = useSelector((state) => state.MedicionEspe);
    console.log("controlPoint INIIIII: ", controlPoint.cicloInicioNombre);
    console.log("controlPoint FIIIIIIN: ", controlPoint.cicloFinNombre);
    let cicloIniConst = controlPoint.cicloInicioNombre || "Ciclo inicio";
    let cicloFinConst = controlPoint.cicloFinNombre || "Ciclo fin";
    let cicloIniIDConst = controlPoint.cicloInicio || 0;
    let cicloFinIDConst = controlPoint.cicloFin || 99999;

    let valor;
    //let cicloConst = datosMuestras.cicloAcademico || "Ciclo Académico";
    const [cookies, setCookie] = useCookies();
    const [mostrarModal, setmostrarModal] = useState(false);
    const [mostrarModal2, setmostrarModal2] = useState(false);
    const [mostrarModalCargaDatos, setmostrarModalCargaDatos] = useState(false);
    const [codigoMedicion, setcodigoMedicion] = useState('');
    const [seleccionados, setSeleccionados] = useState([]);

    const [selectedCicloIni, setSelectedCicloIni] = useState(cicloIniConst);
    const [selectedCicloFin, setSelectedCicloFin] = useState(cicloFinConst);
    const [selectedCicloIniID, setSelectedCicloIniID] = useState(cicloIniIDConst);
    const [selectedCicloFinID, setSelectedCicloFinID] = useState(cicloFinIDConst);
    const [mostrarCargaMasiva, setMostrarCargaMasiva] = useState(false);
    const [mostrarCargaManual, setMostrarCargaManual] = useState(false);
    const [seleccionarOpcion, setSeleccionarOpcion] = useState(null);
    const [color, setColor] = useState("#F2F7F9");

    const dispatch = useDispatch();

    const [botonHabilitado, setBotonHabilitado] = useState(false);
    const [botonHabilitadoEliminar, setBotonHabilitadoEliminar] = useState(false);
    const [banderaCiclo, setBanderaCiclo] = useState(false);
    const fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const [comboBoxCiclo, setComboBoxCiclo] = useState([]);
    const [nombreArchivoSubido, setnombreArchivoSubido] = useState("Ejemplo:CursosPUCP.xslx");

    const [elementos, setElementos] = useState([]);
    const [paginaActual, setPaginaActual] = useState(0);
    // Cantidad de elementos por página
    const elementosPorPagina = 10;
    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);
    const [excelData, setExcelData] = useState(null);
    const [excelSoloArchivo, setExcelSoloArchivo] = useState(null);
    const [dataEnviar, setDataEnviar] = useState([]);
    const indicePrimerElemento = paginaActual * elementosPorPagina;
    const indiceUltimoElemento = indicePrimerElemento + elementosPorPagina;
    const [datosTotales, setDatosTotales] = useState(0);
    const [datosErrados, setDatosErrados] = useState(0);
    const [colorBotonEliminar,setColorBotonEliminar] = useState("#ADADAD");
    const datosMuestras = useSelector((state) => state.MedicionEspe);
    const datosCuenta = useSelector((state) => state.Cuenta);

    var elementosPaginaActual = elementos.slice(
        indicePrimerElemento,
        indiceUltimoElemento
    );
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        if(seleccionados.length == 0){
            setColorBotonEliminar("#ADADAD");
            setBotonHabilitadoEliminar(false);
        }else{
            setColorBotonEliminar("#9E0520");
            setBotonHabilitadoEliminar(true);
        }
    }, [seleccionados]);

    const totalPaginas = Math.ceil(elementos.length / elementosPorPagina);

    function cambiarPagina(numeroPagina) {
        setPaginaActual(numeroPagina.selected);
    }

    const fetchDataCiclo = async () => {
        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
        }
        try {

            const respuesta = await axios.post("http://localhost:3050/api/cicloAcademico/listarCicloAcademico", data, config);

            console.log(respuesta.data);
            console.log("aqui");
            console.log("data es" + respuesta)

            setComboBoxCiclo(respuesta.data.data)

            console.log("comboBoxCiclo")
            console.log(comboBoxCiclo)
            console.log("comboBoxCiclo")
            setBanderaCiclo(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        mostrarCMas();
        fetchDataCiclo();
        props.cambiarBanderaEspacio(false);
        setcodigoMedicion(datosMuestras.codigoMedicion);
        //setSelectedCicloIni("Ciclo inicial");
        //setSelectedCicloFin("Ciclo Final");

        let Espacio = {
            codigoEspacio: "",
            nombreCurso: "",
            fechaLimite: "",
            tipoMedicion: "Directa",
            cicloAcademico: ""
        }

        dispatch(addDatosEspacios(Espacio));

        dispatch(addDatosMuestra([]));
        dispatch(addDatosResponsable([]));
        dispatch(addDatosIndicador([]));
        dispatch(addDatosIndicadores([]));

        console.log("ciclos id iniciales");
        console.log(selectedCicloIniID);
        console.log(selectedCicloFinID);
        console.log("ciclos id iniciales");

        if(datosMuestras.EspaciosMedicion.length == 0){
            dispatch(addDatosListaIndicadores([]));
        }
    }, []);

    const handleChangeCodigo = (event) => {
        setcodigoMedicion(event.target.value);
        // validarCampos(codigoMedicion,selectedCicloIniID,selectedCicloFinID);
    };
    const mostrarCMas = () => {
        setMostrarCargaMasiva(true);
        setMostrarCargaManual(false);
    };

    const handleSeleccionarCicloIni = (optionKey, option) => {
        setSelectedCicloIni(option.target.textContent);
        setSelectedCicloIniID(optionKey);
        console.log(optionKey);
        // validarCampos(codigoMedicion,selectedCicloIniID,selectedCicloFinID);
    };
    const handleSeleccionarCicloFin = (optionKey, option) => {
        setSelectedCicloFin(option.target.textContent);
        setSelectedCicloFinID(optionKey);
        console.log(optionKey);
        // validarCampos(codigoMedicion,selectedCicloIniID,selectedCicloFinID);
    };

    const mostrarCMan = () => {
        setMostrarCargaMasiva(false);
        setMostrarCargaManual(true);
    };
    const handleSubmit2 = async (e) => {
        e.preventDefault();
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            console.log("hay algo subido")
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            // const worksheetName = workbook.SheetNames[0];
            // const worksheet = workbook.Sheets[worksheetName];
            // //const data = XLSX.utils.sheet_to_json(worksheet);
            // console.log("data en excel")
            const result = [];
            const courses = {};

            const formData = new FormData();
            formData.append('archivo', excelSoloArchivo);
            console.log("formData")
            console.log(formData)
            console.log("typeof excelFile")
            console.log(typeof excelSoloArchivo)
            const config = {
                headers: {
                    Authorization: 'Bearer ' + cookies.jwt,
                    'Content-Type': 'multipart/form-data'
                }
            }
            try {

                const respuesta = await axios.post("http://localhost:3050/profile", formData, config);
                console.log(respuesta.data.datos);
                setDatosTotales(respuesta.data.total)
                setDatosErrados(respuesta.data.total - respuesta.data.cantidadCorrecta)
                for (const item of respuesta.data.datos) {
                    const { codigo, nombreCurso, fechaLimite, "horario": Muestra, "codDocente": codProfesor, profesor, "periodo": fidCicloAcademico } = item;

                    if (!courses[codigo]) {
                        courses[codigo] = {
                            codigo: codigo,
                            nombreCurso: nombreCurso,
                            fechaLimite: fechaLimite,
                            indicadoresConfigurados: 0,
                            tipoMedicion: "Directa",
                            cicloAcademico: fidCicloAcademico,
                            MuestrasMedicion: []
                        };
                    }

                    courses[codigo].MuestrasMedicion.push({
                        codigo: Muestra,
                        idResponsable: profesor,
                        codigoProfesor: codProfesor
                    });
                }

                for (const courseKey in courses) {
                    result.push(courses[courseKey]);
                }


                console.log(result);
                setElementos(result);
                elementosPaginaActual = elementos.slice(
                    indicePrimerElemento,
                    indiceUltimoElemento
                );
                setExcelData(result);
                setmostrarModalCargaDatos(true);

            } catch (error) {
                console.log(error)
            }



        } else {
            setExcelData(null);
            console.log("No hay nada subido")
        }
    }
    useEffect(() => {
        if (selectedCicloIniID !== 0 && selectedCicloFinID !== 9999) {
            setBotonHabilitado(true);
            valor = 1;
        } else {
            setBotonHabilitado(false);
            valor = 0;
        }
    }, [selectedCicloIniID, selectedCicloFinID]);
    // const validarCampos = (valorCodigo, valorCicloIni, valorCicloFin) => {
    //     if (valorCodigo !== "" && valorCicloIni !== 0 && valorCicloFin !== 9999) {
    //         setBotonHabilitado(true);
    //         valor = 1;
    //     } else {
    //         setBotonHabilitado(false);
    //         valor = 0;
    //     }
    //     return valor;
    // };

    const handleButtonGuardar = async () => {
        let Data = {
            fidEspecialidad: datosCuenta.idEspecialidad,
            codigoMedicion: "",
            cicloInicio: selectedCicloIniID,
            cicloFin: selectedCicloFinID,
            EspaciosMedicion: datosMuestras.EspaciosMedicion
        };
        console.log("AQUI ESTA LA MEDICION DATAAAA");
        console.log(Data);
        console.log("AQUI ESTA LA MEDICION DATAAAA");

        setColor("#042354");
        console.log(selectedCicloIni);
        console.log(selectedCicloFin);

        setmostrarModal(true);
    };
    const handleCrearEspacio = async () => {
        props.cambiarComponenteMedicion1(false);
        props.cambiarComponenteMedicion2(true);
        props.cambiarComponenteMedicion3(false);
    };
    const handleConfigurar = () => {
        props.cambiarComponenteMedicion1(false);
        props.cambiarComponenteMedicion2(false);
        props.cambiarComponenteMedicion3(false);
        props.cambiarComponenteMedicion4(false);
        props.cambiarComponenteMedicion5(true);
    };

    const handleModalClose = () => {
        setmostrarModal(false);
    };
    const handleModalCloseDatos = () => {
        setmostrarModalCargaDatos(false);
    };

    const handleModalAceptar = async () => {

        console.log("ClickeAcpetar")
        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            fidEspecialidad: datosCuenta.idEspecialidad,
            codigoMedicion: "",
            cicloInicio: selectedCicloIniID,
            cicloFin: selectedCicloFinID,
            EspaciosMedicion: datosMuestras.EspaciosMedicion
        };
        console.log("DATA ANTES DE INTENTAR INSERCION");
        console.log(data);
        try {
            const respuesta = await axios.post("http://localhost:3050/api/medicion/insertarMedicionCompleto", data, config);
            console.log(respuesta.data);
            console.log("SI INSERTA");
            if (respuesta.data.success) {
                toast.success('Medición con código ' + respuesta.data.datos + ' creada correctamente.', {
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

        dispatch(addDatosListaIndicadores([]));
        
        props.cambiarComponenteMedicion1(false);
        props.cambiarComponenteMedicion2(false);
        props.cambiarComponenteMedicion3(false);
        props.cambiarComponenteMedicion4(false);
        props.cambiarComponenteMedicion5(false);
        props.cambiarComponenteMedicion6(false);
    };
    const handleAñadir = () => {
        let Medicion = {
            codigoMedicion: "",
            cicloInicio: selectedCicloIniID,
            cicloFin: selectedCicloFinID,
            cicloInicioNombre: selectedCicloIni,
            cicloFinNombre: selectedCicloFin,
        }
        console.log("AQUI ESTA LA MEDICION")
        console.log(Medicion)

        dispatch(addDatosMedicion(Medicion));
        dispatch(addDatosDetalle(false));
        props.cambiarComponenteMedicion1(false);
        props.cambiarComponenteMedicion2(true);
        props.cambiarComponenteMedicion3(false);
        props.cambiarComponenteMedicion4(false);
        props.cambiarComponenteMedicion5(false);
        props.cambiarComponenteMedicion6(false);
    };
    const handleButtonElimina = () => {
        setmostrarModal2(true);
    };
    const handleModalCloseEliminar = async () => {
        setmostrarModal2(false)
    };
    const handleModalAceptarEliminar = () => {
        const nuevosEspacios = datosMuestras.EspaciosMedicion.filter(
            (_, index) => !seleccionados.includes(index)
        );

        // Actualizar el estado de los indicadores
        setSeleccionados([]);
        // Actualizar el estado de los indicadores en el componente padre
        // o realizar la acción correspondiente para actualizar los datos en el estado global

        // Eliminar los elementos seleccionados del arreglo

        dispatch(addDatosEspacio(nuevosEspacios));

        setmostrarModal2(false)
    };
    const handleCheckboxChange = (index) => {
        if (seleccionados.includes(index)) {
            setSeleccionados(seleccionados.filter((item) => item !== index));
        } else {
            setSeleccionados([...seleccionados, index]);
        }
    };
    return (
        <div className="inicioPaginaREAM">


            <div className="contenedorSuperiorREAM">
                <div className="TituloGeneralREAM izquierdaDMM">
                    <label className="TituloPrinREAM labelREAM" htmlFor="codigo">
                    </label>
                </div>
            </div>
            <form onSubmit={handleSubmit2} className="contDatosDMM">
                <Modal show={mostrarModal} onHide={handleModalClose}>
                    <Modal.Body >
                        <p>¿Está seguro que desea registrar el nuevo programa de medición?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="botonModal btnDisenio botonCancelarDMM" onClick={handleModalClose}>
                            Cancelar</Button>
                        <Button className="botonModal btnDisenio botonAceptarDMM" onClick={handleModalAceptar}>
                            Aceptar</Button>
                    </Modal.Footer>
                </Modal>

                <br></br>
                <div className="contDatosRAEM2 conteEAM">
                    <div className="rectanguloAzulREAM"></div>
                    <div className="contPerfilRAM contDatosRAM">
                        <h2 className="tituloREAM tituloGen">Datos de Medición</h2>

                        <div className="contenedorDVM">
                            {/* <div className="contenedor-codigoREAM">
                                <div className="labelGen codigoREAM2">Código</div>
                                <input className="inputActivoGen inpu" type="text" name="codigo"
                                    value={codigoMedicion} onChange={handleChangeCodigo}
                                    style={{ height: "27px", width: "80%", marginLeft: "30px", marginTop: "15px" }} />
                            </div> */}

                            <div className="contenedorDVM2">
                                <div className="contenedor-cmboREAM">
                                    <div>
                                        <label className="labelGen labelAM" htmlFor="tipoMedicion"> Inicio *</label>
                                    </div>
                                    <div>
                                        {comboBoxCiclo.length === 0 ? (
                                            <DropdownButton className="my-dropdown-button" title={selectedCicloIni} onSelect={handleSeleccionarCicloIni}> </DropdownButton>
                                        ) : (
                                            <DropdownButton title={selectedCicloIni}>
                                                {comboBoxCiclo.filter((option) => option.id >= selectedCicloIniID && option.id <= selectedCicloFinID).map((option) => (
                                                    <Dropdown.Item
                                                        key={option.id}
                                                        eventKey={option.ciclo}
                                                        onClick={(e) => handleSeleccionarCicloIni(option.id, e)}
                                                    >
                                                        {option.ciclo}
                                                    </Dropdown.Item>
                                                ))}
                                            </DropdownButton>
                                            //<select className="ddSeleccion" value={selectedCicloIni} onChange={handleSeleccionarCicloIni}>
                                            //    <option className="ddSeleccion" value="">Selecciona un ciclo de inicio</option>
                                            //    {comboBoxCiclo.map(option => (
                                            //        <option className="ddSeleccion" key={option.id} value={option.id}>
                                            //            {option.ciclo}
                                            //        </option>
                                            //    ))}
                                            //</select>
                                        )}
                                    </div>
                                </div>
                                <div className="contenedor-cmboREAM">
                                    <div>
                                        <label className="labelGen labelAM" htmlFor="tipoMedicion"> Fin *</label>
                                    </div>
                                    <div>
                                        {comboBoxCiclo.length === 0 ? (
                                            <DropdownButton className="my-dropdown-button" title={selectedCicloFin} onSelect={handleSeleccionarCicloFin}> </DropdownButton>
                                        ) : (
                                            <DropdownButton title={selectedCicloFin}>
                                                {comboBoxCiclo.filter((option) => option.id >= selectedCicloIniID && option.id <= selectedCicloFinID).map((option) => (
                                                    <Dropdown.Item
                                                        key={option.id}
                                                        eventKey={option.ciclo}
                                                        onClick={(e) => handleSeleccionarCicloFin(option.id, e)}
                                                    >
                                                        {option.ciclo}
                                                    </Dropdown.Item>
                                                ))}
                                            </DropdownButton>

                                        )}
                                    </div>
                                </div>
                            </div>


                        </div>



                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div className="contDatosRAEM2 conteEAM">


                    <div className="contPerfilRAM contDatosRAM">
                        <h2 className="tituloREAM tituloGen">Espacios de Medición</h2>
                        <br></br>
                        <div className="contenedorREAEM">
                            <div className="derechaREAEM">

                            </div>
                            <div className="btnDivDisenio izquierdaREAEM">
                                <button className='btnDisenio buttonREAEM' onClick={handleAñadir}>Añadir</button>
                                <button className='btnDisenio buttonEliminarEAM' onClick={handleButtonElimina} style={{ background:colorBotonEliminar}} disabled={!botonHabilitadoEliminar}>Eliminar</button>
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
                        </div>
                        <div className="contenedorTablaF contenedorTtabla">
                            <Table className='tablaF' bordered hover>
                                <thead>
                                    <tr className="ColumnaREAM">
                                        <th className="SeleccionCol">Selección</th>
                                        <th className="codigoREAM">Código</th>
                                        <th className="NombreREAM">Espacio de Medición</th>
                                        <th className="codigoREAM">Ciclo Académico</th>
                                        <th className="codigoREAM">Fecha Límite</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datosMuestras.EspaciosMedicion.map((espacio, index) => (
                                        <tr key={index}>
                                            <td className="filaREAC">
                                                <input
                                                    type="checkbox"
                                                    checked={seleccionados.includes(index)}
                                                    onChange={() => handleCheckboxChange(index)} />
                                            </td>
                                            <td className="filaREAC">{espacio.codigoEspacio}</td>
                                            <td className="filaREAC">{espacio.nombreCurso}</td>
                                            <td className="filaREAC">{espacio.cicloAcademico}</td>
                                            <td className="filaREAC">{espacio.fechaLimite}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>

                    </div>
                </div>
                <br></br>
                <div className='contenedorDC'>
                    <div className='btnDivDisenio izquierdaREAM' >
                        <button className='btnDisenio btnGuardarREM' onClick={handleButtonGuardar} 
                                style={{ backgroundColor: botonHabilitado ? '#042354' : '#adadad' }} disabled={!botonHabilitado}>
                            Guardar
                        </button>
                    </div>
                </div>
                <br></br>
            </form>
            <br></br>


        </div>
    );

}