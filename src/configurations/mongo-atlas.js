import mongoose from 'mongoose';
import { logger } from './logger.js';

export const connect2DB = () => {
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const cluster = process.env.DB_CLUSTER;
    const clusterId = process.env.DB_CLUSTERID;
    const collection = process.env.DB_COLLECTION;


    const connectionString = `mongodb+srv://${username}:${password}@${cluster}.${clusterId}.mongodb.net/${collection}?retryWrites=true&w=majority`;

    mongoose.connection
        .on('connected', () => {
            logger.info('database is connected');
        })
        .once('open', () => {
            logger.info('database is open for data');
            logger.info(`connected to mongo atlas, DB: ${collection}`);
        })
        .on('close', () => {
            logger.warn('database connection closed');
        })
        .on('disconnected', () => {
            logger.warn('database disconnecting');
        })
        .on('disconnected', () => {
            logger.error('database disconnected');
            mongoose.connect(connectionString);
        })
        .on('reconnected', () => {
            logger.info('database reconnected');
        })
        .on('error', (error) => {
            logger.error('database connection error');
            logger.error(error);
            mongoose.disconnect();
        });

    mongoose.connect(connectionString);
};