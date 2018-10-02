import { createStore } from 'redux';
import rootReducer from '../reducers';

const initialState = {
    rightMenu_isOpen: false
}

export default function configureStore(state = initialState) {
    return createStore(rootReducer, state);
}