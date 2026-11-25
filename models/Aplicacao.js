
const { DataTypes } = require("sequelize");
const sequelize = require("../src/config/database");

const Aplicacao = sequelize.define("Aplicacao", {
  _id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },

  talhaoId: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  producaoId: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  insumoId: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  quantidade: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  dataAplicacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Aplicacao;
