import Joi from 'joi';

const description = Joi.string().max(1000).optional();
const reviewID = Joi.string().optional();
const imageUrl = Joi.string().uri().optional();

export function validateCreateDestination(data) {
    const destinationValidator = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        country: Joi.string().min(2).max(255).required(),
        city: Joi.string().min(3).max(255).required(),
        description,
        reviewID,
        imageUrl
    });

    return destinationValidator.validate(data);
}

export function validateUpdateDestination(data) {
    const destinationValidator = Joi.object({
        name: Joi.string().min(3).max(255).optional(),
        country: Joi.string().min(2).max(255).optional(),
        city: Joi.string().min(3).max(255).optional(),
        description,
        reviewID,
        imageUrl
    });

    return destinationValidator.validate(data);
}
