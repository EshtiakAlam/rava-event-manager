const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubLoginSchema = new Schema({
    abbreviation: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    club: {
        type: Schema.Types.ObjectId,
        ref: 'Club',
        //required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('ClubLogin', clubLoginSchema);
