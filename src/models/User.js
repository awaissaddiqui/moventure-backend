import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { toJSON } from './plugins/to-json.js';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 1,
        maxLength: 50,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        minLength: 1,
        maxLength: 50,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
    },
    phoneNumber: {
        type: String,
        minLength: 7,
        maxLength: 15,
        trim: true,
    },
    address: {
        type: String,
        minLength: 5,
        maxLength: 255,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 255,
        required: true,
        trim: true,
        private: true,
    },
}, { timestamps: true },
);

userSchema.plugin(toJSON);

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = new mongoose.model('User', userSchema);
export { User };
