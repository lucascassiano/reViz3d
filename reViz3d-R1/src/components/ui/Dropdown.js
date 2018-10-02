import React, { Component } from 'react';
import {} from './ui.css';
import arrow from './svg/down_arrow.svg';

class Dropdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: this.props.placeHolder
		};

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);

    }
    
    onClick(){
        if(this.props.onClick){
            this.props.onClick();
        }
    }

	onChange(index, item) {
		if (this.props.onChange) {
			this.props.onChange(index, item);
        }
        if(!this.props.label)
            this.setState({
                text: item
            });
	}

	render() {
		var { items } = this.props;
        var text = this.props.label? this.props.label :this.state.text;

		let listItems = null;
		let icon = null;
		if (items) {
			if (items.length > 0) {
				icon = <img src={arrow} />;
			}

			listItems = items.map((item, index) => (
				<li onClick={() => this.onChange(index, item)}>
					<a  key={index}>
						{item}
					</a>
				</li>
			));
		}

		return (
			<div onClick={this.onClick}>
				<div className="dropdown-ui">
					<div className="dropdown-ui-label">
						{text}
						{icon}
					</div>
					<div className="dropdown-ui-content">
						<ul>{listItems}</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Dropdown;
