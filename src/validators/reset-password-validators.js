import Joi from 'joi';
import { email, password } from './reuseable-validators.js';

export function validateEmail(data) {
    const validDetails = Joi.object({
        email,
    });
    return validDetails.validate(data);
}

export function validatePassword(data) {
    const validDetails = Joi.object({
        password,
    });
    return validDetails.validate(data);
}
