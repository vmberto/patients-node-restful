const Router = require('express');
const patientsController = require('../controllers/patients.controller');
const patientsRouter = Router();

patientsRouter.get('/', patientsController.getPatientsList);

patientsRouter.post('/', patientsController.postCreatePatient);

patientsRouter.get('/counter', patientsController.getPatientsTotalCount);

patientsRouter.get('/:id', patientsController.getOnePatient);

patientsRouter.put('/:id/edit', patientsController.postEditPatient);

patientsRouter.delete('/:id/delete', patientsController.deletePatient);

module.exports = patientsRouter;