import React from "react";
import SearchResultItem from "../SearchResultItem";
import "./SearchResult.scss";
import Loading from "../Loading";

function SearchResult(props) {
  const { listItem, setNumberOfItem, totalItem, isLoading } = props;

  const handleScroll = (e) => {
    let resultContainer = e.target;
    if (resultContainer.scrollHeight - resultContainer.scrollTop < resultContainer.clientHeight) {
      const newNumberOfItem = 2 * listItem.length > totalItem ? totalItem : 2 * listItem.length;
      setNumberOfItem(newNumberOfItem);
    }
  }

  return <div className="search-result" onScroll={handleScroll}>
    {
      listItem.map((item) => <SearchResultItem title={item.title} />)
    }
    {isLoading && <Loading/>}
  </div>;
}

export default SearchResult;
