const express = require("express");

const router = express.Router();

const {
  criarInsumo,
  listarInsumos,
  deletarInsumo
} = require("../../controllers/insumoController");

const authMiddleware = require("../../middlewares/authMiddleware")

router.post("/", authMiddleware, criarInsumo )
router.get("/", authMiddleware, listarInsumos)
router.delete("/:id", authMiddleware, deletarInsumo)

module.exports = router;
