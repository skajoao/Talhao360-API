const Aplicacao = require("../../models/Aplicacao");
const Talhao = require("../../models/Talhao");
const Producao = require("../../models/Producao");
const Insumo = require("../../models/Insumo");

async function criarAplicacao(req, res) {
  try {
    const { _id, talhaoId, producaoId, insumoId, quantidade, dataAplicacao } =
      req.body;

    // Validar campos obrigatórios
    if (!_id || !talhaoId || !insumoId || !dataAplicacao) {
      return res.status(400).json({
        message: "Preencha todos os campos obrigatórios.",
      });
    }

    // Validar quantidade
    const quantidadeAplicada = Number(quantidade);

    if (!Number.isFinite(quantidadeAplicada) || quantidadeAplicada <= 0) {
      return res.status(400).json({
        message: "A quantidade deve ser um número válido e maior que zero.",
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

    // Verificar se o insumo pertence ao usuário
    const insumo = await Insumo.findOne({
      where: {
        _id: insumoId,
        usuarioId: req.usuario.id,
      },
    });

    if (!insumo) {
      return res.status(404).json({
        message: "Insumo não encontrado.",
      });
    }

    // Verificar produção, quando informada
    if (producaoId) {
      const producao = await Producao.findOne({
        where: {
          _id: producaoId,
          talhaoId,
          usuarioId: req.usuario.id,
        },
      });

      if (!producao) {
        return res.status(404).json({
          message: "Produção não encontrada.",
        });
      }
    }

    // Verificar se a aplicação já existe
    const aplicacaoExistente = await Aplicacao.findOne({
      where: {
        _id,
        usuarioId: req.usuario.id,
      },
    });

    if (aplicacaoExistente) {
      return res.status(200).json({
        message: "Aplicação já cadastrada.",
        aplicacao: aplicacaoExistente,
      });
    }

    // Cadastrar aplicação
    const aplicacao = await Aplicacao.create({
      _id,
      talhaoId,
      producaoId: producaoId || null,
      insumoId,
      quantidade: quantidadeAplicada,
      dataAplicacao,
      usuarioId: req.usuario.id,
    });

    return res.status(201).json({
      message: "Aplicação cadastrada com sucesso!",
      aplicacao,
    });
  } catch (error) {
    console.error("Erro ao cadastrar aplicação:", error);

    return res.status(500).json({
      message: "Erro interno ao cadastrar aplicação.",
    });
  }
}

async function listarAplicacoes(req, res) {
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

    // Buscar aplicações do talhão
    const aplicacoes = await Aplicacao.findAll({
      where: {
        talhaoId,
        usuarioId: req.usuario.id,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ aplicacoes });
  } catch (error) {
    console.error("Erro ao listar aplicações:", error);

    return res.status(500).json({
      message: "Erro interno ao listar aplicações.",
    });
  }
}

async function deletarAplicacao(req, res) {
  try {
    const { id } = req.params;

    // Buscar aplicação pertencente ao usuário
    const aplicacao = await Aplicacao.findOne({
      where: {
        _id: id,
        usuarioId: req.usuario.id,
      },
    });

    if (!aplicacao) {
      return res.status(404).json({
        message: "Aplicação não encontrada.",
      });
    }

    // Excluir aplicação
    await aplicacao.destroy();

    return res.status(200).json({
      message: "Aplicação excluída com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao excluir aplicação:", error);

    return res.status(500).json({
      message: "Erro interno ao excluir aplicação.",
    });
  }
}

module.exports = {
  criarAplicacao,
  listarAplicacoes,
  deletarAplicacao
};
