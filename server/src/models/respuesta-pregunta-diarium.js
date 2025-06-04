const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RespuestaPreguntaDiarium', {
    idRespuesta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id_respuesta'
    },
    idPregunta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pregunta_diaria',
        key: 'id_pregunta'
      },
      field: 'id_pregunta'
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
    respuesta: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'respuesta_pregunta_diaria',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_respuesta" },
        ]
      },
      {
        name: "id_pregunta",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_pregunta" },
          { name: "id_usuario" },
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
