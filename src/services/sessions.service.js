const db = require("../models/index.js");
const listQueryBuilder = require('../helpers/querybuilders/list.querybuilder');


const SessionsService = {

    findAllSessions(queryParams) {

        queryParams.filtered_date = 'attendance_at';

        let queryBuilder = listQueryBuilder(queryParams);

        return db.Sessions.findAll(queryBuilder);

    },

    createSessions(patients_id, { description, attendance_at, humour_id, duration }) {

        return db.Sessions.create({
            patients_id,
            description,
            attendance_at,
            duration,
            humour_id
        });

    },

    countSessions(patients_id) {
        return db.Sessions.count({ where: { patients_id }});
    },

}

module.exports = SessionsService;
