import React from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { QRCodeImage, LoveUGesture, GoldenGate, AngelMedFlight, TechSoup } from "../../constants";

import "./index.scss";

const Card = ({id, title, src}) => (
  <div id={id} style={{textAlign: "center"}}>
    <div style={{marginBottom: "12px"}}>
      <div style={{fontWeight: "bold"}}>{title}</div>
    </div>
    <div className="img-container">
      <Image src={src} fluid />
    </div>
  </div>
);

class Success extends React.PureComponent {
  render() {
    return (
      <Container className="success">
        <Row>
          <Col sm={12} md={8}>
            <div className="message">
              <div className="title">
                <span>You are eligible</span> 
                <span> for a free T-shirt</span>
                <Image className="love-u-gesture" src={LoveUGesture} height="20" width="20" /> 
                !
              </div>
              <div className="description">
                Please head to Materials Pickup in Moscone West, Lobby Level, with this QR code
                <span> after 3:00 pm Pacific Time while supplies last</span>.
              </div>
            </div>
          </Col>
          <Col sm={12} md={4} className="qr-code">
            <Image src={QRCodeImage} fluid />
          </Col>
        </Row>
        <hr />
        <Row className="image-links">
          <Col sm={12} md={4}>
            <a href="https://www.vmware.com/company/news/updates/vmworld-2019-our-relentless-pursuit-of-the-possible.html" target="_blank" rel="noopener noreferrer">
              <Card 
                title="A CTO perspective on VMworld 2019 US" 
                src={GoldenGate}
              />
            </a>
          </Col>
          <Col sm={12} md={4}>
            <a href="https://www.vmware.com/radius/impact/angel-medflight-tech-for-good" target="_blank" rel="noopener noreferrer">
              <Card 
                id="Angel-MedFlight"
                title="When Every Moment Counts" 
                src={AngelMedFlight}
              />
            </a>
          </Col>
          <Col sm={12} md={4}>
            <a href="https://www.vmware.com/radius/impact/techsoup-nonprofit-digital-transformation/" target="_blank" rel="noopener noreferrer">
              <Card 
                id="TechSoup"
                title="All for One and Tech for All" 
                src={TechSoup}
              />
            </a>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Success;