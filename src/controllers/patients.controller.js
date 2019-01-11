
const patientsService = require('../services/patients.service');
const healthInsurancesService = require('../services/health-insurance.service');

const PatientsController = {

    async getPatientsList(req, res) {

        try {

            let params = req.query;

            let { rows, count } = await patientsService.findAndCountAllPatients(params);

            const total = await patientsService.countPatients();

            const meta = {
                paginationConfig: {
                    "total": total === count ? total : count,
                    "count": count,
                    "per_page": parseInt(params.limit),
                    "current_page": parseInt(params.page),
                    "total_pages": total < params.limit || total !== count ? 1 : Math.ceil(total / params.limit),
                    "links": {},
                },
                filterConfig: {
                    "health_insurances": [...await healthInsurancesService.findAllHealthInsurances(), { id: -1, name: 'Nenhum' }]

                }

            }

            let responseBundle = { data: rows, meta }

            res.status(200).send(responseBundle)

        } catch (err) {
            res.status(400).send(err)
        }
    },

    async getOnePatient(req, res) {

        try {
            let params = req.params;
            let queryParams = req.query;


            let patient = await patientsService.findPatient(params.id, queryParams.sessions_limit);

            res.status(200).send(patient);

        } catch (err) {
            res.status(400).json(err)
        }

    },
    
    async getPatientsTotalCount(req, res) {

        try {

            const patientsTotalCount = await patientsService.countPatients();

            let responseBundle = { data: patientsTotalCount }

            res.status(200).send(responseBundle)

        } catch (err) {
            res.status(400).send(err);
        }

    },

    async postCreatePatient(req, res) {
        try {
            let params = req.body;

            const newPatient = await patientsService.createPatient(params);

            const responseBundle = { newPatient }

            res.status(200).json(responseBundle);

        } catch (err) {
            res.status(400).send(err);
        }

    },

    async postEditPatient(req, res) {
        try {
            const bodyParams = req.body;
            const urlParams = req.params;

            const editedPatient = await patientsService.editPatient(urlParams.id, bodyParams, 'name');


            res.status(200).json(editedPatient);

        } catch (err) {
            res.status(400).send(err);
        }

    },

    async deletePatient(req, res) {
        try {
            let params = req.params;

            await patientsService.deletePatient(params.id);

            res.status(200).json({ deleted: `the patient ${params.id} was deleted` });

        } catch (err) {
            res.status(400).send(err);
        }

    },

}

module.exports = PatientsController;
