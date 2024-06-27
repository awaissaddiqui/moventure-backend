import { jest } from '@jest/globals';

import { sendResponse } from '../../../src/utilities/index.js';
import httpStatusCodes from '../../../public/data/http-status-codes.js';


describe('sendResponse - basic functionality', () => {
    const mockResponse = {
        status: jest.fn(() => mockResponse),
        json: jest.fn(),
    };

    beforeEach(() => {
        mockResponse.status.mockClear();
        mockResponse.json.mockClear();
    });

    it('should send an error response if error is occurred', () => {
        const statusCode = 400;
        const error = new Error('Sample error message');
        error.statusName = 'Bad Request';
        error.name = 'BadRequestError';
        error.isOperational = true;

        sendResponse(mockResponse, statusCode, error.message, error);

        expect(mockResponse.status).toHaveBeenCalledWith(statusCode);
        expect(mockResponse.json).toHaveBeenCalledWith({
            statusCode,
            data: error.message,
            error: {
                message: error.message,
                code: statusCode,
                status: error.statusName,
                name: error.name,
                isOperational: error.isOperational,
                details: error.stack,
            },
        });
    });

    it('should send a data response', () => {
        const statusCode = 200;
        const data = { message: 'Success' };

        sendResponse(mockResponse, statusCode, data);

        expect(mockResponse.status).toHaveBeenCalledWith(statusCode);
        expect(mockResponse.json).toHaveBeenCalledWith({
            statusCode,
            statusName: httpStatusCodes[statusCode],
            data,
        });
    });
});
