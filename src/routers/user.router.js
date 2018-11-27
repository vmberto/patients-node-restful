const Router = require('express')
const userRules = require('../rules/user.rules');
const UsersController = require('../controllers/users.controller');
const userRouter = Router()

userRouter.post('/api/login', userRules['forLogin'], UsersController.login);

module.exports = userRouter;










// userRouter.post('/register', userRules['forRegister'], (req, res) => {
//     const errors = validationResult(req)

//     if (!errors.isEmpty())
//         return res.status(422).json(errors.array())

//     const payload = matchedData(req) as UserAddModel
//     const user = userService.register(payload)

//     return user.then(u => res.json(u))
// })
