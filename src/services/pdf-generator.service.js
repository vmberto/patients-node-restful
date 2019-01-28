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

            if (options.patientData && options.patientData.birthday) {
                options.patientData.birthday = moment(options.patientData.birthday).format('DD/MM/YYYY');
            }
            

        } else if (payload.file_type === 'patient-evolution') {

            if (!payload.last_sessions_number) throw "Can't create Patient Evolution without Last Sessions Number";
            object = await sessionsService.findAllSessions( { limit: payload.last_sessions_number, orderBy: 'attendance_at', sortedBy: 'desc', patients_id: payload.patient_id } );

            object.forEach(session => session.attendance_at = moment(session.attendance_at).format('DD/MM/YYYY'));

            options = {
                sessions: object,
                config: { token: payload.token, base_url: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_ENV : process.env.DEV_ENV }
            };

        }

        let template = await htmlGenerator(templateFile, options);

        await pdfGenerator(payload.file_type, template, {
            format: 'A4',
            orientation: 'portrait',
            border: {
                "top": "1.3cm",
                "right": "1.2cm",
                "bottom": "1.3cm",
                "left": "1.2cm"
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
