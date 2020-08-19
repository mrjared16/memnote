import React from "react";
import Title from "../../../../components/Title";
import { Tree, TreeNode } from "antd";
import "./ListNote.scss";
import { useHistory } from "react-router-dom";
import Loading from "../Loading";
import Button from "../Button";

function ListNote(props) {
  const history = useHistory();

  const { title, data = [], handleLoad, selectedNote, treeView = true, isLoading = false } = props;

  const handleSelectTreeNote = (IDs, info) => {
    // console.log(info);
    const { selected = false } = info;
    if (!selected)
      return;
    const id = IDs[0];
    console.log("redirect to note ", id);
    history.push(`/note/${id}`);
  };

  const handleSelectListNote = (id) => (e) => {
    console.log("redirect to note ", id);
    history.push(`/note/${id}`);
  }

  // console.log(selectedNote, data);
  return (
    <>
      {!treeView && data.map(({ title, id }) =>
        <Button key={id} className="search-result-item" label={title} onClick={handleSelectListNote(id)} />)}

      {treeView &&
        <div className="list-note">
          <Title className="list-note-title" name={title} />
          {isLoading && <Loading />}
          {
            (!isLoading && data.length > 0) &&
            <Tree
              className="list"
              onSelect={handleSelectTreeNote}
              loadData={handleLoad}
              treeData={data}
              selectedKeys={selectedNote}
            />

          }
        </div>
      }
    </>
  );
}

export default ListNote;
