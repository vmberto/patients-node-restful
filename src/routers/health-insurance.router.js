const express = require('express');
const healthInsurancesService = require('../services/health-insurance.service');
const router = express.Router();

const healthInsuranceRouter = router;

healthInsuranceRouter.get('/api/health-insurances', getAllHealthInsurances)
async function getAllHealthInsurances(req, res) {

    try {

        let healthInsurances = await healthInsurancesService.getAllHealthInsurances();

        let responseBundle = { data: healthInsurances }

        res.status(200).send(responseBundle)

    } catch (err) {
        res.status(400).send(err)
    }
}

healthInsuranceRouter.get('/api/health-insurances/patients', getHealthInsurancePatientsRelation)
async function getHealthInsurancePatientsRelation(req, res) {

    try {

        let healthInsurances = await healthInsurancesService.getHealthInsurancePatientsRelation();

        let responseBundle = { data: healthInsurances }

        res.status(200).send(responseBundle)

    } catch (err) {
        res.status(400).send(err)
    }


}

healthInsuranceRouter.post('/api/health-insurances', postCreateHealthInsurance);
async function postCreateHealthInsurance(req, res) {
    try {
        let params = req.body;
        
        const newHealthInsurance = await healthInsurancesService.createHealthInsurance(params);

        res.status(200).json({data: newHealthInsurance});

    }catch (err){
        res.status(400).send(err);
    }
    
}

healthInsuranceRouter.delete('/api/health-insurances/:id/delete', deleteHealthInsurance);
async function deleteHealthInsurance(req, res) {
    try {
        let params = req.params;
        
        await healthInsurancesService.deleteHealthInsurance(params.id);

        res.status(200).json({deleted: `O plano de saúde ${params.id} foi excluído`});

    }catch (err){
        res.status(400).send(err);
    }
    
}

module.exports = healthInsuranceRouter;