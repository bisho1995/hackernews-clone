const mongoose = require("mongoose");
const connection = require("../db");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
  cookie: {
    type: String,
    required: false,
    default: '',
  },
  history: [String],
});

const model = connection.model('users', schema);
module.exports = model;
