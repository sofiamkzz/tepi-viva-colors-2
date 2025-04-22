const Favorite = require('../models/favorito');
const User = require('../models/usuario');
const Product = require('../models/produto');

const addFavorite = async (req, res) => {
    const { productId } = req.body;  
    const userId = req.session.userId; 

    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    try {
        const user = await User.findByPk(userId);
        const product = await Product.findByPk(productId);

        if (!user || !product) {
            return res.status(404).json({ message: 'Usuário ou produto não encontrado' });
        }

        const isFavorite = await user.hasProduct(product);
        if (isFavorite) {
            return res.status(400).json({ message: 'Produto já está nos seus favoritos' });
        }

        await user.addProduct(product);
        res.status(201).json({ message: 'Produto adicionado aos favoritos com sucesso!' });
    } catch (error) {
        console.error('Erro ao adicionar favorito:', error);
        res.status(500).json({ message: 'Erro ao adicionar produto aos favoritos' });
    }
};

const removeFavorite = async (req, res) => {
    const { productId } = req.params;
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    try {
        const user = await User.findByPk(userId);
        const product = await Product.findByPk(productId);

        if (!user || !product) {
            return res.status(404).json({ message: 'Usuário ou produto não encontrado' });
        }

        const isFavorite = await user.hasProduct(product); 
        if (!isFavorite) {
            return res.status(400).json({ message: 'Produto não está nos seus favoritos' });
        }

        await user.removeProduct(product); 
        res.status(200).json({ message: 'Produto removido dos favoritos!' });
    } catch (error) {
        console.error('Erro ao remover favorito:', error);
        res.status(500).json({ message: 'Erro ao remover produto dos favoritos' });
    }
};

const getFavorites = async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    try {
        const user = await User.findByPk(userId, {
            include: {
                model: Product,
                attributes: ['id', 'name', 'price', 'imageUrl'], 
                through: { attributes: [] }
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json({ favoritos: user.Products });
    } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
        res.status(500).json({ message: 'Erro ao carregar produtos favoritos' });
    }
};

module.exports = {
    addFavorite,
    removeFavorite,
    getFavorites
};