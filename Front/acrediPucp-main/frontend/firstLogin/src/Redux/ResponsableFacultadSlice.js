import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    idResponsable: "",
    codigoResponsable: "",
    nombreResponsable: "",
    correoResponsable: "",
    ResponsablesFacultad: [],
    idPerfil: "",
}



export const ResponsableFacultadSlice = createSlice({
    name: "ResponsableFacultad",
    initialState,
    reducers: {

        addDatosResponsableFacultad: (state, action) => {
            const { idResponsable, codigoResponsable, nombreResponsable, correoResponsable, ResponsablesFacultad } = action.payload;
            state.idResponsable = idResponsable;
            state.codigoResponsable = codigoResponsable;
            state.nombreResponsable = nombreResponsable;
            state.correoResponsable = correoResponsable;
            state.ResponsablesFacultad = ResponsablesFacultad;
        },
        vaciarDatosResponsableFacultad: (state) => {
            state.ResponsablesFacultad = [];
        },
        addIdPerfilResponsableFacu: (state, action) => {
            state.idPerfil = action.payload;
        }
    }

});

export const { addDatosResponsableFacultad, vaciarDatosResponsableFacultad, addIdPerfilResponsableFacu } = ResponsableFacultadSlice.actions;
export default ResponsableFacultadSlice.reducer;