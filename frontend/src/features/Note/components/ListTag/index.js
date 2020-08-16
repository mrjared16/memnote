import React, { useState } from "react";
import Tag from "../Tag";
import { Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./ListTag.scss";

function ListTag(props) {
  const { listTags, onAdd, onRemove } = props;

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    onAdd({ tag: inputValue });
    setInputValue("");
    setInputVisible(false);
  };
  // sort => sort : not render
  return (
    <div className="list-tags">
      {listTags.map((name) => (
        <Tag title={name} onClose={onRemove} />
      ))}
      {inputVisible && (
        <Input
          autoFocus
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag
          closable={false}
          icon={<PlusOutlined />}
          title="New Tag"
          onClick={showInput}
        />
      )}
    </div>
  );
}

export default ListTag;
