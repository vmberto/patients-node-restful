'use strict';
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING
    },
        {
            underscored: true,
        });

    User.associate = function (models) { };

    return User;
};