const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    abbreviation: {
        type: String,
        required: true,
        //unique: true
    },
    description: {
        type: String,
        required: true
    },
    password: String, // Make the password field optional
    contactInformation: {
        email: String
    },
    panel: [{
        type: Schema.Types.ObjectId,
        ref: 'ClubMember',
    }],
    advisor: {
        type: String,
        required: true
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);
