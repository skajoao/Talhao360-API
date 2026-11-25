const Talhao = require("../../models/Talhao");
const Producao = require("../../models/Producao");
const Aplicacao = require("../../models/Aplicacao");

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

    const talhaoExistente = await Talhao.findOne({
      where: {
        _id,
        usuarioId: req.usuario.id,
      },
    });

    if (talhaoExistente) {
      await talhaoExistente.update({
        projetoTalhao,
        numeroTalhao: String(numeroTalhao),
        areaTalhao: area,
        status: status || "Em andamento",
        dataCriacao,
      });

      return res.status(200).json({
        message: "Talhão atualizado com sucesso.",
        talhao: talhaoExistente,
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

async function delTalhao(req, res) {
  const transaction = await Talhao.sequelize.transaction();

  try {
    const { id } = req.params;

    const talhao = await Talhao.findOne({
      where: {
        _id: id,
        usuarioId: req.usuario.id,
      },
      transaction,
    });

    if (!talhao) {
      await transaction.rollback();

      return res.status(404).json({
        message: "Talhão não encontrado",
      });
    }

    await Aplicacao.destroy({
      where: {
        talhaoId: id,
        usuarioId: req.usuario.id,
      },
      transaction,
    });

    await Producao.destroy({
      where: {
        talhaoId: id,
        usuarioId: req.usuario.id,
      },
      transaction,
    });

    await talhao.destroy({ transaction });

    await transaction.commit();

    return res.status(200).json({
      message: "Talhão e registros relacionados excluídos com sucesso",
    });
  } catch (error) {
    await transaction.rollback();

    console.error("Erro ao excluir talhão:", error);

    return res.status(500).json({
      message: "Erro ao excluir talhão.",
    });
  }
}

module.exports = {
  criarTalhao,
  listarTalhoes,
  delTalhao,
};
