const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PreguntaDiarium', {
    idPregunta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id_pregunta'
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: "fecha"
    },
    pregunta: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pregunta_diaria',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_pregunta" },
        ]
      },
      {
        name: "fecha",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "fecha" },
        ]
      },
    ]
  });
};
