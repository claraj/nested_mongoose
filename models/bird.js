var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Nest = require('./nest.js');

var birdSchema = new Schema({
  name : String,
  eggs : Number,
  nest_data : {
    type: Schema.Types.ObjectId,
    ref : 'Nest' }
});

var bird_Schema = mongoose.model('Bird', birdSchema);

module.exports = bird_Schema
