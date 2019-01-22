
const patientsService = require('../services/patients.service');
const sessionsService = require('../services/sessions.service');
const healthInsurancesService = require('../services/health-insurance.service');
const listMetaBuilder = require('../utils/builders/list-meta.builder');


const PatientsController = {

    async getPatientsList(req, res) {

        try {

            let { query } = req;
            let { rows, count } = await patientsService.findAndCountAllPatients(query);
            const total = await patientsService.countPatients();
            const filters = [
                { 
                  title: 'health_insurances',
                  value: [...await healthInsurancesService.findAllHealthInsurances(), { id: -1, name: 'Nenhum' }]
                }
            ];

            const meta = listMetaBuilder(total, count, query.limit, query.page, filters);

            let responseBundle = { data: rows, meta };

            res.status(200).send(responseBundle);

        } catch (err) {
            res.status(400).send({ error: true, message: 'Não foi possível listar os pacientes' });
        }
    },

    async getOnePatient(req, res) {

        try {
            let params = req.params;
            let queryParams = req.query;

            let patient = await patientsService.findPatient(params.id, queryParams.sessions_limit);

            let meta = { total_sessions: await sessionsService.countSessions(params.id) };


            res.status(200).send({ patient, meta });

        } catch (err) {
            res.status(400).json(err);
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

            const new_patient = await patientsService.createPatient(params);

            const responseBundle = { new_patient }

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
