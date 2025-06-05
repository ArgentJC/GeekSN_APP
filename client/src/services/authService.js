/**
 * @description Servicio que hace la llamada a la API para conseguir registrar un usuario. Recoge todos los valores del forms y los envia como body de la request
 * @param {*} user Usuario recogido desde el forms de registro
 * @returns Devuelve la respuesta en formato json
 */
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

/**
 * @description Servicio que se encarga de hacer la llamada a la API para controlar el login del usuario
 * @param {*} credentials Credenciales de acceso del usuario: correo o nombre de usuario y contraseña
 * @returns Devuelve la respuesta en formato json
 */
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

/**
 * @description Funcion del servicio que se encarga de cambiar la contraseña del usuario
 * @param {*} email Correo del usuario
 * @param {*} newPassword Contraseña nueva introducida por el usuario
 * @returns Devuelve la respuesta en formato json
 */
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

// Exportamos los modulos del servicio para su uso en las Pages
export { registerUser, loginUser, changePassword }; 