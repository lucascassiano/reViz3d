import React, { Component } from 'react';

const url = 'https://willianjusten.com.br/assets/img/react-svg/sprite.svg';

// Aqui criamos um componente 
// que irá gerar nosso ícone SVG
export default class Icon extends Component {

    render() {
        let props = this.props;
        let { width, height, color } = this.props;
        
        return (
            <svg viewBox='0 0 16 16' className={`icon icon-${props.icon}`}>
                <use xlinkHref={`${url}#icon-${props.icon}`} />
            </svg>
        );
    }
} 