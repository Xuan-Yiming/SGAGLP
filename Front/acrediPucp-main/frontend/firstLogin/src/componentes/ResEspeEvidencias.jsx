import React, { useEffect, useRef, useState } from 'react'
// import "../HojasDeEstilo/ResMediEvidencias.css";
import logoBlanco from "../images/logoBlanco.png";
// import fotoPerfil from "../images/foto-perfil.jpg";
import 'bootstrap-icons/font/bootstrap-icons.css'
import "../HojasDeEstilo/Reusable/TablasFront.css";
import { Button, Modal } from "react-bootstrap";
import PropTypes from 'prop-types';
import fileDownload from "js-file-download";
import '../HojasDeEstilo/ResMediEvidencias.css';
import { ImageConfig } from '../componentes/config/ImageConfig';
import uploadImg from '../images/cloud-upload-regular-240.png';
import ModalDrag from './ModalDrag';
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { addBanderaCargandoEvidencia } from "../Redux/CargandoSlice";
import axios from 'axios';


export default function ResEspeEvidencias(props) {


    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies();
    const wrapperRef = useRef(null);
    const [long, setLong] = useState("");
    const [fileList, setFileList] = useState([]);
    const [archivos, setArchivos] = useState([]);
    const [bandera, setBandera] = useState(false)
    const [datosMedicion, setDatosMedicion] = useState(useSelector((state) => state.Medicion));

    const [indicadores, setIndicadores] = useState([]);
    const [idC, setIdC] = useState("");
    const [idCodigo, setIdCodigo] = useState("");

    const datosEnviado = useSelector((state) => state.General);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');


    const [mostrarModal, setmostrarModal] = useState(false);

    const handleModalOpen = () => {
        setmostrarModal(true);
    };

    const handleModalClose = () => {
        setmostrarModal(false);
    };

    const verModal = () => {

    }

    const onFileDrop = (e) => {

        console.log(e.target.files.length)

        var newFile = e.target.files[0];
        console.log("lista actual:")
        console.log(fileList);
        console.log("NUEVOARCHIVO:")
        console.log(newFile)

        var updatedList = [...fileList, newFile];
        console.log("actualizado:")
        console.log(updatedList)
        // setFileList(updatedList);
        // props.onFileChange(updatedList);




        for (var i = 1; i < e.target.files.length; i++) {
            console.log(i)
            newFile = e.target.files[i];
            console.log("NUEVOARCHIVOFOR:")
            console.log(newFile)

            updatedList.push(newFile)
            console.log("lista acumulada")
            console.log(fileList)
            // props.onFileChange(updatedList);

        }
        setFileList(updatedList)
        console.log(fileList);

        /*
         const newFile = e.target.files[0];
         if (newFile) {
             const updatedList = [...fileList, newFile];
             setFileList(updatedList);
             props.onFileChange(updatedList);
         }
         const newFile2 = e.target.files[1];
         if (newFile2) {
             const updatedList = [...fileList, newFile2];
             setFileList(updatedList);
             props.onFileChange(updatedList);
         }
         const newFile3 = e.target.files[2];
         if (newFile3) {
             const updatedList = [...fileList, newFile3];
             setFileList(updatedList);
             props.onFileChange(updatedList);
         }*/

    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        //  props.onFileChange(updatedList);
    }

    const descargar = (file) => {
        fileDownload(file, file.name);

    }

    const pushear = async (datos) => {
        indicadores.push(datos)

    }
    /*
        useEffect(()=>{
    
        },[]);*/

    const funcionTry = async (data, config, posicion) => {
        try {
            const respuesta = await axios.post("http://localhost:3050/api/muestraMedicion/listarIndicadoresCompetenciaMuestraMedicion", data, config);
            // console.log("configuracion:")
            // setDatosTablaMedcion(respuesta.data.data);

            console.log("INDICADOR AQUI")
            console.log(respuesta.data.data)
            //   setIndicadores(respuesta.data.data)
            await pushear(respuesta.data.data)
            console.log(1);
            console.log(indicadores)
            // console.log(datosTablaMedicion);
            //setBandera(posicion+1)
            console.log("LONGITUD:")
            console.log(indicadores.length)
            /* if((posicion)==(datosMedicion.competencias.length)){
                 console.log("aquiIndex")
                 console.log(posicion)
                 console.log(datosMedicion.competencias.length)
                 setBandera(true);
             }*/

            // setBanderaCI(true);
        } catch (error) {
            //console.log(error)
        }


    }


    const llamaIndicadores = async (idEnviado) => {

        console.log("IDENVIADO COMPETENCIA:")
        console.log(idEnviado)

        //console.log("Galleta:")
        //console.log(cookies.jwt)

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }


        //console.log("ESTE ES EL ID ENVIADO " + idEnviado);
        const data = {
            idMuestraMedicion: datosMedicion.idMuestraMedicion,
            idCompetencia: idEnviado
        }
        //console.log("configuracion:")
        //console.log(config);

        console.log("data:")
        console.log(data);

        //await funcionTry(data,config,posicion);
        try {
            const respuesta = await axios.post("http://localhost:3050/api/muestraMedicion/listarIndicadoresCompetenciaMuestraMedicion", data, config);
            // console.log("configuracion:")
            // setDatosTablaMedcion(respuesta.data.data);

            console.log("INDICADOR AQUI")
            console.log(respuesta.data.data)
            //   setIndicadores(respuesta.data.data)
            //  await pushear(respuesta.data.data)
            indicadores.push(respuesta.data.data)
            console.log(1);
            console.log(indicadores)
            // console.log(datosTablaMedicion);
            //setBandera(posicion+1)
            console.log("LONGITUD:")
            console.log(indicadores.length)
            /* if((posicion)==(datosMedicion.competencias.length)){
                 console.log("aquiIndex")
                 console.log(posicion)
                 console.log(datosMedicion.competencias.length)
                 setBandera(true);
             }*/

            // setBanderaCI(true);
        } catch (error) {
            //console.log(error)
        }
        


    }

    /*
    useEffect(()=>{

            datosMedicion.competencias.map((i,index)=>{

                 llamaIndicadores(datosMedicion.competencias[index].idCompetencia,index+1)


            })
           
            
            setBandera(true);

    },[])*/
    useEffect(() => {
        const fetchData = async () => {
            for (let index = 0; index < datosMedicion.competencias.length; index++) {
                await llamaIndicadores(
                    datosMedicion.competencias[index].idCompetencia
                );
            }

            setBandera(true);
        };

        fetchData();
        setTimeout(async () => {

        dispatch(addBanderaCargandoEvidencia(true));
    },500);
    }, [datosMedicion]); // Actualizar solo cuando datosMedicion cambie



    const abreModal = (idComp, iCod) => {

        setOpenModal(true)
        setIdC(idComp)
        setIdCodigo(iCod)

    }

    const abreDetalle = (idCom,idIndi) => {
        props.cambiarEvidencias(false);
        props.cambiarDetalleArchivos(true);
        props.cambiaId(idCom)

        props.cambiaIndicador(idIndi)
    }

    return (
        <div className='RMEContenedorPrincipal'>

            <div className='RMEContenedorSecundario'>
                <div className='RMEContenedor1'>

                    <div className='RMEContenedorTabla'>
                        <table className="tablaF">
                            <tbody>
                                <tr className="tablaEncabezadoMM, eviEncabezado">
                                    <td className="eviEncabezado"> Competencias Asignadas</td>
                                    <td className="eviEncabezado indicCon">Indicadores</td>
                                    <td className="eviEncabezado">Evidencia solicitada</td>
                                    <td className="eviEncabezado verArch"> Ver Archivos</td>
                                    {/* {datosEnviado.enviado ? null : <td className="eviEncabezado">Cargar Archivos</td>} */}
                                </tr>
                                {bandera == true ? <> {
                                    datosMedicion.competencias.map((i, index) => {
                                        console.log("ohnyo")
                                        console.log("INDICE:")
                                        console.log(index)
                                        console.log("INDICADORES:")
                                        console.log(indicadores)


                                        /* return(
                                                 <td><input name="select-radio" type="radio"></input></td>


                                         )*/
                                        console.log(bandera)


                                        return (
                                            <>
                                            {indicadores[index].map((ind) => {
                                                console.log("MAP")
                                                console.log(ind)
                                                return (
                                                    <tr className="tablaEncabezadoMM">
                                                           <td >{i.codigoCompetencia}</td>
                                                           <td >{ind.codigoIndicador}</td>
                                                           {ind.evidencia===null?
                                                          <td>No registrado</td>:
                                                          <td>{ind.evidencia}</td>}
                                                          <td><button className="btnRMEGuardar ver" type="button"
                                            data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => { abreDetalle(i.idCompetencia, ind.fidIndicador) }}>
                                            Ver </button></td>
                                       
                                                    </tr>
                                                )

                                            }
                                            )
                                            }
                                 
                                    
                                    </>
                                        )

                                    }


                                    )}</> : <></>

                                }





                            </tbody>
                        </table>




                    </div>

                </div>
                <div className='RMEContenedor2'>

                    <div className='RMEContenedorBotones'>

                        <div className='RMEContenedorBoton1'>




                        </div>


                        {openModal && <ModalDrag closeModal={setOpenModal} idCompe={idC} idCod={idCodigo} />}





                    </div>

                </div>
            </div>

        </div>
    );


}