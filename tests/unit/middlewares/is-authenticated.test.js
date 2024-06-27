import mongoose from 'mongoose';
import { jest } from '@jest/globals';

import { isAuthenticated } from '../../../src/middlewares/index.js';
import { User } from '../../../src/models/index.js';

describe('isAuthenticate', () => {
    it('Should populate req.user with the payload of valid JWT', () => {
        const user = {
            _id: new mongoose.Types.ObjectId().toHexString(),
        };
        const token = new User(user).generateAuthToken();

        const request = {
            header: jest.fn().mockReturnValue(token),
        };
        const res = {};
        const next = jest.fn();

        isAuthenticated(request, res, next);

        expect(request.user).toMatchObject(user);
    });
});