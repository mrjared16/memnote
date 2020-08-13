import React from 'react';
import { Input } from 'antd';
import './Searchbar.scss';
import { SearchOutlined } from '@ant-design/icons';

function Searchbar(props) {
  return (
    
    <Input
      size="large"
      placeholder="Search"
      className="search-bar"
    />
  );
}

export default Searchbar;