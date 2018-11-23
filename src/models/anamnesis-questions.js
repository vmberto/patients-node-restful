const Sequelize = require('sequelize');


const AnamnesisQuestionFactory = (sequelize, DataTypes) => {
  const attributes = {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    options: {
      type: Sequelize.STRING,
      allowNull: true
    },
    anamnesis_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }

  };

  const config = {
    underscored: true
  }

  const AnamnesisQuestion = sequelize.define('tb_anamnesis_questions', attributes, config);

  AnamnesisQuestion.associate = models => {
    AnamnesisQuestion.belongsTo(models.Anamnesis, { foreignKey: 'anamnesis_id' });
  };


  return AnamnesisQuestion;
};

module.exports = AnamnesisQuestionFactory;