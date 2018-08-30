import React, { Component } from "react";
import {} from "./ui.css";
import svgOn from "./svg/toggle_on.svg";
import svgOff from "./svg/toggle_off.svg";


class Toggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
          toggle: this.props.active? this.props.active : false,
          toggle_icon_on: svgOn,
          toggle_icon_off: svgOff
        };

        this.toggle = this.toggle.bind(this);
        this.getToggle = this.getToggle.bind(this);
    }

    toggle(){
        if(this.props.onChange)
            this.props.onChange(!toggle);
            
        var {toggle} = this.state;
        this.setState({toggle: !toggle});
    }

    getToggle(){
        var {toggle, toggle_icon_on, toggle_icon_off} = this.state;
        
        if(toggle)
            return toggle_icon_on;
        else
            return toggle_icon_off;
    }

    render(){
        var {toggle, toggle_icon_on, toggle_icon_off} = this.state;
        var {text} = this.props;

        return(
            <div onClick = {this.toggle} className="verticalCenter pointer">
            <img src={toggle? toggle_icon_on : toggle_icon_off} height={22}/>
            <div className="labelText">{text}</div>
            </div>
        );
    }

}

// Use connect to put them together
export default Toggle;
