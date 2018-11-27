const validationResult = require('express-validator/check')['validationResult'];
const userService = require('../services/user.service');


const UsersController = {

    login(req, res) {
        const bodyParams = req.body;
        const errors = validationResult(req);
        
        if (errors.isEmpty())
            return res.status(422).json(errors.array());
    
        const token = userService.login(bodyParams.email);
        
    
        return token.then(t => res.json(t));
    }

}

module.exports = UsersController;
