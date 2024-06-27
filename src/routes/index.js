import { uncaughtErrors } from '../middlewares/index.js';
import user from './user-route.js';
import auth from './auth-route.js';
import resetPassword from './reset-password-route.js';
import destination from './destination-route.js';
import booking from './booking-route.js';
import review from './review-route.js';
import accommodation from './accommodation-route.js';
import flights from './flights-route.js';
import { sendResponse } from '../utilities/format-response.js';

export default (app) => {
    // make your api endpoints/route-handlers here below:
    app.use('/api/user', user);
    app.use('/api/auth', auth);
    app.use('/api/reset-password', resetPassword);
    app.use('/api/destination', destination);
    app.use('/api/booking', booking);
    app.use('/api/review', review);
    app.use('/api/accommodation', accommodation);
    app.use('/api/flights', flights);

    // last in route handlers for handling 404 error. add other routes above it
    app.use('*', (request, response) => {
        sendResponse(response, 404, 'page not found');
    });

    // use this error handling middleware at the end of your middleware stack for catching errors thrown by them
    app.use(uncaughtErrors);
};
