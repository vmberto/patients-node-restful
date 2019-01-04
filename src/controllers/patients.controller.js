
const patientsService = require('../services/patients.service');
const healthInsurancesService = require('../services/health-insurance.service');
const SessionsService = require('../services/sessions.service');

const PatientsController = {

    async getPatientsList(req, res) {

        try {

            let params = req.query;

            let patients = await patientsService.getAllPatientsList(params);


            params.total = await patientsService.getPatientsTotalCount();

            const meta = {
                paginationConfig: {
                    "total": params.total === patients.count ? params.total : patients.count,
                    "count": patients.count,
                    "per_page": parseInt(params.limit),
                    "current_page": parseInt(params.page),
                    "total_pages": params.total < params.limit || params.total !== patients.count ? 1 : Math.ceil(params.total / params.limit),
                    "links": {},
                },
                filterConfig: {
                    "health_insurances": [ {id: -1, name: 'Nenhum'}, ...await healthInsurancesService.getAllHealthInsurances() ]

                }

            }


            let responseBundle = { data: patients.rows, meta }

            res.status(200).send(responseBundle)

        } catch (err) {
            res.status(400).send(err)
        }
    },
    async getOnePatient(req, res) {

        try {
            let params = req.params;

            let patient = await patientsService.getOnePatient(params.id)


            res.status(200).send(patient)

        } catch (err) {
            res.status(400).send(err)
        }

    },
    async getPatientsTotalCount(req, res) {

        try {


            const patientsTotalCount = await patientsService.getPatientsTotalCount();

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
    async postCreatePatientSession(req, res) {
        try {
            let params = req.params;
            let bodyParams = req.body;

            const newSession = await SessionsService.createSessions(params.id, bodyParams);

            const responseBundle = { newSession }

            res.status(200).json(responseBundle);

        } catch (err) {
            res.status(400).send(err);
        }
    }



}

module.exports = PatientsController;
