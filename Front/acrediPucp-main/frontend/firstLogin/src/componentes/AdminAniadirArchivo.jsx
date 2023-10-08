// import React from 'react'
import "../HojasDeEstilo/AdminAniadirArchivo.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/TablasFront.css";
import "../HojasDeEstilo/Tabla.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import fotoPerfil from "../images/FotoPerfil.png";
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from "react-cookie";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Data } from './Data';
import ModalDragUsuarios from './ModalDragUsuarios';

export default function AdminAniadirArchivo(props) {

    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);

    const [mostrarModal, setmostrarModal] = useState(false);
    const [mostrarModa2, setmostrarModal2] = useState(false);



    const dispatch = useDispatch();
    const datosCuenta = useSelector((state) => state.Cuenta);
    const datosAdmin = useSelector((state) => state.Administrador);



    const [cookies, setCookie] = useCookies();
    const [nombres, setNombres] = useState("");
    const [apPaterno, setApPaterno] = useState("");
    const [apMaterno, setApMaterno] = useState("");
    const [codigoPUCP, setCodigoPUCP] = useState("");
    const [celular, setCelular] = useState("");
    const [correoSecundario, setCorreoSecundario] = useState("");
    const [correo, setCorreo] = useState("");
    const [nuevaImagen, setNuevaImagen] = useState("");
    const [foto, setFotoPerfil] = useState(fotoPerfil);
    const [openModal, setOpenModal] = useState(false);
    const [nombreArchivo, setNombreArchivo] = useState("")
    const [correctos, setCorrectos] = useState("")



    console.log(excelFile);


    const [excelData, setExcelData] = useState(null);

    const fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    const handleFile = (archivo) => {
        setNombreArchivo(archivo.name)
        let selectedFile = archivo
        if (selectedFile) {
            // console.log(selectedFile.type);
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFileError(null);
                    setExcelFile(e.target.result);

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
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            console.log(data);
            setElementos(data);
            elementosPaginaActual = elementos.slice(
                indicePrimerElemento,
                indiceUltimoElemento
            );
            setExcelData(data);
        } else {
            setExcelData(null);
        }
    }


    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            console.log(excelData);
        };

        reader.readAsBinaryString(file);
    };



    const [textoIngresoAAA, settextoIngresoAAA] = useState('IRVING TOVAR.EXE');
    const [textoBoton, setTextoBoton] = useState("Subir");
    const [textoBoton2, setTextoBoton2] = useState("Cargar");
    const [textoBoton3, setTextoBoton3] = useState("Guardar");
    const [textoBoton4, setTextoBoton4] = useState("Deshabilitar");


    const [elementos, setElementos] = useState([]);
    const [paginaActual, setPaginaActual] = useState(0);
    // Cantidad de elementos por página
    const elementosPorPagina = 10;

    function cambiarSeleccion(id) {
        setElementos(elementos =>
            elementos.map(e => {
                if (e.id === id) {
                    return { ...e, seleccionado: !e.seleccionado };
                } else {
                    return e;
                }
            })
        );
    }

    const indicePrimerElemento = paginaActual * elementosPorPagina;
    const indiceUltimoElemento = indicePrimerElemento + elementosPorPagina;

    // Obtener los elementos de la página actual
    var elementosPaginaActual = elementos.slice(
        indicePrimerElemento,
        indiceUltimoElemento
    );

    const totalPaginas = Math.ceil(elementos.length / elementosPorPagina);

    // Función para cambiar la página actual
    function cambiarPagina(numeroPagina) {
        setPaginaActual(numeroPagina.selected);
    }


    const handleButtonClick = () => {
        setmostrarModal(true);
    };

    const handleModalClose = () => {
        setmostrarModal(false);
        setmostrarModal2(false);
    };

    const handleModalCancelar = () => {
        setmostrarModal(false);
    };

    
    const abrirEnlace = (url) => {
        window.open(url, '_blank'); // Abre el enlace en una nueva pestaña o ventana
    };


    const descargarArchivo = async () => {


        const data = {
            token: "Formato_Usuarios.xlsx"

        }
        /*
        const data = {
            idCompetencia: 12,
            idMuestra: 12
            
        }*/


        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        console.log("DESCARGAR")
        console.log(data)
        await axios.post("http://localhost:3050/api/muestraMedicion/descargarEvidencia", data, config)
            .then(response => {
                console.log(response.data);
                abrirEnlace(response.data.archivo)
                //setLista(response.data.data)

            }).catch(error => {
                console.log(error);
            })





    };

    const handleModalAceptar2 = async () => {

        setmostrarModal2(false);

    };

    const handleModalAceptar = async () => {

        console.log(elementos);

        console.log("Galleta:")
        console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        const data = {
            elementos: elementos
        }
        console.log(datosAdmin.idAdmin)
        console.log("aqui datos de admin final")
        console.log("configuracion:")
        console.log(config);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/usuario/insertarUsuarioMasivo", data, config);
            if (respuesta.data.success) {
                toast.success('Se han registrado exitosamente ' + respuesta.data.idUsuario[0].insertados + ' usuarios.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });


                console.log("ACA ESTA LA CANTIDAD INSERTADA");
                console.log(respuesta.data.idUsuario[0].insertados);
                setCorrectos(respuesta.data.idUsuario[0].insertados);
                setmostrarModal2(true);
            }
            else {
                toast.error(respuesta.data.error.message, {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }

        } catch (error) {
            toast.error('No hay conexión. Intente de nuevo.', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            console.log(error)
        }

        // props.cambiarComponente(false);
        setmostrarModal(false);
    };

    const cargarArchivo = () => {

        setOpenModal(true)
    }

    return (
        <div className="contenedorAniadirArchivo">

            {openModal && <ModalDragUsuarios closeModal={setOpenModal} handleArchivo={handleFile} />}
            <div className="contendorSuperiorAAA">
                <div className="contenedorFormAAA">
                    <form className="formAAA" action="/action_page.php" onSubmit={handleSubmit}>
                        <div className="inputAAA">
                            {/*<input className="textoAAA" type="file" name="myfile" onChange={handleFile} required />*/}
                            <button className="btnDisenio btnExcelUsuario" style={{ backgroundColor: "#0072BC" }} onClick={descargarArchivo}>
                                Ver Plantilla

                            </button>
                            <button className="btnDisenio btnExcelUsuario" onClick={cargarArchivo}>
                                Cargar archivo

                            </button>

                            <span> {nombreArchivo}</span>
                        </div>
                        {excelFileError && <div className="text-danger" style={{ marginTop: 5 + 'px' }}></div>}
                        <div className="submitAAA">
                            <input className="btnDisenio btnEnviarAAA" type="submit" />
                        </div>
                        <label for="myfile"></label>
                        {/* <button className="btnDisenio btnExcelUsuario"
                        // onClick={cargarArchivo}
                        >
                            Descargar Plantilla

                        </button> */}
                    </form>


                </div>
            </div>
            <div className="contendorInferiorAAA">
                <div className="contenedorBarraBuscadoraAAA">
                    <form className="input-group ">
                        {/* <input className="form-control" type="search" placeholder="Buscar" aria-label="Buscar" />
                            <div className="input-group-append m-0">
                                <button className="btn m-0 border-end border-top border-bottom borde-izquierdo-cuadrado" type="submit"><i className="bi bi-search"></i></button>
                            </div> */}
                    </form>
                </div>
                <div className="contenedorTablaAAA contenedorTablaF">

                    {excelData === null && <p>Archivo no subido por ahora</p>}
                    {excelData !== null && (

                        <Table className="tablaF" bordered hover>
                            <thead>
                                <tr className="ColumnaAAA">
                                    <th className="CodigoAAA">Código</th>
                                    <th className="NombreAAA">Nombre Completo</th>
                                    <th className="CorreoAAA">Correo</th>
                                    <th className="CorreoSecAAA">Correo secundario</th>
                                    <th className="CelularAAA">Celular</th>
                                </tr>
                            </thead>
                            <tbody>
                                {elementosPaginaActual.map(e => (
                                    <tr key={e.Codigo}>
                                        <td className="filaAAA">{e.Codigo}</td>
                                        <td className="filaAAA">{e.Nombre} &#160;{e.ApellidoPaterno} &#160;{e.ApellidoMaterno}</td>
                                        <td className="filaAAA">{e.Correo}</td>
                                        <td className="filaAAA">{e.CorreoSecundario}</td>
                                        <td className="filaAAA">{e.Celular}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    )}
                </div>
                <div className="contenedorPaginacionAAA">
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
                        pageClassName={"my-page-class"}
                        pageLinkClassName={"my-page-link-class"}
                        previousClassName={"my-previous-class"}
                        nextClassName={"my-next-class"}
                    />
                </div>
                <div className="contenedorBarrainferior">
                    <div className="btnDivDisenio">

                        <button className="btnDisenio btnGuardarAAA" type="button"
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={handleButtonClick} >
                            {textoBoton3}
                        </button>
                        <Modal show={mostrarModal} onHide={handleModalClose}>
                            <Modal.Body >
                                <p>¿Está seguro que desea Añadir todas las cuentas importadas?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="botonCancelarAA" onClick={handleModalCancelar}>
                                    Cancelar</Button>
                                <Button className="botonAceptarAA" onClick={handleModalAceptar}>
                                    Aceptar</Button>
                            </Modal.Footer>
                        </Modal>

                        {/* <Modal show={mostrarModa2} onHide={handleModalClose}>
                            <Modal.Body >
                                <p>Se han registrado exitosamente {correctos} de las cuentas</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="botonAceptarAA" onClick={handleModalAceptar2}>
                                    Aceptar</Button>
                            </Modal.Footer>
                        </Modal> */}
                    </div>
                </div>




            </div>
        </div>

    );

}