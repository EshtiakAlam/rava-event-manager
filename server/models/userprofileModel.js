const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userprofileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  memberStatus: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('UserProfile', userprofileSchema);
