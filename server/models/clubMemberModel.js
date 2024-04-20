const mongoose = require('mongoose');

const clubMembersSchema = new mongoose.Schema({
    clubID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club', // This references the Club model
        required: true
    },
    studentID: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    }
});

const ClubMember = mongoose.model('ClubMember', clubMembersSchema);

module.exports = ClubMember;
