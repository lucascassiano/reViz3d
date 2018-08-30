const initialState = {
    rightMenu_isOpen: false,
    recordMenu_isOpen: false,
    console_isOpen: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "VIEW_RIGHT_MENU":
            var newState = Object.assign({}, state);
            newState.rightMenu_isOpen = action.rightMenu_isOpen;
            return newState;

        case "TOGGLE_RIGHT_MENU":
            var newState = Object.assign({}, state);
            newState.rightMenu_isOpen = !newState.rightMenu_isOpen;
            return newState;

        case "TOGGLE_RECORD_MENU":
            var newState = Object.assign({}, state);
            newState.recordMenu_isOpen = !newState.recordMenu_isOpen;
            return newState;

        case "TOGGLE_CONSOLE":
            var newState = Object.assign({}, state);
            newState.console_isOpen = !newState.console_isOpen;
            return newState;

        default:
            return state;
    }
};