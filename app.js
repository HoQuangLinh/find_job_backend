const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");

//Log web
app.use(morgan("tiny"));

//Evironment variables
require("dotenv").config();

//Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); //to support JSON encode

//CORS
var cors = require("cors");
app.use(cors());
app.get("/", (req, res) => res.send("Hello from homepage"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  
  console.log("Server Running on port", PORT);
});