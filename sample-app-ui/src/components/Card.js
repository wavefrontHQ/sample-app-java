import React, {PureComponent} from 'react';
import "./Card.css";
import {orderShirts, url} from "../constants";

class Card extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: 1,
            isLoading: false,
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
        this.setState({isLoading: true});
        orderShirts(this.props.item.name, this.state.value).finally(() => this.setState({isLoading: false}))
    }

    render() {
        const { item } = this.props;
        return (
            <div className="card clr-col-2">
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
                </div>
            </div>
        )
    }
}

export default Card;