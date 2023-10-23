
import './App.css';
import IngresarCuenta from './componentes/IngresarCuenta';
import MenuContenedor from './componentes/MenuContenedor';
import PlanificacionPrincipal from './componentes/PlanificacionPrincipal';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
        <div className='App'>
            <Routes>
                <Route path="/" element={<IngresarCuenta />} />
                <Route path="/inicio" element={<MenuContenedor/>} />
            </Routes>
        </div>
    </Router>
    

    
    // <PlanificacionPrincipal />
  );
}

export default App;
