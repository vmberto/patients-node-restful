const Router = require('express')
const matchedData = require('express-validator/filter')['matchedData']
const validationResult = require('express-validator/check')['validationResult'];
const userRules = require('../rules/user.rules');
const userService = require('../services/user.service');

const userRouter = Router()

userRouter.post('/api/login', userRules['forLogin'], (req, res) => {
    const bodyParams = req.body;
    const errors = validationResult(req);
    

    if (errors.isEmpty())
        return res.status(422).json(errors.array());

    console.log(bodyParams);    
    const token = userService.login(bodyParams.email);
    

    return token.then(t => res.json(t));
})

module.exports = userRouter;










// userRouter.post('/register', userRules['forRegister'], (req, res) => {
//     const errors = validationResult(req)

//     if (!errors.isEmpty())
//         return res.status(422).json(errors.array())

//     const payload = matchedData(req) as UserAddModel
//     const user = userService.register(payload)

//     return user.then(u => res.json(u))
// })
