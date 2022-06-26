const Product = require("../database/models/Product")
const express = require('express')
const router = new express.Router()
const auth = require("../middleware/auth")

router.post('/createProduct', auth, async (req,res) => {
    if(req.body.productImage)
    {
        const product = await Product.create({
            productName:req.body.name,
            productDetails:req.body.details,
            productImage:req.body.productImage,
            productOwnerId: req.user.id,
            productPrice : req.body.price,
            productQuantiy: req.body.quantity
        
           })
           await product.save();
           res.status(200).send(product)
    }
    else
    {
        const product = await Product.create({
            productName:req.body.name,
            productDetails:req.body.details,
            productImage:req.body.productImage,
            productOwnerId: req.user.id,
            productPrice : req.body.price,
            productQuantiy: req.body.quantity
        
           })
           await product.save();
           res.status(200).send(product)

    }


  })

  
router.get('/getProductsList', async (req,res) => {
    try
    {
        const products = await Product.findAll();
        res.status(200).send(products)
    }
    catch(err)
    {
        console.error(err);
    }
  })

  module.exports = router