import { Review } from '../models/index.js';
import { sendResponse } from '../utilities/index.js';

export const getAllReviews = async (request, response) => {
    const reviews = await Review.find();
    if (!reviews) return sendResponse(response, 404, 'Reviews not found.');

    sendResponse(response, 200, reviews);
};

export const createReview = async (request, response) => {
    const { entityId, entityType, rating, comment } = request.validatedData;
    const { _id: userId } = request.user;

    const review = new Review({ userId, entityId, entityType, rating, comment });
    await review.save();
    sendResponse(response, 201, review.toJSON());
};

export const getReview = async (request, response) => {
    const review = await Review.findById(request.params.reviewId);
    if (!review) return sendResponse(response, 404, `Review with id: ${request.params.reviewId} not found.`);
    sendResponse(response, 200, review.toJSON());
};

export const updateReview = async (request, response) => {
    const review = await Review.findByIdAndUpdate(
        request.params.reviewId,
        request.validatedData,
        { new: true, runValidators: true },
    );
    if (!review) return sendResponse(response, 404, `Review with id: ${request.params.reviewId} not found.`);
    sendResponse(response, 200, review.toJSON());
};

export const deleteReview = async (request, response) => {
    const review = await Review.findByIdAndDelete(request.params.reviewId);
    if (!review) return sendResponse(response, 404, `Review with id: ${request.params.reviewId} not found.`);
    sendResponse(response, 200, 'Review deleted successfully.');
};
