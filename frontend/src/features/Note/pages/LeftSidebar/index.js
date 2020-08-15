import React, { useState, useEffect } from "react";
import "./LeftSidebar.scss";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setVisibleSearchForm } from "../../noteSlice";
import UserMenu from "../../components/UserMenu";
import SearchForm from "../../components/SearchForm";
import { Layout, Menu } from "antd";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import ListNote from "../../components/ListNote";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";

const { Content } = Layout;

let key = 0;

const createNote = () => {
  console.log("create instance");
  return {
    id: `id${key++}`,
    title: `title${key}`,
  };
};

const mockupNoteAPI = (delay = 1000) => {
  return new Promise((resolve) => {
    const result = [createNote(), createNote()];
    setTimeout(() => {
      resolve(result);
    }, delay);
  });
};


function LeftSidebar() {
  const getInitNote = (delay) => {
    const response = mockupNoteAPI(delay);
    return response;
  };

  const getChildren = async (noteId) => {
    const response = mockupNoteAPI();
    return response;
  };

  const addKey = (listNote) => {
    return listNote.map((note) => {
      note.key = note.id;
      if (note.children && Array.isArray(note.children)) {
        note.children = addKey(note.children);
      }
      return note;
    });
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const [favoriteNotes, setFavoriteNotes] = useState([]);
  const [rootNotes, setRootNotes] = useState([]);

  const openSearchForm = () => {
    dispatch(setVisibleSearchForm(true));
  };

  const selectNote = (selectedKeys, info) => {
    const selected = info.selectedNodes[0];
    const { id } = selected;
    console.log("redirect to note ", id);
    history.push(`/note/{id}`);
  };

  function updateTreeData(list, key, children) {
    return list.map((node) => {
      if (node.key === key) {
        return { ...node, children };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }

      return node;
    });
  }
  const loadChildren = (setter) => {
    return async ({ key, children }) => {
      if (children) return;

      let newChildren = null;
      newChildren = await getChildren(key);
      newChildren = addKey(newChildren);

      setter((origin) => updateTreeData(origin, key, newChildren));
    };
  };

  useEffect(() => {
    getInitNote(500).then((response) => setFavoriteNotes(addKey(response)));
    getInitNote(1000).then((response) => setRootNotes(addKey(response)));
  }, []);

  return (
    <>
      <Content>
        <Menu mode="inline">
          <UserMenu />

          <Button
            className="search-btn"
            onClick={openSearchForm}
            icon={<SearchOutlined style={{ color: "#9DA39B" }} />}
            label="Search"
          />

          <ListNote
            title="My Favorite"
            data={favoriteNotes}
            handleSelect={selectNote}
            handleLoad={loadChildren(setFavoriteNotes)}
          />

          <ListNote
            title="My Note"
            data={rootNotes}
            handleSelect={selectNote}
            handleLoad={loadChildren(setRootNotes)}
          />

          <Button
            className="add-btn btn-transparent"
            onClick={() => {}}
            icon={<PlusCircleOutlined />}
            label="Add Note"
          />

          <Button
            className="trash-btn btn-transparent"
            onClick={() => {}}
            icon={<DeleteOutlined />}
            label="Trash"
          />
        </Menu>
      </Content>
      <SearchForm />
    </>
  );
}

export default LeftSidebar;
