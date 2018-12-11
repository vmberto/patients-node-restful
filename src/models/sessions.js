'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define('Sessions', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    description: DataTypes.STRING
  }, {
      underscored: true,

    });

  Sessions.associate = function (models) {
    Sessions.belongsTo(models.Patients, { foreignKey: 'patients_id' });

  };
  return Sessions;
};