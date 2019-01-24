
const https = require('https');
const http = require('http');


const SeekerController = {

    async getCep(req, res) {

        const { cep } = req.params;
        let responseBundle = {}

        https.get(`https://viacep.com.br/ws/${cep}/json/`, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                
                data = JSON.parse(data);
                
                if (data.erro) {
                    responseBundle = { error: true, msg: 'CEP não encontrado'}
                } else {
                    responseBundle = data;
                }

                res.status(200).send(responseBundle);
            });

        }).on("error", (err) => {
            res.status(400).send(err);
        });

    }


}

module.exports = SeekerController;
