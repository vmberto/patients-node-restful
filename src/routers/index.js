'use strict';
const healthInsuranceRouter = require('./health-insurance.router');
const userRouter = require('./user.router');
const patientsRouter = require('./patients.router');

module.exports = function (app) {


    app.use('/api/patients', patientsRouter);
    
    app.use('/api/health-insurances', healthInsuranceRouter);

    app.use('/', userRouter);

    app.get('/', (req, res) => {
        res.status(200).json({ "message": `Welcome to Clinical API v${process.env.VERSION}` });
    });



};
