const Router = require('express');
const sessionsController = require('../controllers/sessions.controller');
const sessionsRouter = Router();

sessionsRouter.get('/statistics', sessionsController.getSessionsStatistics);

sessionsRouter.post('/:id', sessionsController.postCreatePatientSession);

/** @TODO Ver se ficará melhor trocar o id do paciente de parametro da url para parametro do body */
sessionsRouter.post('/download/:id', sessionsController.downloadPatientEvolution);

module.exports = sessionsRouter;
