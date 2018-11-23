const sequelize = require('../config');
const Sequelize = require('sequelize');

const PatientsFactory = (sequelize, DataTypes) => {
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
    health_insurance_id: { //FOREIGN KEY
      type: Sequelize.INTEGER,
      allowNull: false
    },
    contact_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
    
  };
  const config = {
    underscored: true
  }

  const Patients = sequelize.define('tb_patients', attributes, config);

  Patients.associate = models => {
    Patients.belongsTo(models.HealthInsurance, {foreignKey: 'health_insurance_id'});
    Patients.belongsTo(models.Contact, {foreignKey: 'contact_id'});
    Patients.hasMany(models.Address, {foreignKey: 'patients_id'});
  };


  return Patients;
};

module.exports = PatientsFactory;