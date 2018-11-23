const Sequelize = require('sequelize');

const ContactFactory = (sequelize, DataTypes) => {
    const attributes = {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        phone: Sequelize.STRING,
        email: Sequelize.STRING
    };
    const config = {
        underscored: true,
        timestamps: false
    }

    const Contact = sequelize.define('tb_contact', attributes, config);

    Contact.associate = models => {
        Contact.hasMany(models.Patients, {foreignKey: 'contact_id'});
    };


    return Contact;
};

module.exports = ContactFactory;