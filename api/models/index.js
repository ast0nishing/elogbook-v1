import { default as dbConfig } from '../db.config.js';
import { default as tutorials } from './resources/tutorial.model.js';
import { default as users } from './resources/user.js';

import { Sequelize } from 'sequelize';
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tutorials = tutorials(sequelize, Sequelize);
db.users = users(sequelize, Sequelize);

export default db;
