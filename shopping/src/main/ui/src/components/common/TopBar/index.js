import React from "react";
import {Link} from "react-router-dom";
import Popover from "react-bootstrap/Popover";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {VMworldLogoImg} from "../../../constants";

import "./index.scss";

const popover = (
  <Popover id="popover-go-to-checkout">
    <Popover.Content>
      Go to checkout
    </Popover.Content>
  </Popover>
);

class TopBar extends React.Component {

  constructor() {
    super();
    this.state = {showPopover: false};
    this.ref = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartItems.length === 0 && this.props.cartItems.length > 0) {
      this.ref.current.show();
    }
  }

  render() {
    const {cartItems} = this.props;
    const cartIconClass = cartItems && cartItems.length && "has-badge";
    return (
      <div className="top-bar">
        <div className="logo">
          <Image src={VMworldLogoImg} fluid />
        </div>
        <div className="bar">
          <Link to="/">
            <div className="title">Tanzu Tees</div>
          </Link>
          <OverlayTrigger ref={this.ref} trigger={null} placement="bottom" overlay={popover}>
            <Link to="/checkout">
              <clr-icon shape="shopping-cart" class={cartIconClass} size={26} />
            </Link>
          </OverlayTrigger>
        </div>
      </div>
    )
  }
}

export default TopBar;