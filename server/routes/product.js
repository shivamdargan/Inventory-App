const Product = require("../database/models/Product")
const express = require('express')
const router = new express.Router()
const auth = require("../middleware/auth")

router.post('/createProduct', auth, async (req,res) => {
    try
    {   
        console.log("Body; dsf", req.body)
        console.log("Details: ", req.body.details);
        if(req.body.productImage)
        {
            const product = await Product.create({
                productName:req.body.name,
                productDetails:req.body.details,
                productImage:req.body.productImage,
                productOwnerId: req.user.id,
                productPrice : req.body.price,
                productQuantity: req.body.quantity
            
            })
            await product.save();
            res.status(200).send(product)
        }
        else
        {
            const product = await Product.create({
                productName:req.body.name,
                productDetails:req.body.details,
                productOwnerId: req.user.id,
                productPrice : req.body.price,
                productQuantity: req.body.quantity
            
            })
            await product.save();
            res.status(200).send(product)

        }
    }
    catch(err)
    {
        console.error("Error",err);
        res.send(err);
    }

  })

  router.get('/getProduct/:productId', async (req,res) => {
    try
    {   
        const productId = req.params.productId
        const products = await Product.findOne({
            where:{
                product_id: productId
            }
        });
        res.status(200).send(products)
    }
    catch(err)
    {
        console.error(err);
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

  router.get('/my/products',auth,  async (req,res) => {
    try
    {
        const products = await Product.findAll({
            where:{
                productOwnerId : req.user.id
            }
        });
        res.status(200).send(products)
    }
    catch(err)
    {
        console.error(err);
    }
  })

  router.post('/delete/products',auth,  async (req,res) => {
    try
    {
        const product = await Product.findOne({
            where:{
                product_id : req.body.product_id
            }
        });
        if(product.productOwnerId === req.user.id)
        {
            await product.destroy();
            res.send({success:"true",message:"Product Deleted Succesfully !"});
        }
        else
        {
            res.send({success:"false",message:"Product Requested To Delete Does Not Belong To This User !"});
        }
        
    }
    catch(err)
    {
        console.error(err);
    }
  })
  module.exports = router