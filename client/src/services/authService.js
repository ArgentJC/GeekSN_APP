async function registerUser(user) {
    try {
        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al registrar el usuario');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Error en la conexión con el servidor');
    }
}

async function loginUser(credentials) {
    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al iniciar sesión');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Error en la conexión con el servidor');
    }
}

async function changePassword(email, newPassword) {
    try {
        const response = await fetch('http://localhost:8080/api/auth/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, newPassword }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al cambiar la contraseña');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Error en la conexión con el servidor');
    }
}

export { registerUser, loginUser, changePassword };