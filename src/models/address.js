'use strict';
module.exports = (sequelize, DataTypes) => {

    const Address = sequelize.define('Address', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        district: {
            type: DataTypes.STRING,
            allowNull: false
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        complement: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zip_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        patients_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            underscored: true,
            timestamps: false
        });

    Address.associate = function (models) {
        Address.belongsTo(models.Patients, { foreignKey: 'patients_id' });
    };
    return Address;
};