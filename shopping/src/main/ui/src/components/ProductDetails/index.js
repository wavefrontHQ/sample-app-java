import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import { findProduct, Products } from "../../constants";
import ProductList from "../common/ProductList";

import "./index.scss";

class ProductDetails extends React.PureComponent {

  onClick = () => {
    const {id} = this.props.match.params;
    this.props.addToCart(id);
    window.scrollTo(0, 0);
  }

  render() {
    const {cartItems} = this.props;
    const id = parseInt(this.props.match.params.id);
    
    const inCart = !!cartItems.find((item) => item == id);

    const product = findProduct(id);
    const {src, name, year, subtitle, description, inventory} = product;
    const otherProducts = Products.filter((product) => product.id !== id);
    
    return (
      <div className="product-details">
        <Container>
          <Row>
            <Col sm={12} md={6} className="main-product">
              <Image src={src} fluid />
            </Col>
            <Col sm={12} md={6}>
              <div className="text">
                <div className="title">{name}</div>
                <div className="year">{year}</div>
                <div className="subtitle">{subtitle}</div>
                <div className="description">{description}</div>
              </div>
              <div>
                {!!inventory || <div className="out-of-stock">Out of stock now</div>}
                <Button variant="primary" onClick={this.onClick} disabled={inCart || !inventory}>
                  {inCart ? "Added to Cart" : "Add to Cart"}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
        
        <div className="title previous-shirts">
          Previous VMworld Shirts
        </div>
        <ProductList products={otherProducts} />
      </div>
    );
  }
}

export default ProductDetails;