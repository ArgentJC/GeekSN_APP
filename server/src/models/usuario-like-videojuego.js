const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UsuarioLikeVideojuego', {
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
    idVideojuego: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'videojuego',
        key: 'id_videojuego'
      },
      field: 'id_videojuego'
    }
  }, {
    sequelize,
    tableName: 'usuario_like_videojuego',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
          { name: "id_videojuego" },
        ]
      },
      {
        name: "id_videojuego",
        using: "BTREE",
        fields: [
          { name: "id_videojuego" },
        ]
      },
    ]
  });
};
