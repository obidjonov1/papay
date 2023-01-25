console.log("Web serverni boshlash");
const express = require("express");
const app = express();
const router = require("./router");


// 1-> kirish
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2-> session

// 3 -> view code
app.set("views", "views");
app.set("view engine", "ejs");

// 4 -> routing code
// app.use("/resto", router__bssr); // ananaviy 
app.use("/", router);             // React

module.exports = app;
