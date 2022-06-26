import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useEffect, useState } from 'react';
import URL from "../URL"

import '../assets/style.css';

const Header = () => {

  const [userInfo, setUserInfo] = useState({});
  
  const getProfile = () => {

    const token = localStorage.getItem("token");
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                 'x-access-token' : token},
      credentials: "include"
      };
      fetch(`${URL}/me/user`, requestOptions )
      .then(async response => {
        response.json().then(data =>  {

          console.log(data.user);
          setUserInfo(data.user)
        
             })
        })
        .catch(async (error) => {
          console.log("error");
          })

  }

  useEffect(() =>{
    getProfile()
}, [])


const logoutHandler = () => {
  window.location.replace(`${URL}/users/logout`)
}
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to= '/' >
            <Navbar.Brand>Inventory App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          
            <Nav className="ml-auto">
              {Object.keys(userInfo).length !== 0  ? (
                <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to='/createNewProduct'>
                    <NavDropdown.Item>Create Product</NavDropdown.Item>
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
               
                <NavDropdown title="Sign In / Sign Up" id="auth">
                <LinkContainer to='/login'>
                <NavDropdown.Item>Login </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/register'>
                <NavDropdown.Item>Register</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
              )}
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
