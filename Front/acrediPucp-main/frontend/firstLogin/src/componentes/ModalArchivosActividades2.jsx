import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types';
import fileDownload from "js-file-download";
import axios from 'axios';
import "../HojasDeEstilo/ModalArchivos.css"
import { ImageConfig } from '../componentes/config/ImageConfig';
import uploadImg from '../images/cloud-upload-regular-240.png';
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";



function ModalArchivosActividades2({ validar, close }) {

    const wrapperRef = useRef(null);
    const [long, setLong] = useState("");
    const [fileList, setFileList] = useState([]);
    //const [archivos,setArchivos]=useState([]);
    const datosMedicion = useSelector((state) => state.Medicion);
    const [deshabilitado, setDeshaabilitado] = useState(true)

    const [botonColor, setBotonColor] = useState("#ADADAD");
    const [cookies, setCookie] = useCookies();
    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');



    const [codigo, setCodigo] = useState('')
    const [nuevaContra, setNuevaContra] = useState('')
    const [nuevaContra2, setNuevaContra2] = useState('')
    const [valido, setValido] = useState(false);
    const [valido2, setValido2] = useState(true);
    const [archivos, setArchivos] = useState(null);

    const [falta, setFalta] = useState(false);

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
            console.log(newFile.data)

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

    const subirArchivos = e => {
        setArchivos(e);
    }

    const insertarArchivos = async () => {
        const f = new FormData();
        for (let index = 0; index < archivos.length; index++) {
            archivos[index].idComponente = "Pruebas";
            archivos[index].idMuestra = "1";
            console.log("ABER:")
            console.log(archivos[index])
            f.append("file", archivos[index]);

        }
        f.append("idComponente", "ojo");
        f.append("idMuestra", "OHNYO");

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        console.log("INSERTAR")
        console.log(f)
        await axios.post("http://localhost:3050/uploadEvidencia", f, config)
            .then(response => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })


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


    const subir = async () => {


        const f = new FormData();
        const arreglo = []
        /*
        for(let index=0;index<fileList.length;index++){
            console.log("ABER:")
            console.log(fileList[index])
            f.append(file,fileList[index]);

        }*/
        for (let index = 0; index < fileList.length; index++) {
            arreglo.push(fileList[index]);
            f.append("file", fileList[index])

        }

        //  f.append("idCompetencia", id);
        f.append("idMuestra", datosMedicion.idMuestraMedicion);

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }

        console.log("INSERTAR")
        console.log(f)
        await axios.post("http://localhost:3050/uploadEvidencia", f, config)
            .then(response => {
                console.log(response.data);

                validar(response.data.success)

            }).catch(error => {
                console.log(error);
            })




    }



    return (
        <div className='evidencias' >
            {valido ? <div>

                <p className='confirmacion'>Sus archivos han sido correctamente guardados</p>
                <button className="boton-aceptar" onClick={() => close(false)}>Aceptar</button>



            </div> : <div className='cuadroArchivo'>


                <div className='cuadroArchivo' >
                    <div
                        ref={wrapperRef}
                        className="drop-file-input"
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                    >
                        <div className="drop-file-input__label">
                            <img src={uploadImg} alt="" />
                            <p>Arrastre sus evidencias o haga click aquí</p>
                        </div>
                        <input type="file" multiple value="" onChange={onFileDrop} />

                    </div>
                    <div className="drop-file-preview" style={{ overflowY: "scroll", maxHeight: 250 }} >

                        {
                            fileList.length > 0 ? (
                                <p className="drop-file-preview__title">
                                    Archivos por enviar:
                                </p>

                            ) : (
                                <></>
                            )
                        }


                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p className="tituloArchivo" onClick={() => descargar(item)}>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                    </div>

                    {
                        fileList.length > 0 ? (
                            <button disabled={false} style={{ borderWidth: '0px', backgroundColor: "#9E0520" }} className="boton-evidencias" onClick={subir}>Subir evidencias</button>


                        ) : (
                            <button disabled={true} style={{ borderWidth: '0px', backgroundColor: "#ADADAD" }} className="boton-evidencias" onClick={subir}>Subir evidencias</button>

                        )
                    }
                </div>






            </div>}


        </div>
    )
}

export default ModalArchivosActividades2;