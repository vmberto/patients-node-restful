'use strict';
module.exports = (sequelize, DataTypes) => {

    const MaritalStatusType = sequelize.define('MaritalStatusType', 
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    });

    MaritalStatusType.associate = function (models) {
        MaritalStatusType.hasMany(models.MaritalStatus, { foreignKey: 'marital_status_type_id', allowNull: false });
    };

    return MaritalStatusType;
};