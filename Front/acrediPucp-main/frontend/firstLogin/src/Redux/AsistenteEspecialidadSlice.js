import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    idAsistente: "",
    codigoAsistente: "",
    nombreAsistente: "",
    correoAsistente: "",
    AsistentesEspecialidad: []
}



export const AsistenteEspecialidadSlice = createSlice({
    name: "AsistenteEspecialidad",
    initialState,
    reducers: {

        addDatosAsistenteEspecialidad: (state, action) => {
            const { idAsistente, codigoAsistente, nombreAsistente, correoAsistente, AsistentesEspecialidad } = action.payload;
            state.idAsistente = idAsistente;
            state.codigoAsistente = codigoAsistente;
            state.nombreAsistente = nombreAsistente;
            state.correoAsistente = correoAsistente;
            state.AsistentesEspecialidad = AsistentesEspecialidad;
        },
        vaciarDatosAsistenteEspecialidad: (state) => {
            state.AsistentesEspecialidad = [];
        }
    }

});

export const { addDatosAsistenteEspecialidad, vaciarDatosAsistenteEspecialidad } = AsistenteEspecialidadSlice.actions;
export default AsistenteEspecialidadSlice.reducer;