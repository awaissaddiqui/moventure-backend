import mongoose from 'mongoose';
import config from 'config';
import jwt from 'jsonwebtoken';

import { User } from '../../../src/models/index.js';

describe('generateAuthToken - Basic functionality', () => {
    it('Should return a valid JWT', () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
        };
        const user = new User(payload);
        const token = user.generateAuthToken();

        const decodedToken = jwt.verify(token, config.get('JWT_PRIVATE_KEY'));

        expect(decodedToken).toMatchObject(payload);
    });
});