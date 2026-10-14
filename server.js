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

const talhaoRoutes = require("./src/config/routes/talhaoRoutes")

app.use("/auth", authRoutes);
app.use("/talhoes", talhaoRoutes)

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
