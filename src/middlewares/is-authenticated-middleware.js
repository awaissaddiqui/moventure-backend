import jwt from 'jsonwebtoken';
import { AppError, sendResponse } from '../utilities/index.js';

//? A middleware to check if user have token.

export const isAuthenticated = (request, response, next) => {
    const token = request.header('x-auth-token');
    if (!token) {
        const error = new AppError('access denied. No token provided.', 401, true);
        return sendResponse(response, 401, error.message, error);
    };
    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        request.user = decoded;
        next();
    }
    catch (error) {
        sendResponse(response, 400, 'invalid token', error);
    }
};

