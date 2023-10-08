import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    codigoMedicion: "",
    cicloInicio: 0,
    cicloFin: 0,
    cicloInicioNombre: "",
    cicloFinNombre: "",
    EspaciosMedicion: [],

    codigoEspacio: "",
    nombreCurso: "",
    fechaLimite: "",
    tipoMedicion: "",
    cicloAcademico: "",
    MuestrasMedicion: [],

    idMuestra:"",
    codigoMuestra:"",
    responsableMuestra:"",

    listaIndicadores: [],

    Indicadores: [],

    datosIndicadores: [],

    nombreResponsable: []
}

export const MedicionResEspeSlice = createSlice({
    name: "MedicionEspe",
    initialState,
    reducers: {

        addDatosMuestras: (state, action) => {
            const {idMuestra, codigoMuestra, responsableMuestra} = action.payload;

            state.idMuestra=idMuestra;
            state.codigoMuestra=codigoMuestra;
            state.responsableMuestra=responsableMuestra;
        },
        addDatosMedicion: (state, action) => {
            const { codigoMedicion, cicloInicio, cicloFin, cicloInicioNombre, cicloFinNombre } = action.payload;

            state.codigoMedicion = codigoMedicion;
            state.cicloInicio = cicloInicio;
            state.cicloFin = cicloFin;
            state.cicloInicioNombre = cicloInicioNombre;
            state.cicloFinNombre = cicloFinNombre;
        },
        addDatosEspacios: (state, action) => {
            const { codigoEspacio, nombreCurso, fechaLimite, tipoMedicion, cicloAcademico } = action.payload;
            state.codigoEspacio = codigoEspacio;
            state.nombreCurso = nombreCurso;
            state.fechaLimite = fechaLimite;
            state.tipoMedicion = tipoMedicion;
            state.cicloAcademico = cicloAcademico;
        },
        addDatosEspacio: (state, action) => {
            state.EspaciosMedicion = action.payload;
        },
        addDatosIndicador: (state, action) => {
            state.Indicadores = action.payload;
        },
        addDatosMuestra: (state, action) => {
            state.MuestrasMedicion = action.payload;
        },
        addDatosResponsable: (state, action) => {
            state.nombreResponsable = action.payload;
        },
        addDatosIndicadores: (state, action) => {
            state.datosIndicadores = action.payload;
        },
        addDatosListaIndicadores: (state, action) => {
            state.listaIndicadores = action.payload;
        },
        resetMedicion: (state) => {
            /*
            state.codigoMedicion = "";
            */
            state.cicloInicio = "";
            state.cicloFin = "";
            state.cicloInicioNombre = "";
            state.cicloFinNombre = "";
            /*
            state.EspaciosMedicion = [];
            state.codigoEspacio = "";
            state.nombreCurso = "";
            state.fechaLimite = "";
            state.tipoMedicion = "";
            state.cicloAcademico = "";
            state.MuestrasMedicion = [];
            state.Indicadores = [];
            state.nombreResponsable = [];
            state.datosIndicadores = [];
            */
        }
    }

});

export const { addDatosMedicion, addDatosEspacio, addDatosEspacios, addDatosMuestra, addDatosIndicador, 
    addDatosResponsable, addDatosIndicadores, resetMedicion, addDatosMuestras, addDatosListaIndicadores } = MedicionResEspeSlice.actions;
export default MedicionResEspeSlice.reducer;

