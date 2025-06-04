const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VideojuegoColeccion', {
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
    idColeccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'coleccion',
        key: 'id_coleccion'
      },
      field: 'id_coleccion'
    },
    addedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
      field: 'added_at'
    }
  }, {
    sequelize,
    tableName: 'videojuego_coleccion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_videojuego" },
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
