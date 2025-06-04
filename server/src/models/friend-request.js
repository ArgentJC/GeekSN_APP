const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FriendRequest', {
    idFriendRequest: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id_friend_request'
    },
    usuarioEmisor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      },
      field: 'usuario_emisor'
    },
    usuarioReceptor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      },
      field: 'usuario_receptor'
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "pending"
    }
  }, {
    sequelize,
    tableName: 'friend_request',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_friend_request" },
        ]
      },
      {
        name: "usuario_emisor",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "usuario_emisor" },
          { name: "usuario_receptor" },
        ]
      },
      {
        name: "usuario_receptor",
        using: "BTREE",
        fields: [
          { name: "usuario_receptor" },
        ]
      },
    ]
  });
};
