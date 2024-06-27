/* import mongoose from 'mongoose'
import config from 'config'
import fs from 'node:fs'

import server from '../../index' */
import { sendResponse, AppError } from '../utilities/index.js';
import { logger } from '../configurations/index.js';

export const uncaughtErrors = (error, request, response, next) => {
    // Log the error
    logger.error(error);

    // Default to 500 if the error's statusCode is not provided or is '0000'
    const statusCode = error.statusCode && error.statusCode !== '0000' ? error.statusCode : 500;

    // Default error message if not provided
    const errorMessage = error.message || 'Something went wrong with the server';

    // Determine if the error is operational or technical
    const isOperational = error.isOperational || false;


    // Send a response based on the type of error
    if (error instanceof AppError) {
        sendResponse(response, statusCode, errorMessage, error);
    } else {
        sendResponse(response, statusCode, errorMessage);
    }

    // Call the next middleware if the error is operational
    if (isOperational) {
        return next();
    }

    // Terminate the request-response cycle for technical errors
    process.exit(1); // You might want to handle this differently in production like below..

    /*
    if (!isOperational && config.get('APP_ENV') === 'development') {
        mongoose.connection.close(() => {
            console.log('Database connection closed');

            // Close server
            server.close(() => {
                console.log('Server closed');

                // Close file streams, release other resources
                fs.close(fileDescriptor, () => {
                    console.log('File closed');

                    process.exit(0); // Exit with code 0 to indicate successful shutdown
                });
            });
        });
        //Remember to adapt this code to match your specific resources and libraries. Also, ensure that you're handling all necessary cleanup tasks before exiting the application.
    }
     */

};
