import React from "react";
import { Menu, Dropdown } from "antd";
import {
  SortDescendingOutlined,
  CloseOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import Button from "../Button";
import "./SortButton.scss";

const menu = (sortOptions) => (
  <Menu>
    {sortOptions.map(({ name }, index) => {
      return (
        <Menu.Item key={index}
          icon={<SortAscendingOutlined style={{ color: "#9DA39B" }} />}
        >
          <a className="text-in-dropdown">{name}</a>
        </Menu.Item>
      );
    })}
  </Menu>
);

function SortButton(props) {
  const { sortOptions, onSortOptionChange } = props;
  return (
    <Dropdown overlay={menu(sortOptions)} trigger={["click"]}>
      <Button
        label="Sort"
        icon={<SortDescendingOutlined style={{ color: "#9DA39B" }} />}
        className="sort-btn"
      />
    </Dropdown>
  );
}

export default SortButton;
