const db = require("../models/index.js");

const SessionsService = {

    createSessions(id, bodyParams) {

        return db.Sessions.create(
            {
                id: null,
                description: bodyParams.description,
                humour: bodyParams.humour,
                patients_id: id
            });


    }

}

module.exports = SessionsService;
