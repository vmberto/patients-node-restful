'use strict';
module.exports = (sequelize, DataTypes) => {

  const constructor = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    attendance_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false
    }
  };

  const options = { underscored: true }

  const Sessions = sequelize.define('Sessions', constructor , options);


  Sessions.associate = function (models) {
    Sessions.belongsTo(models.Patients, { foreignKey: 'patients_id', onDelete: 'cascade' });
    Sessions.belongsTo(models.Humour, {foreignKey: 'humour_id', onDelete: 'cascade'});


  };
  return Sessions;
};