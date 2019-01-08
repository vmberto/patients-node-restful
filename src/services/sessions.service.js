const db = require("../models/index.js");

const SessionsService = {

    createSessions(patients_id, { description, attendance_at, humour_id }) {


        return db.Sessions.create({
            patients_id,
            description,
            attendance_at,
            humour_id
          }, {
            include: [ db.Humour ]
          });

    }

}

module.exports = SessionsService;
