import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import SinglePageLoader from '../Components/singlePageLoader';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import auctionImage from "../assets/auction.jpg"
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

const Input = styled('input')({
    display: 'none',
  });


const CreateAuction = () => {
    
    let date = new Date()
    date = date.toISOString();
    const [userEnteredData, setuserEnteredData] = useState({
        name: "",
        description: "",
        startBidDate: date,
        endBidDate : "",
        maxBidPrice : "",
    })

    const [imageState, setimageState] = useState()
    const [redirect, setRedirect] = useState();
    const handleInput = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;

        setuserEnteredData({...userEnteredData, [name]:value })

    }
    
    const fileHandler = (event) =>
    {
 
      const file = event.target.files;
      setimageState(file)
    }

    let data = new FormData()

    data.append('name',userEnteredData.name)
    data.append('pDesc',userEnteredData.description)
    data.append('startBidDate',userEnteredData.startBidDate)
    data.append('endDate',userEnteredData.endBidDate)
    data.append('maxBid',userEnteredData.maxBidPrice)
    if(imageState !== undefined)
    {
        for(var x = 0; x<imageState.length; x++) {
          data.append('productImage', imageState[x])
        }
    }


    const submitHandler = (event) =>
    {
        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            body:data,  
            credentials: "include"
            };
            fetch(`http://localhost:5000/insertIntoProductTable`, requestOptions )
            .then(async response => {
    
                if(response.ok){
             
                    swal({
                      title: "Success!",
                      text: "Auction Listed Succesfully",
                      icon: "success",
                    })
                    setRedirect(<Redirect to="/"/>)
                                     
                 }
                else{
                    throw response.json();
                }
              })
              .catch(async (error) => {
                console.log("error");
                swal({
                    title: "Failure!",
                    text: "Something Went Wrong",
                    icon: "error",
                  })
                })
               
    }
    
  return (
      <>
        {redirect}
          <>
            <h2>Enter All Details Of The Product</h2>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '45ch'},
                    border:"1 px solid grey",
                }}
                noValidate
                autoComplete="off" >
                <div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                                    <Typography variant="h6" component="h2">
                                        Name Of The Product
                                </Typography>   
                                    <TextField id="outlined-basic" label="Name" variant="outlined" name="name" value={userEnteredData.name} onChange={handleInput}/>
                                <Typography variant="h6" component="h2">
                                        Description Of The Product
                                </Typography>   
                                <TextField
                                    fullWidth 
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    name = "description"
                                    rows={7}
                                    placeholder="Give A Brief Description Of The Condition Of The Product And Justify Its Starting Value."
                                    value={userEnteredData.description} 
                                    onChange={handleInput}
                                    />
                                    <Typography variant="h6" component="h2">
                                        Select End Time Of Auction
                                    </Typography>  
                                    <input value = {userEnteredData.endBidDate} onChange={handleInput} type="datetime-local" id="end_auction_date" name="endBidDate"/>
                    </Grid>
                    <Grid item xs={6}>
                                <Typography variant="h6" component="h2">
                                    Starting Bid Of The Product
                                </Typography>  
                                <TextField
                                label="Amount In Rupees"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '10ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                }}
                                name = "maxBidPrice"
                                value={userEnteredData.maxBidPrice} 
                                onChange={handleInput}
                                />
    
                                <Typography variant="h6" component="h2">
                                   Upload Supporting Images Of The Product
                                </Typography> 

                                <label htmlFor="contained-button-file">
                                    <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={fileHandler} />
                                    <Button variant="outlined" component="span" color="secondary">
                                    Upload
                                    </Button>
                                </label>
                                <br/>
                                <img src = {auctionImage} className= "ml-4" style = {{"maxHeight":"400px", "maxWidth":"400px"}}/>
                    </Grid>
                </Grid>
                <a style = {{"display":"flex", "justifyContent":"center", "alignItems" :"center"}}>
                <Button variant="contained" color = "secondary" onClick={submitHandler} >Create New Auction</Button>
                </a>
                   
                </div>
            </Box>
          </>
       
      
      </>      
  );

}
export default CreateAuction;
