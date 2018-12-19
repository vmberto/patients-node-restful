const anamnesisService = require('../services/anamnesis.service');


const AnamnesisController = {

    async postCreateAnamensis(req, res) {
        try {

            let bodyParams = req.body;

            const newAnamnesis = await anamnesisService.createAnamnesis(bodyParams);

            const responseBundle = { newAnamnesis }

            res.status(200).json(responseBundle);

        } catch (err) {
            res.status(400).send(err);
        }
    },

    async postCreateAnamnesisQuestion(req, res) {
        try {
            let anamnesisId = req.params.id;
            let bodyParams = req.body;

            const newQuestion = await anamnesisService.createAnamnesisQuestion(anamnesisId, bodyParams);

            const responseBundle = { newQuestion, anamnesis_id: anamnesisId };

            res.status(200).json(responseBundle);

        } catch (err) {
            res.status(400).send(err);
        }
    }

}

module.exports = AnamnesisController;
