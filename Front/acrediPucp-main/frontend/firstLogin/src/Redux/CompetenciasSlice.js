import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    idCompetencia: "",
    codigoCompetencia: "",
    descripcionCompetencia: "",
    evidenciaCompetencia: "",
    botonHabilitado: false
}



export const CompetenciasSlice = createSlice({
    name: "Competencias",
    initialState,
    reducers: {

        addDatosCompetencias: (state, action) => {
            const { idCompetencia, codigoCompetencia, descripcion, evidencia, botonHabilitado } = action.payload;
            state.idCompetencia = idCompetencia;
            state.codigoCompetencia = codigoCompetencia;
            state.descripcionCompetencia = descripcion;
            state.evidenciaCompetencia = evidencia;
            state.botonHabilitado = botonHabilitado;
        },
    }

});

export const { addDatosCompetencias } = CompetenciasSlice.actions;
export default CompetenciasSlice.reducer;