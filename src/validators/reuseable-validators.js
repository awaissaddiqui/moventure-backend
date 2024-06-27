import Joi from 'joi';

// Reusable validators
export const email = Joi.string().email().min(5).max(255).required();
export const password = Joi.string().min(8).max(255).required();
export const firstName = Joi.string().min(3).max(50).required();
export const lastName = Joi.string().min(3).max(50).optional();
export const dateOfBirth = Joi.date().optional();
export const phoneNumber = Joi.string().min(7).max(15).optional();
export const address = Joi.string().min(5).max(255).optional();