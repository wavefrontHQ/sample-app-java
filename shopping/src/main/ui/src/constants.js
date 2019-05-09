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