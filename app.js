const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyparser = require('body-parser');
const dotenv = require("dotenv");
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product");
dotenv.config();

mongoose.connect("mongodb://localhost:27017/shop", { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
    console.log("err", err);
});

mongoose.connection.on("connected", (err, res) => {
    console.log("MongoDB connected successfully!");
});

app.use(bodyparser.urlencoded({ extended: false }));

app.use(bodyparser.json());

app.listen(5000 || process.env.PORT, () => {
    console.log("server is running");
});

app.use("/api/Auth", authRoute);

app.use("/api/products", productRoute);



