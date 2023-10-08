import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    idMedicion: "",
    fidEspecialidad: "",
    codigoMedicion: "",
    fechaCreacion: "",
    cicloInicio: "",
    cicloFin: "",
    fidCicloInicio: "",
    fidCicloFin: "",
    completada: "",

    espacios: [],

    idEspacio: "",
    codigoEspacio: "",
    nombreCurso: "",
    fechaLimite: "",
    cicloAcademico: "",
    idcicloAcademico: "",

    banderaDetalle: false,
    banderaAñadir: false
}



export const ProgramaSlice = createSlice({
    name: "Programa",
    initialState,
    reducers: {

        addDatosPrograma: (state, action) => {
            const { idMedicion, fidEspecialidad, codigoMedicion, fechaCreacion, cicloInicio, cicloFin, fidCicloInicio, fidCicloFin, completada } = action.payload;
            state.idMedicion = idMedicion;
            state.fidEspecialidad = fidEspecialidad;
            state.codigoMedicion = codigoMedicion;
            state.fechaCreacion = fechaCreacion;
            state.cicloInicio = cicloInicio;
            state.cicloFin = cicloFin;
            state.fidCicloInicio = fidCicloInicio;
            state.fidCicloFin = fidCicloFin;
            state.completada = completada;
        },
        recibeDatosEspacios: (state, action) => {
            state.espacios = action.payload;
        },
        addCompletada: (state, action) => {
            state.completada = action.payload;
        },
        addCodigoMedicion: (state, action) => {
            state.codigoMedicion = action.payload;
        },
        addFechaCreacion: (state, action) => {
            state.fechaCreacion = action.payload;
        },
        addCicloInicio: (state, action) => {
            state.cicloInicio = action.payload;
        },
        addCicloFin: (state, action) => {
            state.cicloFin = action.payload;
        },
        addIdCicloInicio: (state, action) => {
            state.fidCicloInicio = action.payload;
        },
        addIdCicloFin: (state, action) => {
            state.fidCicloFin = action.payload;
        },
        addIdMedicion: (state, action) => {
            state.idMedicion = action.payload;
        },
        addDatosEspacio: (state, action) => {
            const { idEspacio, codigoEspacio, nombreCurso, fechaLimite, tipoMedicion, cicloAcademico, idcicloAcademico } = action.payload;
            state.idEspacio = idEspacio;
            state.codigoEspacio = codigoEspacio;
            state.nombreCurso = nombreCurso;
            state.fechaLimite = fechaLimite;
            state.cicloAcademico = cicloAcademico;
            state.idcicloAcademico = idcicloAcademico;
        },
        addDatosDetalle: (state, action) => {
            state.banderaDetalle = action.payload;
        },
        addDatosAñadir: (state, action) => {
            state.banderaAñadir = action.payload;
        }
    }


});

export const { addDatosPrograma, recibeDatosEspacios, addCompletada,
    addCodigoMedicion, addFechaCreacion, addCicloInicio, addCicloFin,
    addIdCicloInicio, addIdCicloFin, addIdMedicion, addDatosEspacio,
    addDatosDetalle, addDatosAñadir } = ProgramaSlice.actions;
export default ProgramaSlice.reducer;