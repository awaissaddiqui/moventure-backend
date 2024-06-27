import { createLogger, format, transports } from 'winston';

const { combine, colorize, timestamp, printf, json, errors, splat, simple } = format;

// Create a custom format for the console transport
const consoleFormat = combine(
    colorize(), // Add colors to the console output
    timestamp(),
    printf(({ timestamp, level, message }) =>
        `${level}: ${message} [${timestamp}]`,
    ),
);

/*
Ignore log messages if they have { private: true } like
logger.log({
    private: true,
    level: 'error',
    message: 'This is super secret - hide it.'
});
*/
// eslint-disable-next-line no-unused-vars
const ignorePrivateInfo = format((info, options) =>
    info.private ? false : info,
);

// Create a custom format for the file transport
const fileFormat = combine(
    timestamp(),
    ignorePrivateInfo(),
    json(),
);

// Determine log level based on environment
const logLevel = process.env.NODE_ENV === 'development' ? 'verbose' : 'info';

// creating instance of logger
const logger = createLogger({
    level: logLevel,
    format: combine(
        errors({ stack: true }), // Include stack traces in errors
        splat(), // Allow printf-style placeholders in log messages like logger.info('some info %s', massage)
        simple(), // Simple formatting for unhandled log messages
    ),
    transports: [
        new transports.Console({ format: consoleFormat }), // Log to the console

        new transports.File({ // Log errors to a file
            filename: 'logs/error.log',
            level: 'error',
            format: fileFormat,
        }),
        // You can add more transports here
    ],
    exceptionHandlers: [
        new transports.File({ // Separate file for uncaught exceptions
            filename: 'logs/uncaught-exceptions.log',
            level: 'verbose',
            format: fileFormat,
            // handleExceptions: true,
        }),
    ],
    rejectionHandlers: [
        new transports.File({ // Separate file for unhandled rejections
            filename: 'logs/unhandled-rejections.log',
            level: 'verbose',
            format: fileFormat,
            // handleRejections: true,
        }),
    ],
    exitOnError: false, // change default to not exit when handling exceptions or rejections.
});

// Function to handle unhandled rejections
/* process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', reason);
    // Optionally, you can also log the stack trace of the promise:
    logger.error('Promise Stack:', promise.stack);
    // let the below uncaughtException handler to handle it.
    throw reason;
}); */

// Function to handle uncaught exceptions
/* process.on('uncaughtException', (error) => {
    logger.error(`Uncaught exception: ${error.message}`);
    // Optionally, you can also log the stack trace of the error:
    logger.error(`Error Stack: ${error.status}`);
    // Note: It's generally recommended to gracefully exit the process after an uncaught exception.
    process.exit(1);
}); */


export {logger};