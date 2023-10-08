import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    idResponsable: "",
    codigoResponsable: "",
    nombreResponsable: "",
    correoResponsable: "",
    ResponsablesEspecialidad: [],

    idPerfil: "",
}



export const ResponsableEspecialidadSlice = createSlice({
    name: "ResponsableEspecialidad",
    initialState,
    reducers: {

        addDatosResponsableEspecialidad: (state, action) => {
            const { idResponsable, codigoResponsable, nombreResponsable, correoResponsable, ResponsablesEspecialidad } = action.payload;
            state.idResponsable = idResponsable;
            state.codigoResponsable = codigoResponsable;
            state.nombreResponsable = nombreResponsable;
            state.correoResponsable = correoResponsable;
            state.ResponsablesEspecialidad = ResponsablesEspecialidad;
        },
        vaciarDatosResponsableEspecialidad: (state) => {
            state.ResponsablesEspecialidad = [];
        },
        addIdPerfilResponsableEspe: (state, action) => {
            state.idPerfil = action.payload;
        }
    }

});

export const { addDatosResponsableEspecialidad, vaciarDatosResponsableEspecialidad, addIdPerfilResponsableEspe } = ResponsableEspecialidadSlice.actions;
export default ResponsableEspecialidadSlice.reducer;