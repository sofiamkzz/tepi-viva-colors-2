const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,  
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Email inválido'
      }
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6],
        msg: 'A senha deve ter pelo menos 6 caracteres'
      }
    }
  },
  numeroTelefone: {
    type: DataTypes.STRING,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logradouro: {
    type: DataTypes.STRING,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bairro: {
    type: DataTypes.STRING,
  },
  complemento: {
    type: DataTypes.STRING,
  },
  tipoConta: {
    type: DataTypes.ENUM('usuario', 'admin'),
    defaultValue: 'usuario',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  hooks: {
    beforeCreate: async (usuario) => {
      if (usuario.senha) {
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
      }
    },
    beforeUpdate: async (usuario) => {
      if (usuario.senha) {
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
      }
    }
  },
});

Usuario.prototype.verificarSenha = async function (senha) {
  return await bcrypt.compare(senha, this.senha);
};

module.exports = Usuario;