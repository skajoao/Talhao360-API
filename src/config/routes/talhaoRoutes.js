const express = require("express");

const {
  criarTalhao,
  listarTalhoes,
  delTalhao,
} = require("../../controllers/talhaoController");

const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, criarTalhao);
router.get("/", authMiddleware, listarTalhoes);
router.delete("/:id", authMiddleware, delTalhao);

module.exports = router;