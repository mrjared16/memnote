import React from "react";
import { Switch, Row, Col } from "antd";
import "./FilterForm.scss";

function FilterForm(props) {
  const { title, switchTitle, content, switchContent } = props;
  const filterItem = ({ name, value, setter }) => {
    return (
      <Row key={name}>
        <Col span={8} className="filter-title">
          <span>{name}</span>
        </Col>
        <Col span={16}>
          <Switch onChange={setter} defaultChecked={value} />
        </Col>
      </Row>
    );
  };
  // console.log(props);
  return (
    <>
      {[
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
      ].map((item) => filterItem(item))}
    </>
  );
}

export default FilterForm;
