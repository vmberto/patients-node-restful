'use strict';
module.exports = (sequelize, DataTypes) => {

    const MaritalStatus = sequelize.define('MaritalStatus', 
    {
        childrens_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        union_time: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    });

    MaritalStatus.associate = function (models) {
        MaritalStatus.belongsTo(models.Patients, { foreignKey: 'marital_status_id', allowNull: false })
        MaritalStatus.belongsTo(models.MaritalStatusType, { foreignKey: 'marital_status_type_id', allowNull: false });
    };

    return MaritalStatus;
};