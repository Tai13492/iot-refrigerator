const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductExpiryDate = new Schema({
  name: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("productExpiryDate", ProductExpiryDate);
