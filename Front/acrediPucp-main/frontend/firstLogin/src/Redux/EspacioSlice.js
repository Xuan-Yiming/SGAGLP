import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    idEspacioMedicion: "",
    fidProgramaMedicion: "",
    fidCicloAcademico: "",
    codigo: "",
    nombreCurso: "",
    fechaLimite: "",
    tipoMedicion: "",
    indicadoresConfigurados: "",
    Muestras: []

}



export const EspacioSlice = createSlice({
    name: "Espacio",
    initialState,
    reducers: {

        addDatosIndicadores: (state, action) => {
            const { idEspacioMedicion, codigo, nombreCurso, fechaLimite, indicadoresConfigurados, Muestras } = action.payload;
            state.idEspacioMedicion = idEspacioMedicion;
            state.codigoIndicador = codigo;
            state.nombreCurso = nombreCurso;
            state.fechaLimite = fechaLimite;
            state.indicadoresConfigurados = indicadoresConfigurados;
            state.Muestras = Muestras;
        },
    }

});

export const { addDatosEspacio } = EspacioSlice.actions;
export default EspacioSlice.reducer;