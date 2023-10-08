import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    idPlanMejora: "",
    codigoPlanMejora: "",
    descripcionPlanMejora: "",
    botonHabilitado: false,
    paginaActual: "",
    colorFondo: "rgb(242, 247, 249)",
    colorTexto: "rgb(120, 146, 164)",
    editable: false
}


export const PlanesMejoraSlice = createSlice({
    name: "PlanesMejora",
    initialState,
    reducers: {

        addDatosPlanMejora: (state, action) => {
            const { idPlanMejora, codigoPlanMejora, descripcionPlanMejora, botonHabilitado } = action.payload;
            state.idPlanMejora = idPlanMejora;
            state.codigoPlanMejora = codigoPlanMejora;
            state.descripcionPlanMejora = descripcionPlanMejora;
            state.botonHabilitado = botonHabilitado;
        },

        addPlanSeleccionado: (state, action) => {
            const { idPlanMejora, codigo, descripcion } = action.payload;
            state.idPlanMejora = idPlanMejora;
            state.codigoPlanMejora = codigo;
            state.descripcionPlanMejora = descripcion;
        },

        addPagina: (state, action) => {
            state.paginaActual = action.payload;
        },
        addCodigoPM: (state, action) => {
            state.codigoPlanMejora = action.payload
        },
        addDescripcionPM: (state, action) => {
            state.descripcionPlanMejora = action.payload
        },
        addFondo: (state, action) => {
            state.colorFondo = action.payload
        },
        addTexto: (state, action) => {
            state.colorTexto = action.payload
        },
        addEditable: (state, action) => {
            state.editable = action.payload
        }

    }

});

export const { addDatosPlanMejora, addPlanSeleccionado, addPagina, addCodigoPM, addDescripcionPM, addFondo, addTexto, addEditable } = PlanesMejoraSlice.actions;
export default PlanesMejoraSlice.reducer;