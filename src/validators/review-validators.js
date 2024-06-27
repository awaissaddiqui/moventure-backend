import Joi from 'joi';

export function validateCreateReview(data) {
    const reviewValidator = Joi.object({
        entityId: Joi.string().required(),
        entityType: Joi.string().valid('flight', 'destination', 'accommodation').required(),
        comment: Joi.string().required(),
        rating: Joi.number().integer().min(1).max(5).required(),
    });

    return reviewValidator.validate(data);
}

export function validateUpdateReview(data) {
    const reviewValidator = Joi.object({
        comment: Joi.string().optional(),
        rating: Joi.number().integer().min(1).max(5).optional(),
    });

    return reviewValidator.validate(data);
}
