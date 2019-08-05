import image1 from './images/2018-bo-ops-shirt.png';
import image2 from './images/2018-bo-vans-closeup.png';
import image3 from './images/2018-bo-vans-shirt.png';
import image4 from './images/2019-bo-blueops-shirt.png';
import image5 from './images/2019-bo-brownops-shirt.png';
import image6 from './images/2019-bo-brownops-closeup.png';
import image7 from './images/2019-bo-meetup-closeup.png';
import image8 from './images/2019-bo-meetup-shirt.png';
import image9 from './images/2019-bo-splash-shirt.jpg';
import image10 from './images/2019-bo-team-closeup.png';
import image11 from './images/2019-bo-team-shirt.png';
import image12 from './images/gothoiatstf1_1_1200x1200.jpg';

import QRCodeImage from "./images/QR-code.png"
export {QRCodeImage};

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
        subtitle: "3D Microservies Observability",
        description: "The combined view of metrics, histograms, traces is essential to maintaining production microservices, and a leapfrog over the blind spots of legacy APM tools.",
        year: 2019,
        src: image1,
        inventory: 100
    },
    {
        id: 1,
        name: "Amazing Shirt 2",
        description: "Description for Amazing Shirt 2",
        year: 2018,
        src: image2,
    },
    {
        id: 2,
        name: "Amazing Shirt 3",
        description: "Description for Amazing Shirt 3",
        year: 2017,
        src: image3,
    },
    {
        id: 3,
        name: "Amazing Shirt 4",
        description: "Description for Amazing Shirt 4",
        year: 2016,
        src: image4,
    },
    {
        id: 4,
        name: "Amazing Shirt 5",
        description: "Description for Amazing Shirt 5",
        year: 2015,
        src: image5,
    },
    {
        id: 5,
        name: "Amazing Shirt 6",
        description: "Description for Amazing Shirt 6",
        year: 2014,
        src: image6,
    },
    {
        id: 6,
        name: "Amazing Shirt 7",
        description: "Description for Amazing Shirt 7",
        year: 2014,
        src: image7,
    },
    {
        id: 7,
        name: "Amazing Shirt 8",
        description: "Description for Amazing Shirt 8",
        year: 2013,
        src: image8,
    },
    {
        id: 8,
        name: "Amazing Shirt 9",
        description: "Description for Amazing Shirt 9",
        year: 2012,
        src: image9,
    },
    {
        id: 9,
        name: "Amazing Shirt 10",
        description: "Description for Amazing Shirt 10",
        year: 2012,
        src: image10,
    },
    {
        id: 10,
        name: "Amazing Shirt 11",
        description: "Description for Amazing Shirt 11",
        year: 2012,
        src: image11,
    },
    {
        id: 11,
        name: "Amazing Shirt 12",
        description: "Description for Amazing Shirt 12",
        year: 2012,
        src: image12,
    }
];

export const findProduct = (id) => Products.find(({id: productId}) => productId == id);