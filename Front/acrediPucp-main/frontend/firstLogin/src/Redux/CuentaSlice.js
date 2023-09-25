import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    idCuenta: "",
    nombreCuenta: "",
    apellidoPCuenta: "",
    apellidoMCuenta: "",
    codigoCuenta: "",
    correoCuenta: "",
    celularCuenta: "",
    correoSecundarioCuenta: "",
    constrasenia: "",
    rutaFoto: "",
    usuarioCreacion: "",

    nombreCuenta2: "",
    apellidoPCuenta2: "",
    apellidoMCuenta2: "",
    roles: [],
    idFacultad: "",
    idEspecialidad: "",
    idMedicion: ""
}



export const CuentaSlice = createSlice({
    name: "Cuenta",
    initialState,
    reducers: {

        addDatosCuenta: (state, action) => {
            const { apellidoMaterno, apellidoPaterno, celular, codigoPUCP, correo, correo2
                , idUsuario, nombres } = action.payload;

            state.apellidoPCuenta = apellidoPaterno;
            state.apellidoMCuenta = apellidoMaterno;
            state.celularCuenta = celular;
            state.codigoCuenta = codigoPUCP;
            state.correoCuenta = correo;
            state.correoSecundarioCuenta = correo2;
            state.idCuenta = idUsuario;

            state.nombreCuenta = nombres;


            state.constrasenia = "";
            state.rutaFoto = "";
            state.usuarioCreacion = "99";
        },
        addRoles: (state, action) => {
            state.roles = action.payload
        },
        addNombreCuenta: (state, action) => {
            state.nombreCuenta2 = action.payload
        },
        addApellidoPCuenta: (state, action) => {
            state.apellidoPCuenta2 = action.payload
        },
        addApellidoMCuenta: (state, action) => {
            state.apellidoMCuenta2 = action.payload
        },
        addCorreoCuenta: (state, action) => {
            state.correoCuenta = action.payload
        },
        addCelularCuentas: (state, action) => {
            state.celularCuenta = action.payload
        },
        addCorreoSecundarioCuenta: (state, action) => {
            state.correoSecundarioCuenta = action.payload
        },
        addCodigoCuenta: (state, action) => {
            state.codigoCuenta = action.payload
        },
        addFoto: (state, action) => {
            state.rutaFoto = action.payload
        },
        addIdFacultad: (state, action) => {
            state.idFacultad = action.payload
        },
        addIdEspecialidad: (state, action) => {
            state.idEspecialidad = action.payload
        },
        addIdMedicion: (state, action) => {
            state.idMedicion = action.payload
        }
    }

});

export const { addDatosCuenta, addRoles, addNombreCuenta, addApellidoPCuenta, addApellidoMCuenta, addCorreoCuenta,
    addCelularCuentas, addCorreoSecundarioCuenta, addCodigoCuenta, addFoto, addIdFacultad, addIdEspecialidad, addIdMedicion } = CuentaSlice.actions;
export default CuentaSlice.reducer;