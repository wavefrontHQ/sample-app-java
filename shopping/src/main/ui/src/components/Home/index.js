import React from "react";
import {Link} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';
import Button from "react-bootstrap/Button";

import { Products } from "../../constants";
import ProductList from "../common/ProductList";

import "./index.scss";

class Home extends React.Component {

  render() {
    const [mainProduct, ...restProducts] = Products;
    const {id} = mainProduct;

    return (
      <div className="home">
        <div className="main">
          <div className="title">
            <div>This app is a demo, but the shirt is real!</div>
            <div>VMworld 2019 General Session Demo Shirt</div>
          </div>
          <div className="description">
            Limited supplies available.
          </div>

          <Link to={`/product-details/${id}`}>
            <Button variant="primary" className="view-2019-shirt-btn">
              View 2019 Shirt
            </Button>
          </Link>

          <HashLink to="/#product-list" smooth className="view-past">
            <div>View Past Collection</div>
            <clr-icon shape="arrow down" />
          </HashLink>
        </div>
        
        <ProductList products={restProducts} />
      </div>
    );
  }
}

export default Home;