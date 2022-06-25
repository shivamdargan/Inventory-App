import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useEffect, useState } from 'react';
import '../assets/style.css';

const Header = () => {

  const [userInfo, setUserInfo] = useState({});
  
  const getProfile = () => {
    fetch(`http://localhost:5000/viewMe`,  {credentials: "include"})
    .then(async response => { 
        if(response.ok){
            response.json().then(data => {
                console.log(data)
                setUserInfo(data) 
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
    getProfile()
}, [])


const logoutHandler = () => {
  window.location.replace('http://localhost:5000/users/logout')
}
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to= '/' >
            <Navbar.Brand>The Auction House</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          
            <Nav className="ml-auto">
              {Object.keys(userInfo).length !== 0 ?  <img style = {{"maxHeight":"40px", "maxWidth":"40px", "borderRadius":"50%"}} src={userInfo.user[0].profilepiclink} /> : null }
              {Object.keys(userInfo).length !== 0  ? (
                <NavDropdown title={userInfo.user[0].name} id="username">
                    <LinkContainer to='/createNewAuction'>
                    <NavDropdown.Item>Create My Own Auction</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/myBids'>
                    <NavDropdown.Item>Bids Placed By Me</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/mySales'>
                    <NavDropdown.Item>My Listed Products</NavDropdown.Item>
                  </LinkContainer>
                    <NavDropdown.Item><div onClick={logoutHandler}>Logout</div></NavDropdown.Item>
                  
                </NavDropdown>
              ) : (
               
                  <Nav.Link href = "http://localhost:5000/auth/google">
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
              )}
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
