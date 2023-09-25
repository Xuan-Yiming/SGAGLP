import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    idFacultad: "",
    codigoFacultad: "",
    nombreFacultad: "",
    correoFacultad: "",
    tieneEspecialidad: true,

    banderaVerFacu: false,
    botonGuardarHab: false
}



export const FacultadSlice = createSlice({
    name: "Facultad",
    initialState,
    reducers: {

        addDatosFacultad: (state, action) => {
            const { idFacultad, codigoFacultad, nombreFacultad, correoFacultad, tieneEspecialidad } = action.payload;
            state.idFacultad = idFacultad;
            state.nombreFacultad = nombreFacultad;
            state.codigoFacultad = codigoFacultad;
            state.correoFacultad = correoFacultad;
            state.tieneEspecialidad = tieneEspecialidad;
        },
        addBanderaVerFacu: (state, action) => {
            state.banderaVerFacu = action.payload;
        },
        addBotonGuardadoHab: (state, action) => {
            state.botonGuardarHab = action.payload;
        },
        resetFacultad: (state) => {
            state.idFacultad = "";
            state.nombreFacultad = "";
            state.codigoFacultad = "";
            state.correoFacultad = "";
            state.tieneEspecialidad = "";
        }
    }

});

export const { addDatosFacultad, addBanderaVerFacu, addBotonGuardadoHab, resetFacultad } = FacultadSlice.actions;
export default FacultadSlice.reducer;