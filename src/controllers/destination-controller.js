import { Destination } from '../models/index.js';
import { sendResponse } from '../utilities/index.js';

export const getAllDestinations = async (request, response) => {
    const destinations = await Destination.find();
    if (!destinations) return sendResponse(response, 404, 'Destinations not found.');
    sendResponse(response, 200, destinations);
};

export const createDestination = async (request, response) => {
    const destination = new Destination(request.validatedData);
    await destination.save();
    sendResponse(response, 201, destination.toJSON());
};

export const getDestination = async (request, response) => {
    const destination = await Destination.findById(request.params.destinationId);
    if (!destination) return sendResponse(response, 404, `Destination with id: ${request.params.destinationId} isn't found.`);
    sendResponse(response, 200, destination.toJSON());
};

export const updateDestination = async (request, response) => {
    const destination = await Destination.findById(request.params.destinationId);
    if (!destination) return sendResponse(response, 404, `Destination with id: ${request.params.destinationId} isn't found.`);

    Object.assign(destination, request.validatedData);
    await destination.save();
    sendResponse(response, 200, destination.toJSON());
};

export const deleteDestination = async (request, response) => {
    const destination = await Destination.findById(request.params.destinationId);
    if (!destination) return sendResponse(response, 404, `Destination with id: ${request.params.destinationId} isn't found.`);

    await destination.deleteOne();
    sendResponse(response, 200, 'Destination deleted successfully.');
};
