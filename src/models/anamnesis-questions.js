'use strict';
module.exports = (sequelize, DataTypes) => {

  const AnamnesisQuestion = sequelize.define('AnamnesisQuestion', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    options: {
      type: DataTypes.STRING,
      allowNull: true
    },
    anamnesis_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
    {
      underscored: true,
    });

  AnamnesisQuestion.associate = function (models) {
    AnamnesisQuestion.belongsTo(models.Anamnesis, { foreignKey: 'anamnesis_id' });
  };
  return AnamnesisQuestion;
};