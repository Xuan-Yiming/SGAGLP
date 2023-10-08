import { configureStore } from "@reduxjs/toolkit";
import CuentaReducer from "./CuentaSlice";
import AdministradorReducer from "./AdministradorSlice";
import GeneralReducer from "./GeneralSlice";
import MedicionReducer from "./MedicionSlice";
import UsuarioReducer from "./UsuarioSlice"
import CompetenciasReducer from "./CompetenciasSlice"
import IndicadoresReducer from "./IndicadoresSlice"
import ProgramaReducer from "./ProgramaSlice"
import PlanesMejoraReducer from "./PlanMejoraSlice"
import ActividadesReducer from "./ActividadesSlice"
import PropuestasReducer from "./PropuestaSlice"
import ResponsableFacultadReducer from "./ResponsableFacultadSlice";
import AsistenteFacultadReducer from "./AsistenteFacultadSlice";
import AsistenteEspecialidadReducer from "./AsistenteEspecialidadSlice";
import ResponsableEspecialidadReducer from "./ResponsableEspecialidadSlice";
import FacultadReducer from "./FacultadSlice";
import MedicionResEspeReducer from "./MedicionResEspeSlice"
import EspecialidadReducer from "./EspecialidadSlice"
import CargandoReducer from "./CargandoSlice"
import ResponsablePlanMejoraReducer from "./ResponsablePlanMejoraSlice"

export const store = configureStore({
    reducer: {
        Cuenta: CuentaReducer,
        PlanesMejora: PlanesMejoraReducer,
        Propuestas: PropuestasReducer,
        MedicionEspe: MedicionResEspeReducer,
        Administrador: AdministradorReducer,
        Actividades: ActividadesReducer,
        General: GeneralReducer,
        Medicion: MedicionReducer,
        Usuario: UsuarioReducer,
        Competencias: CompetenciasReducer,
        Indicadores: IndicadoresReducer,
        ResponsablePlanMejora: ResponsablePlanMejoraReducer,
        Programa: ProgramaReducer,
        Especialidad: EspecialidadReducer,
        Facultad: FacultadReducer,
        Cargando: CargandoReducer,
        ResponsableFacultad: ResponsableFacultadReducer,
        AsistenteFacultad: AsistenteFacultadReducer,
        AsistenteEspecialidad: AsistenteEspecialidadReducer,
        ResponsableEspecialidad: ResponsableEspecialidadReducer,
    },
});
