const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            data: Buffer,
            contentType: String
        },
        color: {
            type: String,
            required: true
        },
    },
    { timeseries: true }
);
module.exports = mongoose.model("Product", productSchema)