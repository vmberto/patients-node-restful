const sessionsService = require('../services/sessions.service');
const { getNumbers, getTotalHours, getTotalPatients, enumerateDaysBetweenDates } = require('../utils/session-statistics.utils');

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

    }

}


module.exports = SessionsController;
