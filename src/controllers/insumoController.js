const Insumo = require("../../models/Insumo");

async function criarInsumo(req, res) {
  try {
    const { _id, nomeIns, tipoIns, recomendIns } = req.body;

    if (!_id || !nomeIns) {
      return res.status(400).json({
        message: "O identificador e o nome do insumo são obrigatórios.",
      });
    }

    let recomendacao = null;

    if (recomendIns !== undefined && recomendIns !== null) {
      recomendacao = Number(recomendIns);

      if (!Number.isFinite(recomendacao) || recomendacao < 0) {
        return res.status(400).json({
          message: "A recomendação deve ser um número válido e não negativo.",
        });
      }
    }

    const insumoExistente = await Insumo.findOne({
      where: {
        _id,
        usuarioId: req.usuario.id,
      },
    });

    if (insumoExistente) {
      return res.status(200).json({
        message: "Insumo já cadastrado.",
        insumo: insumoExistente,
      });
    }

    const insumo = await Insumo.create({
      _id,
      nomeIns: nomeIns.trim(),
      tipoIns: tipoIns || null,
      recomendIns: recomendacao,
      usuarioId: req.usuario.id,
    });

    return res.status(201).json({
      message: "Insumo cadastrado com sucesso!",
      insumo,
    });
  } catch (error) {
    console.error("Erro ao cadastrar insumo:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "Esse identificador de insumo já existe.",
      });
    }

    return res.status(500).json({
      message: "Erro interno ao cadastrar insumo.",
    });
  }
}

async function listarInsumos(req, res) {
  try {
    const insumos = await Insumo.findAll({
      where: {
        usuarioId: req.usuario.id,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ insumos });
  } catch (error) {
    console.error("Erro ao listar insumos:", error);

    return res.status(500).json({
      message: "Erro interno ao listar insumos.",
    });
  }
}

async function deletarInsumo(req, res) {
  try {
    const { id } = req.params;

    const insumo = await Insumo.findOne({
      where: {
        _id: id,
        usuarioId: req.usuario.id,
      },
    });

    if (!insumo) {
      return res.status(404).json({
        message: "Insumo não encontrado.",
      });
    }

    await insumo.destroy();

    return res.status(200).json({
      message: "Insumo excluído com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao excluir insumo:", error);

    return res.status(500).json({
      message: "Erro interno ao excluir insumo.",
    });
  }
}

module.exports = {
  criarInsumo,
  listarInsumos,
  deletarInsumo
};
