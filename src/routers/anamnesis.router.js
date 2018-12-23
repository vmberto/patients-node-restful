const Router = require('express');
const anamnesisController = require('../controllers/anamnesis.controller');
const anamnesisRouter = Router();

anamnesisRouter.get('/', anamnesisController.getAnamnesisList);

anamnesisRouter.get('/:id', anamnesisController.getOneAnamnesis);

anamnesisRouter.post('/', anamnesisController.postCreateAnamensis);

anamnesisRouter.delete('/:id/delete', anamnesisController.deleteAnamnesis);

anamnesisRouter.post('/new-question/:id', anamnesisController.postCreateAnamnesisQuestion);

anamnesisRouter.delete('/delete-question/:id', anamnesisController.deleteAnamnesisQuestion);

anamnesisRouter.get('/download/:id', anamnesisController.pdfgenerate);


module.exports = anamnesisRouter;