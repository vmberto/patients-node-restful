const anamnesisService = require('../services/anamnesis.service');
const PdfGeneratorService = require('../services/pdf-generator.service');
const listMetaBuilder = require('../utils/builders/list-meta.builder');
const fs = require('fs');

const AnamnesisController = {

    /**
     * Sends a filtered paginated Anamnesis list 
     * @param {Request} req 
     * @param {Response} res 
     */
    async getAnamnesisList(req, res) {

        try {

            const { query } = req;
            const { rows, count } = await anamnesisService.findAndCountAllAnamnesis(query);
            const total = await anamnesisService.countAnamnesis();

            const meta = listMetaBuilder(total, count, query.limit, query.page);

            const responseBundle = { data: rows, meta }

            res.status(200).send(responseBundle)

        } catch (err) {
            res.status(400).send(err);
        }

    },

    /**
     * Sends one Anamnesis specified by ID  
     * @param {Request} req 
     * @param {Response} res 
     */
    async getOneAnamnesis(req, res) {

        try {

            let { params } = req;

            let anamnesis = await anamnesisService.findAnamnesis(params.id)

            res.status(200).send(anamnesis)

        } catch (err) {
            res.status(400).send(err)
        }

    },

    /**
    * Creates one Anamnesis  
    * @param {Request} req 
    * @param {Response} res 
    */
    async postCreateAnamensis(req, res) {
        try {

            const { body } = req;

            const new_anamnesis = await anamnesisService.createAnamnesis(body);

            const responseBundle = { new_anamnesis };

            res.status(200).json(responseBundle);

        } catch (err) {
            res.status(400).send(err);
        }
    },

    /**
    * Deletes one Anamnesis sepecified by ID 
    * @param {Request} req 
    * @param {Response} res 
    */
    async deleteAnamnesis(req, res) {

        try {
            let { params } = req;

            await anamnesisService.deleteAnamnesis(params.id);

            res.status(200).json({ deleted: `A anamnese ${params.id} foi excluída` });

        } catch (err) {
            res.status(400).send(err);
        }

    },

    /**
    * Creates a question for an Anamnesis specified by ID
    * @param {Request} req 
    * @param {Response} res 
    */
    async postCreateAnamnesisQuestion(req, res) {
        try {
            const { body: bodyParams, params } = req;

            const new_question = await anamnesisService.createAnamnesisQuestion(params.id, bodyParams);

            const responseBundle = new_question;

            res.status(200).json(responseBundle);

        } catch (err) {
            res.status(400).send(err);
        }
    },

    /**
    * Deletes a question specified by ID
    * @param {Request} req 
    * @param {Response} res 
    */
    async deleteAnamnesisQuestion(req, res) {

        try {
            let params = req.params;

            await anamnesisService.deleteAnamnesisQuestion(params.id);

            res.status(200).json({ deleted: `A pergunta ${params.id} foi excluída` });

        } catch (err) {
            res.status(400).send(err);
        }


    },

    /**
    * Downloads an Anamnesis specified by ID with (or not with) patients data
    * 
    * @TODO Maybe will be possible to download an already answered anamnesis
    * @param {Request} req 
    * @param {Response} res 
    */
    async downloadAnamnesis(req, res) {

        try {
            
            const { id } = req.params;
            const { body: patient } = req;
            const file_type = 'anamnesis';

            payload = { id, token: req.headers.authorization, patient, file_type }

            
            await PdfGeneratorService.generatePdf(payload);

            let file = fs.readFileSync('./static/output/anamnesis.pdf');
            const filename = 'anamnese';

            res.setHeader('Content-Type', "application/pdf");
            res.setHeader('Content-Disposition', 'pdf; filename=' + `${filename}.pdf`);

            res.send(file);

        } catch (err) {
            res.status(400).send(err);
        }

    }

}

module.exports = AnamnesisController;
