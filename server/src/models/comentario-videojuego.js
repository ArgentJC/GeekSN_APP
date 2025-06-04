const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ComentarioVideojuego', {
    idComentarioVideojuego: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id_comentario_videojuego'
    },
    idVideojuego: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'videojuego',
        key: 'id_videojuego'
      },
      field: 'id_videojuego'
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      },
      field: 'id_usuario'
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cantidadLikes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      field: 'cantidad_likes'
    },
    cantidadDislikes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      field: 'cantidad_dislikes'
    },
    valoracionVideojuego: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'valoracion_videojuego'
    }
  }, {
    sequelize,
    tableName: 'comentario_videojuego',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_comentario_videojuego" },
        ]
      },
      {
        name: "id_videojuego",
        using: "BTREE",
        fields: [
          { name: "id_videojuego" },
        ]
      },
      {
        name: "id_usuario",
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  });
};
