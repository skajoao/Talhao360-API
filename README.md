# 🌱 Talhão360 API

API REST desenvolvida para o **Talhão360**, aplicativo mobile de gerenciamento de talhões e operações agrícolas.

O backend é responsável pelo gerenciamento de usuários, talhões, insumos, aplicações e produções, oferecendo autenticação e sincronização de dados com o aplicativo.

## 🚀 Funcionalidades

- 🔐 Cadastro e autenticação de usuários
- 🔑 Autenticação utilizando JWT
- 🔒 Criptografia de senhas com Bcrypt
- 🌱 Cadastro e gerenciamento de talhões
- 🧪 Gerenciamento de insumos
- 🚁 Registro de aplicações agrícolas
- 📊 Gerenciamento de produções
- 🔄 Sincronização de dados com o aplicativo
- 👤 Controle de acesso e isolamento de dados por usuário

## 🛠️ Tecnologias utilizadas

- Node.js
- Express
- MySQL
- Sequelize
- JSON Web Token (JWT)
- Bcrypt

## 🏗️ Estrutura do projeto

```text
Talhao360-API/
│
├── config/
│   └── config.json
│
├── models/
│   ├── Aplicacao.js
│   ├── associations.js
│   ├── index.js
│   ├── Insumo.js
│   ├── Producao.js
│   ├── Talhao.js
│   └── Usuario.js
│
├── seeders/
│
├── src/
│   ├── config/
│   │   ├── routes/
│   │   │   └── auth/
│   │   ├── aplicacaoRoutes.js
│   │   ├── insumoRoutes.js
│   │   ├── producaoRoutes.js
│   │   └── talhaoRoutes.js
│   │
│   ├── controllers/
│   │   ├── aplicacaoController.js
│   │   ├── authController.js
│   │   ├── insumoController.js
│   │   ├── producaoController.js
│   │   └── talhaoController.js
│   │
│   ├── middlewares/
│   │   └── authMiddleware.js
│   │
│   └── database.js
│
├── postman/
│
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

## 🗄️ Banco de dados

O projeto utiliza MySQL com Sequelize como ORM para gerenciamento das entidades e relacionamentos.

Principais entidades:

- Usuários
- Talhões
- Insumos
- Aplicações
- Produções

## 🔐 Autenticação e segurança

A API utiliza JWT para autenticação dos usuários e Bcrypt para proteção das senhas.

As rotas protegidas exigem um token de autenticação enviado no cabeçalho:

```http
Authorization: Bearer SEU_TOKEN
```

## 📶 Integração com o aplicativo

O backend trabalha em conjunto com o aplicativo Talhão360, desenvolvido em React Native e Expo.

A comunicação acontece por meio de uma API REST, permitindo o envio, recebimento e sincronização de informações entre o dispositivo móvel e o banco de dados MySQL.

## ⚙️ Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/Talhao360-API.git
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` seguindo o modelo `.env.example`.

### 4. Execute o servidor

Utilize o script configurado no `package.json`.

## 👨‍💻 Desenvolvedor

**João Vitor Gonçalves**

Projeto desenvolvido para fins de aprendizado e desenvolvimento profissional.