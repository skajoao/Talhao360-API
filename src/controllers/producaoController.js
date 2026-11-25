const Producao = require("../../models/Producao");
const Talhao = require("../../models/Talhao");

async function criarProducao(req, res) {
  try {
    const { _id, talhaoId, areaProduzida, dataProducao } = req.body;

    // Validar campos obrigatórios
    if (!_id || !talhaoId || !dataProducao) {
      return res.status(400).json({
        message: "Preencha todos os campos obrigatórios.",
      });
    }

    // Validar área produzida
    const area = Number(areaProduzida);

    if (!Number.isFinite(area) || area <= 0) {
      return res.status(400).json({
        message: "A área produzida deve ser um número válido e maior que zero.",
      });
    }

    // Verificar se o talhão pertence ao usuário
    const talhao = await Talhao.findOne({
      where: {
        _id: talhaoId,
        usuarioId: req.usuario.id,
      },
    });

    if (!talhao) {
      return res.status(404).json({
        message: "Talhão não encontrado.",
      });
    }

    // Verificar se a produção já existe
    const producaoExistente = await Producao.findOne({
      where: {
        _id,
        usuarioId: req.usuario.id,
      },
    });

    if (producaoExistente) {
      return res.status(200).json({
        message: "Produção já cadastrada.",
        producao: producaoExistente,
      });
    }

    // Cadastrar produção
    const producao = await Producao.create({
      _id,
      talhaoId,
      areaProduzida: area,
      dataProducao,
      usuarioId: req.usuario.id,
    });

    return res.status(201).json({
      message: "Produção cadastrada com sucesso!",
      producao,
    });
  } catch (error) {
    console.error("Erro ao cadastrar produção:", error);

    return res.status(500).json({
      message: "Erro interno ao cadastrar produção.",
    });
  }
}

async function listarProducoes(req, res) {
  try {
    const { talhaoId } = req.params;

    // Verificar se o talhão pertence ao usuário
    const talhao = await Talhao.findOne({
      where: {
        _id: talhaoId,
        usuarioId: req.usuario.id,
      },
    });

    if (!talhao) {
      return res.status(404).json({
        message: "Talhão não encontrado.",
      });
    }

    // Buscar produções do talhão
    const producoes = await Producao.findAll({
      where: {
        talhaoId,
        usuarioId: req.usuario.id,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ producoes });
  } catch (error) {
    console.error("Erro ao listar produções:", error);

    return res.status(500).json({
      message: "Erro interno ao listar produções.",
    });
  }
}

module.exports = {
  criarProducao,
  listarProducoes
};
