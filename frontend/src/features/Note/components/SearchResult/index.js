import React from "react";
import SearchResultItem from "../SearchResultItem";
import "./SearchResult.scss";

function SearchResult(props) {
  const { listItem, setNumberOfItem, totalItem } = props;
  
  const handleScroll = (e) => {
    let resultContainer = e.target;
    if (resultContainer.scrollHeight - resultContainer.scrollTop < resultContainer.clientHeight) {
      const newNumberOfItem = 2*listItem.length > totalItem ? totalItem : 2 * listItem.length; 
      setNumberOfItem(newNumberOfItem);
    }
  }

  const items = (listItem) => (
    listItem.map((item) => <SearchResultItem title={item.title} />)
  );

  return <div className="search-result" onScroll={handleScroll}>{items(listItem)}</div>;
}

export default SearchResult;
