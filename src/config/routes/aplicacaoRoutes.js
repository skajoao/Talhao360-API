const express = require("express");

const router = express.Router();

const {
  criarAplicacao,
  listarAplicacoes,
  deletarAplicacao,
} = require("../../controllers/aplicacaoController");

const authMiddleware = require("../../middlewares/authMiddleware");

router.post("/", authMiddleware, criarAplicacao);

router.get("/:talhaoId", authMiddleware, listarAplicacoes);

router.delete("/:id", authMiddleware, deletarAplicacao);

module.exports = router;
