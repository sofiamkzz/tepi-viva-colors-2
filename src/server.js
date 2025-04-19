require('dotenv').config({ path: __dirname + '/../.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');  // Importando corretamente aqui

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Rotas
app.use('/users', userRoutes);  // Definindo as rotas corretamente

// Conexão com o banco
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com MySQL foi um sucesso 🚀');
  })
  .catch((err) => {
    console.error('Erro ao conectar com MySQL:', err);
    process.exit(1);
  });

sequelize.sync({ force: false }).then(() => {
  console.log('Banco sincronizado');
  app.listen(8080, () => {
    console.log('Servidor rodando em http://localhost:8080');
  });
});