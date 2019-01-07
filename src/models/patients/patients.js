'use strict';
module.exports = (sequelize, DataTypes) => {

  const Patients = sequelize.define('Patients', {
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
    is_private: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    forwarded_by: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Patients.associate = function (models) {
    Patients.belongsTo(models.HealthInsurance, {foreignKey: 'health_insurance_id'});
    Patients.belongsTo(models.Contact, {foreignKey: 'contact_id'});
    Patients.hasMany(models.Address, {foreignKey: 'patients_id'});
    Patients.hasMany(models.Sessions, {foreignKey: 'patients_id'});
  };
  return Patients;
};