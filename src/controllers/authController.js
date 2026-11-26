const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usuario = require("../../models/Usuario");

async function register(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        message: "Nome, email e senha são obrigatórios.",
      });
    }

    const usuarioExistente = await Usuario.findOne({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(409).json({
        message: "Este email já está cadastrado.",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao criar usuário.",
    });
  }
}

//////////////////////////////////////////////////////////////////////

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        message: "Email e senha são obrigatórios.",
      });
    }

    const usuario = await Usuario.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(401).json({
        message: "Email ou senha são inválidos",
      });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({
        message: "Email ou senha são inválidos",
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      message: "Login efetuado com sucesso!",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erro interno ao realizar o login",
    });
  }
}

async function me(req, res) {
  const usuario = await Usuario.findByPk(req.usuario.id);

  return res.status(200).json({
    message: "Usuário autenticado!",
    usuario,
  });
}

module.exports = {
  register,
  login,
  me,
};
