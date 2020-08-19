import React from "react";
// import SearchResultItem from "../SearchResultItem";
import "./SearchResult.scss";
import Loading from "../Loading";
import { Button } from "antd";
import ListNote from "../ListNote";

function SearchResult(props) {
  const { listItem, setNumberOfItem, totalItem, isLoading } = props;

  const handleScroll = (e) => {
    let resultContainer = e.target;
    if (resultContainer.scrollHeight - resultContainer.scrollTop < resultContainer.clientHeight) {
      console.log('loading more');
      const newNumberOfItem = 10 + listItem.length > totalItem ? totalItem : 10 + listItem.length;
      setNumberOfItem(newNumberOfItem);
    }
  }

  return <div className="search-result" onScroll={handleScroll}>
    {/* {
      listItem.map((item) => <Button className="search-result-item" key={item.id}>{item.title}</Button>)
    } */}
    
    <ListNote data={listItem} treeView={false} />
    {isLoading && <Loading style/>}
  </div>;
}

export default SearchResult;
