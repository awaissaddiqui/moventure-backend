// A utility function to standardize the format of API responses, making it easier to send consistent responses.
import httpStatusCodes from '../../public/data/http-status-codes.js';

export const sendResponse = (response, statusCode, data, error) => {
    error ?
        // sending an error in response
        response
            .status(statusCode)
            .json({
                statusCode,
                data,
                error: {
                    message: error.message,
                    code: statusCode,
                    status: error.statusName,
                    name: error.name,
                    isOperational: error.isOperational,
                    ...(process.env.NODE_ENV === 'production' ?
                        {} : { details: error.stack }),
                },
            }) :

        // sending data in
        response
            .status(statusCode)
            .json({
                statusCode,
                statusName: httpStatusCodes[statusCode],
                data,
            });

};

/* Usage:
    sendResponse(res, 200, { message: 'Success', data: result });
*/