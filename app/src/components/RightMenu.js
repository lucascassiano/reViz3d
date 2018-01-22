import React, { Component } from "react";

//import icon_menu from "../assets/menu.svg";
import arrow_left from "../assets/left_arrow_menu.svg";
import arrow_right from "../assets/right_arrow_menu.svg";

import {} from "../styles/Menus.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PanelSerial from "./PanelSerial";
import Tree from "react-ui-tree";
import PanelProject from "./PanelProject";
import PanelModels from "./PanelModels";

import { connect } from "react-redux";
import { viewRightMenu, toggleRightMenu } from "../actions/menus";

class RightMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ open: !this.state.open });

    this.props.viewRightMenu(this.state.open);

    //console.log("open Menu",this.props.rightMenu_isOpen);
    //this.setState(open:this.props.ri)
  }

  render() {
    const open = this.props.rightMenu_isOpen;
    let icon_menu = arrow_left;
    let icon_menu_under = arrow_left;
    let style = {
      width: "400",
      opacity: 0,
      visible: false
    };

    let styleButton = {
      right: "0px"
    };

    let classIcon = "icon";

    if (open) {
      style.right = 0;
      style.opacity = 1;
      style.visible = true;
      styleButton.right = 400;
      styleButton.background = "#212121";
      //icon_menu = arrow_right;
      classIcon = "icon icon-open";
    }

    return (
      <div>
        <div className="right-menu" style={style}>
          <Tabs forceRenderTabPanel={true}>
            <TabList>
              <Tab>Project</Tab>
              <Tab>SerialPort</Tab>
              <Tab>MQTT</Tab>
              <Tab>Data</Tab>
              <Tab>Model</Tab>
              <Tab>Hover</Tab>
            </TabList>
            <TabPanel>
              <PanelProject />
            </TabPanel>
            <TabPanel>
              <PanelSerial serial={this.props.ports} {...this.props} />
            </TabPanel>
            <TabPanel>
              <h2>MQTT</h2>
            </TabPanel>
            <TabPanel>
              <h2>Data</h2>
            </TabPanel>
            <TabPanel>
              <PanelModels />
            </TabPanel>
          </Tabs>
        </div>

        <div
          onClick={this.toggleMenu}
          className="right-menu-button"
          style={styleButton}
        >
          <img src={icon_menu} className={classIcon} />
        </div>
      </div>
    );
  }
}

// Maps state from store to props
const mapStateToProps = (state, ownProps) => {
  return {
    // You can now say this.props.rightMenu_isOpen
    rightMenu_isOpen: state.menus.rightMenu_isOpen
  };
};

// Maps actions to props
const mapDispatchToProps = dispatch => {
  return {
    // You can now say this.props.viewRightMenu
    viewRightMenu: isOpen => dispatch(viewRightMenu(isOpen)),
    toggleRightMenu: isOpen => dispatch(toggleRightMenu())
  };
};

// Use connect to put them together
export default connect(mapStateToProps, mapDispatchToProps)(RightMenu);
