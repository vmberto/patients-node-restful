const sessionsService = require('../services/sessions.service');

const SessionsController = {

    async getAllSessions(req, res) {

        try {

            let queryParams = req.query;
    
            const data = await sessionsService.findAllSessions(queryParams);

            const responseBundle = { data };
    
            res.status(200).send(responseBundle);
    
        } catch (err) {
            res.status(400).send({error: true, message: "Não foi possível listar as sessões"});
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
            
            res.status(400).send({error: true, message: "Não foi possível criar a sessão"});
        }
    },

    async getAllSessionsDuration(req, res) {

        try {

            let queryParams = req.query;
    
            const data = await sessionsService.findAllSessions(queryParams);

            const durations = data.map(session => session.duration);
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

            const responseBundle = { data: `${hours < 10 ? '0': ''}${hours}:${minutes > 10 ? '': '0'}${minutes}` };
    
            res.status(200).send(responseBundle);
    
        } catch (err) {
            res.status(400).send({error: true, message: "Não foi possível listar as durações"});
        }

    }

}


module.exports = SessionsController;
