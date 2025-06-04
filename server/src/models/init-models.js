var DataTypes = require("sequelize").DataTypes;
var _Amistade = require("./amistade");
var _AsignacionesGeneroVideojuego = require("./asignaciones-genero-videojuego");
var _Coleccion = require("./coleccion");
var _ColeccionUsuario = require("./coleccion-usuario");
var _ComentarioColeccion = require("./comentario-coleccion");
var _ComentarioVideojuego = require("./comentario-videojuego");
var _FriendRequest = require("./friend-request");
var _Genero = require("./genero");
var _PreguntaDiarium = require("./pregunta-diarium");
var _RespuestaPreguntaDiarium = require("./respuesta-pregunta-diarium");
var _Usuario = require("./usuario");
var _UsuarioLikeColeccion = require("./usuario-like-coleccion");
var _UsuarioLikeComentario = require("./usuario-like-comentario");
var _UsuarioLikeVideojuego = require("./usuario-like-videojuego");
var _Videojuego = require("./videojuego");
var _VideojuegoColeccion = require("./videojuego-coleccion");

function initModels(sequelize) {
  var Amistade = _Amistade(sequelize, DataTypes);
  var AsignacionesGeneroVideojuego = _AsignacionesGeneroVideojuego(sequelize, DataTypes);
  var Coleccion = _Coleccion(sequelize, DataTypes);
  var ColeccionUsuario = _ColeccionUsuario(sequelize, DataTypes);
  var ComentarioColeccion = _ComentarioColeccion(sequelize, DataTypes);
  var ComentarioVideojuego = _ComentarioVideojuego(sequelize, DataTypes);
  var FriendRequest = _FriendRequest(sequelize, DataTypes);
  var Genero = _Genero(sequelize, DataTypes);
  var PreguntaDiarium = _PreguntaDiarium(sequelize, DataTypes);
  var RespuestaPreguntaDiarium = _RespuestaPreguntaDiarium(sequelize, DataTypes);
  var Usuario = _Usuario(sequelize, DataTypes);
  var UsuarioLikeColeccion = _UsuarioLikeColeccion(sequelize, DataTypes);
  var UsuarioLikeComentario = _UsuarioLikeComentario(sequelize, DataTypes);
  var UsuarioLikeVideojuego = _UsuarioLikeVideojuego(sequelize, DataTypes);
  var Videojuego = _Videojuego(sequelize, DataTypes);
  var VideojuegoColeccion = _VideojuegoColeccion(sequelize, DataTypes);

  Coleccion.belongsToMany(Usuario, { as: 'idUsuarioUsuarios', through: ColeccionUsuario, foreignKey: "idColeccion", otherKey: "idUsuario" });
  Coleccion.belongsToMany(Usuario, { as: 'idUsuarioUsuarioUsuarioLikeColeccions', through: UsuarioLikeColeccion, foreignKey: "idColeccion", otherKey: "idUsuario" });
  Coleccion.belongsToMany(Videojuego, { as: 'idVideojuegoVideojuegoVideojuegoColeccions', through: VideojuegoColeccion, foreignKey: "idColeccion", otherKey: "idVideojuego" });
  ComentarioVideojuego.belongsToMany(Usuario, { as: 'idUsuarioUsuarioUsuarioLikeComentarios', through: UsuarioLikeComentario, foreignKey: "idComentario", otherKey: "idUsuario" });
  Genero.belongsToMany(Videojuego, { as: 'idVideojuegoVideojuegos', through: AsignacionesGeneroVideojuego, foreignKey: "idGenero", otherKey: "idVideojuego" });
  Usuario.belongsToMany(Coleccion, { as: 'idColeccionColeccions', through: ColeccionUsuario, foreignKey: "idUsuario", otherKey: "idColeccion" });
  Usuario.belongsToMany(Coleccion, { as: 'idColeccionColeccionUsuarioLikeColeccions', through: UsuarioLikeColeccion, foreignKey: "idUsuario", otherKey: "idColeccion" });
  Usuario.belongsToMany(ComentarioVideojuego, { as: 'idComentarioComentarioVideojuegos', through: UsuarioLikeComentario, foreignKey: "idUsuario", otherKey: "idComentario" });
  Usuario.belongsToMany(Videojuego, { as: 'idVideojuegoVideojuegoUsuarioLikeVideojuegos', through: UsuarioLikeVideojuego, foreignKey: "idUsuario", otherKey: "idVideojuego" });
  Videojuego.belongsToMany(Coleccion, { as: 'idColeccionColeccionVideojuegoColeccions', through: VideojuegoColeccion, foreignKey: "idVideojuego", otherKey: "idColeccion" });
  Videojuego.belongsToMany(Genero, { as: 'idGeneroGeneros', through: AsignacionesGeneroVideojuego, foreignKey: "idVideojuego", otherKey: "idGenero" });
  Videojuego.belongsToMany(Usuario, { as: 'idUsuarioUsuarioUsuarioLikeVideojuegos', through: UsuarioLikeVideojuego, foreignKey: "idVideojuego", otherKey: "idUsuario" });
  ColeccionUsuario.belongsTo(Coleccion, { as: "idColeccionColeccion", foreignKey: "idColeccion"});
  Coleccion.hasMany(ColeccionUsuario, { as: "coleccionUsuarios", foreignKey: "idColeccion"});
  ComentarioColeccion.belongsTo(Coleccion, { as: "idColeccionColeccion", foreignKey: "idColeccion"});
  Coleccion.hasMany(ComentarioColeccion, { as: "comentarioColeccions", foreignKey: "idColeccion"});
  UsuarioLikeColeccion.belongsTo(Coleccion, { as: "idColeccionColeccion", foreignKey: "idColeccion"});
  Coleccion.hasMany(UsuarioLikeColeccion, { as: "usuarioLikeColeccions", foreignKey: "idColeccion"});
  VideojuegoColeccion.belongsTo(Coleccion, { as: "idColeccionColeccion", foreignKey: "idColeccion"});
  Coleccion.hasMany(VideojuegoColeccion, { as: "videojuegoColeccions", foreignKey: "idColeccion"});
  UsuarioLikeComentario.belongsTo(ComentarioVideojuego, { as: "idComentarioComentarioVideojuego", foreignKey: "idComentario"});
  ComentarioVideojuego.hasMany(UsuarioLikeComentario, { as: "usuarioLikeComentarios", foreignKey: "idComentario"});
  AsignacionesGeneroVideojuego.belongsTo(Genero, { as: "idGeneroGenero", foreignKey: "idGenero"});
  Genero.hasMany(AsignacionesGeneroVideojuego, { as: "asignacionesGeneroVideojuegos", foreignKey: "idGenero"});
  RespuestaPreguntaDiarium.belongsTo(PreguntaDiarium, { as: "idPreguntaPreguntaDiarium", foreignKey: "idPregunta"});
  PreguntaDiarium.hasMany(RespuestaPreguntaDiarium, { as: "respuestaPreguntaDiaria", foreignKey: "idPregunta"});
  Amistade.belongsTo(Usuario, { as: "usuario1", foreignKey: "usuario1Id"});
  Usuario.hasMany(Amistade, { as: "amistades", foreignKey: "usuario1Id"});
  Amistade.belongsTo(Usuario, { as: "usuario2", foreignKey: "usuario2Id"});
  Usuario.hasMany(Amistade, { as: "usuario2Amistades", foreignKey: "usuario2Id"});
  Coleccion.belongsTo(Usuario, { as: "idUsuarioUsuario", foreignKey: "idUsuario"});
  Usuario.hasMany(Coleccion, { as: "coleccions", foreignKey: "idUsuario"});
  ColeccionUsuario.belongsTo(Usuario, { as: "idUsuarioUsuario", foreignKey: "idUsuario"});
  Usuario.hasMany(ColeccionUsuario, { as: "coleccionUsuarios", foreignKey: "idUsuario"});
  ComentarioColeccion.belongsTo(Usuario, { as: "idUsuarioUsuario", foreignKey: "idUsuario"});
  Usuario.hasMany(ComentarioColeccion, { as: "comentarioColeccions", foreignKey: "idUsuario"});
  ComentarioVideojuego.belongsTo(Usuario, { as: "idUsuarioUsuario", foreignKey: "idUsuario"});
  Usuario.hasMany(ComentarioVideojuego, { as: "comentarioVideojuegos", foreignKey: "idUsuario"});
  FriendRequest.belongsTo(Usuario, { as: "usuarioEmisorUsuario", foreignKey: "usuarioEmisor"});
  Usuario.hasMany(FriendRequest, { as: "friendRequests", foreignKey: "usuarioEmisor"});
  FriendRequest.belongsTo(Usuario, { as: "usuarioReceptorUsuario", foreignKey: "usuarioReceptor"});
  Usuario.hasMany(FriendRequest, { as: "usuarioReceptorFriendRequests", foreignKey: "usuarioReceptor"});
  RespuestaPreguntaDiarium.belongsTo(Usuario, { as: "idUsuarioUsuario", foreignKey: "idUsuario"});
  Usuario.hasMany(RespuestaPreguntaDiarium, { as: "respuestaPreguntaDiaria", foreignKey: "idUsuario"});
  UsuarioLikeColeccion.belongsTo(Usuario, { as: "idUsuarioUsuario", foreignKey: "idUsuario"});
  Usuario.hasMany(UsuarioLikeColeccion, { as: "usuarioLikeColeccions", foreignKey: "idUsuario"});
  UsuarioLikeComentario.belongsTo(Usuario, { as: "idUsuarioUsuario", foreignKey: "idUsuario"});
  Usuario.hasMany(UsuarioLikeComentario, { as: "usuarioLikeComentarios", foreignKey: "idUsuario"});
  UsuarioLikeVideojuego.belongsTo(Usuario, { as: "idUsuarioUsuario", foreignKey: "idUsuario"});
  Usuario.hasMany(UsuarioLikeVideojuego, { as: "usuarioLikeVideojuegos", foreignKey: "idUsuario"});
  AsignacionesGeneroVideojuego.belongsTo(Videojuego, { as: "idVideojuegoVideojuego", foreignKey: "idVideojuego"});
  Videojuego.hasMany(AsignacionesGeneroVideojuego, { as: "asignacionesGeneroVideojuegos", foreignKey: "idVideojuego"});
  ComentarioVideojuego.belongsTo(Videojuego, { as: "idVideojuegoVideojuego", foreignKey: "idVideojuego"});
  Videojuego.hasMany(ComentarioVideojuego, { as: "comentarioVideojuegos", foreignKey: "idVideojuego"});
  UsuarioLikeVideojuego.belongsTo(Videojuego, { as: "idVideojuegoVideojuego", foreignKey: "idVideojuego"});
  Videojuego.hasMany(UsuarioLikeVideojuego, { as: "usuarioLikeVideojuegos", foreignKey: "idVideojuego"});
  VideojuegoColeccion.belongsTo(Videojuego, { as: "idVideojuegoVideojuego", foreignKey: "idVideojuego"});
  Videojuego.hasMany(VideojuegoColeccion, { as: "videojuegoColeccions", foreignKey: "idVideojuego"});

  return {
    Amistade,
    AsignacionesGeneroVideojuego,
    Coleccion,
    ColeccionUsuario,
    ComentarioColeccion,
    ComentarioVideojuego,
    FriendRequest,
    Genero,
    PreguntaDiarium,
    RespuestaPreguntaDiarium,
    Usuario,
    UsuarioLikeColeccion,
    UsuarioLikeComentario,
    UsuarioLikeVideojuego,
    Videojuego,
    VideojuegoColeccion,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
