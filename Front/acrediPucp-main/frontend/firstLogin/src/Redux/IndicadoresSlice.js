import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    idIndicador: "",
    codigoIndicador: "",
    descripcionIndicador: "",
    rubricas: [],
    Indicadores: [],
    bandera: false,
    bandera2:false,
    index:0,
    index2:0,
}



export const IndicadoresSlice = createSlice({
    name: "Indicadores",
    initialState,
    reducers: {

        addDatosIndicadores: (state, action) => {
            const { idIndicador, codigo, descripcion, rubricas, Indicadores } = action.payload;
            state.idIndicador = idIndicador;
            state.codigoIndicador = codigo;
            state.descripcionIndicador = descripcion;
            state.rubricas = rubricas;
            state.Indicadores = Indicadores;
        },
        addBanderaIndicador: (state, action) => {
            state.bandera = action.payload;
        },
        addIndex: (state, action) => {
            state.index = action.payload;
        },
        addIndex2: (state, action) => {
            state.index2 = action.payload;
        },
        addBandera2: (state, action) => {
            state.bandera2 = action.payload;
        },
        updateRubricaDescription: (state, action) => {
            const { index, description } = action.payload;
            if (index < state.Indicadores[state.index].Rubricas.length) {
                console.log("REDYX1")
                console.log(state.Indicadores[state.index].Rubricas.length)
                console.log(index)
                // Copia todo el estado
                const newState = JSON.parse(JSON.stringify(state));
                // Modifica la copia
                newState.Indicadores[state.index].Rubricas[index].descripcion = description;
                // Devuelve el nuevo estado
                return newState;
            } else {
                console.log("RDSA")
                // Devuelve el estado original si no hay cambios
                return state;
            }
        },
        updateIndicadoresDescription: (state, action) => {
            const { index, indicador } = action.payload;
            if (index < state.Indicadores.length) {
                console.log("REDYX1")
                console.log(state.Indicadores.length)
                console.log(index)
                // Copia todo el estado
                const newState = JSON.parse(JSON.stringify(state));
                // Modifica la copia
                newState.Indicadores[state.index]= indicador;
                // Devuelve el nuevo estado
                return newState;
            } else {
                console.log("RDSA")
                // Devuelve el estado original si no hay cambios
                return state;
            }
        }
    }

});

export const { addDatosIndicadores, addBanderaIndicador,addIndex,addBandera2,updateRubricaDescription,addIndex2,updateIndicadoresDescription } = IndicadoresSlice.actions;
export default IndicadoresSlice.reducer;