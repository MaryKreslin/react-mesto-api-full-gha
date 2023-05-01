const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный адрес URL',
    },
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: mongoose.SchemaTypes.Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
