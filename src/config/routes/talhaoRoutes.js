
const express = require("express");

const {
  criarTalhao,
  listarTalhoes,
} = require("../../controllers/talhaoController");

const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, criarTalhao);
router.get("/", authMiddleware, listarTalhoes);

module.exports = router;
