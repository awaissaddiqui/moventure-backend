import mongoose from 'mongoose';
import { toJSON } from './plugins/to-json.js';

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    totalCost: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'canceled'],
        required: true,
    },
    destinationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
        required: true,
    },
}, { timestamps: true });

bookingSchema.plugin(toJSON);
const Booking = mongoose.model('Booking', bookingSchema);

export { Booking };
