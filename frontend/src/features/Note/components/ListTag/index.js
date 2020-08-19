import React, { useState } from "react";
import Tag from "../Tag";
import { Input, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./ListTag.scss";

function ListTag(props) {
  const { tags, onAdd, onRemove } = props;

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    onAdd({ tagName: inputValue });
    setInputValue("");
    setInputVisible(false);
  };
  // sort => sort : not render
  return (
    <div className="list-tag">
      {
        tags.map(({ name = '', id = '' }, index) => (
          <Tag className='tag' key={id ? id : index} title={name} onClose={onRemove} />
        ))
      }

      {inputVisible && (
        <Input
          autoFocus
          type="text"
          size="small"
          className="add-tag-input tag"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}

      {!inputVisible && (
        <Tag
          className='add-tag-btn tag'
          closable={false}
          icon={<PlusOutlined />}
          title="Add Tag"
          onClick={showInput}
        />
      )}
    </div>
  );
}

export default ListTag;
