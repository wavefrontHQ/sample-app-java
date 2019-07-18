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

export const applications = [
    {
        name: "Amazing Shirt 1",
        src: image1,
    },
    {
        name: "Amazing Shirt 2",
        src: image2,
    },
    {
        name: "Amazing Shirt 3",
        src: image3,
    },
    {
        name: "Amazing Shirt 4",
        src: image4,
    },
    {
        name: "Amazing Shirt 5",
        src: image5,
    },
    {
        name: "Amazing Shirt 6",
        src: image6,
    },
    {
        name: "Amazing Shirt 7",
        src: image7,
    },
    {
        name: "Amazing Shirt 8",
        src: image8,
    },
    {
        name: "Amazing Shirt 9",
        src: image9,
    },
    {
        name: "Amazing Shirt 10",
        src: image10,
    },
    {
        name: "Amazing Shirt 11",
        src: image11,
    },
    {
        name: "Amazing Shirt 12",
        src: image12,
    }
]