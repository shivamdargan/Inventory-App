import React, { useState, useEffect } from 'react';
import URL from "../URL"
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import create from "../assets/create.png"
import swal from 'sweetalert';
import { Redirect } from 'react-router'
const Register = () => {

  const [showOtp, setShowOtp] = useState(false)
  const [otpSessionId, setOtpSessionId] = useState();
  const [redirect, setRedirect] = useState(null);
  const [loader, setLoader] = useState(false);
  const [userEnteredData, setuserEnteredData] = useState({
    name: "",
    phoneNumber: "",
    OTP:""
})
const handleInput = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;

        setuserEnteredData({...userEnteredData, [name]:value })

    }

  const otpHandler = () => {
    
        setLoader(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
              phoneNumber : userEnteredData.phoneNumber,
            }),
            credentials: "include"
            };
            
            fetch(`${URL}/sendOTP/registerUser`, requestOptions )
            .then(async response => {
              response.json().then(data =>  {
                  
                  if(response.ok){

                      if(data.Status)
                      {
                        setOtpSessionId(data.Details)
                        swal({
                          title: "Enter OTP !",
                          text: "OTP Sent Succesfully",
                          icon: "success",
                        })
                        setShowOtp(true);
                      }
                      
                      else
                      {
                        swal({
                          title: "Failure!",
                          text: "OTP Could Not Be Sent To The Mobile Number",
                          icon: "error",
                        })
                      }           
                  }
                  else if(data.Details === "Phone Number Already Registered ? Try Again With Another Number")
                      {
                        swal({
                          title: "Failure!",
                          text: "Number Already Registered ? Try Again !",
                          icon: "error",
                        })
                      }
             
                
              })
              .catch(async (error) => {
                console.log(error);
                swal({
                    title: "Failure!",
                    text: "Something Went Wrong",
                    icon: "error",
                  })
                })
      })
  }
  


  const registerHandler = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        session_id : otpSessionId,
        otp_entered_by_user : userEnteredData.OTP,
        phoneNumber : userEnteredData.phoneNumber,
        name : userEnteredData.name
      }),
      credentials: "include"
      };
      
      fetch(`${URL}/register/user`, requestOptions )
      .then(async response => {
        response.json().then(data =>  {
            
            if(response.ok){
              console.log(data)
              if(data.auth)
              {
                swal({
                  title: "Success",
                  text: "User Registered Succesfully",
                  icon: "success",
                })
                setRedirect(<Redirect to="/login"/>)
              }
              else
              {
                swal({
                  title: "Failed",
                  text: "Incorrect Credentials",
                  icon: "warning",
                })
              }
            }
       
          else{
              throw response.json();
          }
        })
        .catch(async (error) => {
          console.log(error);
          swal({
              title: "Failure!",
              text: "Something Went Wrong",
              icon: "error",
            })
          })
})
  }  

  
  return (
      <>
      {redirect}
      <h1>Register For New Account</h1>
      <Card style={{"borderRadius":"1%","boxShadow": "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
      <CardContent>
        <Grid container spacing={2}>
                <Grid item md={6} className = "mt-4">
                  <div className='ml-4'>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" style={{"marginBottom":"10px"}}>
                            Enter Name
                          </Typography>
                          <TextField id="outlined-basic" label="Full Name" variant="outlined" name="name" value={userEnteredData.name} onChange={handleInput} style={{"marginBottom":"10px"}} />

                          
                          
                              <Typography sx={{ fontSize: 14 }} color="text.secondary"  style={{"marginBottom":"10px"}}>
                                Enter Phone Number 
                            </Typography>
                            <TextField id="outlined-basic" label="Phone Number" variant="outlined" name = "phoneNumber" value={userEnteredData.phoneNumber} onChange={handleInput} style={{"marginBottom":"10px"}}/> <br/>
                            {!showOtp ? (loader ? <LoadingButton loading variant="outlined" color = "secondary" onClick = {otpHandler}>
                                Get OTP
                              </LoadingButton>: <LoadingButton  color = "secondary" variant="outlined" onClick = {otpHandler}>
                                Get OTP
                              </LoadingButton> ): null }
                           {showOtp ?  <>
                              <Typography sx={{ fontSize: 14 }} color="text.secondary" style={{"marginBottom":"10px"}}>
                                    Enter OTP  
                                </Typography>
                                <TextField id="outlined-basic" label="6 Digit OTP" variant="outlined" name = "OTP" value={userEnteredData.OTP} onChange={handleInput} style={{"marginBottom":"10px"}}/> <br/>
                                <Button variant="contained" color="secondary" onClick={registerHandler}>
                                  Register 
                                </Button>
                            </> : null
                          }
                  </div>
                </Grid>
                <Grid item md={6}>
                  <img src = {create} height = {400} width={400} />
                </Grid>
          </Grid>
      </CardContent>
     
    </Card>
      </>
  );

}
export default Register;
