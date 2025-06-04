import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate para redirigir
import { changePassword } from '../services/authService'; // Importamos la función del servicio
import '../styles/login.css'; // Importamos los estilos específicos del login

function CambioContraseniaPage() {

    const [email, setEmail] = useState(''); // Estado para el correo electrónico
    const [newPassword, setNewPassword] = useState(''); // Estado para la nueva contraseña
    const [confirmPassword, setConfirmPassword] = useState(''); // Estado para la nueva contraseña
    const [error, setError] = useState(null); // Estado para manejar errores
    const [success, setSuccess] = useState(false); // Estado para manejar mensajes de éxito

    const navigate = useNavigate(); // Hook para la navegación programática

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        setError(null); // Limpiamos errores anteriores
        setSuccess(false); // Limpiamos mensajes de éxito anteriores

        // Validamos que las contraseñas coincidan
        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await changePassword(email, newPassword); // Empleamos la función del servicio que cambia la contraseña
            if (response.success) {
                setSuccess(true);
                console.log('Cambio de contraseña exitoso:', response.message);
                navigate('/login'); // Redirige al login después del cambio exitoso
            } else {
                setError(response.message || 'Error al cambiar la contraseña.');
            }
        } catch (err) {
            setError(err.message || 'Error en la conexión con el servidor.');
        }
    }

    return (
        <div className="login-container">
            <h1 className="login-title">Cambiar Contraseña</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword">Nueva Contraseña</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">Contraseña cambiada exitosamente.</p>}

                <button type="submit" className="login-btn">Cambiar Contraseña</button>
            </form>
            <div className="links-container">
                <Link to="/login" className="link">Volver al Login</Link>
            </div>
        </div>
    );

}

export default CambioContraseniaPage; // Exportamos el componente para que se pueda usar en otras partes de la aplicación