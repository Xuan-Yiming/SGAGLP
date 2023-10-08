    import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    idActividad: "",
    codigoActividad: "",
    descripcionActividad: "",
    evidenciaActividad: "",
    responsableActividad: "",
    Actividades: [],
    estado: "",
    evidencia: "",
    fechaInicio: "",
    fechaFin: "",
    responsable: "",
    actualizar: "",
    idestado:"",
    banderaVerActividad: false
}



export const ActividadesSlice = createSlice({
    name: "Actividades",
    initialState,
    reducers: {

        addDatosActividades: (state, action) => {
            const { idActividad, codigo, descripcion, Actividades, evidencia, responsable,banderaVerActividad,estado,fidEstado } = action.payload;
            state.idActividad = idActividad;
            state.codigoActividad = codigo;
            state.descripcionActividad = descripcion;
            state.evidenciaActividad = evidencia;
            state.responsableActividad = responsable;
            state.Actividades = Actividades;
            state.estado = estado;
            state.idestado = fidEstado;
            state.banderaVerActividad=banderaVerActividad;
        },
        addBanderaVerPlanMejora: (state, action) => {
            state.banderaVerActividad = action.payload;
        },
        addData: (state, action) => {
            const { idActividad, codigo, descripcion, descripcionEstado, evidencia, responsable,fidEstado } = action.payload;
            state.idActividad = idActividad;
            state.codigoActividad = codigo;
            state.descripcionActividad = descripcion;
            state.estado = descripcionEstado;
            state.idestado = fidEstado;
            state.evidencia = evidencia;
            state.responsableActividad = responsable;
        },

        vaciarDatosActividades: (state) => {
            state.Actividades = [];
        },

        vaciarDatosActividadesSinArreglo: (state) => {
            
            state.descripcionActividad= "";
            state.evidenciaActividad= "";
        },
        addFechaInicio: (state, action) => {
            state.fechaInicio = action.payload
        },
        addFechaFin: (state, action) => {
            state.fechaFin = action.payload
        },
        addActualizar: (state, action) => {
            state.actualizar = action.payload
        },
        limpiaActividades: (state, action) => {
            state.Actividades = action.payload
        },
        limpiaDescripcion:(state,action)=>{
            state.descripcionActividad=action.payload
        },limpiaEvidencia:(state,action)=>{
            state.evidenciaActividad=action.payload
        },
        addEvidencia2: (state, action) => {
            state.evidencia = action.payload
        },
        
    }

});

export const { addDatosActividades, addData, vaciarDatosActividades,vaciarDatosActividadesSinArreglo, addFechaInicio, addFechaFin, addActualizar, limpiaActividades,addBanderaVerPlanMejora,limpiaDescripcion,limpiaEvidencia,addEvidencia2 } = ActividadesSlice.actions;
export default ActividadesSlice.reducer;