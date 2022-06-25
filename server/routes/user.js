const User = require("../database/models/User")
const express = require('express')
const router = new express.Router()

router.post('/register/user', async (req,res) => {

    const existingUser = await User.findOne({
        where:{
            phoneNumber:req.body.phoneNumber
        }
    })
    console.log(existingUser)

    if(existingUser === null)
    {
        const newUser = await User.create({
            name:req.body.name,
            password:req.body.password,
            phoneNumber:req.body.phoneNumber
        });
        try
        {
           
            await newUser.save();
            res.status(200).send(newUser)
        }
        catch(err)
        {
            console.log("Error:" ,err)
            res.send(err)
        }
    }
    else
    {
        res.status(401).send("Phone Number Already Registered ? Try Again With Another Number")
    }

   
     
  })

  router.get('/getAll/user', async (req,res) => {
    
    const users = await User.findAll();
    console.log(users)
    res.status(200).send(users);
     
  })

module.exports = router