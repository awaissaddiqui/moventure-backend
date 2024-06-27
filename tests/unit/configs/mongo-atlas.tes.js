import mongoose from 'mongoose';
import {jest } from '@jest/globals';

import { connect2DB, logger } from '../../../src/configurations/index.js';

jest.mock('../../../src/configurations/logger.js', () => ({
    info: jest.fn(),
    error: jest.fn(),
}));

describe('connect2DB - Basic functionality using unit testing', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Reset the winston logger before each test
    });

    it('should connect to the database with the correct connection string', async () => {
        mongoose.connect = jest.fn(() => Promise.resolve());

        await connect2DB();

        // Check that mongoose.connect() was called with the correct connection string
        expect(mongoose.connect).toHaveBeenCalledWith(
            expect.stringContaining(config.get(DB.username)),
        );
        expect(mongoose.connect).toHaveBeenCalledWith(
            expect.stringContaining(config.get(DB.password)),
        );
        expect(mongoose.connect).toHaveBeenCalledWith(
            expect.stringContaining(config.get(DB.cluster)),
        );
        expect(mongoose.connect).toHaveBeenCalledWith(
            expect.stringContaining(config.get(DB.clusterId)),
        );
        expect(mongoose.connect).toHaveBeenCalledWith(
            expect.stringContaining(config.get(DB.collection)),
        );
    });

    /* it('should log an error if there is an issue connecting to the database', async () => {
        const error = new Error('unable to connect to data base');
        mongoose.connect = jest.fn(() => Promise.reject(error));

        await connect2DB();

        expect(logger.error).toHaveBeenCalledWith(`Error: ${error}`);
    }); */

    it('should log a message when successfully connected to the database', async () => {
        mongoose.connect = jest.fn(() => Promise.resolve());

        await connect2DB();

        expect(logger.info).toHaveBeenCalledWith(
            expect.stringContaining('connected to mongo atlas, DB: '),
        );
        expect(logger.info).toHaveBeenCalledWith(
            expect.stringContaining(process.env.DB.collection),
        );
    });
    it('should log an error when there is an issue connecting to the database', async () => {
        // todo: This test is failing do some thing for this
        const error = new Error('Simulated connection error');

        // Mock the behavior of mongoose.connect to simulate a rejected promise
        jest.spyOn(mongoose, 'connect').mockRejectedValue(error);

        // Mock the logger.error function to capture its calls
        const errorSpy = jest.spyOn(logger, 'error');

        // Run the function being tested
        await connect2DB();

        // Verify that logger.error was called with the expected arguments
        expect(errorSpy).toHaveBeenCalledWith('unable to connect to data base', { error: expect.any(Error) });
    });

});