import { Booking } from '../models/index.js';
import { sendResponse } from '../utilities/index.js';

export const getAllBookings = async (request, response) => {
    const bookings = await Booking.find();
    if (!bookings) return sendResponse(response, 404, 'Bookings not found.');

    sendResponse(response, 200, bookings);
};

export const createBooking = async (request, response) => {
    const { bookingDate, totalCost, status, destinationId } = request.validatedData;
    const { _id: userId } = request.user;

    const booking = new Booking({ userId, bookingDate, totalCost, status, destinationId });
    await booking.save();
    sendResponse(response, 201, booking.toJSON());
};

export const getBooking = async (request, response) => {
    const booking = await Booking.findById(request.params.bookingId);
    if (!booking) return sendResponse(response, 404, `Booking with id: ${request.params.bookingId} not found.`);
    sendResponse(response, 200, booking.toJSON());
};

export const updateBooking = async (request, response) => {
    const booking = await Booking.findByIdAndUpdate(
        request.params.bookingId,
        request.validatedData,
        { new: true, runValidators: true },
    );

    if (!booking) return sendResponse(response, 404, `Booking with id: ${request.params.bookingId} not found.`);

    sendResponse(response, 200, booking.toJSON());
};

export const deleteBooking = async (request, response) => {
    const booking = await Booking.findByIdAndDelete(request.params.bookingId);
    if (!booking) {
        return sendResponse(response, 404, `Booking with id: ${request.params.bookingId} not found.`);
    }

    sendResponse(response, 200, 'Booking deleted successfully.');
};
