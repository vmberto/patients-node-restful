'use strict';
module.exports = (sequelize, DataTypes) => {

  const Anamnesis = sequelize.define('Anamnesis', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      underscored: true,
      freezeTableName: true
    });

  Anamnesis.associate = function (models) {
    Anamnesis.hasMany(models.AnamnesisQuestion, { foreignKey: 'anamnesis_id' });
  };
  return Anamnesis;
};