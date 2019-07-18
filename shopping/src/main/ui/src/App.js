import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { applications } from "./constants";
import Card from "./components/Card/Card";

import "@clr/ui/clr-ui-dark.min.css";
import "@clr/icons";
import "@clr/icons/clr-icons.min.css";
import './App.css';

class List extends PureComponent {

    handleOrderSuccess = (item) => {
        this.props.history.push("/success", item);
    };

    render() {
        return (
            <div className="application">
                <div className="application-header">
                    <h1>Beachshirts Application</h1>
                </div>
                <div className="clr-row applications">
                    {
                        applications.map((item) => <Card item={item} key={item.name} handleOrderSuccess={this.handleOrderSuccess} />)
                    }
                </div>
            </div>
        );
    }
}

const OrderSuccess = ({location}) => (
    location.state && location.state.src 
    ? 
    <div className="order-success">
        <h1>Congratulations!</h1>
        <clr-icon shape="success-standard" class="is-success" size="132"></clr-icon>
        <div className="image-container">
            <img src={location.state.src} alt={location.state.name}/>
        </div>
        <div className="claim-steps">
            <h3>To claim your t-shirt:</h3>
            <div>1. Go to the kiosk</div>
            <div>2. Show your badge</div>
            <div>3. Show this page</div>
        </div>
    </div>
    : <Redirect to="/"/>
);

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={List} />
                <Route path="/success" component={OrderSuccess} />
                <Redirect to="/" />
            </Switch>
        </Router>
      );
};
