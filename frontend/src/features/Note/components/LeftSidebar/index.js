import React from "react";
import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import "./LeftSidebar.scss";
import Title from "../../../../components/Title";
import Searchbar from "../Searchbar";
import { Button } from "antd";

function LeftSidebar({ logout }) {
  return (
    <ProSidebar>
      <SidebarHeader>
        <Title name="Username" />

      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square" popperArrow={true}>
          <MenuItem>
            <Searchbar />
          </MenuItem>
          <MenuItem>Dashboard</MenuItem>
          <SubMenu title="Components">
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
          <MenuItem>Dashboard</MenuItem>
          <Button onClick={logout}>Log out</Button>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
}

export default LeftSidebar;
