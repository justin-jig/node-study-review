'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const UserModels = require('./user.js');

let sequelize = new Sequelize(config.database, config.username, config.password, config);
db.User = UserModels(sequelize, Sequelize);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
