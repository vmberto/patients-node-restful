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
    birthday: {
      type: DataTypes.DATE,
      allowNull: false
    },
    forwarded_by: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Patients.associate = function (models) {
    Patients.hasOne(models.Contact,   { onDelete: 'cascade' });
    Patients.hasOne(models.Address,   { onDelete: 'cascade' });
    Patients.hasOne(models.MaritalStatus, { foreignKey: 'marital_status_id', onDelete: 'cascade', allowNull: false });

    Patients.hasMany(models.Sessions, { onDelete: 'cascade', foreignKey:'patients_id' });

    Patients.belongsTo(models.HealthInsurance, { foreignKey: 'health_insurance_id' });
    Patients.belongsTo(models.PatientStatus, { foreignKey: 'patient_status_id', allowNull: false });
  };
  return Patients;
};