require('dotenv').config({ path: __dirname + '/../.env' });

const sequelize = require('./config/database');
require('./models/usuario');
require('./models/produto');
require('./models/categoria');
require('./models/carrinho');
require('./models/itemCarrinho');
require('./models/favorito');
require('./models/pedido');
require('./models/relacoes');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');


const authRoutes = require('./routes/authRoutes');
const carrinhoRoutes = require('./routes/carrinhoRoutes');
const favoritosRoutes = require('./routes/favoritosRoutes');
const userRoutes = require('./routes/userRoutes');
const produtosRoutes = require('./routes/produtosRoutes')

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false, cookie: { secure: false }}));

app.use('/users', userRoutes);;
app.use('/carrinho', carrinhoRoutes);
app.use('/auth', authRoutes);
app.use('/favoritos', favoritosRoutes);
app.use('/api/', produtosRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com MySQL foi um sucesso 🚀');
  })
  .catch((err) => {
    console.error('Erro ao conectar com MySQL:', err);
    process.exit(1);
  });

sequelize.sync({ force: false })
  .then(() => {
    console.log('Banco sincronizado');
    app.listen(8080, () => {
      console.log('Servidor rodando em http://localhost:8080');
    });
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco:', err);
  });