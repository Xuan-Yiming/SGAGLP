import "../HojasDeEstilo/ResMediCargaAlumnos.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import "../HojasDeEstilo/Reusable/TablasFront.css";
import React, { useEffect, useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import ModalDragUsuarios from './ModalDragUsuarios';
import { useLocalStorage } from './useLocalStorage';
// import fs from 'fs';

export default function ResMediBase(props) {
    let valor;
    const [mostrarCargaMasiva, setMostrarCargaMasiva] = useState(true);
    const [mostrarCargaManual, setMostrarCargaManual] = useState(false);
    const [nombres, setNombres] = useState("");
    const [codigoPUCP, setCodigoPUCP] = useState("");
    const [mostrarModal, setmostrarModal] = useState(false);
    const [botonHabilitado, setBotonHabilitado] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);
    const [mostrarModal2, setmostrarModal2] = useState(false);

    const [flagCM, setFlagCM] = useState(false);

    const [mostrarModalIngreso, setmostrarModalIngreso] = useState(false);


    const [muestra, setMuestra] = useLocalStorage("muestra");


    const [dos, setDos] = useState("");

    const [excelData, setExcelData] = useState(null);

    const fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','.xls'];


    const [mostrarTexto4, setMostrarTexto4] = useState(false);

    const [backgroundColorInput4, setBackgroundColorInput4] = useState("white");

    const [seleccionados, setSeleccionados] = useState([]);


    const dispatch = useDispatch();
    const datosMedicion = useSelector((state) => state.Medicion);
    const [cookies, setCookie] = useCookies();
    const [nombreArchivo, setNombreArchivo] = useState("")

    var [elementos, setElementos] = useState([]);
    var [paginaActual, setPaginaActual] = useState(0);
    // Cantidad de elementos por página
    var elementosPorPagina = 20;
    var indicePrimerElemento = paginaActual * elementosPorPagina;
    var indiceUltimoElemento = indicePrimerElemento + elementosPorPagina;

    // Obtener los elementos de la página actual
    var elementosPaginaActual = elementos.slice(
        indicePrimerElemento,
        indiceUltimoElemento
    );

    var totalPaginas = Math.ceil(elementos.length / elementosPorPagina);

    const handleModalCancelar2 = () => {
        props.cambiarComponente(false);
        props.cambiarComponente2(false);
        props.cambiarComponente3(false);
        props.cambiarComponente4(false);
        props.cambiarComponente5(false);
        props.cambiarComponente6(true);
        setmostrarModal2(false);
    };


    const handleModalCancelar3 = () => {
        setmostrarModalIngreso(false);
    };

    const handleButtonEliminar2 = () => {

        setmostrarModal2(true);

    };

    // Función para cambiar la página actual
    function cambiarPagina(numeroPagina) {
        setPaginaActual(numeroPagina.selected);
    }

    const mostrarCMas = () => {
        setMostrarCargaMasiva(true);
        setMostrarCargaManual(false);
    };

    const mostrarCMan = () => {
        setMostrarCargaMasiva(false);
        setMostrarCargaManual(true);
    };
    const validarCampos = () => {
        if (seleccionados.length > 0) {
            setBotonHabilitado(true);
            valor = 1;
        } else {
            setBotonHabilitado(false);
            valor = 0;
        }
        return valor;
    };


    const handleModalCancelar = () => {
        setmostrarModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e?.target || {};

        switch (name) {
            case "nombres":
                setNombres(value);
                break;
            case "codigoPUCP":
                setCodigoPUCP(value);
                break;
        }

    }



    // const fs = require('fs');
    const exceljs = require('exceljs');

    async function convertXlsToXlsx(inputFilePath, outputFilePath) {
        // Crear un nuevo libro de trabajo de Excel
        const workbook = new exceljs.Workbook();
      
        // Cargar el archivo XLS
        await workbook.xlsx.readFile(inputFilePath);
      
        // Guardar el libro de trabajo en formato XLSX
        await workbook.xlsx.writeFile(outputFilePath);
      
        console.log('Archivo convertido de XLS a XLSX exitosamente.');
      }


    // Rutas de los archivos de entrada y salida
    const inputFilePath = 'ruta_del_archivo.xls';
    const outputFilePath = 'ruta_del_archivo.xlsx';


    const handleFile = (archivo) => {
        setNombreArchivo(archivo.name)
        // console.log(archivo)
        let selectedFile = archivo
        if (selectedFile) {
            // console.log(selectedFile.type);
            if (selectedFile && fileType.includes(selectedFile.type) || fileType.includes('.xls')) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFileError(null);
                    setExcelFile(e.target.result);
                    
                    console.log(e.target.result);

                }
            } else {
                setExcelFileError('solo formato excel valido');
                setExcelFile(null);
            }

        } else {
            console.log('porfavor selecciona archivo');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(excelFile); 
        if (excelFile !== null) {
            
            console.log("EL ARCHIVO EXCEL SE CARGA CON ESTO");


            

            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet,{ range: 6 });
            // setElementos(data);
            // elementos.push(data)
            for (var i = 0; i < data.length; i++) {
                var dictionary = data[i];
                console.log("Dictionary at index " + i + ": ", dictionary);

                // Access specific properties of the dictionary
                var newObject = {
                    Codigo: data[i].Alumno,
                    Nombre: data[i].Nombre
                };
                console.log(data[i].Horario);
                
                console.log(muestra);



                // const otraMuestra = toString(muestra);
                // let uno ="a";
                // if(otraMuestra[0]=="H")uno = otraMuestra.substring(1);
                // else uno = otraMuestra;

                // const otraMuestra = toString(muestra);
                // if(otraMuestra[0]=="H")setDos(otraMuestra.substring(1));
                // else setDos(otraMuestra);

                // console.log(dos);
                // const uno = dos;

                /* aca comienza */

                // var uno = muestra.substring(1);
                // muestra[0]=="H"?uno=muestra.substring(1):uno = muestra;
                // console.log(uno);
                // data[i].Horario===parseInt(uno)?elementos.push(newObject):( console.log("no ingreso"));

                /* aca acaba */

                const uno = toString(muestra);


                (uno.includes(toString(data[i].Horario))&& (typeof data[i].Horario !='undefined'))?elementos.push(newObject):( console.log("no ingreso"));
                
                setmostrarModalIngreso(true);
            }


            console.log(data);

            elementosPaginaActual = elementos.slice(
                indicePrimerElemento,
                indiceUltimoElemento
            );
            setExcelData(data);
        } else {
            setExcelData(null);
        }
    }


    let toggleValue = useCallback((event, id) => {
        console.log(id)

        if (event.target.checked) {
            setSeleccionados(value => [...value, id])
        } else {
            setSeleccionados(value => value.filter(it => it !== id))
        }

    }, [setSeleccionados])
    console.log(seleccionados)



    // elementosPaginaActual = elementos.slice(
    //     indicePrimerElemento,
    //     indiceUltimoElemento
    // );

    // const indicePrimerElemento = paginaActual * elementosPorPagina;
    // const indiceUltimoElemento = indicePrimerElemento + elementosPorPagina;

    // // Obtener los elementos de la página actual
    // var elementosPaginaActual = elementos.slice(
    //     indicePrimerElemento,
    //     indiceUltimoElemento
    // );

    // const totalPaginas = Math.ceil(elementos.length / elementosPorPagina);

    useEffect(() => {
        elementosPaginaActual = elementos.slice(
            indicePrimerElemento,
            indiceUltimoElemento);

        indicePrimerElemento = paginaActual * elementosPorPagina;
        indiceUltimoElemento = indicePrimerElemento + elementosPorPagina;

        totalPaginas = Math.ceil(elementos.length / elementosPorPagina);


    }, [elementos,flagCM]);

    const ingresarDato = () => {

        const updatedData = [...elementos];

        var newObject = {
            Codigo: parseInt(codigoPUCP),
            Nombre: nombres
        };

        updatedData.push(newObject);

        setElementos(updatedData);
        setFlagCM(true);
        
    }
    const eliminarElemento = async () => {

        const updatedData = [...elementos];
        const newArray = [...seleccionados];
        for (let i = 0; i < seleccionados.length; i++) {

            const indexToRemove = updatedData.findIndex(item => item.Codigo === seleccionados[i]);
            if (indexToRemove !== -1) {
                updatedData.splice(indexToRemove, 1);


            }
        }
        setSeleccionados([]);
        setElementos(updatedData);

    }


    const handleAceptarGuardar = async () => {

        console.log("Galleta:")
        console.log(cookies.jwt)

        const datosEnviados = [...elementos];

        for (let i = 0; i < datosEnviados.length; i++) {
            const str = String(datosEnviados[i].Codigo);
            datosEnviados[i].Codigo = str;
        }

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {
            idMuestraMedicion: datosMedicion.idMuestraMedicion,
            elementos: elementos
        }
        console.log("configuracion:")
        console.log(config);


        console.log("configuracion:")
        console.log(data);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/alumno/insertarAlumno", data, config);
            // console.log("configuracion:")
            // setDatosTablaMedcion(respuesta.data.data);<            console.log(respuesta.data);
            // console.log(datosTablaMedicion);
            // setBanderaRMV(true);

            console.log(respuesta);

            setmostrarModal2(true);
            setmostrarModal(false);
        } catch (error) {
            console.log(error)
        }

    }
    const cargarArchivo = (e) => {
        e.preventDefault()
        setOpenModal(true)
    }

    const handleButtonGuardar = async () => {

        setmostrarModal(true);

    };




    return (



        <div className="RMVDinicioPagina">
            <div className="RMVDTitulo"></div>
            <div className="RMVDContenedorPrincipal">


                <div className="contenedor-indicadoresRMVD">

                    <div className="contIndicRMVD">
                        <h2 className="tituloGen tituloTipo3 tituloIDsRMVD">Alumnos</h2>
                        <br></br>
                        <div className="botonesRMVD">
                            <button className="btnDisenio btncargaRMCA" onClick={mostrarCMas}>Carga Masiva</button>
                            <button className="btnDisenio btncargaRMCA" onClick={mostrarCMan}>Carga Manual</button>
                            <div className="contenedorCargaRMVD">
                                <div id="contenedorDMM">
                                    {mostrarCargaMasiva && (
                                        <div className='contenedorRMVDDMM'>

                                            {openModal && <ModalDragUsuarios closeModal={setOpenModal} handleArchivo={handleFile} />}
                                            <form className="formAAA" action="/action_page.php" onSubmit={handleSubmit}>
                                                <div className="inputAAA">
                                                    {/*<input className="textoAAA" type="file" name="myfile" onChange={handleFile} required />*/}
                                                    <button className="btnDisenio btnExcelUsuario" onClick={cargarArchivo}>
                                                        Cargar archivo

                                                    </button>
                                                    <span> {nombreArchivo}</span>
                                                </div>
                                                {excelFileError && <div className="text-danger" style={{ marginTop: 5 + 'px' }}></div>}
                                                <div className="submitAAA">
                                                    <input className="btnDisenio envioAAA" type="submit" style={{ backgroundColor: '#042354' }} />
                                                </div>
                                                <label for="myfile"></label>
                                            </form>

                                        </div>
                                    )}
                                    {mostrarCargaManual && (
                                        <div className='contenedorDC'>
                                            <div className='derechaREAM'>
                                                <div className="alineacionRMVD">

                                                    <div className="contRMVDLabel2">
                                                        <label className="labelGen label labelMCA" htmlFor="codigoPUCP">
                                                            Código PUCP
                                                        </label>
                                                    </div>
                                                    <div className="contRMVDLabel">
                                                        <input
                                                            onChange={handleChange}
                                                            className="inputActivoGen inputACRMVD" type="text" name="codigoPUCP"
                                                            value={codigoPUCP} />
                                                    </div>
                                                </div>
                                                <div className="alineacionRMVD">
                                                    <div className="contRMVDLabel2">
                                                        <label className="labelGen label labelMCA" >
                                                            Nombre
                                                        </label>
                                                    </div>
                                                    <div className="contRMVDLabel">
                                                        <input
                                                            onChange={handleChange}
                                                            className="inputActivoGen inputACRMVD" type="text" name="nombres"
                                                            value={nombres} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='izquierdaREAM btnDivDisenio'>
                                                <button className='btnDisenio buttonRMCA' onClick={ingresarDato}>Añadir</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <br></br>
                        </div>
                        <div className="contenedorRMVVDEliminar">
                                <div className="botonRMVDElim">
                                    {((excelData !== null) || (flagCM)) && (<button className='btnDisenio btnEliminarRMCA' onClick={eliminarElemento}>Eliminar</button>)}
                                </div>
                            </div>
                        <div className="contenedorRMVDTablaAlumnos">
                            
                            <div className="tablaRMVDAlumnos">
                                {((excelData == null) && (flagCM===false?true:false)) && <p>Alumnos no ingresados.<br></br>Puede descargar la ficha de alumnos del curso desde el Campus Virtual PUCP.<br></br><br></br><br></br><br></br></p>}
                                {((excelData !== null) || (flagCM)) && (
                                    <div className="contenedorTablaF">
                                        <Table className="tablaF" bordered hover>
                                            <thead>
                                                <tr className="ColumnaAAA">
                                                    <th className="SeleccionCol">Selección</th>
                                                    <th className="CodigoAAA">Código</th>
                                                    <th className="NombreAAA">Nombre Completo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {elementosPaginaActual.map(objeto => (
                                                    <tr key={objeto.Codigo}>
                                                        <td style={{ textAlign: "center" }} className="filaAAA">
                                                            <input
                                                                className="checkboxGC"
                                                                type="checkbox"
                                                                id={objeto.Codigo}
                                                                // checked={verificarCheck}
                                                                defaultChecked={seleccionados.includes(objeto.Codigo)}
                                                                // onChange={handleCheckBoxChange}
                                                                onChange={(e) => toggleValue(e, objeto.Codigo)}
                                                            />
                                                        </td>
                                                        <td style={{ textAlign: "left" }} className="filaAAA">{objeto.Codigo}</td>
                                                        <td style={{ textAlign: "left" }} className="filaAAA">{objeto.Nombre}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>

                        


                                )}

                            {((excelData != null) || (flagCM) )    && (                   
                            <div className="contenedorPaginacionMCA ">
                                    <ReactPaginate
                                        previousLabel={'<'}
                                        previousLinkClassName={'my-previous-button'}
                                        nextLabel={'>'}
                                        nextLinkClassName={'my-next-button'}
                                        breakLabel={'...'}
                                        pageCount={totalPaginas}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={cambiarPagina}
                                        containerClassName={'pagination'}
                                        activeClassName={'activePage'}
                                        pageClassName={"my-page-class2"}
                                        pageLinkClassName={"my-page-link-class"}
                                        previousClassName={"my-previous-class"}
                                        nextClassName={"my-next-class"}
                                    />
                                </div>)   
                            
                            }



                            </div>
                        </div>
                    </div>
                    <div className="botonguardarRMVD">
                        <button className='btnDisenio btnGuardarRMCA' onClick={handleButtonGuardar}>Guardar</button>
                        <Modal show={mostrarModal}>
                            <Modal.Body >
                                <p>¿Está seguro que desea agregar los alumnos seleccionados?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="button" className="botonModal btnDisenio botonCancelarGM" onClick={handleModalCancelar}>
                                    Cancelar</Button>
                                <Button className="botonModal btnDisenio botonAceptarGM" onClick={handleAceptarGuardar}>
                                    Aceptar</Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={mostrarModal2} onHide={handleButtonEliminar2}>
                            <Modal.Body >
                                <p>Se han registrado los Alumnos</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="botonModal btnDisenio botonAceptarGC" onClick={handleModalCancelar2}>
                                    Aceptar</Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={mostrarModalIngreso}>
                            <Modal.Body >
                                <p>Se detectaron {elementos.length} alumnos de la muestra {muestra}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="botonModal btnDisenio botonAceptarGC" onClick={handleModalCancelar3}>
                                    Aceptar</Button>
                            </Modal.Footer>
                        </Modal>

                    </div>
                </div>
            </div>
        </div>



    );
}