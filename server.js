const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./src/config/database");

const app = express();

app.use(cors());
app.use(express.json());

////////////////////////////////////////////////////////////////////

const Usuario = require("./models/Usuario");

const authRoutes = require("./src/config/routes/auth/authRoutes");

const talhaoRoutes = require("./src/config/routes/talhaoRoutes");

const insumoRoutes = require("./src/config/routes/insumoRoutes");

const producaoRoutes = require("./src/config/routes/producaoRoutes");

const aplicacaoRoutes = require("./src/config/routes/aplicacaoRoutes");

app.use("/auth", authRoutes);
app.use("/talhoes", talhaoRoutes);
app.use("/insumos", insumoRoutes);
app.use("/producoes", producaoRoutes);
app.use("/aplicacoes", aplicacaoRoutes);

////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.json({ message: "api funcionando" });
});

async function startServer() {
  try {
    await sequelize.authenticate();

    require("./models/associations");

    await sequelize.sync();

    console.log("MySQL conectado com sucesso!");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao conectar ao MySQL:", error);
  }
}

startServer();
