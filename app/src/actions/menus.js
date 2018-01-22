export const viewRightMenu = isOpen => {
  // Return action
  return {
    type: "VIEW_RIGHT_MENU",
    rightMenu_isOpen: isOpen
  };
};

export const toggleRightMenu = state => {
  return{
    type: "TOGGLE_RIGHT_MENU"
  }
};

export const toggleRecordMenu = state => {
  return{
    type: "TOGGLE_RECORD_MENU"
  }
};

