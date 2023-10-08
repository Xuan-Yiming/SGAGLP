// import "../HojasDeEstilo/ResMediDetalleArchivos.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import { Table } from 'react-bootstrap';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFolder, faFileWord, faFileImage, faFilePdf, faFilePowerpoint, faFileExcel, faBullseye } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from 'react-bootstrap';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';



export default function ResEspeDetalleArchivos(props) {
    const archivos = [
        { nombre: 'archivo1.txt', tipo: 'archivo' },
        { nombre: 'archivo2.jpg', tipo: 'archivo' },
        { nombre: 'carpeta3.xlsx', tipo: 'archivo' },
        { nombre: 'archivo4.docx', tipo: 'archivo' },
        { nombre: 'archivo5.ppt', tipo: 'archivo' },
        { nombre: 'archivo6.txt', tipo: 'archivo' },
        { nombre: 'archivo7.jpg', tipo: 'archivo' },
        { nombre: 'carpeta8.xlsx', tipo: 'archivo' },
        { nombre: 'archivo9.docx', tipo: 'archivo' },
        { nombre: 'archivo10.docx', tipo: 'archivo' },
        { nombre: 'archivo11.jpg', tipo: 'archivo' },
        { nombre: 'carpeta12.xlsx', tipo: 'archivo' },
        { nombre: 'archivo13.docx', tipo: 'archivo' },
        { nombre: 'archivo14.docx', tipo: 'archivo' },
        { nombre: 'archivo15.docx', tipo: 'archivo' },
        { nombre: 'archivo16.docx', tipo: 'archivo' },
        { nombre: 'archivo7.jpg', tipo: 'archivo' },
        { nombre: 'carpeta8.xlsx', tipo: 'archivo' },
        { nombre: 'archivo9.docx', tipo: 'archivo' },
        { nombre: 'archivo10.docx', tipo: 'archivo' },
        { nombre: 'archivo11.jpg', tipo: 'archivo' },
        { nombre: 'carpeta12.xlsx', tipo: 'archivo' },
        { nombre: 'archivo13.docx', tipo: 'archivo' },
        { nombre: 'archivo14.docx', tipo: 'archivo' },
        { nombre: 'archivo15.docx', tipo: 'archivo' },
        { nombre: 'archivo16.docx', tipo: 'archivo' },
        { nombre: 'archivo16.docx', tipo: 'archivo' },

        // Agrega más archivos según sea necesario
    ];

    const [botonColor, setBotonColor] = useState("#ADADAD");
    const [lista, setLista] = useState([]);
    const [bandera, setBandera] = useState(false);
    const datosMedicion = useSelector((state) => state.Medicion);
    const [cookies, setCookie] = useCookies();
    const [checkboxesMarcados, setCheckboxesMarcados] = useState([]);
    const [valido, setValido] = useState(false)
    const [deshabilitado, setDeshabilitado] = useState(true)
    const [valido2, setValido2] = useState(false)

    const datosEnviado = useSelector((state) => state.General);
    /* const handleMouseEnter = (fileName) => {
         setTooltipVisible(true);
         setFullFileName(fileName);
       };
     
       const handleMouseLeave = () => {
         setTooltipVisible(false);
         setFullFileName('');
       };
 */
    const handleCheckboxChange = (index) => {
        const checkboxes = [...checkboxesMarcados];

        checkboxes[index] = !checkboxes[index];

        setDeshabilitado(false)
        setBotonColor("#9E0520")

        setCheckboxesMarcados(checkboxes);
    };

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



    const eliminarArchivosSeleccionados = async () => {
        const filasMarcadas = lista.filter((_, index) => checkboxesMarcados[index]);
        console.log("FILAS FILTRO:")
        console.log(filasMarcadas)

        const data = []

        filasMarcadas.map((archivo, index) => {
            const datos = {
                idDetalleCompetenciaXMuestra: archivo.idDetalleCompetenciaXMuestra,
                fidCompetenciaXMuestra: archivo.fidCompetenciaXMuestra,
                idIndicador: props.idIndicador,
                token: archivo.tokenFoto
            }
            data.push(datos)

        })
        console.log("ELIMINADOS")

        console.log(data);
        /*
        
                const data = {
                    idDetalleCompetenciaXMuestra: 5,
                    fidCompetenciaXMuestra: 1
                    
                }*/
        /*
        const data = {
            idCompetencia: 12,
            idMuestra: 12
            
        }*/


        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        console.log("ELIMINAR")
        console.log(data)
        await axios.post("http://localhost:3050/api/muestraMedicion/eliminarEvidencia", data, config)
            .then(response => {
                console.log(response.data);
                //setLista(response.data.data)
                setValido(response.data.success)

            }).catch(error => {
                console.log(error);
            })





    };

    const abrirEnlace = (url) => {
        window.open(url, '_blank'); // Abre el enlace en una nueva pestaña o ventana
    };


    const descargarArchivo = async (tokenArchivo) => {


        const data = {
            token: tokenArchivo

        }

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



    const obtenerIcono = (nombreArchivo) => {
        if (nombreArchivo != null) {
            const extension = nombreArchivo.split('.').pop().toLowerCase();
            switch (extension) {
                case 'docx':
                    return faFileWord;
                case 'xlsx':
                    return faFileExcel;
                case 'ppt':
                    return faFilePowerpoint;
                case 'pdf':
                    return faFilePdf;
                case 'jpg':
                case 'jpeg':
                case 'png':
                    return faFileImage;
                default:
                    return faFile;
            }
        }
    };

    const obtenerColor = (nombreArchivo) => {
        if (nombreArchivo != null) {
            const extension = nombreArchivo.split('.').pop().toLowerCase();
            switch (extension) {
                case 'docx':
                    return "iconosDisenio1";
                case 'xlsx':
                    return "iconosDisenio2";
                case 'ppt':
                    return "iconosDisenio3";
                case 'pdf':
                    return "iconosDisenio4";
                case 'jpg':
                case 'jpeg':
                case 'png':
                    return "iconosDisenio5";
                default:
                    return "iconosDisenio";
            }
        }
    };




    const llamaListaArchivos = async () => {


        /*
        for(let index=0;index<fileList.length;index++){
            console.log("ABER:")
            console.log(fileList[index])
            f.append(file,fileList[index]);

        }*/

        const data = {
            idCompetencia: props.idCompetencia,
            idMuestra: datosMedicion.idMuestraMedicion,
            idIndicador: props.idIndicador

        }
        /*
        const data = {
            idCompetencia: 12,
            idMuestra: 12
            
        }*/


        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        console.log("DATAAAAA")
        console.log(data)

        console.log("LISTAR")
        await axios.post("http://localhost:3050/api/muestraMedicion/listarEvidencia", data, config)
            .then(response => {
                console.log(response.data);
                setLista(response.data.data)
                if (response.data.data.length === 0) setValido2(true)
                else
                    setValido2(false)


            }).catch(error => {
                console.log(error);
            })



    }

    useEffect(() => {

        llamaListaArchivos();


    }, [])


    /*
        return (
            <div className="contedorGeneralRMDA">
            <br></br>
            
            <div className="contenedorRMDA">
                <div className="parteSubRMDA">
                    <button type="button" class="btn btn-danger btnEliminarRMDA" onClick={eliminarArchivosSeleccionados}>Eliminar</button>
                </div>
                <div className="parteArchivos">
                    {lista.map((archivo, index) => (
                        <div className="listaArchivosRMDA" data-tip={archivo.rutaEvidencia}>
                            <input className="form-check-input checkBoxRMDA" type="checkbox" id="miCheckbox" />
                            <FontAwesomeIcon className={ obtenerColor(archivo.rutaEvidencia)} icon={obtenerIcono(archivo.rutaEvidencia)} />
                           
                             {archivo.rutaEvidencia}
                        
                        </div>
                    ))}
                </div>
                    </div>
    
            
    
           
            <br></br>
    
    
    
        </div>
        );
        */

    const seteoPrevio = () => {
        setDeshabilitado(true)
        setBotonColor("#ADADAD")
    }
    const seteoSiguiente = (validez) => {

        if (validez) {

            setDeshabilitado(false)
            setBotonColor("#9E0520")

        }
    }

    const handleModalAceptarHabilitar = () => {
        setValido(false)
        llamaListaArchivos();
    }

    useEffect(() => {
        // Verificar si hay algún checkbox marcado
        const hayCheckboxMarcado = checkboxesMarcados.some((checkbox) => checkbox);
        // Actualizar el estado de "deshabilitado" en función de si hay algún checkbox marcado
        if (!hayCheckboxMarcado)
            setBotonColor("#ADADAD")
        setDeshabilitado(!hayCheckboxMarcado);
    }, [checkboxesMarcados]);




    return (
        <div className="contedorGeneralRMDA">


            {valido === true ? <><Modal show={valido}>
                <Modal.Body >
                    <p>Se eliminaron los archivos correctamente</p>
                </Modal.Body>
                <Modal.Footer>

                    <Button className="botonAceptarGC" onClick={handleModalAceptarHabilitar}>
                        Aceptar</Button>
                </Modal.Footer>
            </Modal></> : <></>}
            <br></br>
            <div className="contenedorRMDA">
                {/* <div className="parteSubRMDA">
                    {datosEnviado.enviado ? null : <button disabled={deshabilitado} type="button" class="btn btn-danger btnEliminarRMDA" style={{ borderWidth: '0px', backgroundColor: botonColor }} onClick={eliminarArchivosSeleccionados}>Eliminar</button>}
                </div> */}{valido2 && <p className="labelGen, labelVDMM" style={{ color: "#042354", textAlign: "center" }}>No se encuentran evidencias asociadas a este indicador</p>}

                <div className="parteArchivos">
                    {/* seteoPrevio()*/}
                    {lista.map((archivo, index) => (

                        <div className="listaArchivosRMDA" style={{ width: "22%" }}>
                            {/*seteoSiguiente(checkboxesMarcados[index])*/}
                            {/* <input className="form-check-input checkBoxRMDA" type="checkbox" id={`miCheckbox-${index}`} checked={checkboxesMarcados[index] || false} onChange={() => handleCheckboxChange(index)} /> */}
                            <FontAwesomeIcon className={obtenerColor(archivo.rutaEvidencia)} icon={obtenerIcono(archivo.rutaEvidencia)} />
                            <div className="nombreArchivo" onClick={() => { descargarArchivo(archivo.tokenFoto) }}>

                                <BootstrapTooltip title={archivo.rutaEvidencia}>
                                    {archivo.rutaEvidencia}
                                </BootstrapTooltip>

                            </div>
                        </div>
                    ))}
                </div>
            </div>



            <br></br>
            <br></br>



        </div>
    );


};