const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Usuario', {
    idUsuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id_usuario'
    },
    correo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "correo"
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellido1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    apellido2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    nombreUsuario: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "nombre_usuario",
      field: 'nombre_usuario'
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    photoUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'photo_url'
    }
  }, {
    sequelize,
    tableName: 'usuario',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
      {
        name: "correo",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "correo" },
        ]
      },
      {
        name: "nombre_usuario",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nombre_usuario" },
        ]
      },
    ]
  });
};
