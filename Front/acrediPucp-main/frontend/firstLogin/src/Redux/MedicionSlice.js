import { createSlice } from "@reduxjs/toolkit";


const initialState = {


    // succes: "true",
    idMuestraMedicion: "",
    fidEspacioMedicion: "",

    ciclo: "",
    codigoMuestra: "",
    codigoEspacio: "",
    nombreCurso: "",
    fechaInicio: "",
    fechaFin: "",
    enviado: "",
    activo: "",
    tipoMedicion: "",

    competencias: [],
    indicadores: [],
    alumnosPuntuacion: []

}

export const MedicionSlice = createSlice({
    name: "Medicion",
    initialState,
    reducers: {
        recibeDatosMedicion: (state, action) => {
            const { fidEspacioMedicion, ciclo, codigoMuestra, codigoEspacio, nombreCurso, fechaInicio
                , fechaFin, enviado, tipoMedicion } = action.payload;

            state.fidEspacioMedicion = fidEspacioMedicion;
            state.ciclo = ciclo;
            state.codigoMuestra = codigoMuestra;
            state.codigoEspacio = codigoEspacio;
            state.nombreCurso = nombreCurso;
            state.fechaInicio = fechaInicio;

            state.fechaFin = fechaFin;
            state.enviado = enviado;
            state.tipoMedicion = tipoMedicion;

        },
        recibeDatosCompetencias: (state, action) => {
            state.competencias = action.payload;
        },
        addIdMuestraMedicion: (state, action) => {
            state.idMuestraMedicion = action.payload;
        },

        addCiclo: (state, action) => {
            state.ciclo = action.payload;
        },
        addCodigoMuestra: (state, action) => {
            state.codigoMuestra = action.payload;
        },
        addCodigoEspacio: (state, action) => {
            state.codigoEspacio = action.payload;
        },
        addNombreCurso: (state, action) => {
            state.nombreCurso = action.payload;
        },
        addFechaInicio: (state, action) => {
            state.fechaInicio = action.payload;
        },
        addFechaFin: (state, action) => {
            state.fechaFin = action.payload;
        },
        addEnviado: (state, action) => {
            state.enviado = action.payload;
        },
        addTipoMedicion: (state, action) => {
            state.tipoMedicion = action.payload;
        },
        addIndicadores: (state, action) => {
            state.indicadores = action.payload;
        },
        addParejas: (state, action) => {
            state.alumnosPuntuacion.push(action.payload);
        },
        resetParejas: (state, action) => {
            state.alumnosPuntuacion = [];
        },



    }

});

export const { recibeDatosMedicion, recibeDatosCompetencias, addIdMuestraMedicion,
    addCiclo, addCodigoMuestra, addCodigoEspacio, addNombreCurso, addFechaInicio,
    addFechaFin, addEnviado, addTipoMedicion, addIndicadores, addParejas, resetParejas } = MedicionSlice.actions;
export default MedicionSlice.reducer;

