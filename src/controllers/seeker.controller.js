
const https = require('https');
const http = require('http');


const SeekerController = {

    async getCep(req, res) {

        const { cep } = req.params;

        https.get(`https://viacep.com.br/ws/${cep}/json/`, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                console.log(1);
                data += chunk;
            });

            resp.on('end', () => {
                res.send(JSON.parse(data));
            });

        }).on("error", (err) => {
            res.status(400).send(err);
        });

    }


}

module.exports = SeekerController;
