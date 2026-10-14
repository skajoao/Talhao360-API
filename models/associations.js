
const Usuario = require("./Usuario");
const Talhao = require("./Talhao");

Usuario.hasMany(Talhao, {
  foreignKey: "usuarioId",
  as: "talhoes",
});

Talhao.belongsTo(Usuario, {
  foreignKey: "usuarioId",
  as: "usuario",
});

module.exports = {
  Usuario,
  Talhao,
};
