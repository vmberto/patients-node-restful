'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const db = {};

const connection = require('../database/connection.js');
const folders = [];

fs
  .readdirSync(__dirname)
  .forEach(file => {
    if ((file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')) {
      const model = connection['import'](path.join(__dirname, file));
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
        const model = connection['import'](path.join(currentFolder, file));
        db[model.name] = model;
      }
    });

});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.connection = connection;
db.Sequelize = Sequelize;

db.connection.sync();

module.exports = db;
