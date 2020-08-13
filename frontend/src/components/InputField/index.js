import React from 'react';
import { Input } from 'antd';
import './InputField.scss';

function InputField(props) {
  return (
    <div className="input-form">
      {props.type === "password" ?
      <Input.Password size="large" placeholder={props.placeholder} className="input-field"/> 
      :<Input size="large" placeholder={props.placeholder} className="input-field"/> }
    </div>
  );
}

export default InputField;