const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Videojuego', {
    idVideojuego: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id_videojuego'
    },
    rawgId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "rawg_id",
      field: 'rawg_id'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    backgroundImage: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'background_image'
    },
    fechaLanzamiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'fecha_lanzamiento'
    },
    metacriticRating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'metacritic_rating'
    }
  }, {
    sequelize,
    tableName: 'videojuego',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_videojuego" },
        ]
      },
      {
        name: "rawg_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "rawg_id" },
        ]
      },
    ]
  });
};
