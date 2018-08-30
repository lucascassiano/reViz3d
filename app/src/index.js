//require('react-hot-loader/patch');
import React from 'react';
import * as ReactDOM from 'react-dom'
import './index.css';
import { AppContainer } from 'react-hot-loader';
import App from './App.jsx';
//import { hot } from 'react-hot-loader';

// We can now require our jsx files, they will be compiled for us 
const render = Component => {
  ReactDOM.render(<Component/>,
    document.getElementById('root'),
  )
}


render(App);
/*
if (module.hot)
  module.hot.accept(render(App));*/