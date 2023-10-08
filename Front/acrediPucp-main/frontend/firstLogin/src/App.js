import InicioRoles from './componentes/InicioRoles';
import IngresarCuenta from './componentes/IngresarCuenta';
import MiPerfilBase from './componentes/MiPerfilBase';
import AdminBase from './componentes/AdminBase';
import ResFacuBase from './componentes/ResFacuBase';
import ResEspeBase from './componentes/ResEspeBase';
import ResMediBase from './componentes/ResMediBase';
import ResGesMedicion from './componentes/ResMediEspaciosMedicion';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorGmail from './componentes/ErrorGmail';

function App() {

    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path="/" element={<IngresarCuenta />} />
                    <Route path="/inicio" element={<InicioRoles />} />
                    <Route path="/inicio/perfil" element={<MiPerfilBase />} />
                    <Route path="/inicio/admin" element={<AdminBase />} />
                    <Route path="/inicio/resFacu" element={<ResFacuBase />} />
                    <Route path="/inicio/resEspe" element={<ResEspeBase />} />
                    <Route path="/inicio/resMedi" element={<ResMediBase />} />
                    <Route path="/error" element={<ErrorGmail />} />
                </Routes>
            </div>
        </Router>
    )
}
export default App;