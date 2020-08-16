import React from "react";
import { Switch, Row, Col } from "antd";
import "./FilterForm.scss";

function FilterForm(props) {
  const { title, switchTitle, content, switchContent } = props;

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

  if (data[0].value === false) data[1].disabled = true;
  if (data[1].value === false) data[0].disabled = true;

  // console.log(data);

  const filterItem = ({ name, value, setter, disabled = false }) => {
    return (
      <Row key={name}>
        <Col span={8} className="filter-title">
          <span>{name}</span>
        </Col>
        {disabled ? (
          <Col span={16}>
            <Switch onChange={setter} checked={value} disabled />
          </Col>
        ) : (
          <Col span={16}>
            <Switch onChange={setter} checked={value} />
          </Col>
        )}
      </Row>
    );
  };
  // console.log(props);
  return (
    <>
      {data.map((item) => filterItem(item))}
    </>
  );
}

export default FilterForm;
