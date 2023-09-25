import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    idAdmin: "",
    nombreAdmin: "",
    rolAdmin: "",
    correoAdmin: "",
    correo2Admin: "",
    codigoAdmin: "",
    apellidoMaternoAdmin: "",
    apellidoPaternoAdmin: ""


}



export const AdministradorSlice = createSlice({
    name: "Administrador",
    initialState,
    reducers: {

        addDatosAdmin: (state, action) => {
            const { idAdmin, nombreAdmin, rolAdmin, correoAdmin, correo2Admin, codigoAdmin, apellidoMaternoAdmin, apellidoPaternoAdmin } = action.payload;
            state.idAdmin = idAdmin;
            state.nombreAdmin = nombreAdmin;
            state.rolAdmin = rolAdmin;
            state.correoAdmin = correoAdmin;
            state.correo2Admin = correo2Admin;
            state.codigoAdmin = codigoAdmin;
            state.apellidoMaternoAdmin = apellidoMaternoAdmin;
            state.apellidoPaternoAdmin = apellidoPaternoAdmin;
        },

        addIdAdmin: (state, action) => {
            state.idAdmin = action.payload;
        },
    }


});

export const { addDatosAdmin, addIdAdmin } = AdministradorSlice.actions;
export default AdministradorSlice.reducer;