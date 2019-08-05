import React from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import { QRCodeImage } from "../../constants";

import "./index.scss";

const VideoCard = ({src}) => (
  <div>
    <div style={{marginBottom: "12px"}}>
      <div style={{fontWeight: "lighter"}}>Marketing Video</div>
      <div style={{fontWeight: "bold", fontSize: "1.4rem"}}>Learn more about video title</div>
    </div>
    <ResponsiveEmbed aspectRatio="16by9">
      <embed src={src} />
    </ResponsiveEmbed>
  </div>
);

class Success extends React.PureComponent {
  render() {
    return (
      <Container className="success">
        <Row>
          <Col sm={12} md={6}>
            <div className="message">
              <div className="title">
                You've claimed your T-Shirt!
              </div>
              <div className="description">
                Head to the Wavefront Kiosk with this QR code to pick up your shirt 
                <span> after 11:00am</span> (when the key note is finished).
              </div>
              <Image src={QRCodeImage} fluid />
            </div>
          </Col>
          <Col sm={12} md={6} className="animation">
            A nice animation goes here.
          </Col>
        </Row>
        <Row className="videos">
          <Col sm={12} md={6}>
            <VideoCard src="https://www.youtube.com/embed/FOweDNW7uME" />
          </Col>
          <Col sm={12} md={6}>
            <VideoCard src="https://www.youtube.com/embed/d58lArzMeGA" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Success;