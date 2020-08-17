import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVisibleSearchForm } from "../../noteSlice";
import Modal from "antd/lib/modal/Modal";
import "./SearchForm.scss";
import { Row, Col, Input } from "antd";
import SortButton from "../SortButton";
import FilterForm from "../FilterForm";
import SearchResult from "../SearchResult";
import Loading from "../Loading";
import SearchBar from "../SearchBar";
import ListTag from "../ListTag";
import noteAPI from "../../../../api/noteAPI";

function SearchForm(props) {
  const visible = useSelector((state) => state.note.visibleSearchForm);
  const dispatch = useDispatch();

  const initialState = {
    query: "",
    numberOfResult: 10,
    sortIndex: 0,
    filterTitle: true,
    filterContent: true,
    filterTags: [],
  };

  const [searchTerm, setSearchTerm] = useState(initialState.query);
  const [numberOfResult, setNumberOfResult] = useState(
    initialState.numberOfResult
  );
  const [sortIndex, setSortIndex] = useState(initialState.sortIndex);
  const [filterTitle, setFilterTitle] = useState(initialState.filterTitle);
  const [filterContent, setFilterContent] = useState(
    initialState.filterContent
  );
  const [filterTags, setFilterTags] = useState(initialState.filterTags);

  const [resultItem, setResultItem] = useState([]);

  const [totalResult, setTotalResult] = useState(0);

  const handleRemoveTag = (removedTag) => {
    setFilterTags(filterTags.filter((tag) => tag !== removedTag));
    resetSearch();
  };

  const handleAddTag = ({ tag }) => {
    // console.log(filterTags)
    if (tag && filterTags.indexOf(tag) === -1) {
      setFilterTags([...filterTags, tag]);
      resetSearch();
    }
  };

  // const handleEditTag =

  const handleCancel = () => {
    dispatch(setVisibleSearchForm(false));
    setNumberOfResult(initialState.numberOfResult);
    setResultItem([]);
    setTotalResult(0);
  };
  const sortOptions = useMemo(
    () => [
      { keyword: "titleAsc", name: "Title (asc)" },
      { keyword: "titleDesc", name: "Title (desc)" },
      { keyword: "dateAsc", name: "Date (asc)" },
      { keyword: "dateDesc", name: "Date (desc)" },
    ],
    []
  );
  // const toggleFilter = () => {
  //   setTitleFilter(!titleFilter);
  // };
  const [isLoading, setIsLoading] = useState(false);

  const resetSearch = () => {
    setNumberOfResult(initialState.numberOfResult);
    setTotalResult(0);
    setResultItem([]);
  };

  const handleSwitchFilter = (setter) => () => {
    setter((origin) => !origin);
    resetSearch();
  };
  const handleSearchTermOnChange = (newValue) => {
    setSearchTerm(newValue);
    resetSearch();
  };
  const handleSortOptionChange = (sortOption) => {
    const index = sortOption.key;
    console.log(index, sortIndex);
    if (sortIndex != index) {
      setSortIndex(sortOption.key);
      resetSearch();
    }
  };

  // debounce
  useEffect(() => {
    console.log("Update search result");

    const getSearchParams = () => {
      const sortOptions = [
        { keyword: "titleAsc", name: "Title (asc)" },
        { keyword: "titleDesc", name: "Title (desc)" },
        { keyword: "dateAsc", name: "Date (asc)" },
        { keyword: "dateDesc", name: "Date (desc)" },
      ];
      return {
        query: searchTerm,
        limit: numberOfResult,
        filter: {
          isTitle: filterTitle,
          isContent: filterContent,
          tags: filterTags,
        },
        sort: sortOptions[sortIndex].keyword,
      };
    };

    if (searchTerm) {
      setIsLoading(true);
      noteAPI.search(getSearchParams()).then((r) => {
        setResultItem(r.result);
        setTotalResult(r.total);
        setIsLoading(false);
      });
    }
  }, [
    searchTerm,
    numberOfResult,
    sortIndex,
    filterTitle,
    filterContent,
    filterTags,
  ]);

  return (
    <Modal
      closable={false}
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      width="50%"
    >
      <div className="search-form">
        <Row>
          <Col span={18} className="search-input">
            <SearchBar
              initalValue={searchTerm}
              onSearchTermChange={handleSearchTermOnChange}
            />

            <SortButton
              sortOptions={sortOptions}
              onSortOptionChange={handleSortOptionChange}
            />

            <SearchResult
              listItem={resultItem}
              totalItem={totalResult}
              setNumberOfItem={setNumberOfResult}
            />
            {totalResult !== 0 ? (
              <span className="total-result">{totalResult} results</span>
            ) : (
              ""
            )}
            {isLoading && <Loading />}
          </Col>
          <Col span={6} className="filter-container">
            <FilterForm
              title={filterTitle}
              switchTitle={handleSwitchFilter(setFilterTitle)}
              content={filterContent}
              switchContent={handleSwitchFilter(setFilterContent)}
            />
            <ListTag
              listTags={filterTags}
              onRemove={handleRemoveTag}
              onAdd={handleAddTag}
            />
          </Col>
        </Row>
      </div>
    </Modal>
  );
}

export default SearchForm;
