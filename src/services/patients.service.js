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
            .findByPk(id, { include: [{ model: db.HealthInsurance }, { model: db.Address }, { model: db.Contact }, { model: db.Sessions, include: [{ model: db.Humour }] }] });
    },

    getPatientsTotalCount() {
        return db.Patients.count()
    },

    createPatient(params) {

        return db.Patients.create(
            {
                name: params.name,
                health_insurance_id: params.health_insurance_id,
                Contact: {
                    email: params.email,
                    phone: params.phone,
                },
                Addresses: [
                    {
                        city: params.address.city,
                        district: params.address.district,
                        zip_code: params.address.zip_code,
                        street: params.address.street,
                        number: params.address.number,
                        complement: params.address.complement
                    }
                ]
            },
            {
                include: [db.Address, db.Contact]
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