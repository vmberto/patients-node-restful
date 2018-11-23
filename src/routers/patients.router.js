const AddressesService = require('../services/addresses.service');
const Router = require('express');
const PatientsService = require('../services/patients.service');
const healthInsurancesService = require('./health-insurance.router');
const ContactService = require('../services/contact.service');

const patientsRouter = Router()

patientsRouter.get('/api/patients', getPatientsList);
async function getPatientsList(req, res) {

    try {

        let params = req.query;

        let patients = await PatientsService.getAllPatientsList(params);

        params.total = await PatientsService.getPatientsTotalCount();

        const meta = {
            paginationConfig: {
                "total": params.total === patients.count ? params.total : patients.count,
                "count": patients.count,
                "per_page": params.limit,
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
        res.status(400).send(err)
    }
}

patientsRouter.get('/api/patients/:id', getOnePatient);
async function getOnePatient(req, res) {

    try {
        let params = req.params;


        let patient = await PatientsService.getOnePatient(params.id)


        res.status(200).send(patient)

    } catch (err) {
        res.status(400).send(err)
    }

}

patientsRouter.get('/api/patients-counter', getPatientsTotalCount);
async function getPatientsTotalCount(req, res) {

    try {


        const patientsTotalCount = await PatientsService.getPatientsTotalCount();

        let responseBundle = { data: patientsTotalCount }

        res.status(200).send(responseBundle)



    } catch (err) {
        res.status(400).send(err);
    }


}

patientsRouter.post('/api/patients', postCreatePatient);
async function postCreatePatient(req, res) {
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

}

patientsRouter.put('/api/patients/:id/edit', postEditPatient);
async function postEditPatient(req, res) {
    try {
        const bodyParams = req.body;
        const urlParams = req.params;

        const editedPatient = await PatientsService.editPatient(urlParams.id, bodyParams, 'name');


        res.status(200).json(editedPatient);

    } catch (err) {
        res.status(400).send(err);
    }

}

patientsRouter.delete('/api/patients/:id/delete', postDeletePatient);
async function postDeletePatient(req, res) {
    try {
        let params = req.params;

        await PatientsService.deletePatient(params.id);

        res.status(200).json({ deleted: `the patient ${params.id} was deleted` });

    } catch (err) {
        res.status(400).send(err);
    }

}

module.exports = patientsRouter;