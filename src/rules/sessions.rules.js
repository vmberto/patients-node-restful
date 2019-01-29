const check = require('express-validator/check').check;

const sessionsRules = {
  forEvolutionDownload: [
    check('last_sessions_number').exists().withMessage('É necessário que seja selecionado as sessões.'),

    check('patient').exists().withMessage('É necessário que seja especificado o paciente.'),

  ]

}

module.exports = sessionsRules;