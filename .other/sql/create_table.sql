-- Revisión y mejoras del esquema SQL para MySQL/MariaDB

-- AUTO_INCREMENT se usa para IDs auto-incrementales.
-- TEXT es adecuado para cadenas de texto largas.
-- DATETIME o TIMESTAMP son los tipos de fecha/hora comunes.
-- TIMESTAMP es ideal para 'created_at' y 'updated_at' con auto-actualización.
-- esto es debido a que cada inserción dentro de la tabla actualiza el campo 'updated_at' automaticamente.
-- Además, en el caso de 'created_at', se establece el valor actual de la fecha y hora al momento de la inserción.

-- Tabla VIDEOJUEGO
-- rawg_id: UNIQUE para asegurar que cada juego de RAWG se almacena una sola vez.
-- background_image: TEXT para URLs que pueden ser largas.
-- metacritic_rating: NUMERIC(5,2) si es un valor decimal (ej. 85.5), o INT si es siempre entero (0-100).
CREATE TABLE VIDEOJUEGO (
    id_videojuego INT PRIMARY KEY AUTO_INCREMENT,
    rawg_id INT UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    background_image TEXT, -- URL de la imagen, puede ser larga
    fecha_lanzamiento DATE,
    metacritic_rating INT, -- Asumiendo un valor entero de 0 a 100
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla GENERO
-- rawg_genre_id: UNIQUE para mapear correctamente los IDs de género de RAWG.
CREATE TABLE GENERO (
    id_genero INT PRIMARY KEY AUTO_INCREMENT,
    rawg_genre_id INT UNIQUE,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla USUARIO
-- password: VARCHAR(255) es suficiente para hashes de contraseñas.
-- photo_url: Añadido para la foto de perfil.
CREATE TABLE USUARIO (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    correo VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido1 VARCHAR(100),
    apellido2 VARCHAR(100),
    nombre_usuario VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Suficiente para almacenar hashes de contraseñas
    photo_url TEXT, -- URL de la foto de perfil
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla COLECCION
-- id_usuario: FOREIGN KEY a USUARIO.
-- fecha_creacion y fecha_modificacion: TIMESTAMP con valores por defecto.
CREATE TABLE COLECCION (
    id_coleccion INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario) ON DELETE CASCADE
);

-- Tabla COMENTARIO_VIDEOJUEGO
-- comentario: TEXT para permitir comentarios largos.
-- created_at: TIMESTAMP para registrar cuándo se hizo el comentario.
CREATE TABLE COMENTARIO_VIDEOJUEGO (
    id_comentario_videojuego INT PRIMARY KEY AUTO_INCREMENT,
    id_videojuego INT NOT NULL,
    id_usuario INT NOT NULL,
    comentario TEXT NOT NULL,
    cantidad_likes INT DEFAULT 0,
    cantidad_dislikes INT DEFAULT 0,
    valoracion_videojuego INT, -- Podría ser NULL si no siempre se valora
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_videojuego) REFERENCES VIDEOJUEGO(id_videojuego) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario) ON DELETE CASCADE
);

-- Tabla COMENTARIO_COLECCION
-- Similar a COMENTARIO_VIDEOJUEGO.
CREATE TABLE COMENTARIO_COLECCION (
    id_comentario_coleccion INT PRIMARY KEY AUTO_INCREMENT,
    id_coleccion INT NOT NULL,
    id_usuario INT NOT NULL,
    comentario TEXT NOT NULL,
    cantidad_likes INT DEFAULT 0,
    cantidad_dislikes INT DEFAULT 0,
    valoracion_coleccion INT, -- Podría ser NULL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_coleccion) REFERENCES COLECCION(id_coleccion) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario) ON DELETE CASCADE
);

-- Tabla USUARIO_LIKE_VIDEOJUEGO (Tabla de unión)
-- Clave primaria compuesta para asegurar unicidad.
CREATE TABLE USUARIO_LIKE_VIDEOJUEGO (
    id_usuario INT NOT NULL,
    id_videojuego INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_videojuego), -- Clave primaria compuesta
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_videojuego) REFERENCES VIDEOJUEGO(id_videojuego) ON DELETE CASCADE
);

-- Tabla USUARIO_LIKE_COMENTARIO (Tabla de unión)
-- Clave primaria compuesta.
CREATE TABLE USUARIO_LIKE_COMENTARIO (
    id_usuario INT NOT NULL,
    id_comentario INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_comentario), -- Clave primaria compuesta
    FOREIGN KEY (id_comentario) REFERENCES COMENTARIO_VIDEOJUEGO(id_comentario_videojuego) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario) ON DELETE CASCADE
);

