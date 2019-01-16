const { getNumbers, getTotalHours, getTotalPatients, enumerateDaysBetweenDates } = require('../utils/session-statistics.utils');
const sessionsService = require('../services/sessions.service');
const PdfGeneratorService = require('../services/pdf-generator.service');
const fs = require('fs');


const SessionsController = {

    async postCreatePatientSession(req, res) {
        try {
            let params = req.params;
            let bodyParams = req.body;

            const new_session = await sessionsService.createSessions(params.id, bodyParams);

            const responseBundle = { new_session }

            res.status(200).json(responseBundle);

        } catch (err) {
            res.status(400).send({ error: true, message: "Não foi possível criar a sessão" });
        }
    },

    async getSessionsStatistics(req, res) {

        try {
            let queryParams = req.query;

            let sessions = await sessionsService.findAllSessions(queryParams);

            const dataLabels = enumerateDaysBetweenDates(queryParams.min_date, queryParams.max_date);
            const dataSets = enumerateDaysBetweenDates(queryParams.min_date, queryParams.max_date).map(day => day = getNumbers(sessions, day));
            const totalPatients = getTotalPatients(sessions);
            const totalHours = getTotalHours(sessions);


            res.status(200).send({ dataLabels, dataSets, totalPatients, totalHours });

        } catch (err) {
            res.status(400).send({ error: true, message: "Não foi possível listar as estatísticas" });
        }

    },

    async downloadPatientEvolution(req, res) {

        try {

            const { id } = req.params;
            const { last_sessions_number } = req.body;
            const file_type = 'patient-evolution';

            payload = { id, token: req.headers.authorization, last_sessions_number, file_type}


            await PdfGeneratorService.generatePdf(payload);

            let file = fs.readFileSync('./static/output/patient-evolution.pdf');
            const filename = 'patient-evolution';

            res.setHeader('Content-Type', "application/pdf");
            res.setHeader('Content-Disposition', 'pdf; filename=' + `${filename}.pdf`);

            res.send(file);


        } catch (err) {
            console.log(err);
            
            res.status(400).send({ error: true, message: "Não foi possível baixar a evolução do paciente" });
        }

    }

}


module.exports = SessionsController;
