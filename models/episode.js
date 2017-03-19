const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const episodeSchema = new Schema({
  guest: String,
  pageUrl: String,
  audioUrl: String,
  billboardLocation: String,
  billboard: String
});

const Episode = mongoose.model("Episode", episodeSchema);
module.exports = Episode;
