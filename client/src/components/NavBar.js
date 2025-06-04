// client/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Usamos Link para la navegación interna de React
import '../styles/navbar.css'; // Importamos los estilos específicos de la barra de navegación

/**
 * @description Componente de la barra de navegación de la aplicación.
 * @returns {JSX.Element} Componente de la barra de navegación
 */
function Navbar() {
    return (
        <nav className="navbar navbar-dark">
            <Link to="/login" className="navbar-brand">GeekSN</Link>
        </nav>
    );
}

export default Navbar; // Exportamos el componente del Navbar para que se pueda usar en otras partes de la aplicación