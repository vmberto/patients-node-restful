const Router = require('express');
const sessionsController = require('../controllers/sessions.controller');
const sessionsRouter = Router();

sessionsRouter.get('/statistics', sessionsController.getSessionsStatistics);

sessionsRouter.post('/:id', sessionsController.postCreatePatientSession);

module.exports = sessionsRouter;
