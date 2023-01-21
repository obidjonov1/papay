console.log("Web serverni boshlash");
const express = require("express");
const app = express();

// MongoDB call
const db = require("./server").db();
const mongodb = require("mongodb");

// 1-> kirish
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2-> session

// 3 -> view code
app.set("views", "views");
app.set("view engine", "ejs");

// 4 -> routing code

module.exports = app;
