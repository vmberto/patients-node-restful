const Router = require('express');
const anamnesisController = require('../controllers/anamnesis.controller');
const anamnesisRouter = Router();

anamnesisRouter.get('/', anamnesisController.getAnamnesisList);

anamnesisRouter.get('/:id', anamnesisController.getOneAnamnesis);

anamnesisRouter.post('/', anamnesisController.postCreateAnamensis);

anamnesisRouter.post('/new-question/:id', anamnesisController.postCreateAnamnesisQuestion);

anamnesisRouter.get('/download/:id', anamnesisController.pdfgenerate);


module.exports = anamnesisRouter;