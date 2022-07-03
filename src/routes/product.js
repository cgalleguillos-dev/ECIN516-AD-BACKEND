const { Router } = require('express');
const router = Router();

const ProductController = require('../controllers/product.controller');

router.get('/products/', ProductController.getProducts);
router.get('/products/:id', ProductController.getProduct);
module.exports = router;