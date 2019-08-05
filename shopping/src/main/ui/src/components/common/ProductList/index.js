import React from "react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./index.scss";

class ProductList extends React.Component {

  render() {
    const {products} = this.props;

    return (
      <Container id="product-list" className="product-list">
        <Row>
          {
            products.map(({id, src, name, description, year}) => (
              <Col key={id} sm={12} md={4}>
                <Card border="light">
                  <Card.Img variant="top" src={src} />
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                      <span>{description}</span>
                      <span className="year">{year}</span>
                    </Card.Text>
                    <Link to={`/product-details/${id}`}>
                      <Button variant="outline-dark">View Shirt</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          }
        </Row>
      </Container>
    );
  }
}

export default ProductList;