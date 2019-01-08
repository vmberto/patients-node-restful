const validationResult = require('express-validator/check')['validationResult'];
const userService = require('../services/user.service');


const UsersController = {

    async register(req, res) {

        try {

            const bodyParams = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json(errors.array());
            }

            const newUser = await userService.createUser(bodyParams);

            res.status(200).send({ newUser });

        } catch(err) {
            res.status(400).send({ error: true, message: err })
            
        }

    },

    login(req, res) {
        const bodyParams = req.body;
        const errors = validationResult(req);


        if (!errors.isEmpty()) {
            return res.status(401).json(errors.array());
        }

        const token = userService.login(bodyParams.email);


        return token.then(t => res.json(t));
    }

}

module.exports = UsersController;
