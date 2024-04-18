const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for Logistics Request
const logisticsRequestSchema = new Schema({
    club: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },

    items: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    }
});

// Create model
const LogisticsRequest = mongoose.model('LogisticsRequest', logisticsRequestSchema);

module.exports = LogisticsRequest;
