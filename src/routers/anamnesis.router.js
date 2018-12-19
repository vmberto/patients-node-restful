const Router = require('express');
const anamnesisController = require('../controllers/anamnesis.controller');
const anamnesisRouter = Router();


anamnesisRouter.post('/', anamnesisController.postCreateAnamensis);

anamnesisRouter.post('/new-question/:id', anamnesisController.postCreateAnamnesisQuestion);


module.exports = anamnesisRouter;