import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Components/header';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CreateNewProduct from './pages/CreateNewProduct';
import MyBids from "./pages/MyBids"
import MyProducts from "./pages/MyProducts"
import Register from './pages/Register';
import Login from './pages/Login';
function App() {
  return (
    <BrowserRouter>
    <Header/>
      <main className="py-3">
            <Container>
              <Switch>
                <Route exact={true} path='/' component={Home} />
                <Route exact={true} path='/productDetails/:productId' component={ProductDetails} />
                <Route exact={true} path='/createNewProduct' component={CreateNewProduct} />
                <Route exact={true} path='/myBids' component={MyBids} />
                <Route exact={true} path='/mySales' component={MyProducts} />
                <Route exact={true} path='/register' component={Register} />
                <Route exact={true} path='/login' component={Login} />
              </Switch>
        </Container>
      </main>  
    </BrowserRouter>
    
  );
}

export default App;
