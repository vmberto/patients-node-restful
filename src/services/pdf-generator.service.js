const anamnesisService = require('../services/anamnesis.service');
const sessionsService = require('../services/sessions.service');
const moment = require('moment');
const ejs = require('ejs');
const fs = require('fs');
const pdf = require('html-pdf');


const PdfGeneratorService = {
    
    async generatePdf(payload) {
        
        const filePath = `./static/output/${payload.file_type}.pdf`;
        const templateFile = `./static/templates/${payload.file_type}.ejs`;

        await fs.access(filePath, error => {
            if (!error) fs.unlink(filePath, function (error) { });
        });

        let object;
        let options;
        
        if (payload.file_type === 'anamnesis') {
            
            object = await anamnesisService.findAnamnesis(payload.id);
            options = {
                patientData: payload.patient || {},
                questions: object.questions,
                config: { token: payload.token, base_url: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_ENV : process.env.DEV_ENV }
            };

        } else if (payload.file_type === 'patient-evolution') {

            object = await sessionsService.findAllSessions( { limit: payload.last_sessions_number, orderBy: 'attendance_at', sortedBy: 'desc', patients_id: payload.id } );

            object.forEach(session => session.attendance_at = moment(session.attendance_at).format('DD/MM/YYYY'))

            object[1].description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
            object[4].description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
            object[5].description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

            options = {
                sessions: object,
                config: { token: payload.token, base_url: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_ENV : process.env.DEV_ENV }
            };

        }

        /** @TODO Ver se o atributo css: 'page-break-after:always;' sendo colocado na div quando estiver perto do tamanho da folha a4 funcionará para evitar q nao tenha nada cortado de uma pagina para outra */

        let template = await htmlGenerator(templateFile, options);

        await pdfGenerator(payload.file_type, template, {
            format: 'A4',
            orientation: 'portrait',
            border: {
                "top": "1.5cm",
                "right": "1.4cm",
                "bottom": "1.5cm",
                "left": "1.4cm"
            }
        });

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
        pdf.create(html, options).toFile(`./static/output/${fileName}.pdf`, function (err, pdf) {
            if (err) {
                reject(err);
            } else {
                resolve(pdf);
            }
        });
    });

};

module.exports = PdfGeneratorService;
