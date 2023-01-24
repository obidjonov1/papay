console.log("Web serverni boshlash");
const express = require("express");
const app = express();
const router = require("./router");

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
app.use("/", router);

module.exports = app;
