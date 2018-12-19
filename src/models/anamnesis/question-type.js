'use strict';
module.exports = (sequelize, DataTypes) => {

  const QuestionType = sequelize.define('QuestionType', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
    {
      freezeTableName: true,
      underscored: true,
    });

    QuestionType.associate = function (models) {
  };
  return QuestionType;
};