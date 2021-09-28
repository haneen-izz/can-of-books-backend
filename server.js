"use strict";

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const bookModel = require("./modules/Book");

const server = express();
server.use(cors());
const PORT = process.env.PORT;

mongoose.connect("mongodb://localhost:27017/books");
//books is the name of the database

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  email: String,
});

// const bookModel = mongoose.model("book", bookSchema); //collections

function seedBookInformation() {
  const CodeComplete = new bookModel({
    title: "CodeComplete",
    description:
      " a Practical Handbook of Software Construction, 2nd Edition” by Steve McConnell is one of the books every programmer should probably have skimmed through once in their life.",
    status: "still valid today",
    email: "haneenjaradeh1@gmail.com",
  });
  const Refactoring = new bookModel({
    title: "Refactoring",
    description:
      "Refactoring is a vital programming concept for understanding the underlying aspects of writing clean, robust code.",
    status: "still valid today",
    email: "haneenjaradeh1@gmail.com",
  });

  const AlgorithmsToLiveBy = new bookModel({
    title: "AlgorithmsToLiveBy",
    description:
      "this book delves into the problem-solving techniques behind algorithms, connecting psychology and computer science.",
    status: "still valid today",
    email: "haneenjaradeh1@gmail.com",
  });

  CodeComplete.save();
  Refactoring.save();
  AlgorithmsToLiveBy.save();
}
// seedBookInformation();

server.get("/", homeHandler);
//read data from database
server.get("/getBook", getBooksHandler);

function homeHandler(req, res) {
  res.send("all good");
}
//find the books
//http://localhost:3001/getBook?email=haneenjaradeh1@gmail.com
function getBooksHandler(req, res) {
  let emailOwner = req.query.email;
  bookModel.find({ email: emailOwner }, function (error, emailData) {
    if (error) {
      console.log("error in getting data", error);
    } else {
      console.log(emailData);
      res.send(emailData);
    }
  });
}

server.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
