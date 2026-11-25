
const express = require("express");

const router = express.Router();

const {
  criarProducao,
  listarProducoes,
} = require("../../controllers/producaoController");

const authMiddleware = require("../../middlewares/authMiddleware");

router.post("/", authMiddleware, criarProducao);

router.get("/:talhaoId", authMiddleware, listarProducoes);

module.exports = router;
