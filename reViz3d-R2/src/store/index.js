/* ------------

--------------- */

let defaultState = {
    menuIsOpen: true,
    project: {
        name: null,
        path: null
    },
    environment: {
        selectedObject: null,
        scene: null
    }
}

let rootStore = (state = defaultState, action) => {
    switch (action.type) {
        case 'TOGGLE_MENU':
            let menuIsOpen = !state.menuIsOpen;
            return Object.assign({}, state, { menuIsOpen });

        case 'UPDATE_SCENE':
            var environment = Object.assign({}, state.environment, { scene: action.scene });
            return Object.assign({}, state, { environment });

        case 'UPDATE_SELECTED_OBJECT':
            var environment = Object.assign({}, state.environment, { selectedObject: action.object });
            return Object.assign({}, state, { environment });
        default:
            return state
    }
}

import { createStore } from "redux";
let store = createStore(rootStore);


/*actions*/
export let toggleMenu = () => {
    store.dispatch({ type: 'TOGGLE_MENU' });
}

export let updateScene = (scene) => {
    store.dispatch({ type: 'UPDATE_SCENE', scene });
}

export let updateSelectedObject = (object) => {
    store.dispatch({ type: 'UPDATE_SELECTED_OBJECT', object });
}
//export the store at the end
export default store;