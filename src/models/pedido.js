const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.ENUM('pendente', 'concluído', 'enviado', 'cancelado'),
    defaultValue: 'pendente',
  },
  valorTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  metodoPagamento: {
    type: DataTypes.STRING,
  },
  endereco: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
});

module.exports = Pedido;