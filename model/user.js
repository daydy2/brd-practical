const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'basic',
    enum: ["basic", "vendor", "admin"]
  },
  accessToken: {
    type: String
  }
});

module.exports = mongoose.model('user', userSchema)
