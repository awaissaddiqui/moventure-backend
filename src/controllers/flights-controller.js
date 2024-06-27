import axios from 'axios';
import { sendResponse } from '../utilities/index.js';

// Setup axios instance for Duffel API calls
// Create an axios instance configured for the Duffel API
const duffelApi = axios.create({
    baseURL: 'https://api.duffel.com/air',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Duffel-Version': 'v1',
        'Authorization': `Bearer ${process.env.DUFFEL_ACCESS_TOKEN}`
    }
});

function formatFlightDetails(details) {
    const { offers } = details.data;
    // Map each offer to format it, including flight details, airline logos, and segment IDs
    const formattedOffers = offers.map(offer => ({
        total_amount: parseFloat(offer.total_amount), // Ensure amount is a float for accurate comparisons
        currency: offer.total_currency,
        id: details.data.id,
        flights: offer.slices.map(slice => ({
            segments: slice.segments.map(segment => ({
                segment_id: segment.id,  // Include the unique segment ID
                airline_name: segment.operating_carrier.name,
                airline_logo_url: segment.operating_carrier.logo_lockup_url, // Assuming the logo URL is available under logo_lockup_url
                origin: {
                    airport_name: segment.origin.name,
                    iata_code: segment.origin.iata_code,
                    city: segment.origin.city_name,
                    departing_time: segment.departing_at
                },
                destination: {
                    airport_name: segment.destination.name,
                    iata_code: segment.destination.iata_code,
                    city: segment.destination.city_name,
                    arriving_time: segment.arriving_at
                }
            }))
        }))
    }));

    // Sort the formatted offers based on the total_amount in ascending order
    return formattedOffers.sort((a, b) => a.total_amount - b.total_amount);
}

export const createOfferRequest = async (req, res) => {
    const { return_offers = true, supplier_timeout = 20000 } = req.validatedQuery;
    const { cabin_class, max_connections = 1, passengers, private_fares, slices } = req.validatedData;

    const payload = {
        data: {
            slices,
            passengers,
            max_connections,
            cabin_class,
            private_fares,
        }
    };

    try {
        const duffelApiResponse = await duffelApi.post(`/offer_requests?return_offers=${return_offers}&supplier_timeout=${supplier_timeout}`, payload);
        // It's important to show the operating carrier name prominently in the results as per US regulations
        const formattedFlights = formatFlightDetails(duffelApiResponse.data);
        // res.json(duffelApiResponse.data)
        sendResponse(res, 200, formattedFlights);
    } catch (error) {
        sendResponse(res, error.response ? error.response.status : 500, "Failed to create offer request", error);
    }
};

export const getOfferRequest = async (req, res) => {
    const { offerId } = req.params;  // Extract the offerId from the URL parameter

    try {
        const duffelApiResponse = await duffelApi.get(`/offer_requests/${offerId}`);
        // res.status(200).json(duffelApiResponse.data);
        sendResponse(res, 200, duffelApiResponse.data.data);
    } catch (error) {
        sendResponse(res, error.response ? error.response.status : 500, "Failed to fetch the offer request", error);
    }
};