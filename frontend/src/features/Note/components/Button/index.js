import React from "react";
import './Button.scss';
import { Popover } from "antd";
import * as Style from 'antd';

function Button(props) {
  const { icon, label, onClick, className, popover, placement, content, trigger, type } = props;
  const button = (
    <Style.Button className={className + " custom-button"} onClick={onClick} htmlType={type}>
      {icon}
      <span className="button-label">{label}</span>
    </Style.Button>
  );
  if (popover === true) {
    return (
      <Popover placement={placement} content={content} trigger={trigger}>
        {button}
      </Popover>
    )
  }
  return button;
}

export default Button;
