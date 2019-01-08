const bcrypt = require('bcryptjs');
const check = require('express-validator/check').check;
const db = require('../models/index');

const userRules = {
  forRegister: [
    check('name')
      .isAlpha().withMessage('Nome inválido'),

    check('email')
      .isEmail().withMessage('Formato de email inválido')
      .custom(email => db.User.findOne({ where: { email } }).then(user => !!!user)).withMessage('Este email já está cadastrado'),

    check('password')
      .isLength({ min: 6 }).withMessage('Senha inválida'),

    check('confirm_password')
      .custom((confirm_password, { req }) => req.body.password === confirm_password).withMessage('As senhas são diferentes')

  ],
  forLogin: [
    check('email')
      .isEmail().withMessage('Formato de Email Inválido')
      .custom(email => db.User.findOne({ where: { email } }).then(user => !!user)).withMessage('Email ou Senha inválido'),

    check('password')
      .custom((password, { req }) => db.User.findOne({ where: { email: req.body.email } })
          .then(user =>  bcrypt.compareSync(password, user.password))).withMessage('Email ou Senha inválido')
  ]
}

module.exports = userRules;