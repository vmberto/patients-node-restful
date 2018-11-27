const jwt = require('jsonwebtoken');
const db = require("../models/index.js");

const _saltRounds = 12
const _jwtSecret = '0.rfyj3n9nzh'

const UserService = {

    login(email) {
        
        return db.User.findOne({ where: { email } }).then(user => {
            const { id, email } = user
            user.password = null;
            return { user, token: jwt.sign({ id, email }, _jwtSecret) }
        });
    },

    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, _jwtSecret, (err, decoded) => {
                if (err) {
                    resolve(false);
                    return;
                }

                UserService._user = db.User.findById(decoded['id']);
                resolve(true)
                return;
            })
        });
    }

}

module.exports = UserService;

    // register({ email, password }: UserAddModel) {

    //     return bcrypt.hash(password, _saltRounds)
    //         .then(hash => {
    //             return User.create({ email, password: hash })
    //                 .then(u => getUserById(u!.id))
    //         })
    // }


    // getUserById(id: number) {
    //     return User.findById(id, {
    //         attributes: UserService.userAttributes
    //     }) as Bluebird<UserViewModel>
    // }