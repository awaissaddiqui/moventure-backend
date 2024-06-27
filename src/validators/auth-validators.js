import Joi from 'joi';
import {firstName, lastName, address, dateOfBirth, email, password, phoneNumber} from './reuseable-validators.js';

export function validateLogin(data) {
    const validLogin = Joi.object({
        email,
        password,
    });
    return validLogin.validate(data);
};

export function validateSignup(data) {
    const validSignup = Joi.object({
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        address,
        email,
        password,
    });
    return validSignup.validate(data);
};
