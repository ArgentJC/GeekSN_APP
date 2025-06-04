const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ComentarioColeccion', {
    idComentarioColeccion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id_comentario_coleccion'
    },
    idColeccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'coleccion',
        key: 'id_coleccion'
      },
      field: 'id_coleccion'
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
    valoracionColeccion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'valoracion_coleccion'
    }
  }, {
    sequelize,
    tableName: 'comentario_coleccion',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_comentario_coleccion" },
        ]
      },
      {
        name: "id_coleccion",
        using: "BTREE",
        fields: [
          { name: "id_coleccion" },
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
