import express from 'express';
import { bookingController } from '../controllers/index.js';
import { validateAndSanitize, isAuthenticated, asyncHandler, isValidId } from '../middlewares/index.js';
import { validateCreateBooking, validateUpdateBooking } from '../validators/index.js';

const router = express.Router();

router.get(
    '/',
    asyncHandler(bookingController.getAllBookings),
);

router.post(
    '/',
    [isAuthenticated, validateAndSanitize(validateCreateBooking)],
    asyncHandler(bookingController.createBooking),
);

router.get(
    '/:bookingId',
    [isValidId, isAuthenticated],
    asyncHandler(bookingController.getBooking),
);

router.put(
    '/:bookingId',
    [isAuthenticated, isValidId, validateAndSanitize(validateUpdateBooking)],
    asyncHandler(bookingController.updateBooking),
);

router.delete(
    '/:bookingId',
    [isValidId, isAuthenticated],
    asyncHandler(bookingController.deleteBooking),
);

export default router;
