const db = require("../models/index.js");

const SessionsService = {

    createSessions(id, bodyParams) {

        return db.Sessions.create({
            description: bodyParams.description,
            patients_id: id,
            attendance_at: bodyParams.attendance_at,
            humour_id: bodyParams.humour_id
          }, {
            include: [ db.Humour ]
          });

    }

}

module.exports = SessionsService;
