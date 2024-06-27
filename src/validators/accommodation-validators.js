import Joi from 'joi';

export function validateCreateAccommodation(data) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(255).required(),
        type: Joi.string().valid('hotel', 'hostel', 'guesthouse', 'apartment').required(),
        address: Joi.string().max(1000).required(),
        city: Joi.string().min(1).max(255).required(),
        country: Joi.string().min(1).max(255).required(),
        pricePerNight: Joi.number().positive().required(),
        reviewId: Joi.string().alphanum().optional(),
    });
    return schema.validate(data);
}

export function validateUpdateAccommodation(data) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(255).optional(),
        type: Joi.string().valid('hotel', 'hostel', 'guesthouse', 'apartment').optional(),
        address: Joi.string().max(1000).optional(),
        city: Joi.string().min(1).max(255).optional(),
        country: Joi.string().min(1).max(255).optional(),
        pricePerNight: Joi.number().positive().optional(),
        reviewId: Joi.string().alphanum().optional(),
    });
    return schema.validate(data);
}
