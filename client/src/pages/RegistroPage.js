import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate para redirigir
import { registerUser } from '../services/authService'; // Importamos la función del servicio
import '../styles/register.css'; // Importamos los estilos específicos del registro

function RegistroPage() {

    // Definimos los estados de las variables que corresponden con los campos del fomrulario
    // Además, definimos los estados para el manejo de errores y de respuestas de éxito

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault(); // Evita que la página se recargue
        setError(null); // Limpiamos los errores anteriores
        setSuccess(false); // Limpiamos los mensajes de éxito anteriores

        // Creamos el objeto de usuario con los datos del formulario de registro
        let user = {
            email,
            username,
            nombre,
            apellido1,
            apellido2,
            password
        }

        try {
            const response = await registerUser(user); // Empleamos la función del servicio que registra al usuario
            if (response.success) {
                setSuccess(true);
                console.log('Registro exitoso:', response.message);
                navigate('/login'); // Redirige al login después del registro exitoso
            } else {
                setError(response.message || 'Error al registrar el usuario.');
            }
        }
        catch (err) {
            setError(err.message || 'Error en la conexión con el servidor.');
        }
    }

    return (
        <div className="register-container">
            <h1 className="register-title">Registro</h1>
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
                    <label htmlFor="username">Nombre de usuario</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className='row'>
                    <div className='col'>
                        <div className="form-group">
                            <label htmlFor="apellido1">Primer Apellido</label>
                            <input
                                type="text"
                                id="apellido1"
                                name="apellido1"
                                required
                                value={apellido1}
                                onChange={(e) => setApellido1(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='col'>
                        <div className="form-group">
                            <label htmlFor="apellido2">Segundo Apellido</label>
                            <input
                                type="text"
                                id="apellido2"
                                name="apellido2"
                                required
                                value={apellido2}
                                onChange={(e) => setApellido2(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="register-btn">Registrarse</button>

                {/* Mostrar mensajes de error o éxito */}
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && <p className="text-green-500 mt-2">¡Registro exitoso!</p>}

                <div className="links-container">
                    <span>¿Ya tienes cuenta?</span>
                    <Link to="/login">Inicia sesión</Link>
                </div>
            </form>
        </div>
    );
}

export default RegistroPage;