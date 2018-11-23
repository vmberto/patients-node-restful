const ejs = require('ejs');
const fs = require('fs');
const pdf = require('html-pdf');

const templateFile = './src/views/index.ejs';

const PdfGeneratorService = {

    async generatePdf(anamnesisName) {
        let template;

        await this.htmlGenerator(templateFile, { title: 'Maria de Lourdes' }).then(html => {
            template = html;
        });

        await this.pdfGenerator(anamnesisName, template, {format: 'Letter'});
    },

    htmlGenerator(templateFile, data) {

        return new Promise(function (resolve, reject) {
            ejs.renderFile(templateFile, data, function (err, html) {
                if (err) {
                    reject(err);
                } else {
                    resolve(html);
                }
            });
        });
        
    },

    pdfGenerator(fileName, html, options) {

        return new Promise(function (resolve, reject) {
            pdf.create(html, options).toFile(`./src/views/output/${fileName}.pdf`, function (err, pdf) {
                if (err) {
                    reject(err);
                } else {
                    resolve(pdf);
                }
            });
        });

    }

}

module.exports = PdfGeneratorService;
