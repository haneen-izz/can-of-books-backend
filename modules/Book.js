const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  email: String,
});

const bookModel = mongoose.model("book", bookSchema); //collections

module.exports = bookModel;
