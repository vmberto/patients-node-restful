const Router = require('express')
const userRules = require('../rules/user.rules');
const UsersController = require('../controllers/users.controller');
const userRouter = Router()

userRouter.post('/register', userRules['forRegister'], UsersController.register);

userRouter.post('/login', userRules['forLogin'], UsersController.login);


module.exports = userRouter;