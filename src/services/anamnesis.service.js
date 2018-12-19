const db = require("../models/index.js");

// CRIAR ANAMNESE => PREENCHE CAMPOS => CLICK SUBMIT FORM BTN => ADICIONA NA TELA OPÇÃO DE ADICIONAR PERGUNTAS NA ANAMNESE

const AnamnesisService = {

    createAnamnesis(bodyParams) {

        return db.Anamnesis.create({
            name: bodyParams.name,
            AnamnesisQuestions: []
          }, {
            include: [ db.AnamnesisQuestion ]
          });

    },

    createAnamnesisQuestion(id, bodyParams) {

        return db.AnamnesisQuestion.create({
            anamnesis_id: id,
            title: bodyParams.question,
            type: bodyParams.type,
            line_number: bodyParams.line_number
        });
    }

}

module.exports = AnamnesisService;
