import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    idEspecialidad: "",
    codigoEspecialidad: "",
    nombreEspecialidad: "",
    correoEspecialidad: "",

    banderaVerEspe: false,
    botonGuardarHab: false,
}

export const EspecialidadSlice = createSlice({
    name: "Especialidad",
    initialState,
    reducers: {

        addDatosEspecialidad: (state, action) => {
            const { idEspecialidad, codigoEspecialidad, nombreEspecialidad, correoEspecialidad } = action.payload;
            state.idEspecialidad = idEspecialidad;
            state.codigoEspecialidad = codigoEspecialidad;
            state.nombreEspecialidad = nombreEspecialidad;
            state.correoEspecialidad = correoEspecialidad;
        },
        addBanderaVerEspe: (state, action) => {
            state.banderaVerEspe = action.payload;
        },
        addBotonGuardadoHab: (state, action) => {
            state.botonGuardarHab = action.payload;
        },
        resetEspecialidad: (state) => {
            state.idEspecialidad = "";
            state.codigoEspecialidad = "";
            state.nombreEspecialidad = "";
            state.correoEspecialidad = "";
        }
    }
});

export const { addDatosEspecialidad, addBanderaVerEspe, addBotonGuardadoHab, resetEspecialidad } = EspecialidadSlice.actions;
export default EspecialidadSlice.reducer;