const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Genero', {
    idGenero: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id_genero'
    },
    rawgGenreId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: "rawg_genre_id",
      field: 'rawg_genre_id'
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'genero',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_genero" },
        ]
      },
      {
        name: "rawg_genre_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "rawg_genre_id" },
        ]
      },
    ]
  });
};
