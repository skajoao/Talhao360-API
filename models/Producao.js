
const { DataTypes } = require("sequelize");
const sequelize = require("../src/config/database");

const Producao = sequelize.define("Producao", {
  _id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },

  talhaoId: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  areaProduzida: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  dataProducao: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Producao;
