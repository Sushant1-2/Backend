const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();

require("./db.js");

const productRoute = require("./routes/productRoute.js");
const orderRoute = require("./routes/orderRoutes.js");
const userRoute = require("./routes/userRoute.js");

const allowedOrigin = "https://clever-mousse-3bdc0a.netlify.app";

app.use(express.json());

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.options(
  "*",
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Hello from e-commerce project");
});

app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/user", userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Application running on port", PORT);
});
