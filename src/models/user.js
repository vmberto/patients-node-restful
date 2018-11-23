const Sequelize = require('sequelize');

const UserFactory = (sequelize, DataTypes) => {
    const attributes = {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        name: Sequelize.STRING
    };
    const config = {
        underscored: true
    }

    const User = sequelize.define('tb_users', attributes, config);

    return User;
};

module.exports = UserFactory;