import React,  {Component }from "react"; 
import {}from "./ui.css"; 
import svgOn from "./svg/toggle_on.svg"; 
import svgOff from "./svg/toggle_off.svg"; 
import {Input, TextArea, GenericInput} from 'react-text-input'; // ES6
 

class InputText extends Component {
    constructor(props) {
        super(props); 
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(event);
        this.setState({value: event.target.value});
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
      };

    render() {
        var {value} = this.state; 
        var {text} = this.props; 

        return(
            <div>
            <TextArea defaultValue="Hello world!"/>
            
            <form>
            <input type="text"  ref={input => this._name = input} onChange={this.handleNameChange}/>
            </form>
          </div>
        ); 
    }
}

// Use connect to put them together
export default InputText; 
