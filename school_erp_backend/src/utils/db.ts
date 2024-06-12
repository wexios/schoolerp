import { Sequelize } from 'sequelize';
import logger from './logger';
import { dbHost, dbName, dbPassword, dbUsername } from './env.config';

const sequelize = new Sequelize({
    database: dbName,
    username: dbUsername,
    password: dbPassword,
    host: dbHost,
    port: 5432,
    dialect: 'postgres',
});
export default sequelize;
