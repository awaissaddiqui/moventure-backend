import httpStatusCodes from '../../public/data/http-status-codes.js';
import programmingErrorsCodes from '../../public/data/programming-error-codes.js';


export class AppError extends Error {
    constructor(message, statusCode = '0000', isOperational = true) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.statusName = httpStatusCodes[statusCode]?? programmingErrorsCodes[statusCode];
        this.isOperational = isOperational;
    }
};

