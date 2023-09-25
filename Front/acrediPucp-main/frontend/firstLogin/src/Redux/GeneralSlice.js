import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    textoBuscar: "",
    arregloSeleccion: [],

    enviado: false

}


export const GeneralSlice = createSlice({
    name: "General",
    initialState,
    reducers: {

        addTextoBuscar: (state, action) => {
            state.textoBuscar = action.payload;
        },
        AddItem: (state, action) => {
            console.log("array agrega")
            state.arregloSeleccion.push(action.payload)
            console.log(state.arregloSeleccion[0]);
            console.log("largo ", state.arregloSeleccion.length);
            for (let i = 0; i < state.arregloSeleccion.length; i++) {
                console.log(state.arregloSeleccion[i]);
            }

        },
        removeItem: (state, action) => {
            console.log("array antes")
            for (let i = 0; i < state.arregloSeleccion.length; i++) {
                console.log(state.arregloSeleccion[i]);
            }
            for (let i = 0; i < state.arregloSeleccion.length; i++) {
                if (state.arregloSeleccion[i] === action.payload) {
                    state.arregloSeleccion.splice(i, 1);
                }
            }
            for (let i = 0; i < state.arregloSeleccion.length; i++) {
                console.log(state.arregloSeleccion[i]);
            }
        },
        addEnviadoGeneral: (state, action) => {
            state.enviado = action.payload;
        },
    }

});


export const { addTextoBuscar, AddItem, removeItem, addEnviadoGeneral } = GeneralSlice.actions;
export default GeneralSlice.reducer;

