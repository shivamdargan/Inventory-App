import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../Components/Product';
import HomeLoader from "../Components/HomeLoader"
import Meta from '../Components/Meta';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import "animate.css"
import swal from 'sweetalert';
import URL from '../URL';
const MyProducts = () => {
    
    const [productInfo, setProductInfo] = useState(undefined);
    
    const getProducts = () => {

      const token = localStorage.getItem("token");
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
                   'x-access-token' : token},
        credentials: "include"
        };

      fetch(`${URL}/my/products`, requestOptions)
      .then(async response => {
          if(response.ok){
              response.json().then(data => {
                  console.log(data)
                  setProductInfo(data);
              });
           }
          else{
              throw response.json();
          }
        })
        .catch(async (error) => {
         
          const errorMessage = await error;
          console.log(errorMessage)
        })
    }
  
    useEffect(() =>{
      getProducts();
  }, [])

  const deleteProduct = (productNo) => {

    const token = localStorage.getItem("token");
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                 'x-access-token' : token},
      body:JSON.stringify({
        product_id : productNo 
      }),
      credentials: "include"
      };

    fetch(`${URL}/delete/products`, requestOptions)
    .then(async response => {
        if(response.ok){
            response.json().then(data => {
                console.log(data)
                if(data.success)
                {
                  swal({
                    title: "Success!",
                    text: "Product Deleted Succesfully",
                    icon: "success",
                  })
                  window.location.reload();
                }
            });
         }
        else{
            throw response.json();
        }
      })
      .catch(async (error) => {
       
        const errorMessage = await error;
        console.log(errorMessage)
      })
  }

    
  return (
      <>
        <Meta />
      {productInfo === undefined ? ( <HomeLoader /> )  : (
        <>
            <div className="clearfix">
              <span className="float-left">
                <h1> Products Listed By Me ({productInfo.length}) </h1>
              </span>
            </div>
        
          { !productInfo.length && <h4>No Products</h4>}
          <Row>
            {productInfo.map((product) => (
              <Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                <Product productInfo = {product} />
                <Button className = "animate__animated animate__fadeInUp" variant="outlined" color = "secondary" startIcon={<DeleteIcon />} onClick = {() => deleteProduct(product.product_id)}>
                  Delete
                </Button>
              </Col>
            ))}
          </Row>
        </>
      )}

      </>
            
  );

}
export default MyProducts;
