import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    idAsistente: "",
    codigoAsistente: "",
    nombreAsistente: "",
    correoAsistente: "",
    AsistentesFacultad: []
}



export const AsistenteFacultadSlice = createSlice({
    name: "AsistenteFacultad",
    initialState,
    reducers: {

        addDatosAsistenteFacultad: (state, action) => {
            const { idAsistente, codigoAsistente, nombreAsistente, correoAsistente, AsistentesFacultad } = action.payload;
            state.idAsistente = idAsistente;
            state.codigoAsistente = codigoAsistente;
            state.nombreAsistente = nombreAsistente;
            state.correoAsistente = correoAsistente;
            state.AsistentesFacultad = AsistentesFacultad;
        },
        vaciarDatosAsistenteFacultad: (state) => {
            state.AsistentesFacultad = [];
        }
    }

});

export const { addDatosAsistenteFacultad, vaciarDatosAsistenteFacultad } = AsistenteFacultadSlice.actions;
export default AsistenteFacultadSlice.reducer;