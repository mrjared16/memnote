import React from "react";
import './Button.scss';
import { Popover } from "antd";
import * as Style from 'antd';

function Button(props) {
  const { icon, label, onClick, className, popover = false, placement = "bottom", content, trigger="hover", type } = props;
  const button = (
    <Style.Button className={className + " custom-button"} onClick={onClick} htmlType={type}>
      {icon}
      {!popover && <span className="button-label">{label}</span>}
    </Style.Button>
  );
  if (popover === true) {
    return (
      <Popover placement={placement} content={label} trigger={trigger}>
        {button}
      </Popover>
    )
  }
  return button;
}

export default Button;
