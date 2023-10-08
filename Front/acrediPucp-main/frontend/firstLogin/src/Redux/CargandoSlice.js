import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    bandera: true,
    banderaEvidenciaMedicion:true,
    banderaEliminaEvidenciaMedicion:true,
    banderaEliminaEvidenciaActividad:true,
    banderaCargarMedicion:true,
    banderaCargarEvidenciaMuestra:true,
    banderaCargarEvidenciaCompetencia:true,
    banderaCargarCalificacion: true,
    banderaGuardandoCambios: true,
    banderaCargandoCompetencia: true,
    banderaCargandoIndicador: true,
    banderaCargandoEvidencia: true,
}



export const CargandoSlice = createSlice({
    name: "Cargando",
    initialState,
    reducers: {
        addBandera: (state, action) => {
            state.bandera = action.payload;
        },
        addBanderaEvidenciaMedicion: (state, action) => {
            state.banderaEvidenciaMedicion = action.payload;
        },
        addBanderaEliminaEvidenciaMedicion: (state, action) => {
            state.banderaEliminaEvidenciaMedicion = action.payload;
        },
        addBanderaCargarMedicion: (state, action) => {
            state.banderaCargarMedicion = action.payload;
        },
        addBanderaCargarCalificacion: (state, action) => {
            state.banderaCargarCalificacion = action.payload;
        },
        addBanderaGuardandoCambios: (state, action) => {
            state.banderaGuardandoCambios = action.payload;
        }, addBanderaCargandoCompetencia: (state, action) => {
            state.banderaCargandoCompetencia = action.payload;
        }, addBanderaCargandoIndicador: (state, action) => {
            state.banderaCargandoIndicador = action.payload;
        }, addBanderaCargandoEvidencia: (state, action) => {
            state.banderaCargandoEvidencia = action.payload;
        }, addBanderaEliminaEvidenciaActividad: (state, action) => {
            state.banderaEliminaEvidenciaActividad = action.payload;
        }, addBanderaCargarEvidenciaMuestra: (state, action) => {
            state.banderaCargarEvidenciaMuestra = action.payload;
        }, addBanderaCargarEvidenciaCompetencia: (state, action) => {
            state.banderaCargarEvidenciaCompetencia = action.payload;
        }
    }

});

export const { addBandera,addBanderaEvidenciaMedicion,addBanderaEliminaEvidenciaMedicion,addBanderaCargarMedicion,addBanderaCargarCalificacion,addBanderaGuardandoCambios,addBanderaCargandoCompetencia ,addBanderaCargandoIndicador,addBanderaCargandoEvidencia,addBanderaEliminaEvidenciaActividad,addBanderaCargarEvidenciaMuestra,addBanderaCargarEvidenciaCompetencia} = CargandoSlice.actions;
export default CargandoSlice.reducer;