'use strict';
module.exports = (sequelize, DataTypes) => {

    const PatientStatus = sequelize.define('PatientStatus', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            timestamps: false,
            freezeTableName: true
        });

    PatientStatus.associate = function (models) {
        PatientStatus.hasMany(models.Patients, { foreignKey: 'patient_status_id' });
    };

    return PatientStatus;
};