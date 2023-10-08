import React, { useState } from 'react'
import styled from 'styled-components';
import "../HojasDeEstilo/ModalDrag.css";
import ModalCorreo from './ModalCorreo';
import ModalContrasenia from './ModalContrasenia';
import ModalArchivosFoto from "./ModalArchivosFoto";

const ModalDragFoto = ({ closeModal, mostrarFoto, idUsuario }) => {

    const [cambioModal, setCambioModal] = useState(true);
    const [confirmacion, setConfirmacion] = useState(false);
    const [id, setId] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [valido, setValido] = useState(false);




    const actualizar = () => {

        closeModal(false)
        mostrarFoto(idUsuario)

    }

    return (

        <>
            <Overlay>
                <ContenedorModal>
                    <EncabezadoModal>
                        <h3>Cambiar foto de perfil del usuario</h3>

                    </EncabezadoModal>
                    <BotonCerrar onClick={() => closeModal(false)}>
                        <i class="bi bi-x-circle" ></i>
                    </BotonCerrar>
                    <br />
                    {/*valido ? <></>: <p>El correo ingresado no se encuentra asociado a una cuenta del sistema</p>*/}


                    {/*  <input  onChange={(e)=> setCorreo(e.target.value)} type='text' className='input-correo' placeholder='Ingrese su correo electrónico aquí' />
         
                  <br/>
                  <button className="boton-correo" onClick={comprobarCorreo}>Aceptar</button>
  */}
                    {valido ? <div>

                        <p className='confirmacion'>Su foto de perfil ha sido actualizada correctamente</p>
                        <button className="boton-aceptar" onClick={actualizar}>Aceptar</button>

                    </div> : <ModalArchivosFoto validar={setValido} close={closeModal} id={idUsuario} />
                    }

                </ContenedorModal>
            </Overlay>

        </>
    )
}

export default ModalDragFoto

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
        width:800px;
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
    top:1px;
     left:765px;
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


