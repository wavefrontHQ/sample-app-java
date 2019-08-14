import POSSIBLE_BEGINS from "./images/possible-begins-with-me.png";
import UNLEASH_MONSTER from "./images/2011-unleash-monster.png";
import RUN_DRS from "./images/2012-run-drs.png";
import FOUNDATION from "./images/2016-foundation.png";
import EUC from "./images/2017-euc.png";
import GSX from "./images/build-tough-gsx.png";
import VSAN from "./images/captain-vsan.png";
import REBOOT_EARTH from "./images/reboot-earth.png";
import NSX from "./images/run-vmware-nsx.png";
import VMINCLUSION from "./images/vminclusion.png";
import WORKSTATION from "./images/workstation.png";
import VCLOUD_SUITE from "./images/vCloud-Suite.png";
import BEACHOPS from "./images/BeachOps.png";

import QRCodeImage from "./images/QR-code.png"
import LoveUGesture from "./images/love-you-gesture-emoji-by-twitter.png";
import VMworldLogoImg from "./images/vmworld.png";
import VMwareLogoImg from "./images/vmware.png";

export {
  QRCodeImage, 
  LoveUGesture,
  VMworldLogoImg, 
  VMwareLogoImg
};

export const url = "http://localhost";

export const shopPort = "3000";
export const stylingPort = "50051";
export const printingPort = "50052";
export const deliveryPort = "50053";
export const packagingPort = "50054";

const shopUrl = process.env.SHOP_URL ? process.env.SHOP_URL : "";

export const makeRequest = (url, method, body) => {
    return fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(body)
    })
}

export const orderShirts = (name, quantity) => {
    return makeRequest(`${shopUrl}/api/shop/order`, "POST", {
        styleName: name,
        quantity,
    });
}

export const Products = [
    {
      id: 0,
      name: "VMworld 2019 Shirt",
      // subtitle: "3D Microservies Observability",
      description: "Possible Begins With Me",
      // briefDescription: "Description for VMworld 2019 Shirt",
      year: 2019,
      src: POSSIBLE_BEGINS,
      inventory: 100
    },
    {
      id: 2,
      name: "VMware Foundation",
      description: "Serve Learn Inspire",
      year: null,
      src: FOUNDATION,
    },
    {
      id: 7,
      name: "VMware vSAN",
      description: "I am Captain vSAN!",
      year: null,
      src: VSAN,
    },
    {
      id: 12,
      name: "VMware vSphere 5",
      description: "Unleash the Monster",
      year: null,
      src: UNLEASH_MONSTER,
    },
    {
      id: 6,
      name: "VMware Sustainability",
      description: "Reboot the Earth",
      year: null,
      src: REBOOT_EARTH,
    },
    {
      id: 1,
      name: "vSphere DRS",
      description: "RUN DRS!",
      year: null,
      src: RUN_DRS,
    },
    {
      id: 8,
      name: "VMinclusion",
      description: "women@vmware",
      year: null,
      src: VMINCLUSION,
    },
    {
      id: 4,
      name: "VMware NSX",
      description: "Run VMware NSX!",
      year: null,
      src: NSX,
    },
    {
      id: 9,
      name: "VMware Workstation",
      description: "Workstation 4",
      year: null,
      src: WORKSTATION,
    },
    {
      id: 5,
      name: "VMware GSX Server",
      description: "Built GSX Tough",
      year: null,
      src: GSX,
    },
    {
      id: 3,
      name: "VMware End User Computing",
      description: "EUC Rocks!",
      year: null,
      src: EUC,
    },
    {
      id: 10,
      name: "VMware vCloud Suite",
      description: "vCloud Suite 6.0",
      year: null,
      src: VCLOUD_SUITE,
    },
    {
      id: 11,
      name: "Wavefront by VMware",
      description: "#BeachOps",
      year: 2018,
      src: BEACHOPS,
    }
];

export const findProduct = (id) => Products.find(({id: productId}) => productId == id);