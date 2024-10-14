const mongoose = require('mongoose');

// Define User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roll: {
    type: String,
    required: true,
    enum: ['ADMIN', 'USER'],
    default: 'USER',
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = {User};
