
const Talhao = require("../../models/Talhao");

async function criarTalhao(req, res) {
  try {
    const {
      _id,
      projetoTalhao,
      numeroTalhao,
      areaTalhao,
      status,
      dataCriacao,
    } = req.body;

    if (
      !_id ||
      !projetoTalhao ||
      numeroTalhao === undefined ||
      numeroTalhao === null ||
      areaTalhao === undefined ||
      areaTalhao === null ||
      !dataCriacao
    ) {
      return res.status(400).json({
        message: "Preencha todos os campos obrigatórios.",
      });
    }

    const area = Number(areaTalhao);

    if (!Number.isFinite(area) || area <= 0) {
      return res.status(400).json({
        message: "A área deve ser um número maior que zero.",
      });
    }

    const talhao = await Talhao.create({
      _id,
      projetoTalhao,
      numeroTalhao: String(numeroTalhao),
      areaTalhao: area,
      status: status || "Em andamento",
      dataCriacao,
      usuarioId: req.usuario.id,
    });

    return res.status(201).json({
      message: "Talhão cadastrado com sucesso!",
      talhao,
    });
  } catch (error) {
    console.error("Erro ao cadastrar talhão:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "Esse identificador de talhão já existe.",
      });
    }

    return res.status(500).json({
      message: "Erro interno ao cadastrar talhão.",
    });
  }
}

async function listarTalhoes(req, res) {
  try {
    const talhoes = await Talhao.findAll({
      where: {
        usuarioId: req.usuario.id,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ talhoes });
  } catch (error) {
    console.error("Erro ao listar talhões:", error);

    return res.status(500).json({
      message: "Erro interno ao listar talhões.",
    });
  }
}

module.exports = {
  criarTalhao,
  listarTalhoes,
};
