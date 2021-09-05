const mongoose = require("mongoose");

const snipeetSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
});
const Document = mongoose.model("Document", snipeetSchema);
module.exports = Document;
