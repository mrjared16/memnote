import React from "react";
import { Input, Form} from "antd";
import "./InputField.scss";

function InputField(props) {
  const { field, type, placeholder } = props;
  const getInputType = (type = "text") => {
    if (type === "password")
      return (
        <Input.Password
          size="large"
          placeholder={placeholder}
          className="input-field"
          {...field}
        />
      );
    return (
      <Input
        size="large"
        placeholder={placeholder}
        className="input-field"
        {...field}
      />
    )
  };
  return (
      <Form.Item>{getInputType(type)}</Form.Item>
  );
}

export default InputField;
