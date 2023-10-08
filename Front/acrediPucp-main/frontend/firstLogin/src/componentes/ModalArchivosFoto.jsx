import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types';
import fileDownload from "js-file-download";
import axios from 'axios';
import "../HojasDeEstilo/ModalArchivos.css"
import { ImageConfig } from '../componentes/config/ImageConfig';
import uploadImg from '../images/cloud-upload-regular-240.png';
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";



function ModalArchivosFoto({ validar, close, id }) {

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
    const [valido3,setValido3]=useState(false)
    const [textoColor,setTextoColor]=useState("#000000")
    const [colorBoton,setColorBoton]=useState("#ADADAD")

    const [totalSize,setTotalSize]=useState(0);
    const [falta, setFalta] = useState(false);

    const verificaTamanio=(file)=>{

        var total=0;
        for(let i=0;i<file.length;i++){
            total=total+Number(file[i].size)
            console.log(file)

        }

        let Mb=total/1000000;
        console.log("MB")
        console.log(Mb)
        console.log(total)
        if(Mb>512){
            setTextoColor("#dc3545")
            setValido3(true)
            setColorBoton("#ADADAD")
        }else{
            setValido3(false)
            setTextoColor("#000000")
            setColorBoton("#9E0520")
        }
        setTotalSize(Mb.toFixed(2))

    }


    const onFileDrop = (e) => {
        console.log(e.target.files.length)

        // Verificar si el archivo es .png o .jpeg
        const newFile = e.target.files[0];
        if (newFile) {
            const fileType = newFile.type;
            if (fileType === "image/png" || fileType === "image/jpeg"|| fileType === "image/jpg") {
                setFileList([newFile]); // solo permite un archivo a la vez
                verificaTamanio([newFile])
            } else {
                console.log("Solo se permite archivos .png y .jpeg");
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
        verificaTamanio(updatedList)
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
        /* for (let index = 0; index < fileList.length; index++) {
             arreglo.push(fileList[index]);
             f.append("file", fileList[index])
 
         }*/

        console.log("OJO")
        console.log(fileList)
        f.append("file", fileList[0])

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        f.append("idUsuario", id);

        console.log("INSERTAR FOTO")
        console.log(f)

        //validar(true)

        await axios.post("http://localhost:3050/upload", f, config)
            .then(response => {

                console.log("data")
                console.log(response.data);

                validar(response.data.success)

            }).catch(error => {
                console.log(error);
            })

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
                            <p>Arrastre su nueva foto o haga click aquí</p>
                        </div>
                        <input type="file" accept=".png, .jpeg, .jpg" onChange={onFileDrop} />

                    </div>
                    <div className="drop-file-preview" style={{ overflowY: "scroll", maxHeight: 250 }} >

                    <div className="drop-file-preview__title">

                        <p style={{display:"inline"}}>Máximo tamaño de archivos por subida: 512 MB</p>

                            <p style={{display:"inline", marginLeft:"28%", color:textoColor}}>Tamaño actual: {totalSize} MB</p>
                        {valido3 && <p style={{  marginLeft:"77%",color:textoColor}}> (Capacidad excedida)</p>}

                    </div>

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
                                    <img className="imagenArchi" src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p className="tituloArchivo" onClick={() => descargar(item)}>{item.name}</p>
                                        <p>{(item.size/1000).toFixed(2)} KB</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                    </div>

                    {
                        fileList.length > 0 ? (
                            <button disabled={valido3} style={{ borderWidth: '0px', backgroundColor: colorBoton }} className="boton-evidencias" onClick={subir}>Subir foto</button>


                        ) : (
                            <button disabled={true} style={{ borderWidth: '0px', backgroundColor: "#ADADAD" }} className="boton-evidencias" onClick={subir}>Subir foto</button>

                        )
                    }
                </div>






            </div>}


        </div>
    )
}

export default ModalArchivosFoto;