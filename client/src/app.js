import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar'; // Tu componente de barra de navegación
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import CambioContraseniaPage from './pages/CambioContraseniaPage';

/**
 * @returns {JSX.Element} Componente principal de la aplicación
 * @description Este componente define las rutas principales de la aplicación y renderiza la barra de navegación.
 */
function App() {
  return (
    <Router>
      <Navbar /> {/* La barra de navegación */}
      {/* Este div ocupará el espacio restante (flex-grow) y centrará su contenido */}
      {/* min-h-0 es importante para que flex-grow funcione correctamente en algunos navegadores */}
      <div className="flex flex-col flex-grow items-center justify-center min-h-0">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          {/* Define otras rutas aquí */}
          {/* <Route path="/cambio-contrasenia" element={<CambioContraseniaPage />} /> */}
          {/* <Route path="/" element={<HomePage />} /> */}
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;