import React from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { removeToken } from "../../../Auth/authSlice";
import "./UserMenu.scss";

function UserMenu(props) {
  const dispatch = useDispatch();

  const logout = () => {
    console.log("logout");
    dispatch(removeToken());
  };

  const menu = (
    <Menu>
      <Menu.Item icon={<UserOutlined style={{ color: "#9DA39B" }} />}>
        <a className="text-in-dropdown">Account Setting</a>
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined style={{ color: "#9DA39B" }} />}>
        <a className="text-in-dropdown" onClick={logout}>
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='user-menu-container'>
      <Dropdown overlay={menu} trigger={["click"]}>
        <a
          className="ant-dropdown-link user-menu"
          onClick={(e) => e.preventDefault()}
        >
          Username <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
}

export default UserMenu;
