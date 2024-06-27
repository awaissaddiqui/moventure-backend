import {User} from '../../../src/models/index.js';

import request from 'supertest';
import mongoose from 'mongoose';


describe('/api/user/', ()=>{
    let server;
    let name, email, password, user;
    const endPoint = '/api/user/';

    beforeEach(async ()=>{
        server = await require('../../../index');

        name = 'Name';
        email = 'email@gmail.com';
        password = 'password123456';

        user = new User({name, email, password});
    });

    afterEach(async ()=>{
        await User.deleteMany({});
        await server.close();
    });

    describe('GET /me', ()=>{
        let token, userId;

        const happyPath = () => {
            return request(server)
                .get(endPoint + 'me/')
                .set('x-auth-token', token)
                .send();
        };

        beforeEach(async ()=>{
            userId = new mongoose.Types.ObjectId();
            user._id = userId;
            await user.save();

            token = new User({_id: userId}).generateAuthToken();
        });

        it('should return 401 if user is not loged in (have no token)', async()=>{
            token = '';
            const res = await happyPath();

            expect(res.status).toBe(401);
            expect(res.text).toMatch(/Access denied. No token provided./);
        });

        it('should return 400 if invalid token is provided', async()=>{
            token = 'invalidToken1234';
            const res = await happyPath();

            expect(res.status).toBe(400);
            expect(res.text).toMatch(/invalid token/);
        });

        it('should return 404 if user is not found (have not yet signed up)', async()=>{
            userId = new mongoose.Types.ObjectId();
            token = User({Id: userId}).generateAuthToken();
            const res = await happyPath();

            expect(res.status).toBe(404);
            expect(res.text).toMatch(/user is not registered/);
        });

        it('should return 200 with user\'s data except password', async()=>{
            const res = await happyPath();

            expect(res.status).toBe(200);
            expect(Object.keys(res.body)).toEqual(expect.arrayContaining([
                '_id', 'name', 'email',
            ]));
            expect(res.body.password).toBeUndefined();
        });
    });
    describe('POST /', ()=>{

        const happyPath = () => {
            return request(server)
                .post(endPoint)
                .send({
                    name, email, password,
                });
        };

        it('should return 400 if name is invalid or not provided', async ()=>{
            name = '';
            const res = await happyPath();

            expect(res.statusCode).toBe(400);
            expect(res.text).toMatch(/"name" is not allowed to be empty/);
        });

        it('should return 400 if email is invalid or not provided', async ()=>{
            email = '';
            const res = await happyPath();

            expect(res.statusCode).toBe(400);
            expect(res.text).toMatch(/"email" is not allowed to be empty/);
        });

        it('should return 400 if password is invalid or not provided', async ()=>{
            password = '';
            const res = await happyPath();

            expect(res.statusCode).toBe(400);
            expect(res.text).toMatch(/"password" is not allowed to be empty/);
        });

        it('should return 400 if user is already registered', async ()=>{
            await user.save();
            const res = await happyPath();

            expect(res.statusCode).toBe(400);
        });

        it('should add salt and hash the password', async ()=>{
            const res = await happyPath();
            const userInDatabase = await User.findOne({email: email});

            expect(userInDatabase.password).not.toEqual(password);
            expect(res.body.password).toBeUndefined();
        });

        it('should set x-auth-token in headers', async ()=>{
            const res = await happyPath();

            expect(res.headers['x-auth-token']).not.toBeNull();
        });

        it('should return 200 when a new user is saved', async ()=>{
            const res = await happyPath();

            expect(res.statusCode).toBe(200);
        });

        it('should return user object containing name, email, _id but not password', async ()=>{
            const res = await happyPath();

            expect(Object.keys(res.body)).toEqual(expect.arrayContaining([
                '_id', 'name', 'email',
            ]));
            expect(res.body.password).toBeUndefined();
        });
    }); //  end of POST /

}); // end of /api/user