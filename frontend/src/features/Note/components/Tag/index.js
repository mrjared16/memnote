import React from "react";
import * as StyledLibrary from "antd";
import "./Tag.scss";

function Tag(props) {
  const { title, icon, ...field } = props;

  const isLongTag = title && title.length > 8;

  return (
    <StyledLibrary.Tag
      className="tag"
      key={title}
      closable={true}
      {...field}
    >
      {icon}
      {/* <span> */}
        {isLongTag ? `${title.slice(0, 8)}...` : title}
      {/* </span> */}
    </StyledLibrary.Tag>
  );
}

export default Tag;
