const Usuario = require('../models/usuario');

// Função para enviar respostas de erro
const sendError = (res, status, message) => {
    return res.status(status).json({ success: false, message });
};

// Login com sessão
exports.login = async (req, res) => {
    const { email, senha } = req.body;
    console.log('Email fornecido:', email);
    console.log('Senha fornecida:', senha);
  
    try {
      // Busca o usuário pelo email
      const user = await Usuario.findOne({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ success: false, message: 'Usuário não encontrado' });
      }
  
      console.log('Usuário encontrado:', user);
  
      // Verifica a senha usando o método verifyPassword
      const senhaValida = await user.verificarSenha(senha);
  
      console.log('Senha válida:', senhaValida);
  
      if (!senhaValida) {
        return res.status(401).json({ success: false, message: 'Senha incorreta' });
      }
  
      // Cria a sessão do usuário
      req.session.user = {
        id: user.id,
        nome: user.nome,
        email: user.email,
      };
  
      return res.status(200).json({
        success: true,
        message: 'Login bem-sucedido',
        user: req.session.user,
      });
  
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ success: false, message: 'Erro interno no servidor' });
    }
  };
  

// Verifica se usuário está logado
exports.getLoggedUser = (req, res) => {
    if (req.session.user) {
        return res.status(200).json({ success: true, user: req.session.user });
    } else {
        return sendError(res, 401, 'Usuário não está logado');
    }
};

// Logout (destruir a sessão)
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return sendError(res, 500, 'Erro ao sair da sessão');
        }
        res.clearCookie('connect.sid');
        return res.json({ message: 'Logout realizado com sucesso' });
    });
};