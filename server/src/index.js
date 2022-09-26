require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const port = process.env.PORT;
const router = require("./routes");
const connect = require("./config/connectDB");
const resources = require("./utils/resources");
const enums = require("./utils/enums");

// Init app
const app = express();

// Middlware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Connect db
connect();

// Router
app.use("/api/v1", router);
app.use("*", (req, res) => {
  res.status(enums.statusCode.NOT_FOUND).json({
    success: false,
    data: "",
    msg: resources.errorMsg.notFound,
  });
});

// Listen port
app.listen(port, async () => {
  console.log(`App listening on port ${port}`);
});
