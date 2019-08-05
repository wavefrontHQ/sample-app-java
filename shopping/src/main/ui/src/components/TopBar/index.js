import React from "react";
import {Link} from "react-router-dom";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

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
        <Link to="/" className="title">Tanzu Tees</Link>
        <OverlayTrigger ref={this.ref} trigger={null} placement="bottom" overlay={popover}>
          <Link to="/checkout">
            <clr-icon shape="shopping-cart" class={cartIconClass} size={24} />
          </Link>
        </OverlayTrigger>
      </div>
    )
  }
}

export default TopBar;