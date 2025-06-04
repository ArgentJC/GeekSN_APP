const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AsignacionesGeneroVideojuego', {
    idVideojuego: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'videojuego',
        key: 'id_videojuego'
      },
      field: 'id_videojuego'
    },
    idGenero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'genero',
        key: 'id_genero'
      },
      field: 'id_genero'
    }
  }, {
    sequelize,
    tableName: 'asignaciones_genero_videojuego',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_videojuego" },
          { name: "id_genero" },
        ]
      },
      {
        name: "id_genero",
        using: "BTREE",
        fields: [
          { name: "id_genero" },
        ]
      },
    ]
  });
};
