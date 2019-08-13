import React from "react";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VMwareLogoImg } from "../../../constants";

import "./Footer.scss";

class Footer extends React.PureComponent {

  render() {
    return (
      <div className="footer">
        <a href="https://www.vmware.com/" target="_blank">
          <Image src={VMwareLogoImg} fluid />
        </a>
        
        <div className="top">
          <a href="https://www.vmworld.com/en/us/contact.html" target="_blank">
            Contact
          </a>
          <a href="https://videos.vmworld.com/global/2018" target="_blank">
            On-Demand Library
          </a>
          <a href="https://www.vmworld.com/en/us/media.html" target="_blank">
            Media
          </a>
          <a href="https://www.vmworld.com/myvmworld.jspa?event=US" target="_blank">
            Register
          </a>
        </div>
        <div className="bottom">
          <span>© 2019 VMware, Inc</span>
          <a href="https://www.vmware.com/help/legal.html" target="_blank">
            Terms of Use
          </a>
          <a href="https://www.vmware.com/help/privacy.html" target="_blank">
            privacy
          </a>
          <div className="social-media-icons">
            <a href="https://twitter.com/vmworld" target="_blank">
              <FontAwesomeIcon icon={["fab", "twitter"]} />
            </a>
            <a href="https://www.facebook.com/vmworld" target="_blank">
              <FontAwesomeIcon icon={["fab", "facebook-f"]} />
            </a>
            <a href="https://www.linkedin.com/groups/2028037" target="_blank">
              <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
            </a>
            <a href="https://www.youtube.com/user/VMworldTV" target="_blank">
              <FontAwesomeIcon icon={["fab", "youtube"]} />
            </a>
            <a href="https://blogs.vmware.com/vmworld/" target="_blank">
              <FontAwesomeIcon icon="comments" />
            </a>
          </div>
        </div>
      </div>
    );
  }

}

export default Footer;