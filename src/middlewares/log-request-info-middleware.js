import {logger} from '../configurations/index.js';

// logs the HTTP method and URL of incoming requests to the server.

export const logRequestInfo = (request, response, next) => {
    logger.info(`${request.method} request for ${request.url}`);
    next();
};

