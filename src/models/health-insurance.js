'use strict';
module.exports = (sequelize, DataTypes) => {

    const HealthInsurance = sequelize.define('HealthInsurance', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
        {
            underscored: true,
        });

    HealthInsurance.associate = function (models) {
        HealthInsurance.hasMany(models.Patients, { foreignKey: 'health_insurance_id' });
    };
    return HealthInsurance;
};