const { DataTypes } = require("sequelize");
const sequelize = require("../src/config/database");

const Talhao = sequelize.define("Talhao", {
  _id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  projetoTalhao: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  numeroTalhao: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  areaTalhao: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Em andamento",
  },

  dataCriacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Talhao;
