import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap';
import Rating from '../Components/rating';
import {  Button,  makeStyles, TextField} from '@material-ui/core/';
import SinglePageLoader from "../Components/singlePageLoader";
import noImage from "../assets/no-image.jpg"
import Moment from 'react-moment';  


const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 85,
    top: -17,
    left: 6,
    position: 'absolute',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ProductDetails = () => {

  const params = useParams();
  const productId = params.productId;
  const [loading, setLoading] = useState(true);

  

  const [prodDetails, setProdDetails] = useState({
    image:""
    
})

const [prodName, setProdName] = useState();
const [prodDesc, setProdDesc] = useState();
const [prodPrice, setProdPrice] = useState();
const [prodQuantity, setProdQuantity] = useState();
const [prodDate, setProdDate] = useState();

const [img, setImg] = useState(false);
const [imagePresent, setImagePresent] = useState(false);
const [amount, setAmount] = useState(0);




  
const getProduct = () => {

  fetch(`http://localhost:5000/getProduct/${productId}`, {credentials: "include"})
            .then((response) => {
                response.json().then((data) => {
                    console.log(data)

                    setProdName(data.productName)
                    setProdDesc(data.productDetails)
                    setProdPrice(data.productPrice)
                    setProdQuantity(data.productQuantity)
                    setProdDate(data.createdAt);

                    if(data.productImage !== null)
                     {
                        setImagePresent(true)
                        setProdDetails({...prodDetails, 
                            image:data.productImage })
                      }
                    setLoading(false)
            })
        })

}

        useEffect(() =>{
          getProduct();
      }, [])


  return (
    <>

      <Link className="btn btn-light my-3" to= '/'>
        Go Back
      </Link>
      {loading ? (
        <SinglePageLoader />
      ) : (
        <>
          <Row>
            <Col md={6}>
              {imagePresent ? <Image src={prodDetails.image} alt="productImage" fluid /> : <Image src={noImage} alt="productImage" fluid />}
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{prodName}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={3.5}
                    text={`78 reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: {prodPrice} Rs</ListGroup.Item>
                <ListGroup.Item>Description: {prodDesc}</ListGroup.Item>
                <ListGroup.Item>Quantity: {prodQuantity}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₹ {prodPrice}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                </ListGroup>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <a style ={{"color":"green", "fontWeight":"bold"}}>Active</a>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                </ListGroup>

                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Product Listing Date</Col>
                      <Col>
                      <Moment parse="YYYY-MM-DD HH:mm">
                          {prodDate}
                     </Moment>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>

              </Card>
            </Col>
          </Row>
         
        </>
      )}
    </>
  );
};
export default ProductDetails;
