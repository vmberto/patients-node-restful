const db = require("../models/index.js");

const HealthInsurancesSerivce = {

    getAllHealthInsurances() {
        return db.HealthInsurance.findAll({ include: [{ model: db.Patients }] });
    },

    getHealthInsurancePatientsRelation() {
        return db.HealthInsurance.findAll({
            attributes: ['name'], include: [
                {
                    model: db.Patients,
                    attributes: ['id'],
                }
            ],
        });
    },
    
    createHealthInsurance(params) {

        return db.HealthInsurance.create(
            {
                id: null,
                name: params.name,
            });
    },
    
    deleteHealthInsurance(id) {

        return db.HealthInsurance.destroy({
            where: { id }
        });

    }

}

module.exports = HealthInsurancesSerivce;