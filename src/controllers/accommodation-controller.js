import { Accommodation } from '../models/index.js';
import { sendResponse } from '../utilities/index.js';

export const getAllAccommodations = async (request, response) => {
    const accommodations = await Accommodation.find();
    if (!accommodations.length)return sendResponse(response, 404, 'No accommodations found.');
    sendResponse(response, 200, accommodations);
};

export const createAccommodation = async (request, response) => {
    const accommodation = new Accommodation(request.validatedData);
    await accommodation.save();
    sendResponse(response, 201, accommodation);
};

export const getAccommodation = async (request, response) => {
    const { accommodationId } = request.params;
    const accommodation = await Accommodation.findById(accommodationId);
    if (!accommodation) {
        return sendResponse(response, 404, 'Accommodation not found.');
    }
    sendResponse(response, 200, accommodation);
};

export const updateAccommodation = async (request, response) => {
    const { accommodationId } = request.params;
    const updateFields = { ...request.validatedData };
    
    const accommodation = await Accommodation.findByIdAndUpdate(
        accommodationId, 
        updateFields, 
        { new: true, runValidators: true }
    );
    if (!accommodation) return sendResponse(response, 404, 'Accommodation not found.');
    sendResponse(response, 200, accommodation);
};

export const deleteAccommodation = async (request, response) => {
    const { accommodationId } = request.params;
    const accommodation = await Accommodation.findByIdAndDelete(accommodationId);
    if (!accommodation) return sendResponse(response, 404, 'Accommodation not found.');
    sendResponse(response, 200, 'Accommodation deleted successfully.');
};
