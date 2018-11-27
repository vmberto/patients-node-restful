
const healthInsurancesService = require('../services/health-insurance.service');

const HealthInsuranceController = {

    async getAllHealthInsurances(req, res) {

        try {
    
            let healthInsurances = await healthInsurancesService.getAllHealthInsurances();
    
            let responseBundle = { data: healthInsurances }
    
            res.status(200).send(responseBundle)
    
        } catch (err) {
            res.status(400).send(err)
        }
    },

    async getHealthInsurancePatientsRelation(req, res) {

        try {
    
            let healthInsurances = await healthInsurancesService.getHealthInsurancePatientsRelation();
    
            let responseBundle = { data: healthInsurances }
    
            res.status(200).send(responseBundle)
    
        } catch (err) {
            res.status(400).send(err)
        }
    
    
    },

    async postCreateHealthInsurance(req, res) {
        try {
            let params = req.body;
            
            const newHealthInsurance = await healthInsurancesService.createHealthInsurance(params);
    
            res.status(200).json({data: newHealthInsurance});
    
        }catch (err){
            res.status(400).send(err);
        }
        
    },
    
    async deleteHealthInsurance(req, res) {
        try {
            let params = req.params;
            
            await healthInsurancesService.deleteHealthInsurance(params.id);
    
            res.status(200).json({deleted: `O plano de saúde ${params.id} foi excluído`});
    
        }catch (err){
            res.status(400).send(err);
        }
        
    }




}

module.exports = HealthInsuranceController;