const router = require("express").Router();
const Product = require("../models/Product");
const multer = require('multer');
const path = require('path');
const fs = require("fs");

const addProduct = (req, res, next) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            var dir = "./uploads";

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            cb(null, dir)
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    });

    // File upload configuration
    var upload = multer({
        storage: storage
    }).array("image", 4)

    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        } else {
            const newProduct = new Product({
                productName: req.body.productName,
                price: req.body.price,
                image: {
                    data: req.file,
                    contentType: 'image/png'

                },
                color: req.body.color
            })
            newProduct.save()
                .then(() => res.status(200).json({ success: true, message: "Product added succesfully" }))
                .catch(err => {
                    res.status(200).json({
                        success: true, message: err
                    })
                })
        }
    })

}

const updateProduct = async (req, res, next) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updateProduct);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

const deleteProductById = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true, message: "product has been deleted..." });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        const { pass, ...other } = product._doc;
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

const getAllProduct = async (req, res, next) => {
    try {
        const product = await Product.find();
        //    const {pass,...other}=product._doc;
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

const searchProductByKey = async (req, res, next) => {
    try {
        const product = await Product.find({
            "$or": [
                {
                    color: { $regex: req.params.key }
                }
            ]
        })
        res.status(200).json(product);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: err.message });
    }
}

const favProduct = async (req, res, next) => {
    try {
        const newProduct = new Product({
            productName: req.body.productName
        });
        res.status(200).json(newProduct);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: err.message });
    }
}
module.exports = {
    addProduct, getAllProduct, getProductById, searchProductByKey, updateProduct, deleteProductById, favProduct

}
