import React from "react";
import { Switch, Row, Col } from "antd";
import "./FilterForm.scss";
import ListTag from "../ListTag";

function FilterForm(props) {
  const {
    title, switchTitle,
    content, switchContent,
    tags, onRemoveTag, onAddTag } = props;

  const data = [
    {
      name: "Title",
      value: title,
      setter: switchTitle,
    },
    {
      name: "Content",
      value: content,
      setter: switchContent,
    },
  ];

  data[0].disabled = !(data[1].value);
  data[1].disabled = !(data[0].value);

  const filterItem = ({ name, value, setter, disabled = false }) => {
    return (
      <Row className='filter-item' key={name}>
        <Col flex='auto' className="filter-name">
          <span>{name}</span>
        </Col>
        <Col className='filter-toggle'>
          <Switch onChange={setter} checked={value} disabled={disabled} />
        </Col>
      </Row>
    );
  };
  // console.log(props);
  return (
    <>
      {data.map((item) => filterItem(item))}
      <Row className='filter-item'>
        <Col flex='auto' className="filter-name">
          <span>Tags</span>
        </Col>
      </Row>
      <ListTag
        tags={tags}
        onRemove={onRemoveTag}
        onAdd={onAddTag}
      />
    </>
  );
}

export default FilterForm;
