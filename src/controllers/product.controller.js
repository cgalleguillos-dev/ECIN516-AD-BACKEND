const { Product } = require('../models/product.model');


exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json(err);
    }
}

exports.createProduct = async (req, res) => {
    try {
        const newProd = await Product.create(req.body);
        return res.status(201).json({product: newProd});
    } catch (err) {
        return res.status(500).json(err);
    }
}

exports.indexProduct = async (req, res) => {
    try {
        const pagination = { page: req.query.page || 1, limit: req.query.limit || 10 };
        const product = await Product.paginate({}, pagination);
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json(err);
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({_id: req.params.id});
        if (!product)
            return res.status(404).json({error: 'Product not found'});
        return res.status(200).json(product);

    } catch (err) {
        return res.status(500).json(err);
    }
}

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({_id: req.params.id});
        if (!product)
            return res.status(404).json({error: 'Product not found'});
        return res.send(product);
    } catch (err) {
        return res.status(500).json(err);
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const body= Object.assign({}, req.body);
        const product = await Product.findOneAndUpdate({_id: req.params}, body);
        if (!product)
            return res.status(404).json({error: 'Product not found'});
        return res.status(200).json(product);

    } catch (err) {
        return res.status(500).json(err);
    }
}