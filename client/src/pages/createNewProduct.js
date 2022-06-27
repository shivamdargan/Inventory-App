import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import logistics from "../assets/logistics.svg"
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import URL from '../URL';

const Input = styled('input')({
    display: 'none',
  });


const CreateNewProduct = () => {

    const [userEnteredData, setuserEnteredData] = useState({
        name: "",
        description: "",
        price : "",
        quantity:"",
        imageLink:""
    })



    const [redirect, setRedirect] = useState();
    const handleInput = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;

        setuserEnteredData({...userEnteredData, [name]:value })

    }


    const submitHandler = (event) =>
    {
        event.preventDefault()
        let image;
        if(userEnteredData.imageLink === "" )
        {
          image = null;
        }
        else
        {
          image = userEnteredData.imageLink
        }
        const token = localStorage.getItem("token");
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                     'x-access-token' : token},
          body : JSON.stringify({
                name: userEnteredData.name,
                details: userEnteredData.description,
                productImage: image,
                price: userEnteredData.price,
                quantity: userEnteredData.quantity
          }),
          credentials: "include"
          };
            fetch(`${URL}/createProduct`, requestOptions )
            .then(async response => {
              response.json().then(data => {
                console.log(data)
                if(response.ok){
             
                  swal({
                    title: "Success!",
                    text: "New Product Listed Succesfully",
                    icon: "success",
                  })
                  setRedirect(<Redirect to="/"/>)
                                   
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
                                        Name Of The Product <stlye style = {{"color":"red"}}>*</stlye>
                                </Typography>   
                                    <TextField id="outlined-basic" label="Name" variant="outlined" name="name" value={userEnteredData.name} onChange={handleInput}/>
                                <Typography variant="h6" component="h2">
                                        Description Of The Product <stlye style = {{"color":"red"}}>*</stlye>
                                </Typography>   
                                <TextField
                                    fullWidth 
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    name = "description"
                                    rows={7}
                                    placeholder="Give A Brief Description Of The Condition Of The Product"
                                    value={userEnteredData.description} 
                                    onChange={handleInput}
                                    />
                                    <Typography variant="h6" component="h2">
                                        Enter The Quantity <stlye style = {{"color":"red"}}>*</stlye>
                                    </Typography>  
                                    <TextField
                                label="Quantity"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '10ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Unit</InputAdornment>,
                                }}
                                name = "quantity"
                                value={userEnteredData.quantity} 
                                onChange={handleInput}
                                />

                                    
                    </Grid>
                    <Grid item xs={6}>
                                <Typography variant="h6" component="h2">
                                   Price Of The Product <stlye style = {{"color":"red"}}>*</stlye>
                                </Typography>  
                                <TextField
                                label="Amount In Rupees"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '10ch' }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                }}
                                name = "price"
                                value={userEnteredData.price} 
                                onChange={handleInput}
                                />
    
                                <Typography variant="h6" component="h2">
                                   Link Of The Supporting Image Of The Product
                                </Typography> 
                                <TextField id="outlined-basic" label="Image Link" variant="outlined" name="imageLink" value={userEnteredData.imageLink} onChange={handleInput}/>
                                
                                <br/>
                                <img src = {logistics} className= "ml-4" style = {{"maxHeight":"400px", "maxWidth":"400px"}}/>
                    </Grid>
                </Grid>
                <a style = {{"display":"flex", "justifyContent":"center", "alignItems" :"center"}}>
                <Button variant="contained" color = "secondary" onClick={submitHandler} >Create New Product</Button>
                </a>
                   
                </div>
            </Box>
          </>
       
      
      </>      
  );

}
export default CreateNewProduct;
