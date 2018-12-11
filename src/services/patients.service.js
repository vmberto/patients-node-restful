const listQueryBuilder = require('../helpers/querybuilders/list.querybuilder');
const db = require("../models/index.js");

const PatientsService = {

    getAllPatientsList(queryParams) {

        let queryBuilder = listQueryBuilder(queryParams);

        queryBuilder.include = [{ model: db.HealthInsurance }];

        if (queryParams.health_insurance) {
            queryBuilder.include[0].where = { id: queryParams.health_insurance }
        }


        return db.Patients.findAndCountAll(queryBuilder);
    },

    getOnePatient(id) {
        return db.Patients
            .findByPk(id, { include: [{ model: db.HealthInsurance }, { model: db.Address }, { model: db.Contact }, { model: db.Sessions }] });
    },

    getPatientsTotalCount() {
        return db.Patients.count()
    },

    createPatient(params) {

        return db.Patients.create(
            {
                id: null,
                name: params.name,
                health_insurance_id: params.health_insurance_id,
                contact_id: params.contact_id,
                created_at: params.created_at,
                updated_at: params.updated_at
            });
    },

    editPatient(id, patient, field) {

        return db.Patients.update(patient, {
            fields: [field],
            where: { id }
        });

    },

    deletePatient(id) {

        return db.Patients.destroy({
            where: { id }
        });

    }


}

module.exports = PatientsService;