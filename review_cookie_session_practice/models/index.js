'use strict';
import Sequelize from "sequelize";
import UserModels from "./user.js";
import dbConfig from '../config/config.js';

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config)

db.User = UserModels(sequelize,Sequelize)
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db