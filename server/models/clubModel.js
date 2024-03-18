const mongoose = require("mongoose")
const Schema = mongoose. Schema //function to create schema
const clubSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    registration_number:{
        type: Number,
        required: true,
        unique: true
    },
    roles: [{
        name: String,
        position: String,
        contact: String
    }],
    events: [{
        title: String,
        date: Date,
        location: String
    }],
    contactInformation: {
        email: String,
        socialMedia: String
    },
    members: [{
        name: String,
        email: String
    }]

},{timestamps: true}) // automatically saves when the document is created
module.exports = mongoose.model('Club', clubSchema)