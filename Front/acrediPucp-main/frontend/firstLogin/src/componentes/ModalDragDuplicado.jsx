import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import "../HojasDeEstilo/ModalDrag.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import "../HojasDeEstilo/Duplicado.css";
import ModalCorreo from './ModalCorreo';
import ModalContrasenia from './ModalContrasenia';
import ModalArchivosActividades from "./ModalArchivosActividades";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import axios from 'axios';
import { useLocalStorage } from './useLocalStorage';
import DatePicker from 'react-datepicker';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import moment from 'moment';

const ModalDragDuplicado = ({ closeModal,idMedicion, repetido,actualiza,item }) => {

    const [cambioModal, setCambioModal] = useState(true);
    const [confirmacion, setConfirmacion] = useState(false);
    const [id, setId] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [valido, setValido] = useState(false);
    const [valido2, setValido2] = useState(true);
    const [valido3, setValido3] = useState(true);
    const [valido4, setValido4] = useState(true);
    const [bandera, setBandera] = useState(true)
    const [estaCargando, setCargando] = useState(false);

    const [selectedEstado, setSelectedEstado] = useState("");
   // const [botonColor, setBotonColor] = useState("#042354");
    const [botonColor, setBotonColor] = useState("#ADADAD");
    const [textoBoton, setTextoBoton] = useState("Editar");
    const [editable, setEditable] = useState(true);
    const [editable0, setEditable0] = useState(true);
    const [comboBoxCiclo, setComboBoxCiclo] = useState([]);
    const [comboBoxId, setComboBoxId] = useState([]);
    const [colorFondo, setColorFondo] = useState("rgb(242, 247, 249)");
    const [colorTexto, setColorTexto] = useState("rgb(120, 146, 164)");


    const [codigo, setCodigo] = useState("");
    const [fecha, setFecha] = useState("");
    const [ciclo, setCiclo] = useState("");
    const [cookies, setCookie] = useCookies();
    //  const [botonColor, setBotonColor] = useState("#ADADAD");
    const [editable1, setEditable1] = useState(false);
    const [editable2, setEditable2] = useState(false);
    const [editable3, setEditable3] = useState(false);
    const [flagCombo,setFlagCombo]=useState(true)
    const [idE, setIdE] = useLocalStorage("id")
    const datosCuenta = useSelector((state) => state.Cuenta);


    const fetchDataCiclo = async () => {
        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }
        const data = {
            idMedicion:idMedicion
        }
        console.log("data")
        console.log(data)
        
        try {

            const respuesta = await axios.post("http://localhost:3050/api/cicloAcademico/listarCicloAcademicoDupMedicion", data, config);

            console.log("aqui");
            console.log(respuesta.data);

           // setComboBoxCiclo(respuesta.data.data)
           for(let i=0;i< respuesta.data.data.length ;i++){
                    comboBoxCiclo.push( respuesta.data.data[i].ciclo)


           } 
           for(let i=0;i< respuesta.data.data.length ;i++){
            comboBoxId.push( respuesta.data.data[i].id)


        }
           console.log("ComboBox")
           console.log(comboBoxCiclo)
           setFlagCombo(false)

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {

        fetchDataCiclo();
       
    }, []);



    const guardarDuplicado = async () => {
       
              const fechaCiclo = moment(fecha).format('YYYY-MM-DD');
              console.log(fechaCiclo)

            const config = {
                headers: { Authorization: 'Bearer ' + cookies.jwt }
            }


            //console.log("ESTE ES EL ID ENVIADO " + idEnviado);
            const data = {
                    idMedicion:idMedicion,
                    fidEspecialidad:idE,
                    codigo:"",
                    fechaLimite:fechaCiclo,
                    idCicloInicio:selectedEstado
                
            }
            //console.log("configuracion:")
            //console.log(config);

            console.log("data:")
            console.log(data);

            //await funcionTry(data,config,posicion);
            var errorMessage = "";
            var mensajeCompleto = "";

            try {
                setCargando(true);
                setBotonColor("#72a1f3")
                const respuesta = await axios.post("http://localhost:3050/api/medicion/duplicarMedicion", data, config);
                if (respuesta.data.success) {
                    toast.success('Medicion duplicada exitosamente.\nCodigo registrado: ' + respuesta.data.codigo + '.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    closeModal(false)
                    actualiza(!item);
                } else {
                    errorMessage = respuesta.data.error.message;
                    if(errorMessage.includes("espacios/cursos")){
                        mensajeCompleto = "Alerta: " + errorMessage + '\nCodigo registrado: ' + respuesta.data.error.codigo + '.';
                        toast.warn(mensajeCompleto, {
                            position: "top-right",
                            autoClose: 10000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        
                        closeModal(false)
                        actualiza(true);
                    } else {
                        mensajeCompleto = "Error: " + errorMessage;
                        toast.error(mensajeCompleto, {
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
                    //setmostrarModal2(true);
                    
                    closeModal(false)
                    actualiza(true);
                    console.log("AQUI NO ACEPTA");
                }
                setCargando(false);
                // console.log("configuracion:")
                // setDatosTablaMedcion(respuesta.data.data);
                   console.log("DUPLICADO GA")
                console.log(respuesta.data)
                //   setIndicadores(respuesta.data.data)
                //  await pushear(respuesta.data.data)
                


                // setBanderaCI(true);
            } catch (error) {
                //console.log(error)
            }
        


    }




 
/*
    const handleCodigo = (event) => {


        let valor = event.target.value.trim();

        if(valor!=""){
            setEditable2(true)
            setCodigo(event.target.value)
        }else{
            setEditable2(false)
            setCodigo(event.target.value)
        }
      
        if(editable1 && (valor!="") && editable3){
            setBotonColor("#042354")
        }else{
            
            setBotonColor("#ADADAD")
        }
    

    }*/

   


    const filterDate = (date) => {
        const today = new Date();
        return date >= today;
    };
    

    const handleDateChange = (date) => {
        console.log(date)
        if(date!=null){
         
        setEditable3(true)
        setFecha(date);

        }
        else {
            setEditable3(false)
        
            setFecha(date);
        }
        if(editable1  && (date!=null)){
            setBotonColor("#042354")
        }else{
            setBotonColor("#ADADAD")
        }
    };

    const handleSeleccionar = (option) => {
        console.log("seleccion")
        console.log(option)
        setSelectedEstado(option)
        if(option!="") setEditable1(true)
        else setEditable1(false)


        if((option!="") && editable3){
            setBotonColor("#042354")
        }else{
            
            setBotonColor("#ADADAD")
        }

    }



    return (

        <>
            <Overlay>
                <ContenedorModal>
                    <EncabezadoModal>
                        <h3 className='tituloEspDrag'>Duplicado de medición </h3>

                    </EncabezadoModal>

                    {bandera &&
                        <BotonCerrar onClick={() => closeModal(false)}>
                            <i class="bi bi-x-circle" ></i>
                        </BotonCerrar>
                    }

                    {/*valido ? <></>: <p>El correo ingresado no se encuentra asociado a una cuenta del sistema</p>*/}


                    {/*  <input  onChange={(e)=> setCorreo(e.target.value)} type='text' className='input-correo' placeholder='Ingrese su correo electrónico aquí' />
         
                  <br/>
                  <button className="boton-correo" onClick={comprobarCorreo}>Aceptar</button>
  */}


                    {valido ? <div>

                        <p className='confirmacion'>La duplicación ha sido realizada exitósamente</p>
                        <button className="botonModal btnDisenio boton-aceptar2" onClick={() => closeModal(false)}>Aceptar</button>

                    </div> : <>
                    <p className='labelGen encabezadoContra'>Ciclo de copia</p>

                         {flagCombo ? (
                              <DropdownButton title={selectedEstado} > </DropdownButton>
                           ) : (
                         <DropdownButton title={selectedEstado} disabled={!editable} onSelect={handleSeleccionar}  >
                           {comboBoxCiclo.map((option) => (
                                <Dropdown.Item eventKey={option}>
                                 {option}
                                 </Dropdown.Item>
                             ))}
                              </DropdownButton>
   
                             )}
                    
                        <br></br>
                        <br></br>

                        <p className='labelGen encabezadoContra'>Fecha límite</p>
                         <DatePicker selected={fecha} value={fecha} onChange={handleDateChange} dateFormat="dd/MM/yyyy" filterDate={filterDate} className="inputActivoGen2 "  />
                

                      
                    
                        <button className="btnDisenio boton-guardar-par" style={{ fontWeight: "bold", fontSize: 14, backgroundColor: botonColor }} onClick={!estaCargando ? guardarDuplicado : null} disabled={estaCargando || ((!editable1) || (!editable3))}>
                            {estaCargando 
                            ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            /> : 'Aceptar'}
                        </button>

                    </>
                    }


                </ContenedorModal>
            </Overlay>

        </>
    )
}

export default ModalDragDuplicado

const Overlay = styled.div`
    width:100vw;
    height:100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    padding:40px;

    display:flex;
    align-items: center;
    justify-content:center;

`;



const ContenedorModal = styled.div`
        width:500px;
        max-height: 670px;
        background:#fff;
        position:relative;
        border-radius:5px;
        box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
        padding:20px;
`;

const EncabezadoModal = styled.div`
    display:flex;
    align-items:center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 1px;
    border-bottom: 1px solid #E8E8E8;

    h3{
        font-weight: 500;
        font-size: 16px;
        color: #042354;


    }

`;


const BotonCerrar = styled.button`
     position:absolute;
    top:2px;
     left:465px;
    width: 30px;
    height: 30px;
    border: none;
    background:none;
    cursor: pointer;
    transition: .3s ease all;
    border-radius: 5px;
    color: #042354;

    &:hover{
        background:#f2f2f2
    }

   
`;


