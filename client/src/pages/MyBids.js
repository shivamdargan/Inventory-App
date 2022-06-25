import React, { useState, useEffect } from 'react';
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap';
import SinglePageLoader from '../Components/singlePageLoader';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@material-ui/core/Typography';
import noImage from "../assets/no-image.jpg"


const MyBids = () => {
    
    const [bidInfo, setBidInfo] = useState(undefined);
    
    const getBids = () => {

        fetch(`http://localhost:5000/getBidsList`, {credentials: "include"})
                  .then((response) => {
                      response.json().then((bids) => {
                          //setIssues(problems)
                          // updateIssues(problems)
                          
                          // refreshCard === true ? setRefreshCard(false) : setRefreshCard(true)
                       
                          // setIsLoadingHome(false)
                          // setIsLoadingHome(false)
                    
                          setBidInfo(bids)
                          console.log(bids)
                          
                  })
              })
      
      }

      useEffect(() =>{
        getBids();
    }, [])
      

    
  return (
      <>
      {bidInfo === undefined ? ( <SinglePageLoader /> )  : (
          <>
            <h2>All Bids Placed by the User</h2>
            
            <Col>
            {bidInfo.map((bid, index) => (
             <ListGroup className='mb-4'>
             <ListGroup.Item className='p-4'>
               <Row>
               <Col className='col-md-1'>
               <span class="badge badge-primary badge-pill">{index+1}</span>
                 </Col>
                   <Col className='col-md-3'>
                   {bid.pimgs.length ? <Image style = {{"maxHeight":"120px", "maxWidth":"200px"}} src={`data:image/png;base64,${ new Buffer(bid.pimgs[0].data).toString("base64")}`} alt="dfsjn" fluid /> : <Image style={{"maxHeight":"150px", "maxWidth":"200px"}}  src={noImage} alt="dfsjn" fluid />}
                   </Col>
                 <Col>
                    <Row>
                        Product Name : {bid.name}
                    </Row>
                    <Row>
                        Product Description : {bid.pdesc}
                    </Row>
                 </Col>
                 <Col>
                   <strong>Bid Amount : {bid.amount}</strong>
                 </Col>
               </Row>
             </ListGroup.Item>

           </ListGroup>
            ))}
               
            </Col>
          </>
      ) }
      
      </>      
  );

}
export default MyBids;
