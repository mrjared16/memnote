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
      <Menu.Item icon={<UserOutlined style={{ color: "inherit" }} />}>
        <span>Account Setting</span>
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined style={{ color: "inherit" }} />}>
        <span>
          Logout
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='user-menu'>
      <Dropdown overlay={menu} trigger={["click"]}>
        <span
          onClick={(e) => e.preventDefault()}
        >
          Username <DownOutlined />
        </span>
      </Dropdown>
    </div>
  );
}

export default UserMenu;
