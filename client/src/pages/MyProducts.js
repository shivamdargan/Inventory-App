import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../Components/Product';
// import ErrorMessage from '../Components/errorMessage';
import HomeLoader from "../Components/HomeLoader"
import Meta from '../Components/Meta';

const MyProducts = () => {
    
    const [productInfo, setProductInfo] = useState(undefined);
    
    const getProducts = () => {
      fetch(`http://localhost:5000/getUserProductsList`,  {credentials: "include"})
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
                <h1> My Active Auctions ({productInfo.length}) </h1>
              </span>
            </div>
        
          { !productInfo.length && <h4>No Products</h4>}
          <Row>
            {productInfo.map((product) => (
              <Col key={product.p_id} sm={12} md={6} lg={4} xl={3}>
                <Product productInfo = {product} />
              </Col>
            ))}
          </Row>
        </>
      )}
      {/* <h1>hsh</h1> */}
      </>
            
  );

}
export default MyProducts;
