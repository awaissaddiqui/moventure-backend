import Joi from 'joi';

export function validateCreateBooking(data) {
    const bookingValidator = Joi.object({
        bookingDate: Joi.date().required(),
        totalCost: Joi.number().required(),
        status: Joi.string().valid('pending', 'confirmed', 'canceled').required(),
        destinationId: Joi.string().required(),
    });

    return bookingValidator.validate(data);
}

export function validateUpdateBooking(data) {
    const bookingValidator = Joi.object({
        bookingDate: Joi.date().optional(),
        totalCost: Joi.number().optional(),
        status: Joi.string().valid('pending', 'confirmed', 'canceled').optional(),
        destinationId: Joi.string().optional(),
    });

    return bookingValidator.validate(data);
}
