var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var nestSchema = new Schema({
  materials : String,
  location : String,
});

var nest_Schema = mongoose.model('Nest', nestSchema);
module.exports = nest_Schema
