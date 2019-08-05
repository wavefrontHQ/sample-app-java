import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import TopBar from './components/TopBar';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';
import Success from './components/Success';
import ScrollToTop from './components/common/ScrollToTop';

// import "@clr/ui/clr-ui.min.css";
import 'bootstrap/dist/css/bootstrap.css';

import "@clr/icons";
import '@clr/icons/shapes/all-shapes';
import "@clr/icons/clr-icons.min.css";
import './App.scss';

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/product-details/:id",
    component: ProductDetails
  },
  {
    path: "/checkout",
    component: Checkout
  },
  {
    path: "/success",
    component: Success
  }
];

class App extends PureComponent {

  constructor() {
    super();
    this.state = {
      cartItems: []
    };
  }

  addToCart = (id) => {
    const { cartItems } = this.state;
    const cartItem = cartItems.find((cartItemId) => cartItemId == id);
    if (!cartItem) {
      this.setState({
        cartItems: cartItems.concat([id])
      });
    }
  };

  emptyCart = () => this.setState({ cartItems: [] });

  render() {
    return (
      <Router>
        <ScrollToTop>
          <div className="application">
            {
              routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={() => <TopBar cartItems={this.state.cartItems} />}
                />
              ))
            }
            <div className="main-container">
              {
                routes.map((route, index) => {
                  const { component: Component } = route;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      render={
                        (props) =>
                          <Component
                            {...props}
                            cartItems={this.state.cartItems}
                            addToCart={this.addToCart}
                            emptyCart={this.emptyCart}
                          />
                      }
                    />
                  );
                })
              }
            </div>
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
