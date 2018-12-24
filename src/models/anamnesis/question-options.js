'use strict';
module.exports = (sequelize, DataTypes) => {

  const QuestionOptions = sequelize.define('QuestionOptions', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      underscored: true,
      freezeTableName: true,
      timestamps: false
    });

  QuestionOptions.associate = function (models) {
    QuestionOptions.belongsTo(models.AnamnesisQuestion, { foreignKey: 'options_id' });
  };
  return QuestionOptions;
};