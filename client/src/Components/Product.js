import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './rating';
import noImage  from "../assets/no-image.jpg"
import 'animate.css';

const Product = (props) => {

  const [image,setImage] = useState();
  const [imagePresent, setImagePresent] = useState(false);

useEffect(() => {

  if(props.productInfo.pimgs.length)
  {
    setImagePresent(true)
  }

},[])

 
  return (
    <Card className="my-3 p-3 rounded  animate__animated animate__fadeInUp">
      <Link to={`/productDetails/${props.productInfo.p_id}`}>
       {imagePresent ? <Card.Img style = {{"maxHeight":"150px", "maxWidth":"300px"}}src={`data:image/png;base64,${image[0]}`} /> : <Card.Img style={{"maxHeight":"150px", "maxWidth":"200px"}} src={noImage} /> } 
      </Link>

      <Card.Body>
        <Link to={`/productDetails/${props.productInfo.p_id}`}>
          <Card.Title as="div">
            <strong>{props.productInfo.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value= {3} text={Math.floor(10+ Math.random() * 100) + ' Reviews'} />
        </Card.Text>

        <Card.Text as="h3">Max Bid ₹{props.productInfo.maxbid}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
