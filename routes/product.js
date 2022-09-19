const express = require("express");
const router = express.Router();
const productController = require("../controller/product_controller");
const authenticate = require("../middelware/authenticate");

router.post("/addProduct", authenticate.verifyTokenAndAdmin, productController.addProduct);

router.post("/favProduct", authenticate.verifyTokenAndAdmin, productController.favProduct)

router.get("/", authenticate.verifyTokenAndAuthorization, productController.getAllProduct);

router.get("/:id", authenticate.verifyTokenAndAdmin, productController.getProductById);

router.delete("/:id", authenticate.verifyTokenAndAdmin, productController.deleteProductById)

router.put("/:id", authenticate.verifyTokenAndAdmin, productController.updateProduct);

router.get("/search/:key", authenticate.verifyTokenAndAuthorization, productController.searchProductByKey)

//router.post("/favProduct",authenticate.verifyToken, productController.favoriteProduct)


module.exports = router;