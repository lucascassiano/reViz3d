// ./src/reducers/index.js
import { combineReducers } from "redux";
import menus from "./menus";
import project from "./project";

export default combineReducers({
  menus: menus,
  project : project
  // More reducers if there are
  // can go here
});
