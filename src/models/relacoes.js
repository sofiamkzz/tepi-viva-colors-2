const Usuario = require('./usuario');
const Produto = require('./produto');
const Carrinho = require('./carrinho');
const ItemCarrinho = require('./itemCarrinho');
const Categoria = require('./categoria');
const Pedido = require('./pedido');
const Favorito = require('./favorito');

Usuario.hasMany(Carrinho, { foreignKey: 'usuarioId' });
Usuario.hasMany(Pedido, { foreignKey: 'usuarioId' });
Usuario.hasMany(Favorito, { foreignKey: 'usuarioId' });
Usuario.belongsToMany(Produto, { through: 'UsuarioProdutos' });

Produto.hasMany(ItemCarrinho, { foreignKey: 'produtoId' });
Produto.belongsTo(Categoria, { foreignKey: 'categoriaId' });
Produto.hasMany(Favorito, { foreignKey: 'produtoId' });
Produto.belongsToMany(Usuario, { through: 'UsuarioProdutos' });

Categoria.hasMany(Produto, { foreignKey: 'categoriaId' });

Carrinho.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Carrinho.hasMany(ItemCarrinho, { foreignKey: 'carrinhoId' });

ItemCarrinho.belongsTo(Carrinho, { foreignKey: 'carrinhoId' });
ItemCarrinho.belongsTo(Produto, { foreignKey: 'produtoId' });
ItemCarrinho.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Pedido.belongsTo(Carrinho, { foreignKey: 'carrinhoId' });

Favorito.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Favorito.belongsTo(Produto, { foreignKey: 'produtoId' });