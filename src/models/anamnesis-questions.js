'use strict';
module.exports = (sequelize, DataTypes) => {

  const AnamnesisQuestion = sequelize.define('AnamnesisQuestion', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    line_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: false
    });

  AnamnesisQuestion.associate = function (models) {
    AnamnesisQuestion.belongsTo(models.Anamnesis, { foreignKey: 'anamnesis_id' });
  };

  return AnamnesisQuestion;
};