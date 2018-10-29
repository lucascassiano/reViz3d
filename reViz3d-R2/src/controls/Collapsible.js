import React, { Component } from "react";
import { config } from "./index";

export default class Collapsible extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }

        this.container = React.createRef();
        this.content = React.createRef();
    }

    onClickContainer = () => {
        this.setState({ open: !this.state.open });
    }

    componentDidMount() {

    }

    render() {
        let { open } = this.state;



        return <div className="collapsible" ref={this.container} >
            <div className="top">
                <div className="label" onClick={this.onClickContainer}>{this.props.label || "collapsible"}
                </div>
                <div className={open ? "arrow arrow-up" : "arrow"} >
                    <svg width='12' viewBox='0 0 79 40' xmlns='http://www.w3.org/2000/svg'>
                        <g fill='none' fillRule='evenodd'>
                            <polygon fill={config.colorText} points='0 0 79 0 39.5 39.5' />
                        </g>
                    </svg>
                </div>
            </div>
            <div className={open ? "content content-open" : "content content-closed"} ref={this.container}>
                {this.props.children}
            </div>
        </div >
    }
}