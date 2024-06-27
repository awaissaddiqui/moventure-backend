import mongoose from 'mongoose';
import { toJSON } from './plugins/to-json.js';

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 255,
        required: true,
    },
    description: {
        type: String,
        maxLength: 1000,
        optional: true,
    },
    country: {
        type: String,
        minLength: 2,
        maxLength: 255,
        required: true,
    },
    city: {
        type: String,
        minLength: 3,
        maxLength: 255,
        required: true,
    },
    reviewID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        optional: true,
    },
    imageUrl: {
        type: String,
        optional: true,
    },
}, { timestamps: true });

destinationSchema.plugin(toJSON);

const Destination = mongoose.model('Destination', destinationSchema);

export { Destination };
