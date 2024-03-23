const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Function to create schema

const clubSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    abbreviation:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    contactInformation: {
        email: String
    },
    panel: {
        type: Schema.Types.ObjectId, // Reference to User model
        ref: 'User', // Referring to the User model
        required: true
    },
    advisor: {
        type: Schema.Types.ObjectId, // Reference to User model
        ref: 'User' // Referring to the User model
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }],

    members: [{
        type: Schema.Types.ObjectId, // Reference to User model
        ref: 'User' // Referring to the User model
    }]
}, { timestamps: true }); // Automatically saves when the document is created

module.exports = mongoose.model('Club', clubSchema);
