import { sendResponse } from '../utilities/index.js';

/**
 * A middleware function to validate and sanitize user inputs.
 * It can handle validation for both query parameters and body data.
 * 
 * @param {Function} validationFunction - The Joi validation function.
 * @param {string} source - Specifies the source of the data to validate: 'body' or 'query'.
 */
export const validateAndSanitize = (validationFunction, source = 'body') =>
    (request, response, next) => {
        // Determine the source of the data to validate (default to body if not specified)
        const dataToValidate = source === 'query' ? request.query : request.body;

        // Perform validation
        const { error, value } = validationFunction(dataToValidate);
        if (error) return sendResponse(response, 400, error.details[0].message, error);

        // Assign the validated and sanitized value to a key in req to make it accessible outside this middleware.
        if (source === 'query') 
            request.validatedQuery = value;  // Store validated query parameters
        else
            request.validatedData = value;   // Store validated body data

        next();
    };
