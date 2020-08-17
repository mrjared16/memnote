import React from "react";
import Button from "../Button";
import './SearchResultItem.scss';

function SearchResultItem(props) {
  const { title } = props;

  return <Button className="search-result-item" label={title} />;
}

export default SearchResultItem;
