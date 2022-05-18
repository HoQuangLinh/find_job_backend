const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");

const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");

//Add swagger
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
app.use("/api/users", usersRouter);

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
