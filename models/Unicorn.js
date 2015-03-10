'use strict';

var mongoose = require('mongoose');

var unicornSchema = new mongoose.Schema({
  unicornName: String,
  author: {type: String, default: 'Brandon Burns'}
});

module.exports = mongoose.model('Unicorn', unicornSchema);