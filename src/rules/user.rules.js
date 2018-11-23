const db = require('../app.js');
const bcrypt = require('bcryptjs');
const check = require('express-validator/check').check;

const userRules = {
  forRegister: [
    check('email')
      .isEmail().withMessage('Invalid email format')
      .custom(email => db.User.find({ where: { email } }).then(u => !!!u)).withMessage('Email exists'),
    check('password')
      .isLength({ min: 8 }).withMessage('Invalid password'),
    check('confirmPassword')
      .custom((confirmPassword, { req }) => req.body.password === confirmPassword).withMessage('Passwords are different')
  ],
  forLogin: [
    check('email')
      .isEmail().withMessage('Formato de Email Inválido')
      .custom(email => db.User.findOne({ where: { email } }).then(u => !!u)).withMessage('Email ou Senha inválido'),
    check('password')
      .custom((password, { req }) => {
        return db.User.findOne({ where: { email: req.body.email } })
          .then(u => {
              bcrypt.compare(password, u.password)
          })
              
      }).withMessage('Email ou Senha inválido')
  ]
}

module.exports = userRules;