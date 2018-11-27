const express = require('express');
const router = express.Router();
const HealthInsuranceController = require('../controllers/health-insurance.controller');
const healthInsuranceRouter = router;

healthInsuranceRouter.get('/', HealthInsuranceController.getAllHealthInsurances)

healthInsuranceRouter.get('/patients', HealthInsuranceController.getHealthInsurancePatientsRelation)

healthInsuranceRouter.post('/', HealthInsuranceController.postCreateHealthInsurance);

healthInsuranceRouter.delete('/:id/delete', HealthInsuranceController.deleteHealthInsurance);


module.exports = healthInsuranceRouter;