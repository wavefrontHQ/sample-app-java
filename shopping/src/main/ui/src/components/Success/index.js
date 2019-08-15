import React from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import { QRCodeImage, LoveUGesture } from "../../constants";

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
          <Col sm={12} md={8}>
            <div className="message">
              <div className="title">
                <span>You are eligible</span> 
                <span> for a free T-shirt</span>
                <Image className="love-u-gesture" src={LoveUGesture} height="20" width="20" /> 
                !
              </div>
              <div className="description">
                Please head to Materials Pickup in Moscone West, Lobby Level with this QR code
                <span> after 11:00 am US Pacific Time</span> (when the keynote is finished.) <span>while stocks last</span>.
              </div>
            </div>
          </Col>
          <Col sm={12} md={4} className="qr-code">
            <Image src={QRCodeImage} fluid />
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