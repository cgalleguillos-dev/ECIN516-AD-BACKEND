const { Router } = require('express');
const router = Router();

const UserController = require('../controllers/user.controller');

router.get('/users/', UserController.getUsers);
router.post('/register/', UserController.register)
router.post('/login/', UserController.login);
module.exports = router;