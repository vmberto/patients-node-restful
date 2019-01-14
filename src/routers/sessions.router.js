const Router = require('express');
const sessionsController = require('../controllers/sessions.controller');
const sessionsRouter = Router();

sessionsRouter.get('/', sessionsController.getAllSessions);

sessionsRouter.get('/statistics', sessionsController.getSessionsStatistics);

sessionsRouter.post('/:id', sessionsController.postCreatePatientSession);

module.exports = sessionsRouter;
