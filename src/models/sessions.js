'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define('Sessions', {
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
    humour: {
      type: DataTypes.STRING,
      allowNull: false
    },
    patients_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
      underscored: true,

    });

  Sessions.associate = function (models) {
    Sessions.belongsTo(models.Patients, { foreignKey: 'patients_id' });

  };
  return Sessions;
};