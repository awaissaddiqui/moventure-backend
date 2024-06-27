import { jest } from '@jest/globals';

import { asyncHandler } from '../../../src/middlewares/index.js';
import { logger } from '../../../src/configurations/index.js';


describe('asyncHandler', () => {
    const mockRouteHandler = jest.fn();
    const mockRequest = {};
    const mockResponse = {};
    const mockNext = jest.fn();

    beforeEach(() => {
        mockRouteHandler.mockClear();
        mockNext.mockClear();
        jest.spyOn(logger, 'error').mockClear(); // Clear logger.error
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restore all mocks after each test
    });
    it('should call routeHandlerFunction and catch errors', async () => {
        const mockError = new Error('Mock error');
        mockRouteHandler.mockRejectedValueOnce(mockError);

        const handler = asyncHandler(mockRouteHandler);
        await handler(mockRequest, mockResponse, mockNext);

        expect(mockRouteHandler).toHaveBeenCalledWith(mockRequest, mockResponse, mockNext);
        expect(logger.error).toHaveBeenCalledWith(
            `error occurred when ${mockRequest.method} request is made for ${mockRequest.url}. error: %s`,
            mockError,
        );
        expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    it('should call routeHandlerFunction and not catch errors', async () => {
        const mockResult = 'Mock result';
        mockRouteHandler.mockResolvedValueOnce(mockResult);

        const handler = asyncHandler(mockRouteHandler);
        await handler(mockRequest, mockResponse, mockNext);

        expect(mockRouteHandler).toHaveBeenCalledWith(mockRequest, mockResponse, mockNext);
        expect(logger.error).not.toHaveBeenCalled();
        expect(mockNext).not.toHaveBeenCalled();
    });
});
