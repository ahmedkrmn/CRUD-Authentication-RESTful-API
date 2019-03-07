const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const ProducerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  genres: {
    type: [String],
    required: true
  },
  djmagrating: {
    type: Number,
    default: 101
  }
});
ProducerSchema.plugin(timestamp);

const Producer = mongoose.model("Artist", ProducerSchema);
module.exports = Producer;
