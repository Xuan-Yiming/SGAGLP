import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    idPropuesta: "",
    codigoPropuesta: "",
    descripcionPropuesta: "",
    actividades: [],
    Propuestas: [],
    bandera: false,
    paginaActual: "",
}



export const PropuestasSlice = createSlice({
    name: "Propuestas",
    initialState,
    reducers: {

        addDatosPropuestas: (state, action) => {
            const { idPropuesta, codigo, descripcion, actividades, Propuestas } = action.payload;
            state.idPropuesta = idPropuesta;
            state.codigoPropuesta = codigo;
            state.descripcionPropuesta = descripcion;
            state.actividades = actividades;
            state.Propuestas = Propuestas;
        },
        addPagina: (state, action) => {
            state.paginaActual = action.payload;

        },
        addData: (state, action) => {
            const { idPropuesta, codigo, descripcion } = action.payload;
            state.idPropuesta = idPropuesta;
            state.codigoPropuesta = codigo;
            state.descripcionPropuesta = descripcion;
        },
        limpiaCodigo: (state, action) => {
            state.codigoPropuesta = action.payload;
        },
        limpiaDescripcion: (state, action) => {
            state.descripcionPropuesta = action.payload;
        },
        limpiaActividades: (state, action) => {
            state.actividades = action.payload
        },
        addCodigoP: (state, action) => {
            state.codigoPropuesta = action.payload
        },
        addDescripcionP: (state, action) => {
            state.descripcionPropuesta = action.payload
        }

    }

});

export const { addDatosPropuestas, addPagina, addData, limpiaCodigo, limpiaDescripcion, limpiaActividades, addCodigoP, addDescripcionP } = PropuestasSlice.actions;
export default PropuestasSlice.reducer;