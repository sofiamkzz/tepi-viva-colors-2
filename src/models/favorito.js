const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Favorito = sequelize.define('Favorito', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['usuarioId', 'produtoId'],
    }
  ]
});

module.exports = Favorito;