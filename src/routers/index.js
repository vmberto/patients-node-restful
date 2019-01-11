'use strict';
const healthInsuranceRouter = require('./health-insurance.router');
const sessionsRouter = require('./sessions.router');
const userRouter = require('./user.router');
const patientsRouter = require('./patients.router');
const anamnesisRouter = require('./anamnesis.router');

module.exports = function (app) {


    app.use('/api/patients', patientsRouter);

    app.use('/api/health-insurances', healthInsuranceRouter);
    
    app.use('/api/anamnesis', anamnesisRouter);
    
    app.use('/api/sessions', sessionsRouter);

    app.use('/api', userRouter);



};

