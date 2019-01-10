'use strict';
module.exports = (sequelize, DataTypes) => {

  const constructor = {
    title: DataTypes.STRING
  };

  const options = { 
    underscored: true,
    timestamps: false
  }


  const Humour = sequelize.define('Humour', constructor, options);

  Humour.associate = function(models) {
    Humour.hasMany(models.Sessions, { foreignKey: 'humour_id', onDelete: 'cascade' });
  };
  return Humour;
};