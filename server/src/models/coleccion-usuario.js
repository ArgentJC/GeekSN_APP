const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ColeccionUsuario', {
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
    idColeccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'coleccion',
        key: 'id_coleccion'
      },
      field: 'id_coleccion'
    }
  }, {
    sequelize,
    tableName: 'coleccion_usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
          { name: "id_coleccion" },
        ]
      },
      {
        name: "id_coleccion",
        using: "BTREE",
        fields: [
          { name: "id_coleccion" },
        ]
      },
    ]
  });
};
