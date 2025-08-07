const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
require("./db.js");
const cors = require("cors");
const productRoute = require("./routes/productRoute.js");
const orderRoute = require("./routes/orderRoutes.js");
const userRoute = require("./routes/userRoute.js");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send("Hello from e-commerce project");
});

app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log("Application running on port", PORT);
});
