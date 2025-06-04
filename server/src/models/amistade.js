const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Amistade', {
    idAmistad: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id_amistad'
    },
    usuario1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      },
      field: 'usuario1_id'
    },
    usuario2Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      },
      field: 'usuario2_id'
    }
  }, {
    sequelize,
    tableName: 'amistades',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_amistad" },
        ]
      },
      {
        name: "usuario1_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "usuario1_id" },
          { name: "usuario2_id" },
        ]
      },
      {
        name: "usuario2_id",
        using: "BTREE",
        fields: [
          { name: "usuario2_id" },
        ]
      },
    ]
  });
};
