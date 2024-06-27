import Joi from 'joi';

import { email, password, lastName, dateOfBirth, address } from './reuseable-validators.js';

export function editUser(data) {
    const validDetails = Joi.object({
        firstName: Joi.string().min(1).max(50).optional(),
        lastName,
        dateOfBirth,
        phoneNumber: Joi.string().min(7).max(15).optional(),
        address,
        email: Joi.string().email().min(5).max(255).trim().optional(),
    });

    return validDetails.validate(data);
}

export function deleteUser(data) {
    const validDetails = Joi.object({
        email,
        password,
    });

    return validDetails.validate(data);
}