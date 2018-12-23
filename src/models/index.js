'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const db = {};

const sequelize = require('../config.js');
const folders = [];

fs
  .readdirSync(__dirname)
  .forEach(file => {
    if ((file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')) {
      const model = sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
    } else if ((file !== basename)) {
      folders.push(file);
    }
  });

folders.forEach(folder => {
  const currentFolder = `${__dirname}/${folder}`;
  
  fs.readdirSync(currentFolder)
    .forEach(file => {
      if ((file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')) {
        const model = sequelize['import'](path.join(currentFolder, file));
        db[model.name] = model;
      }
    });

});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync();

module.exports = db;
