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
    health_insurance_id: { //FOREIGN KEY
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contact_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sessions_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
    {
      underscored: true,
    });

  Patients.associate = function (models) {
    Patients.belongsTo(models.HealthInsurance, {foreignKey: 'health_insurance_id'});
    Patients.belongsTo(models.Contact, {foreignKey: 'contact_id'});
    Patients.hasMany(models.Address, {foreignKey: 'patients_id'});
    Patients.hasMany(models.Sessions, {foreignKey: 'sessions_id'});
  };
  return Patients;
};