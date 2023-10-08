import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    nombreUsuario: "",
    aPaterno: "",
    aMaterno: "",
    codigoPucp: "",
    correo: "",
    correo2: "",
    celular: "",
    foto: ""

}



export const UsuarioSlice = createSlice({
    name: "Usuario",
    initialState,
    reducers: {

        addDatosUsuario: (state, action) => {
            const { nombres, apellidoPaterno, apellidoMaterno, codigoPUCP, correo, celular, correo2 } = action.payload;
            state.nombreUsuario = nombres;
            state.aPaterno = apellidoPaterno;
            state.aMaterno = apellidoMaterno;
            state.codigoPucp = codigoPUCP;
            state.correo = correo;
            state.correo2 = correo2;
            state.celular = celular;
        },

        addFotoUsuario: (state, action) => {
            state.foto = action.payload;

        }

    }


});

export const { addDatosUsuario, addFotoUsuario } = UsuarioSlice.actions;
export default UsuarioSlice.reducer;