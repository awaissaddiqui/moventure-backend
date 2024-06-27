import Joi from 'joi';

// Validator for the query parameters
export function validateFlightOfferRequestQuery(data) {
    const validDetails = Joi.object({
        return_offers: Joi.boolean().default(true),  // whether to return offers immediately
        supplier_timeout: Joi.number().integer().min(2000).max(60000).default(20000)  // timeout in milliseconds
    });

    return validDetails.validate(data, { abortEarly: false });  // Validate all inputs before returning errors
}

// Validator for the request body
export function validateFlightOfferRequestBody(data) {
    const validDetails = Joi.object({
        cabin_class: Joi.string().valid('first', 'business', 'premium_economy', 'economy').required(),
        max_connections: Joi.number().integer().min(0).default(1),

        passengers: Joi.array().items(
            Joi.object({
                age: Joi.number().integer(),
                type: Joi.string().valid('adult', 'young_adult', 'child', 'infant'),
                family_name: Joi.string(),
                given_name: Joi.string(),
                loyalty_programme_accounts: Joi.array().items(
                    Joi.object({
                        account_number: Joi.string(),
                        airline_iata_code: Joi.string().length(2)
                    })
                ).optional()
            }).or('age', 'type')  // Require either 'age' or 'type', but not necessarily both
        ).required(),

        private_fares: Joi.object().pattern(
            Joi.string().length(2),  // Airline IATA code
            Joi.array().items(
                Joi.object({
                    corporate_code: Joi.string(),
                    tour_code: Joi.string(),
                    tracking_reference: Joi.string()
                })
            )
        ).optional(),

        slices: Joi.array().items(
            Joi.object({
                origin: Joi.string().length(3).required(),
                destination: Joi.string().length(3).required(),
                departure_date: Joi.date().iso().required(),
                departure_time: Joi.object({
                    to: Joi.string(),
                    from: Joi.string()
                }).optional(),
                arrival_time: Joi.object({
                    to: Joi.string(),
                    from: Joi.string()
                }).optional()
            })
        ).required()
    });

    return validDetails.validate(data, { abortEarly: false });  // Validate all inputs before returning errors
}
