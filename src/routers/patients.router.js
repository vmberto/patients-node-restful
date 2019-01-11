const Router = require('express');
const patientsController = require('../controllers/patients.controller');
const sessionsController = require('../controllers/sessions.controller');
const patientsRouter = Router();

patientsRouter.get('/', patientsController.getPatientsList);

patientsRouter.post('/', patientsController.postCreatePatient);

patientsRouter.get('/counter', patientsController.getPatientsTotalCount);

patientsRouter.get('/all-sessions', sessionsController.getAllSessions);

patientsRouter.get('/session/total-hours', sessionsController.getAllSessionsDuration);

patientsRouter.get('/:id', patientsController.getOnePatient);

patientsRouter.put('/:id/edit', patientsController.postEditPatient);

patientsRouter.delete('/:id/delete', patientsController.deletePatient);

patientsRouter.post('/:id/create-session', sessionsController.postCreatePatientSession);



module.exports = patientsRouter;