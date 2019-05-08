import React, {PureComponent} from 'react';
import "./Card.css";
import {orderShirts} from "../../constants";
import classnames from "classnames";

export const messageTypes = {
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    WARNING: "WARNING",
}


class Card extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: 1,
            isLoading: false,
            alert: null,
        };

        this.selectRef = React.createRef();
    }

    getOptions = () => {
        const options = [];
        for (let i=1; i<=10; i++) {
            options.push(<option value={i} key={i}>{i}</option>)
        }
        return options;
    }

    handleChange = () => this.setState({value: this.selectRef.current.value});

    handleOrder = () => {
        this.setState({isLoading: true, alert: null});
        const start = Date.now();
        orderShirts(this.props.item.name, this.state.value)
        .then((data) => {
            const end = Date.now();
            const duration = ((end - start) >= 1000) ? `${(end - start)/1000}s` : `${(end - start)}ms`;
            this.setState({
                isLoading: false,
                alert: {
                    type: data.status === 200 ? messageTypes.SUCCESS : messageTypes.FAILURE,
                    header: data.status === 200 ? `Order succeeded after ${duration}` : `Order failed after ${duration}. try again!`,
                }
            });
        })
    }

    closeAlert = () => this.setState({alert: null});

    render() {
        const { item } = this.props;
        const { alert } = this.state;
        return (
            <div className="card clr-col-6 clr-col-sm-6 clr-col-md-4 clr-col-lg-3 clr-col-xl-2">
                <div className="card-header">
                    {item.name}
                </div>
                <div className="card-block image-container">
                    <img src={item.src} alt="item.name"/>
                </div>
                <div className="card-footer">
                    <div className="clr-row">
                        <select
                            id="select-full"
                            className="clr-select clr-col-2"
                            value={this.state.value}
                            ref={this.selectRef}
                            onChange={this.handleChange}
                        >
                            {this.getOptions()}
                        </select>
                        <button className="btn btn-sm" onClick={this.handleOrder}>
                            Order
                            {this.state.isLoading && <span className="spinner spinner-inline"/>}
                        </button>
                    </div>
                    {
                        alert &&
                        <div className="alert-wrapper">
                            <div
                                className={classnames("alert", {
                                    "alert-success": alert.type === messageTypes.SUCCESS,
                                    "alert-danger": alert.type === messageTypes.FAILURE,
                                    "alert-warning": alert.type === messageTypes.WARNING,
                                })}
                                role="alert"
                            >
                                <div className="alert-items">
                                    <div className="alert-item static">
                                        <div className="alert-icon-wrapper">
                                            <clr-icon className="alert-icon" shape="check-circle"/>
                                        </div>
                                        <div className="alert-text">{`${alert.header}`}</div>
                                        <button type="button" className="close btn-sm" aria-label="Close" onClick={this.closeAlert}>
                                            <clr-icon aria-hidden="true" shape="close"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        )
    }
}

export default Card;