-- Tabla USUARIO_LIKE_COLECCION (Tabla de unión)
-- Clave primaria compuesta.
CREATE TABLE USUARIO_LIKE_COLECCION (
    id_usuario INT NOT NULL,
    id_coleccion INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_coleccion), -- Clave primaria compuesta
    FOREIGN KEY (id_coleccion) REFERENCES COLECCION(id_coleccion) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario) ON DELETE CASCADE
);

-- Tabla VIDEOJUEGO_COLECCION (Tabla de unión)
-- Clave primaria compuesta.
CREATE TABLE VIDEOJUEGO_COLECCION (
    id_videojuego INT NOT NULL,
    id_coleccion INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Para saber cuándo se añadió
    PRIMARY KEY (id_videojuego, id_coleccion), -- Clave primaria compuesta
    FOREIGN KEY (id_videojuego) REFERENCES VIDEOJUEGO(id_videojuego) ON DELETE CASCADE,
    FOREIGN KEY (id_coleccion) REFERENCES COLECCION(id_coleccion) ON DELETE CASCADE
);

-- Tabla ASIGNACIONES_GENERO_VIDEOJUEGO (Tabla de unión)
-- Clave primaria compuesta.
CREATE TABLE ASIGNACIONES_GENERO_VIDEOJUEGO (
    id_videojuego INT NOT NULL,
    id_genero INT NOT NULL,
    PRIMARY KEY (id_videojuego, id_genero), -- Clave primaria compuesta
    FOREIGN KEY (id_videojuego) REFERENCES VIDEOJUEGO(id_videojuego) ON DELETE CASCADE,
    FOREIGN KEY (id_genero) REFERENCES GENERO(id_genero) ON DELETE CASCADE
);

-- Tabla FRIEND_REQUEST (Solicitudes de amistad)
-- UNIQUE (usuario_emisor, usuario_receptor) para evitar solicitudes duplicadas.
CREATE TABLE FRIEND_REQUEST (
    id_friend_request INT PRIMARY KEY AUTO_INCREMENT,
    usuario_emisor INT NOT NULL,
    usuario_receptor INT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' NOT NULL, -- 'pending', 'accepted', 'rejected'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (usuario_emisor, usuario_receptor), -- Una solicitud única entre dos usuarios
    FOREIGN KEY (usuario_emisor) REFERENCES USUARIO(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (usuario_receptor) REFERENCES USUARIO(id_usuario) ON DELETE CASCADE,
    CHECK (usuario_emisor != usuario_receptor) -- MySQL 8.0.16+ aplica CHECK constraints. En versiones anteriores, solo se parsean.
);

-- Tabla AMISTADES (Para amistades aceptadas)
-- Clave primaria compuesta para asegurar unicidad y evitar duplicados (ej. (1,2) y (2,1) son la misma amistad).
CREATE TABLE AMISTADES (
    id_amistad INT PRIMARY KEY AUTO_INCREMENT,
    usuario1_id INT NOT NULL,
    usuario2_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (usuario1_id, usuario2_id), -- Asegura que no haya duplicados (1,2) y (2,1)
    FOREIGN KEY (usuario1_id) REFERENCES USUARIO(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (usuario2_id) REFERENCES USUARIO(id_usuario) ON DELETE CASCADE,
    CHECK (usuario1_id != usuario2_id) -- MySQL 8.0.16+ aplica CHECK constraints. En versiones anteriores, solo se parsean.
);

-- CHECK sirve para asegurar que se cumple una condición lógica dentro de la tabla.

-- Tabla COLECCION_USUARIO (Si es para "seguir" o "compartir" colecciones, no para propiedad)
-- Clave primaria compuesta.
CREATE TABLE COLECCION_USUARIO (
    id_usuario INT NOT NULL,
    id_coleccion INT NOT NULL,
    PRIMARY KEY (id_usuario, id_coleccion), -- Clave primaria compuesta
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_coleccion) REFERENCES COLECCION(id_coleccion) ON DELETE CASCADE
);

-- ON DELETE CASCADE asegura que al eliminar un usuario o una coleccion, las referencias en otras tablas se eliminan automáticamente.

-- Tabla PREGUNTA_DIARIA (Para la funcionalidad social)
CREATE TABLE PREGUNTA_DIARIA (
    id_pregunta INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE UNIQUE NOT NULL, -- Una pregunta por día
    pregunta TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla RESPUESTA_PREGUNTA_DIARIA
CREATE TABLE RESPUESTA_PREGUNTA_DIARIA (
    id_respuesta INT PRIMARY KEY AUTO_INCREMENT,
    id_pregunta INT NOT NULL,
    id_usuario INT NOT NULL,
    respuesta TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (id_pregunta, id_usuario), -- Un usuario solo puede responder una vez por pregunta
    FOREIGN KEY (id_pregunta) REFERENCES PREGUNTA_DIARIA(id_pregunta) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario) ON DELETE CASCADE
);
