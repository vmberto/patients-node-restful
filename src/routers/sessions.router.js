const Router = require('express');
const sessionsController = require('../controllers/sessions.controller');
const sessionsRules = require('../rules/sessions.rules');
const sessionsRouter = Router();

sessionsRouter.get('/statistics', sessionsController.getSessionsStatistics);

sessionsRouter.post('/download', sessionsRules['forEvolutionDownload'], sessionsController.downloadPatientEvolution);

sessionsRouter.post('/:id', sessionsController.postCreatePatientSession);

module.exports = sessionsRouter;
