export const url = "http://localhost";

export const shopPort = "50050";
export const stylingPort = "50051";
export const printingPort = "50052";
export const deliveryPort = "50053";
export const packagingPort = "50054";

export const makeRequest = (url, method, body) => {
    return fetch(url, {
        method,
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(body)
    })
}

export const orderShirts = (name, quantity) => {
    return makeRequest(`${url}:${shopPort}/shop/order`, "POST", {
        styleName: name,
        quantity,
    });
}