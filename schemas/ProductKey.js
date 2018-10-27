const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductKey = new Schema({
  barcodeKey: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("productKey", ProductKey);
