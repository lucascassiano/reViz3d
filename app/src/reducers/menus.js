const initialState = {
  rightMenu_isOpen: true,
  recordMenu_isOpen: true
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

    default:
      return state;
  }
};
