import React from "react";
import {Link} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import { Products } from "../../constants";
import ProductList from "../common/ProductList";

import "./index.scss";

class Home extends React.Component {

  render() {
    const [mainProduct, ...restProducts] = Products;
    const {src, id} = mainProduct;

    return (
      <div className="home">
        <Container>
          <Row>
            <Col sm={12} md={6}>
              <Image src={src} fluid />
            </Col>
            <Col sm={12} md={6}>
              <div className="text">
                <div id="homepage-title" className="title">
                  <div>Filler Text About</div>
                  <div>VMworld & Shirts</div>
                </div>
                <div className="description">
                  <div>Claim your 2019 VMworld Shirt.</div>
                  <div>First come first serve, 1000 shirts available.</div>
                </div>
              </div>
              
              <Link to={`/product-details/${id}`}>
                <Button variant="dark" className="view-2019-shirt-btn">
                  View 2019 Shirt
                </Button>
              </Link>
              <HashLink to="/#product-list" smooth className="view-past">
                <div>View Past Collection</div>
                <clr-icon shape="arrow down" />
              </HashLink>
            </Col>
          </Row>
        </Container>
        <ProductList products={restProducts} />
      </div>
    );
  }
}

export default Home;