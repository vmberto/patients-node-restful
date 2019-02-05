
const handleError = (errorMessage, response) => {

    switch (errorMessage) {

        case 'SequelizeUniqueConstraintError':
            response.status(422).send({ error: true, msg: `Já cadastrado` });
            break;

        case 'ReferenceError':
            response.status(500).send({ error: true, msg: `Se hoje erramos, amanhã já podemos contar com mais esta experiência, e certamente já seremos mais sábios que ontem. ` });
            break;

        default:
            response.status(422).send({ error: true, msg: `Ocorreu um erro` });
            break;

    }


}

module.exports = handleError;