const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Function to create schema

const clubSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    abbreviation:{
        type: String,
        required: true,
        //unique: true
    },
    description:{
        type: String,
        required: true
    },
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

}, { timestamps: true }); // Automatically saves when the document is created

module.exports = mongoose.model('Club', clubSchema);
