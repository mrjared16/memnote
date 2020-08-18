import React, { useState, useRef } from "react";
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import './SearchBar.scss';

function SearchBar(props) {
  const { initialValue, onSearchTermChange } = props;
  const [input, setInput] = useState(initialValue);
  const typingTimeoutRef = useRef(null);
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => onSearchTermChange(newValue), 300);
  };
  return (
    <div className="search-bar">
      <SearchOutlined style={{ color: "#9DA39B"}} />
      <Input value={input} onChange={handleInputChange} placeholder="Search"/>
    </div>

  );
}

export default SearchBar;
