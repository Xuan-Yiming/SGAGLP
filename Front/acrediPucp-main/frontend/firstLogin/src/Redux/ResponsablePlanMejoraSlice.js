import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    idResponsable: "",
    codigoResponsable: "",
    nombreResponsable: "",
    correoResponsable: "",

    ResponsablePlanMejora: [],
    idActividad: "",
}



export const ResponsablePlanMejoraSlice = createSlice({
    name: "ResponsablePlanMejora",
    initialState,
    reducers: {

        addDatosResponsablePlanMejora: (state, action) => {
            const { idResponsable, codigoResponsable, nombreResponsable, correoResponsable,ResponsablePlanMejora} = action.payload;
            state.idResponsable = idResponsable;
            state.codigoResponsable = codigoResponsable;
            state.nombreResponsable = nombreResponsable;
            state.correoResponsable = correoResponsable;
            state.ResponsablePlanMejora= ResponsablePlanMejora;
        },
        addResponsablesPlanMejora: (state, action) => {
            const { ResponsablePlanMejora} = action.payload;
            state.ResponsablePlanMejora= ResponsablePlanMejora;
        },
        addIdPerfilResponsablePlanMejora: (state, action) => {
            state.idActividad = action.payload;
        },
        vaciarDatosResponsablePlanMejora: (state) => {
            state.ResponsablePlanMejora = [];
        }
    }

});

export const { addDatosResponsablePlanMejora, vaciarDatosResponsablePlanMejora, addIdPerfilResponsablePlanMejora ,addResponsablesPlanMejora} = ResponsablePlanMejoraSlice.actions;
export default ResponsablePlanMejoraSlice.reducer;