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
    }

}

module.exports = SessionsController;
