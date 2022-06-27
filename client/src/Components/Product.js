import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './rating';
import noImage  from "../assets/no-image.jpg"
import 'animate.css';

const Product = (props) => {

  const [imagePresent, setImagePresent] = useState(false);

useEffect(() => {

  if(props.productInfo.productImage !== null)
  {
    setImagePresent(true)
  }

},[])

 
  return (
    <Card className="my-3 p-3 rounded  animate__animated animate__fadeInUp">
      <Link to={`/productDetails/${props.productInfo.product_id}`}>
       {imagePresent ? <Card.Img style = {{"maxHeight":"150px", "maxWidth":"300px"}}src= {props.productInfo.productImage} /> : <Card.Img style={{"maxHeight":"150px", "maxWidth":"200px"}} src={noImage} /> } 
      </Link>

      <Card.Body>
        <Link to={`/productDetails/${props.productInfo.product_id}`}>
          <Card.Title as="div">
            <strong>{props.productInfo.productName}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value= {3} text={Math.floor(10+ Math.random() * 100) + ' Reviews'} />
        </Card.Text>
        <br/>
        <Card.Text as="h4"><div style={{"color":"grey"}}> Price </div> ₹{props.productInfo.productPrice}</Card.Text>
        <br/>
        <Card.Text as="h4"><div style={{"color":"grey"}}> Quantity </div> {props.productInfo.productQuantity}</Card.Text>

      </Card.Body>
    </Card>
  );
};

export default Product;
