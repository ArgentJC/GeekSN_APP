const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UsuarioLikeComentario', {
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      },
      field: 'id_usuario'
    },
    idComentario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'comentario_videojuego',
        key: 'id_comentario_videojuego'
      },
      field: 'id_comentario'
    }
  }, {
    sequelize,
    tableName: 'usuario_like_comentario',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
          { name: "id_comentario" },
        ]
      },
      {
        name: "id_comentario",
        using: "BTREE",
        fields: [
          { name: "id_comentario" },
        ]
      },
    ]
  });
};
