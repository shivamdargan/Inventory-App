import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap';
import Rating from '../Components/rating';
import { Select, Button, FormControl, makeStyles, MenuItem, TextField} from '@material-ui/core/';
import SinglePageLoader from "../Components/singlePageLoader";
import noImage from "../assets/no-image.jpg"
import swal from 'sweetalert';
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

  const classes = useStyles();

  const [prodDetails, setProdDetails] = useState({
    name:"",
    desc:"",
    maxBid:"",
    endDate:"",
    
})

const [img, setImg] = useState(false);
const [imagePresent, setImagePresent] = useState(false);
const [amount, setAmount] = useState(0);




  
const getProduct = () => {

  fetch(`http://localhost:5000/getProduct/${productId}`, {credentials: "include"})
            .then((response) => {
                response.json().then((problems) => {
                    console.log(problems[0])
                     
                    setProdDetails({
                      name:problems[0].name,
                      desc:problems[0].pdesc,
                      maxBid:problems[0].maxbid,
                      endDate: problems[0].enddate
                    })

                    


                    if(problems[0].pimgs.length)
                     {
                        setImagePresent(true)
                        
                        let imagesFinal = []
                        imagesFinal[0] = new Buffer(problems[0].pimgs[0]).toString("base64")
                        setImg(imagesFinal)
                      }
                    setLoading(false)
            })
        })

}


        useEffect(() =>{
          getProduct();
      }, [])



      const placeBid = () => {


        console.log(productId)
        const requestOptions = {
          method: 'POST',
          body:JSON.stringify({ 
            amount: amount,
            p_id:productId
           }),  
          credentials: "include",
          headers: { 'Content-Type': 'application/json' },
          };
          fetch(`http://localhost:5000/insertIntoBidTable`, requestOptions )
          .then(async response => {
  
              if(response.ok){
           
                  swal({
                    title: "Success!",
                    text: "Bid Placed Successfully",
                    icon: "success",
                  })
                  window.location.reload(); 
               }
              
              else{
                  throw response.json();
              }
            })
            .catch(async (error) => {
              const errorMessage = await error;
     
              swal({
                title: "Error!",
                text: errorMessage.toString(),
                icon: "error",
              });
             
            }) 







      }


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
              {imagePresent ? <Image src={`data:image/png;base64,${img}`} alt="dfsjn" fluid /> : <Image src={noImage} alt="dfsjn" fluid />}
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{prodDetails.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={3.5}
                    text={`78 reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: {prodDetails.maxBid} Rs</ListGroup.Item>
                <ListGroup.Item>Description: {prodDetails.desc}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₹ {prodDetails.maxBid}</strong>
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
                      <Col>End Date Of Auction:</Col>
                      <Col>
                      <Moment parse="YYYY-MM-DD HH:mm">
                          {prodDetails.endDate}
                     </Moment>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>

                <ListGroup variant="flush">
                  <ListGroup.Item>
                  <TextField
              autoComplete="bidAmount"
              name="bidAmount"
              variant="outlined"
              type="number"
              required
              id="bidAmount"
              placeholder="Bid Amount"
              label="Bid Amount"
              onChange={(e) => setAmount(e.target.value)}
            />
                  </ListGroup.Item>

                </ListGroup>

                <ListGroup variant="flush">
                  <ListGroup.Item>
                  <Button variant="contained" color="primary" onClick={placeBid}>
              Place Bid
            </Button>
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
