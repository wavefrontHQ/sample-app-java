// import POSSIBLE_BEGINS from "./images/possible-begins-with-me.png";
import VMW19 from "./images/compressed/VMW19.jpg"

import UNLEASH_MONSTER from "./images/compressed/2011-unleash-monster.jpg";
import RUN_DRS from "./images/compressed/2012-run-drs.jpg";
// import FOUNDATION from "./images/2016-foundation.png";
import INVENTOR from "./images/compressed/inventor.jpg";
import EUC from "./images/compressed/2017-euc.jpg";
import GSX from "./images/compressed/build-tough-gsx.jpg";
import VSAN from "./images/compressed/captain-vsan.jpg";
import REBOOT_EARTH from "./images/compressed/reboot-earth.jpg";
import NSX from "./images/compressed/run-vmware-nsx.jpg";
import VMINCLUSION from "./images/compressed/vminclusion.jpg";
import WORKSTATION from "./images/compressed/workstation.jpg";
// import VCLOUD_SUITE from "./images/vCloud-Suite.png";
import DATACENTER from "./images/compressed/2008-datacenter-in-peril.jpg";

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
      name: "VMworld 2019 General Session Demo Shirt",
      // subtitle: "3D Microservies Observability",
      description: "Make your Mark!",
      // briefDescription: "Description for VMworld 2019 Shirt",
      year: 2019,
      src: VMW19,
      inventory: 100
    },
    {
      id: 2,
      name: "VMware Inventor",
      description: "VMware Patent Program",
      year: null,
      src: INVENTOR,
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
      name: "Site Recovery Manager 1.0",
      description: "DATACENTER in PERIL!",
      year: 2008,
      src: DATACENTER,
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