const db = require("../models/index.js");

const SessionsService = {

    createSessions(id, bodyParams) {

        return db.Sessions.create({
            description: bodyParams.description,
            patients_id: id,
            attendance_at: bodyParams.attendance_at,
            Humour: {
              title: bodyParams.humour_title,
            }
          }, {
            include: [ db.Humour ]
          });

    }

}

module.exports = SessionsService;
