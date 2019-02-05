
const handleError = (errorMessage, response) => {

    switch (errorMessage) {

        case 'SequelizeUniqueConstraintError':
            response.status(422).send({ error: true, msg: `Já cadastrado` });
            break;

        case 'ReferenceError':
            response.status(500).send({ error: true, msg: `Estamos com problemas internos :s` });
            break;

        default:
            response.status(422).send({ error: true, msg: `Ocorreu um erro` });
            break;

    }


}

module.exports = handleError;