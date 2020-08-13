import React from 'react';
import { ProSidebar, SidebarHeader, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './SidebarLeft.scss';
import Title from '../../../../components/Title';
import Searchbar from '../Searchbar';

function SidebarLeft(props) {
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
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
}

export default SidebarLeft;