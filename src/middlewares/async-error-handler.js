import { logger } from '../configurations/index.js';

// This utility function is used to catch and handle asynchronous errors in Express.js middleware and route handlers.
export const asyncHandler = (routeHandlerFunction) => (request, response, next) =>
    Promise
        .resolve(routeHandlerFunction(request, response, next))
        .catch((error) => {
            logger.error(`error occurred when ${request.method} request is made for ${request.url}. error: %s`, error);

            next(error); // sending it to central uncaught-error-handler so that it can be handled.
        });

/* Usage:
    app.get('/route', asyncHandler(async (request, response) => {
        Your asynchronous code here
    }));
*/