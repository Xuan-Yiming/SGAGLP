import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types';
import fileDownload from "js-file-download";
import axios from 'axios';
import "../HojasDeEstilo/ModalArchivos.css"
import { ImageConfig } from '../componentes/config/ImageConfig';
import uploadImg from '../images/cloud-upload-regular-240.png';
import { useCookies } from "react-cookie";
import { useSelector,useDispatch } from "react-redux";
import "../HojasDeEstilo/ModalArchivosUsuarios.css"
import { addBandera } from "../Redux/CargandoSlice";


function ModalArchivosUsuarios({ close, archivo }) {
    const dispatch = useDispatch();
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

        // Verificar si el archivo es .png o .jpeg
        const newFile = e.target.files[0];
        if (newFile) {
            const fileType = newFile.type;
            if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'|| fileType === "application/vnd.ms-excel") {
                setFileList([newFile]); // solo permite un archivo a la vez
            } else {
                console.log("Solo se permite archivos xlsx y xls");
            }
        }
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
                console.log("DATA:")
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


    const cargar = () => {
        dispatch(addBandera(false))
        close(false)
        archivo(fileList[0])
        dispatch(addBandera(true))
    }



    return (
        <div className='evidencias' >
            {valido ? <div>

                <p className='confirmacion'>Sus foto ha sido correctamente actualizada</p>
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
                            <p>Arrastre su archivo Excel o haga click aquí</p>
                        </div>
                        <input type="file" accept=".xlsx, .xls" onChange={onFileDrop} />

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
                                <div key={index} className="drop-file-preview__item" >
                                    <img className="imagenArchi" src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
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
                            <button disabled={false} style={{ borderWidth: '0px', backgroundColor: "#9E0520"}} className="boton-evidencias" onClick={cargar}>Cargar archivo</button>


                        ) : (
                            <button disabled={true} style={{ borderWidth: '0px', backgroundColor: "#ADADAD" }} className="boton-evidencias" onClick={cargar}>Cargar archivo</button>

                        )
                    }
                    <p style={{textAlign: "center", fontWeight: "bold", paddingTop:"20px", color: "#444"}}>Asegúrese de que el archivo tenga el formato correcto de acuerdo a la plantilla.</p>
                </div>






            </div>}


        </div>
    )
}

export default ModalArchivosUsuarios;