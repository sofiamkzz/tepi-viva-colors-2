const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database'); // Certifique-se de ter o arquivo de configuração do sequelize
const userRoutes = require('./routes/userRoutes'); // Importando as rotas
const userController = require('./controllers/userController')

const app = express();

// Configurações do bodyParser para receber dados JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/cadastro', userController.register);

// Sincronizando o banco de dados e inicializando o servidor
sequelize.sync({ force: false }).then(() => {
  console.log('Banco sincronizado');
  app.listen(8080, () => {
    console.log('Servidor rodando em http://localhost:3000');
  });
});