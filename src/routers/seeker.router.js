const Router = require('express');
const seekerController = require('../controllers/seeker.controller');
const seekerRouter = Router();

seekerRouter.get('/cep/:cep', seekerController.getCep);

module.exports = seekerRouter;