import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../Components/Product';
// import ErrorMessage from '../Components/errorMessage';
import HomeLoader from "../Components/HomeLoader"
import Meta from '../Components/Meta';
import URL from "../URL"

const Home = () => {
    
    const [productInfo, setProductInfo] = useState(undefined);
    
    const getProducts = () => {
      fetch(`${URL}/getProductsList`,  {credentials: "include"})
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

    
  return (
      <>
        <Meta />
      {productInfo === undefined ? ( <HomeLoader /> )  : (
        <>
            <div className="clearfix">
              <span className="float-left">
                <h1>Current Inventory ({productInfo.length}) </h1>
              </span>
            </div>
        
          { !productInfo.length && <h4>No Products</h4>}
          <Row>
            {productInfo.map((product) => (
              <Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                <Product productInfo = {product} />
              </Col>
            ))}
          </Row>
        </>
      )}
      </>
            
  );

}
export default Home;
