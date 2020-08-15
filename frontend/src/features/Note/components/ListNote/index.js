import React from "react";
import Title from "../../../../components/Title";
import { Tree } from "antd";
import "./ListNote.scss";

function ListNote(props) {
  const { title, data, handleSelect, handleLoad } = props;

  return (
    <>
      <div className="list-note">
        <Title className="list-note-title" name={title} />
        <Tree
          className="list"
          onSelect={handleSelect}
          loadData={handleLoad}
          treeData={data}
        />
      </div>
    </>
  );
}

export default ListNote;
