const listQueryBuilder = require('../utils/builders/list-query.builder');
const db = require("../models/index.js");

const AnamnesisService = {

    findAndCountAllAnamnesis(queryParams) {
        let queryBuilder = listQueryBuilder(queryParams);

        queryBuilder.include = [{ model: db.AnamnesisQuestion, as: 'questions'}];

        return db.Anamnesis.findAndCountAll(queryBuilder);
    },

    countAnamnesis() {
        return db.Anamnesis.count()
    },

    findAnamnesis(id) {
        return db.Anamnesis
            .findByPk(id, { include: [{ model: db.AnamnesisQuestion, as: 'questions', include: [{ model: db.QuestionOptions, as: 'options' }]  }] });

    },

    createAnamnesis(bodyParams) {

        return db.Anamnesis.create({
            name: bodyParams.name
        });

    },

    deleteAnamnesis(id) {

        return db.Anamnesis.destroy({
            where: { id }
        });

    },

    createAnamnesisQuestion(id, bodyParams) {

        return db.AnamnesisQuestion.create({
            anamnesis_id: id,
            title: bodyParams.question,
            type: bodyParams.type,
            line_number: bodyParams.line_number,
            options: bodyParams.options
        }, {
                include: [{ model: db.QuestionOptions, as: 'options' }]
            });

    },

    deleteAnamnesisQuestion(id) {
        return db.AnamnesisQuestion.destroy({
            where: { id }
        });
    }

}

module.exports = AnamnesisService;
