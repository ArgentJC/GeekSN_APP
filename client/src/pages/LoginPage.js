// client/src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate para redirigir
import { loginUser } from '../services/authService'; // Importamos la función del servicio
import '../styles/login.css'; // Importamos los estilos específicos del login

function LoginPage() {
    // Definimos el "estado" para los campos del formulario y mensajes
    const [identifier, setIdentifier] = useState(''); // Puede ser correo o nombre de usuario
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate(); // Hook para la navegación programática

    /**
     * Maneja el envío del formulario de inicio de sesión.
     * @param {*} e - El evento de envío del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        setError(null); // Limpiamos errores anteriores
        setSuccess(false); // Limpiamos mensajes de éxito anteriores

        try {
            const credentials = { identifier, password };
            const response = await loginUser(credentials); 

            if (response.success) {
                setSuccess(true);
                console.log('Inicio de sesión exitoso:', response.message);
                navigate('/login'); // Redirección a un login por ahora
            } else {
                setError(response.message || 'Credenciales inválidas.');
            }
        } catch (err) {
            setError(err.message || 'Error de conexión al servidor.');
        }
    };

    return (
        // El login-container ahora se centrará dentro del div flex de App.js
        <div className="login-container">
            <h1 className="login-title">Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="identifier">Correo electrónico o nombre de usuario</label>
                    {/* Conectamos el input al estado 'identifier' */}
                    <input 
                        type="text" 
                        id="identifier" 
                        name="identifier" 
                        required 
                        value={identifier} 
                        onChange={(e) => setIdentifier(e.target.value)} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    {/* Conectamos el input al estado 'password' */}
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>

                <button type="submit" className="login-btn">Iniciar Sesión</button>

                {/* Mostrar mensajes de error o éxito */}
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && <p className="text-green-500 mt-2">¡Inicio de sesión exitoso!</p>}

                <div className="links-container">
                    {/* Usamos Link para la navegación interna */}
                    <Link to="/cambio-contrasenia">¿Olvidaste tu contraseña?</Link>
                    <br/><br/>
                    <span>¿No tienes cuenta?</span>
                    <Link to="/registro">Regístrate</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;