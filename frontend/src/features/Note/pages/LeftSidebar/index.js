import React, { useState, useEffect, useCallback } from "react";
import "./LeftSidebar.scss";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setSearchFormVisible } from "../../noteSlice";
import UserMenu from "../../components/UserMenu";
import SearchForm from "../../components/SearchForm";
import { Layout, Menu } from "antd";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import ListNote from "../../components/ListNote";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";
import noteAPI from "../../../../api/noteAPI";
import { useParams } from "react-router-dom";

const { Content } = Layout;


function LeftSidebar(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [favoriteNotes, setFavoriteNotes] = useState([]);
  const [rootNotes, setRootNotes] = useState([]);

  const handleOpenSearchForm = () => {
    dispatch(setSearchFormVisible(true));
  };

  const handleAddNewNote = async () => {
    const { newNoteID } = await noteAPI.addNewNote();
    history.push(`/note/${newNoteID}`);
    console.log('redirect to new note');
  }

  const handleSelectNote = (IDs, info) => {
    // console.log(info);
    const { selected = false } = info;
    if (!selected)
      return;
    const id = IDs[0];
    console.log("redirect to note ", id);
    history.push(`/note/${id}`);
  };

  const addKey = useCallback((listNote = []) => {
    return listNote.map((note) => {
      note.key = note.id;
      if (note.children && Array.isArray(note.children)) {
        note.children = addKey(note.children);
      }
      return note;
    });
  });

  const handleLoadChildren = (setter) => {
    const getChildren = async (noteId) => {
      const { result } = await noteAPI.getChildren(noteId);
      return result;
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

    return async ({ key, children }) => {
      if (children)
        return;

      let newChildren = null;
      newChildren = await getChildren(key);
      newChildren = addKey(newChildren);

      setter((origin) => updateTreeData(origin, key, newChildren));
    };
  };

  useEffect(() => {
    async function getFavoriteNotes() {
      const { result } = await noteAPI.getFavoriteNotes();
      setFavoriteNotes(addKey(result));
    }
    async function getRootNotes() {
      const { result } = await noteAPI.getNotes();
      setRootNotes(addKey(result));
    }
    getRootNotes();
    getFavoriteNotes();
  }, []);

  return (
    <>
      <Content>
        <Menu mode="inline">
          <UserMenu />

          <Button
            className="search-btn"
            onClick={handleOpenSearchForm}
            icon={<SearchOutlined style={{ color: 'inherit' }} />}
            label="Search"
          />

          <ListNote
            title="My Favorite"
            data={favoriteNotes}
            handleSelect={handleSelectNote}
            handleLoad={handleLoadChildren(setFavoriteNotes)}
          />

          <ListNote
            title="My Note"
            data={rootNotes}
            handleSelect={handleSelectNote}
            handleLoad={handleLoadChildren(setRootNotes)}
          />

          <Button
            className="add-btn"
            onClick={handleAddNewNote}
            icon={<PlusCircleOutlined />}
            label="Add Note"
          />

          <Button
            className="trash-btn"
            onClick={() => { }}
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
