const User = require("../database/models/User")
const express = require('express')
const router = new express.Router()
const axios =  require('axios')
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth")

const sendOTPMessage = async (phone_no) => {
    console.log(phone_no)
    try {
      return await axios.get(`https://2factor.in/API/V1/${process.env.SMS_KEY}/SMS/+91${phone_no}/AUTOGEN`)
    } catch (error) {
      console.error(error)
    }
  }

  const verifyOTP = async (session_id,otp_entered_by_user) => {
    try {
      return await axios.get(`https://2factor.in/API/V1/${process.env.SMS_KEY}/SMS/VERIFY/${session_id}/${otp_entered_by_user}`)
    } catch (error) {
      console.error(error)
    }
  }

router.post('/sendOTP/registerUser', async (req,res) => {
    console.log(req.body)
    const existingUser = await User.findOne({
        where:{
            phoneNumber:req.body.phoneNumber
        }
    })

    if(existingUser === null)
    {
        otpResponse = await sendOTPMessage(req.body.phoneNumber)
        console.log(otpResponse.data);
        res.send(otpResponse.data);
    }
    else
    {
        res.status(401).send({"Details":"Phone Number Already Registered ? Try Again With Another Number"})
    }
  })

  router.post('/sendOTP/loginUser', async (req,res) => {
    const existingUser = await User.findOne({
        where:{
            phoneNumber:req.body.phoneNumber
        }
    })

    if(existingUser)
    {
        otpResponse = await sendOTPMessage(req.body.phoneNumber)
        console.log(otpResponse.data);
        res.send(otpResponse.data);
    }
    else
    {
        res.status(401).send({"Details":"Phone Number Not Registered"})
    }
  })

  
router.post('/register/user', async (req,res) => {

        verifiedOTP = await verifyOTP(req.body.session_id, req.body.otp_entered_by_user)
        console.log(verifiedOTP.data);
        if(verifiedOTP.data.Details === "OTP Matched" )
        {
                const newUser = await User.create({
                    name:req.body.name,
                    phoneNumber:req.body.phoneNumber
                });
                try
                {
                        await newUser.save();
                        // create a token
                        var token = jwt.sign({id: newUser.user_id}, process.env.SECRET_KEY, {
                          expiresIn: 86400 
                        });
                        res.status(200).send({ auth: true, token: token , user: newUser });
                }
                catch(err)
                {
                    console.log("Error:" ,err)
                    res.send(err)
                }       
        }
        else
        {
            return res.status(401).send({auth:false, Details:"Wrong OTP Entered ! Please Try Again !"});
        }
  })

  router.post('/login/user', async (req,res) => {
    
    console.log(req.body);
    const {phoneNumber, session_id , otp_entered_by_user } = req.body;
    const existingUser =  await User.findOne({
        where:{
            phoneNumber:phoneNumber
        }
    })
    try
    {
         verifiedOTP = await verifyOTP(session_id, otp_entered_by_user)
    
            if(verifiedOTP.data.Details === "OTP Matched" && existingUser )
            {
                const token = jwt.sign({id: existingUser.user_id}, process.env.SECRET_KEY, {
                    expiresIn: 86400 
                  });
                  res.status(200).send({ auth: true, token: token , user: existingUser });
            }
            else
            {
                console.log("Elseeses")
                res.status(400).send("Invalid Credentials");
            }
  }
  catch (err)
  {
    console.error(err);
    res.send(err);
  }
     
  })


  router.get('/getAll/user', async (req,res) => {
    
    const users = await User.findAll();
    console.log(users)
    res.status(200).send(users);
     
  })


  router.post('/me/user',auth, async (req,res) => {

    const loggedInUser = await User.findOne({
        where:{
            user_id: req.user.id
        }
    })
    console.log(loggedInUser);
    console.log(req.user);
    res.status(200).send( {user: loggedInUser, message: "Welcome 🙌 "});

     
  })

module.exports = router

