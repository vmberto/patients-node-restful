const ejs = require('ejs');
const fs = require('fs');
const pdf = require('html-pdf');

const templateFile = './src/public/index.ejs';
const filePath = './src/public/output/anamnesis.pdf';

const PdfGeneratorService = {

    async generatePdf(anamnesisName) {

        await fs.access(filePath, error => {
            if (!error) {
                fs.unlink(filePath, function (error) {
                    console.log(error);
                });
            } else {
                console.log(error);
            }
        });

        let template = await this.htmlGenerator(templateFile, {
            posts: [
                {
                    question: 'O que você faz?',
                    type: 0,
                    options: ['Danço', 'Rebolo', 'Vou até o Chão']
                },
                {
                    question: 'O que te trouxe na terapia?',
                    line_numbers: 3
                },
                {
                    question: 'O que você gosta de fazer?',
                    line_numbers: 8
                },
                {
                    question: 'Para onde voce ja foi?',
                    type: 0,
                    options: ['Brasil', 'Portugal', 'Vou até o Chão']
                },
                {
                    question: 'O que você faz?',
                    line_numbers: 4,
                    type: 0,
                    options: ['Danço', 'Rebolo', 'Vou até o Chão']
                },
            ],
            title: 'Maria de Lourdes'
        });

        await this.pdfGenerator(anamnesisName, template, { format: 'Letter' });
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
            pdf.create(html, options).toFile(`./src/public/output/${fileName}.pdf`, function (err, pdf) {
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
