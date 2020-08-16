import React, { useState, useRef } from "react";
import { Input } from "antd";

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
  return <Input value={input} onChange={handleInputChange} />;
}

export default SearchBar;
