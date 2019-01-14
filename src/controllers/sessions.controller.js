const sessionsService = require('../services/sessions.service');
const moment = require('moment');

const SessionsController = {

    async getAllSessions(req, res) {

        try {

            let queryParams = req.query;

            const data = await sessionsService.findAllSessions(queryParams);

            const responseBundle = { data };

            res.status(200).send(responseBundle);

        } catch (err) {
            res.status(400).send({ error: true, message: "Não foi possível listar as sessões" });
        }
    },

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
            res.status(400).send({ error: true, message: "Não foi possível listar as durações" });
        }

    }

}

function getNumbers(sessions, day) {
    return sessions.filter(session => moment(session.attendance_at).format('DD/MM/YY') === day).length;
}

function enumerateDaysBetweenDates(startDate, endDate) {
    const dates = [];
    let currentDate = moment(startDate);
    let lastDate = moment(endDate);
    while (currentDate <= lastDate) {
        dates.push(currentDate.format('DD/MM/YY'));
        currentDate = currentDate.add(1, 'day');
    }
    return dates;
}

function getTotalHours(sessions) {
    const durations = sessions.map(session => session.duration);
    let hours = 0;
    let minutes = 0;

    durations.forEach(duration => {
        hours += parseInt(duration[0] + duration[1]);
        minutes += parseInt(duration[3] + duration[4]);
    });

    while (minutes >= 60) {
        hours += 1;
        minutes -= 60;
    }

    return `${hours < 10 ? '0' : ''}${hours}:${minutes > 10 ? '' : '0'}${minutes}`;
}

function getTotalPatients(sessions) {
    let counter = 0;
    let patientsId = sessions.map(session => session.patients_id);
    sessions.forEach((session) => {
        if (patientsId.indexOf(session.patients_id) !== -1) {
            counter += 1;
            patientsId = patientsId.filter(id => id !== session.patients_id);
        }
    });
    return counter;
}


module.exports = SessionsController;
