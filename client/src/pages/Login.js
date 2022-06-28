import React, { useState, useEffect } from 'react';
import URL from "../URL"
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import { Redirect } from 'react-router'
import login from "../assets/login.png"
const Login = () => {

  const [showOtp, setShowOtp] = useState(false)
  const [otpSessionId, setOtpSessionId] = useState();
  const [redirect, setRedirect] = useState(null);
  const [loader, setLoader] = useState(false);

  const [userEnteredData, setuserEnteredData] = useState({
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
            
            fetch(`${URL}/sendOTP/loginUser`, requestOptions )
            .then(async response => {
              response.json().then(data =>  {
                  
                  if(response.ok){

                      console.log(data)
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
                  else if(data.Details === "Phone Number Not Registered")
                      {
                        swal({
                          title: "Failure!",
                          text: "Number Is Not Registered ? Go To Register Page To Register !",
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
  


  const loginHandler = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
        session_id : otpSessionId,
        otp_entered_by_user : userEnteredData.OTP,
        phoneNumber : userEnteredData.phoneNumber
      }),
      credentials: "include"
      };
      
      fetch(`${URL}/login/user`, requestOptions )
      .then(async response => {
        response.json().then(data =>  {
            
              console.log(data)
              if(data.auth)
              {
                swal({
                  title: "Success",
                  text: "User Logged In Succesfully",
                  icon: "success",
                })
                localStorage.setItem("token",data.token)
                setRedirect(<Redirect to="/"/>)
                window.location.reload();
              }
              else
              {
                swal({
                  title: "Failed",
                  text: "Incorrect Credentials",
                  icon: "warning",
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

  
  return (
      <>
      {redirect}
      <h1>Login Into Your Account</h1>
      <Card style={{"borderRadius":"1%","boxShadow": "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
      <CardContent>
        <Grid container spacing={2}>
                <Grid className='mt-4 ' item md={6} >
                       <div className="ml-4">   
                              <Typography sx={{ fontSize: 14 }} color="text.secondary"  style={{"marginBottom":"10px"}}>
                                Enter Phone Number 
                            </Typography>
                            <TextField
                                label="Phone Number"
                                id="outlined-start-adornment"
                                sx={{width: '27ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">+91 </InputAdornment>,
                                }}
                                name = "phoneNumber"
                                value={userEnteredData.phoneNumber} 
                                onChange={handleInput}
                                style={{"marginBottom":"10px"}}
                                />
                             <br/>
                            {!showOtp ? (loader ? <LoadingButton loading variant="outlined" color = "secondary" onClick = {otpHandler}>
                                Get OTP
                              </LoadingButton>: <LoadingButton  color = "secondary" variant="outlined" onClick = {otpHandler}>
                                Get OTP
                              </LoadingButton> ) : null }
                           {showOtp ?  <>
                              <Typography sx={{ fontSize: 14 }} color="text.secondary" style={{"marginBottom":"10px"}}>
                                    Enter OTP  
                                </Typography>
                                <TextField id="outlined-basic" label="6 Digit OTP" variant="outlined" name = "OTP" value={userEnteredData.OTP} onChange={handleInput} style={{"marginBottom":"10px"}}/> <br/>
                                <Button variant="contained" color="secondary" onClick={loginHandler}>
                                  Login 
                                </Button>
                            </> : null
                          }
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" style={{"marginBottom":"10px", "marginTop":"20px"}}>
                                   Account Not Registered ? <Link to = "/register" style={{"color":"#2B2B52"}} >Sign Up Instead</Link>
                                </Typography>
                      </div>
                </Grid>
                <Grid item md={6}>
                  <img src = {login} height = {400} width={400} />
                </Grid>
          </Grid>
      </CardContent>
     
    </Card>
      </>
  );

}
export default Login;
