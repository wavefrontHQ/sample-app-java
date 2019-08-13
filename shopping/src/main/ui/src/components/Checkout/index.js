import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import {Link} from "react-router-dom";

import { findProduct } from "../../constants";

import "./index.scss";

class Checkout extends React.Component {
  render() {
    const {cartItems, emptyCart} = this.props;
    return (cartItems.length > 0) ? (
      <Container className="checkout">
        <Row>
          <Col sm={12} md={5} className="product">
            <Link to="/" className="back-home">
              <clr-icon shape="arrow left" />
              <span>Back Home</span>
            </Link>
            <hr/>
            <div className="products-in-cart">
              {
                cartItems.map((id) => {
                  const {name, subtitle, src} = findProduct(id);
                  return (
                    <div key={id} className="overview">
                      <div className="img">
                        <Image src={src} fluid />
                      </div>
                      <div className="text-container">
                        <div className="name">{name}</div>
                        <div className="subtitle">{subtitle}</div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </Col>
          <Col sm={12} md={{span: 5, offset: 1}} className="confirm">
            <div className="title">
              Confirm Your Order
            </div>
            <div>
              <div>{cartItems.length} T Shirt{cartItems.length > 1 && "s"}</div>
              <div>Pick Up at Materials Pickup, Moscone West, Lobby Level</div>
            </div>
            <Link to="/success">
              <Button variant="primary" onClick={emptyCart}>
                Confirm
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    ) : (
      <div className="checkout-empty">
        <Link to="/" className="back-home">
          <clr-icon shape="arrow left" />
          <span>Back Home</span>
        </Link>
        <div className="title">Empty Shopping Cart</div>
        <div className="subtitle">You have no items selected.</div>
      </div>
    );
  }
}

export default Checkout;