
const AddressesService = require('../services/addresses.service');
const PatientsService = require('../services/patients.service');
const healthInsurancesService = require('../services/health-insurance.service');
const ContactService = require('../services/contact.service');

const PatientsController = {

    async getPatientsList(req, res) {

        try {

            let params = req.query;

            let patients = await PatientsService.getAllPatientsList(params);


            params.total = await PatientsService.getPatientsTotalCount();

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
                    "health_insurances": await healthInsurancesService.getAllHealthInsurances()

                }

            }


            let responseBundle = { data: patients.rows, meta }

            res.status(200).send(responseBundle)

        } catch (err) {
            console.log(err);

            res.status(400).send(err)
        }
    },
    async getOnePatient(req, res) {

        try {
            let params = req.params;
            console.log('rola')

            let patient = await PatientsService.getOnePatient(params.id)


            res.status(200).send(patient)

        } catch (err) {
            res.status(400).send(err)
        }

    },
    async getPatientsTotalCount(req, res) {

        try {


            const patientsTotalCount = await PatientsService.getPatientsTotalCount();

            let responseBundle = { data: patientsTotalCount }

            res.status(200).send(responseBundle)



        } catch (err) {
            res.status(400).send(err);
        }

    },
    async postCreatePatient(req, res) {
        try {
            const params = req.body;
            const addressParams = params.address;

            const newContact = await ContactService.createAddress(params)

            params.contact_id = newContact.id;

            const newPatient = await PatientsService.createPatient(params);

            addressParams.patients_id = newPatient.id;

            const newAddress = await AddressesService.createAddress(addressParams);

            const responseBundle = { newPatient, newAddress }

            res.status(200).json(responseBundle);

        } catch (err) {
            res.status(400).send(err);
        }

    },
    async postEditPatient(req, res) {
        try {
            const bodyParams = req.body;
            const urlParams = req.params;

            const editedPatient = await PatientsService.editPatient(urlParams.id, bodyParams, 'name');


            res.status(200).json(editedPatient);

        } catch (err) {
            res.status(400).send(err);
        }

    },
    async postDeletePatient(req, res) {
        try {
            let params = req.params;

            await PatientsService.deletePatient(params.id);

            res.status(200).json({ deleted: `the patient ${params.id} was deleted` });

        } catch (err) {
            res.status(400).send(err);
        }

    }



}

module.exports = PatientsController;
