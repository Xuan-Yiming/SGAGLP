import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import "../HojasDeEstilo/ModalDrag.css";
import "../HojasDeEstilo/Reusable/Boton.css";
import "../HojasDeEstilo/Reusable/InputBase.css";
import ModalCorreo from './ModalCorreo';
import ModalContrasenia from './ModalContrasenia';
import ModalArchivosActividades from "./ModalArchivosActividades";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import axios from 'axios';
import { useLocalStorage } from './useLocalStorage';
import { ToastContainer, toast } from 'react-toastify';

const ModalDragParametros = ({ closeModal }) => {

    const [cambioModal, setCambioModal] = useState(true);
    const [confirmacion, setConfirmacion] = useState(false);
    const [id, setId] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [valido, setValido] = useState(false);
    const [valido2, setValido2] = useState(true);
    const [valido3, setValido3] = useState(true);
    const [valido4, setValido4] = useState(true);
    const [valido5, setValido5] = useState(true);
    const [bandera, setBandera] = useState(true)

    const [botonColor, setBotonColor] = useState("#042354");
    const [textoBoton, setTextoBoton] = useState("Editar");
    const [editable, setEditable] = useState(true);
    const [editable0, setEditable0] = useState(true);

    const [colorFondo, setColorFondo] = useState("rgb(242, 247, 249)");
    const [colorTexto, setColorTexto] = useState("rgb(120, 146, 164)");


    const [nivel, setNivel] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [porcentaje, setPorcentaje] = useState("");
    const [cookies, setCookie] = useCookies();
    //  const [botonColor, setBotonColor] = useState("#ADADAD");
    const [editable1, setEditable1] = useState(false);
    const [editable2, setEditable2] = useState(false);
    const [editable3, setEditable3] = useState(false);

    const [idE, setIdE] = useLocalStorage("id")
    const datosCuenta = useSelector((state) => state.Cuenta);








    const guardarParametros = async () => {


        if (textoBoton == "Editar") {

            setColorFondo("#FFFFFF");
            setColorTexto("#000000");

            //  handleEdit();
            // handleClick();
            //  setColor("#FFFFFF");
            // setColorTexto("#000000");
            setTextoBoton("Guardar")
            setBotonColor("#ADADAD")
            setEditable0(false)
            setEditable(false)


        } else {

            const config = {
                headers: { Authorization: 'Bearer ' + cookies.jwt }
            }


            //console.log("ESTE ES EL ID ENVIADO " + idEnviado);
            const data = {
                idEspecialidad: idE,
                niveles: cantidad,
                minimoAprobatorio: nivel,
                porcentajeMinimo: porcentaje
            }
            //console.log("configuracion:")
            //console.log(config);

            console.log("data:")
            console.log(data);

            //await funcionTry(data,config,posicion);
            var errorMessage = "";
            var mensajeCompleto = "";
            try {
                const respuesta = await axios.post("http://localhost:3050/api/especialidad/actualizarParametros", data, config);
                // console.log("configuracion:")
                // setDatosTablaMedcion(respuesta.data.data);

                console.log("PARAMETROS AQUI")
                console.log(respuesta.data)
                //   setIndicadores(respuesta.data.data)
                //  await pushear(respuesta.data.data)
               // setValido(respuesta.data.success)

                if(respuesta.data.success){
                    toast.success('Configuración guardada exitosamente.', {
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

                }else{
                    mensajeCompleto = "Error: " + "No se pudo guardar correctamente los parámetros";
                    //setmostrarModal2(true);
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
                    console.log("AQUI NO ACEPTA");

                }


                // setBanderaCI(true);
            } catch (error) {
                //console.log(error)
            }
        }


    }




    const handleNiveles = (event) => {

        
        let valor = event.target.value;

        if(valor.includes(" ")){
            valor = valor.replace(/\s/g, '');
            setValido5(false)
        }else{
            setValido5(true)
        }

        if (!isNaN(valor) && Number(valor) > 0 && Number(valor) > nivel && valor != "") {
            console.log("OJO1")
            setValido2(true)
            setEditable1(true)
            setCantidad((valor));
        } else {
            console.log("OJO2")
            setValido2(false)
            setEditable1(false)
            setBotonColor("#ADADAD")
            setCantidad((valor));
            setEditable(false)
        }

        if ((!isNaN(valor) && Number(valor) > 0 && Number(valor) >= nivel && valor != "") && (!isNaN(nivel) && Number(nivel) > 0 && Number(nivel) <= Number(valor) && nivel != "")) {
            console.log("CANTIDAD1:")
            setEditable1(true)
            setEditable2(true)


            setValido2(true)
            setValido3(true)
        }
        if ((!isNaN(valor) && Number(valor) > 0 && Number(valor) >= nivel && valor != "") && (!isNaN(porcentaje) && Number(porcentaje) >= 0 && Number(porcentaje) <= 100 && porcentaje != "")) {
            console.log("CANTIDAD2:")
            setEditable1(true)
            setEditable3(true)


            setValido2(true)
            setValido4(true)
        }

        if ((!isNaN(valor) && Number(valor) > 0 && Number(valor) >= nivel && valor != "") && (!isNaN(nivel) && Number(nivel) > 0 && Number(nivel) <= Number(valor) && nivel != "") && (!isNaN(porcentaje) && Number(porcentaje) >= 0 && Number(porcentaje) <= 100 && porcentaje != "")) {
            console.log("CANTIDAD3:")
            setEditable1(true)
            setEditable2(true)
            setEditable3(true)


            setValido2(true)
            setValido3(true)
            setValido4(true)
            setBotonColor("#042354")
            setEditable(true)
        }

    }

    const handleMinimo = (event) => {


        let valor = event.target.value;

        if(valor.includes(" ")){
            valor = valor.replace(/\s/g, '');
            setValido5(false)
        }else{
            setValido5(true)
        }

        if (!isNaN(valor) && Number(valor) > 0 && Number(valor) <= cantidad && valor != "") {
            setValido3(true)
            setEditable2(true)
            setNivel((valor));
        } else {
            setValido3(false)
            setEditable2(false)
            setBotonColor("#ADADAD")
            setNivel((valor));
            setEditable(false)
        }

        if ((!isNaN(cantidad) && Number(cantidad) > 0 && Number(cantidad) >= (Number(valor)) && cantidad != "") && (!isNaN(valor) && Number(valor) > 0 && Number(valor) <= cantidad && valor != "")) {

            console.log("NIVELES:")
            console.log(porcentaje)
            setEditable1(true)
            setEditable2(true)

            setValido2(true)
            setValido3(true)
        }

        if ((!isNaN(valor) && Number(valor) > 0 && Number(valor) <= cantidad && valor != "") && (!isNaN(porcentaje) && Number(porcentaje) >= 0 && Number(porcentaje) <= 100) && porcentaje != "") {

            console.log("NIVELES:")
            console.log(porcentaje)
            setEditable2(true)
            setEditable3(true)

            setValido3(true)
            setValido4(true)
        }

        if ((!isNaN(cantidad) && Number(cantidad) > 0 && Number(cantidad) >= (Number(valor)) && cantidad != "") && (!isNaN(valor) && Number(valor) > 0 && Number(valor) <= cantidad && valor != "") && (!isNaN(porcentaje) && Number(porcentaje) >= 0 && Number(porcentaje) <= 100) && porcentaje != "") {

            console.log("NIVELES:")
            console.log(porcentaje)
            setEditable1(true)
            setEditable2(true)
            setEditable3(true)

            setValido2(true)
            setValido3(true)
            setValido4(true)
            setBotonColor("#042354")
            setEditable(true)
        }

    }

    const handlePorcentaje = (event) => {
    
        let valor = event.target.value;

        if(valor.includes(" ")){
            valor = valor.replace(/\s/g, '');
            setValido5(false)
        }else{
            setValido5(true)
        }


        if (!isNaN(valor) && Number(valor) >= 0 && Number(valor) <= 100 && valor != "") {
            setValido4(true)
            setEditable3(true)
            setPorcentaje((valor));
        } else {
            setValido4(false)
            setEditable3(false)
            setBotonColor("#ADADAD")
            setPorcentaje((valor));
            setEditable(false)
        }
        if ((!isNaN(cantidad) && Number(cantidad) > 0 && Number(cantidad) >= Number(nivel) && cantidad != "") && (!isNaN(valor) && Number(valor) >= 0 && Number(valor) <= 100 && valor != "")) {

            console.log("PORCENTAJE:")
            setEditable1(true)
            setEditable3(true)
            setValido2(true)
            setValido4(true)
        }

        if ((!isNaN(nivel) && Number(nivel) > 0 && Number(nivel) <= Number(cantidad) && nivel != "") && (!isNaN(valor) && Number(valor) >= 0 && Number(valor) <= 100 && valor != "")) {

            console.log("PORCENTAJE:")
            setEditable2(true)
            setEditable3(true)
            setValido3(true)
            setValido4(true)
            setBotonColor("#042354")
        }
        if ((!isNaN(cantidad) && Number(cantidad) > 0 && Number(cantidad) >= Number(nivel) && cantidad != "") && (!isNaN(nivel) && Number(nivel) > 0 && Number(nivel) <= Number(cantidad) && nivel != "") && (!isNaN(valor) && Number(valor) >= 0 && Number(valor) <= 100 && valor != "")) {

            console.log("PORCENTAJE:")
            setEditable1(true)
            setEditable2(true)
            setEditable3(true)
            setValido2(true)
            setValido3(true)
            setValido4(true)
            setBotonColor("#042354")
            setEditable(true)
        }

    }


    const ConsultaParametros = async () => {

        const config = {
            headers: { Authorization: 'Bearer ' + cookies.jwt }
        }


        //console.log("ESTE ES EL ID ENVIADO " + idEnviado);
        const data = {
            idEspecialidad: idE,
            idIndicador: ""
        }
        //console.log("configuracion:")
        //console.log(config);

        console.log("data:")
        console.log(data);

        //await funcionTry(data,config,posicion);

        try {
            const respuesta = await axios.post("http://localhost:3050/api/indicador/listarParametrosIndicador", data, config);
            // console.log("configuracion:")
            // setDatosTablaMedcion(respuesta.data.data);

            console.log("PARAMETROS ACTUALES AQUI")
            console.log(respuesta.data)
            //   setIndicadores(respuesta.data.data)
            //  await pushear(respuesta.data.data)
            //  setValido(respuesta.data.success)
            if(respuesta.data.parametros.length===0){
                setNivel("")
                setCantidad("")
                setPorcentaje("")

            }else{

                setNivel(respuesta.data.parametros[0].minimoAprobatorio)
                setCantidad(respuesta.data.parametros[0].niveles)
                setPorcentaje(respuesta.data.parametros[0].porcentajeMinimo)
            }


            // setBanderaCI(true);
        } catch (error) {
            //console.log(error)
        }




    }

    useEffect(() => {
        ConsultaParametros()

    }, [])

    return (

        <>
            <Overlay>
                <ContenedorModal>
                    <EncabezadoModal>
                        <h3 className='tituloEspDrag'>Configuración de parámetros </h3>

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

 <>

                         {valido5 ? <></> : <p style={{ color: "red" }}>No se permiten espacios en los parámetros</p>}
                        <p className='labelGen encabezadoContra'>Número de niveles</p>
                        <input value={cantidad} onChange={handleNiveles} type='text' className='inputActivoGen input-correo inpTamanio' disabled={editable0} style={{ backgroundColor: colorFondo, color: colorTexto }} />
                        {valido2 ? <></> : <p style={{ color: "red" }}>La cantidad de niveles debe ser un número mayor que cero y el nivel mínimo</p>}

                        <p className='labelGen encabezadoContra'>Nivel mínimo aprobatorio</p>
                        <input value={nivel} onChange={handleMinimo} type='text' className='inputActivoGen input-correo inpTamanio' disabled={editable0} style={{ backgroundColor: colorFondo, color: colorTexto }} />
                        {valido3 ? <></> : <p style={{ color: "red" }}>El nivel mínimo debe ser un número mayor que cero y menor o igual al número de niveles</p>}


                        <p className='labelGen encabezadoContra'>Porcentaje mínimo aprobatorio (%)</p>

                        <input value={porcentaje} onChange={handlePorcentaje} type='text' className='inputActivoGen input-correo inpTamanio' disabled={editable0} style={{ backgroundColor: colorFondo, color: colorTexto }} />
                        {valido4 ? <></> : <p style={{ color: "red" }}>El porcentaje debe ser un número mayor o igual que cero y máximo de cien</p>}


                        <button className="btnDisenio boton-guardar-par" style={{ fontWeight: "bold", fontSize: 14, backgroundColor: botonColor }} onClick={guardarParametros} disabled={((!editable1) || (!editable2) || (!editable3)) && (!editable)}>
                            {textoBoton}
                        </button>

                    </>
                    


                </ContenedorModal>
            </Overlay>

        </>
    )
}

export default ModalDragParametros

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


