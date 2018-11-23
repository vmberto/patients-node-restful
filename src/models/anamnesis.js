const sequelize = require('../config');
const Sequelize = require('sequelize');


const AnamnesisFactory = (sequelize, DataTypes) => {
  const attributes = {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
    
  };
  const config = {
    underscored: true,
    freezeTableName: true
  }

  const Anamnesis = sequelize.define('tb_anamnesis', attributes, config);

  Anamnesis.associate = models => {
    Anamnesis.hasMany(models.Anamnesis, {foreignKey: 'anamnesis_id'});
  };


  return Anamnesis;
};

module.exports = AnamnesisFactory;