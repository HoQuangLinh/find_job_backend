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

//Routes app
var usersRouter = require("./routes/usersRouter");
var companiesRouter = require("./routes/companyRouter");
var candidatesRouter = require("./routes/candidateRouter");
var categoriesRouter = require("./routes/categoriesRouter");
app.use("/api/users", usersRouter);
app.use("/api/companies", companiesRouter);
app.use("/api/candidates", candidatesRouter);
app.use("/api/categories", categoriesRouter);

//Connect to database
mongoose
  .connect(process.env.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function (result) {
    console.log("Database is connected");
  })
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server Running on port", PORT);
});
