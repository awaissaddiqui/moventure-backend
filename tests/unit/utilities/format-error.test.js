import { AppError } from '../../../src/utilities/index.js';
import httpStatusCodes from '../../../public/data/http-status-codes.js';
import programmingErrorsCodes from '../../../public/data/programming-error-codes.js';

describe('AppError class - Basic functionality', () => {
    it('should create an instance of AppError with default values', () => {
        const message = 'Sample error message';
        const statusCode = '0000';
        const isOperational = true;

        const error = new AppError(message);

        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe(message);
        expect(error.name).toBe('AppError');
        expect(error.statusCode).toBe(statusCode);
        expect(error.statusName).toBe(programmingErrorsCodes[statusCode]);
        expect(error.isOperational).toBe(isOperational);
    });

    it('should create an instance of AppError with custom values', () => {
        const message = 'Another error message';
        const statusCode = '404';
        const isOperational = false;

        const error = new AppError(message, statusCode, isOperational);

        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe(message);
        expect(error.name).toBe('AppError');
        expect(error.statusCode).toBe(statusCode);
        expect(error.statusName).toBe(httpStatusCodes[statusCode]);
        expect(error.isOperational).toBe(isOperational);
    });
});
