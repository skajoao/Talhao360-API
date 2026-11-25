const { DataTypes } = require("sequelize");
const sequelize = require("../src/config/database");

const Insumo = sequelize.define("Insumo", {
  _id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },

  nomeIns: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  tipoIns: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  recomendIns: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },

  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Insumo;
