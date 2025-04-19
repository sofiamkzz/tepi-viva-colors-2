const Usuario = require('../models/user');
const bcrypt = require('bcrypt');

// Função para retornar todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Usuario.findAll();  // Supondo que você tenha o modelo 'Usuario' importado corretamente
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Função para criar um novo usuário
exports.createUser = async (req, res) => {
  console.log('DADOS RECEBIDOS DO FRONTEND:', req.body);
  try {
    const { nome, email, senha, cep, endereco, cidade, estado, bairro, complemento, numeroTelefone } = req.body;

    // Validação básica para garantir que os dados obrigatórios foram enviados
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
    }

    // Verificação se já existe um usuário com o mesmo email
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Já existe um usuário com esse email.' });
    }

    // Criptografando a senha
    const hash = await bcrypt.hash(senha, 10);

    // Criando o novo usuário no banco de dados
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: hash,
      cep,
      endereco,
      cidade,
      estado,
      bairro,
      complemento,
      numeroTelefone,
    });

    // Respondendo com o sucesso
    res.status(201).json({ message: 'Usuário criado com sucesso!', user: novoUsuario });

  } catch (err) {
    console.log('Erro ao cadastrar:', err);
    res.status(500).json({ error: 'Erro ao criar usuário, veja o log para mais detalhes.' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({ success: false, message: 'Senha incorreta' });
    }

    // Se quiser, pode gerar um token aqui

    return res.status(200).json({ success: true, message: 'Login bem-sucedido', user });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ success: false, message: 'Erro ao fazer login' });
  }
};


// Função para obter usuário por ID
exports.getUserById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Função para atualizar usuário
exports.updateUser = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    // Atualize o usuário com os dados recebidos
    await usuario.update(req.body);
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Função para deletar usuário
exports.deleteUser = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    await usuario.destroy();
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};