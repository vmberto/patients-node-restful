const Sequelize = require('sequelize');

const HealthInsuranceFactory = (sequelize, DataTypes) => {
    const attributes = {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
    };
    const config = {
        underscored: true,
    }

    const HealthInsurance = sequelize.define('tb_health_insurances', attributes, config);

    HealthInsurance.associate = models => {
        HealthInsurance.hasMany(models.Patients, {foreignKey: 'health_insurance_id'});
    };


    return HealthInsurance;
};

module.exports = HealthInsuranceFactory;