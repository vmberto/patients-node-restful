const ejs = require('ejs');
const fs = require('fs');
const pdf = require('html-pdf');
const anamnesisService = require('../services/anamnesis.service');

const templateFile = './src/public/index.ejs';
const filePath = './src/public/output/anamnesis.pdf';

const PdfGeneratorService = {

    async generatePdf(payload) {

        await fs.access(filePath, error => {
            if (!error) {
                fs.unlink(filePath, function (error) {});
            } 
        });

        let anamnesis = await anamnesisService.getOneAnamnesis(payload.id);

        anamnesis = JSON.stringify(anamnesis);
        anamnesis = JSON.parse(anamnesis);
        
        const options =  {
            patientData: {},
            questions: anamnesis.questions,
            config: { token: payload.token, base_url:  process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_ENV : `http://localhost:${process.env.SERVER_PORT || 5000}`}
         }
         console.log(options);
         

        let template = await htmlGenerator(templateFile, options);

        await pdfGenerator('anamnesis', template, { format: 'Letter' });
    }

}

function htmlGenerator(templateFile, data) {

    return new Promise(function (resolve, reject) {
        ejs.renderFile(templateFile, data, function (err, html) {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });

};

function pdfGenerator(fileName, html, options) {

    return new Promise(function (resolve, reject) {
        pdf.create(html, options).toFile(`./src/public/output/${fileName}.pdf`, function (err, pdf) {
            if (err) {
                reject(err);
            } else {
                resolve(pdf);
            }
        });
    });

};

module.exports = PdfGeneratorService;
