const Router = require('express');
const sessionsController = require('../controllers/sessions.controller');
const sessionsRouter = Router();

sessionsRouter.get('/', sessionsController.getAllSessions);

sessionsRouter.get('/total-hours', sessionsController.getAllSessionsDuration);

sessionsRouter.post('/:id', sessionsController.postCreatePatientSession);

module.exports = sessionsRouter;
