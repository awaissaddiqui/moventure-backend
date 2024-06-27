// routes/flightRoutes.js
import express from 'express';
import { asyncHandler, validateAndSanitize } from '../middlewares/index.js';
import { validateFlightOfferRequestBody, validateFlightOfferRequestQuery } from '../validators/index.js';
import { flightsController } from '../controllers/index.js';

const router = express.Router();

router.post(
    '/offers',
    [validateAndSanitize(validateFlightOfferRequestBody), validateAndSanitize(validateFlightOfferRequestQuery, 'query')],
    asyncHandler(flightsController.createOfferRequest)
);

router.get(
    '/offers/:offerId',
    asyncHandler(flightsController.getOfferRequest)
);

export default router;
