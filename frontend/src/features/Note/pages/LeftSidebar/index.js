import React, { useState, useEffect, useCallback } from "react";
import "./LeftSidebar.scss";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setSearchFormVisible, fetchFavoriteNotes, fetchTopLevelNotes, setNotes, setFavoriteNotes, setTopLevelNotes } from "../../noteSlice";
import UserMenu from "../../components/UserMenu";
import SearchForm from "../../components/SearchForm";
import { Layout, Menu } from "antd";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import ListNote from "../../components/ListNote";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";
import noteAPI from "../../../../api/noteAPI";
import { useSelector } from 'react-redux';
const { Content } = Layout;


function LeftSidebar(props) {
  const history = useHistory();

  const dispatch = useDispatch();
  const favoriteNotes = useSelector(state => state.note.favoriteNotes);
  const topLevelNotes = useSelector(state => state.note.topLevelNotes);

  // console.log('favorite: ', favoriteNotes);
  // console.log('top level: ', topLevelNotes);

  const handleOpenSearchForm = () => {
    dispatch(setSearchFormVisible(true));
  };

  const handleAddNewNote = async () => {
    const { newNoteID } = await noteAPI.addNewNote();
    history.push(`/note/${newNoteID}`);
    console.log('redirect to new note');
  }

  const handleNavigateToTrash = async () => {
    history.push(`/trash`);
  }

  const addKey = useCallback((listNote = []) => {
    // console.log(listNote);
    if (!Array.isArray(listNote))
      return [];
    return listNote.map((note) => {
      const modifyNote = { ...note };
      modifyNote.key = modifyNote.id;
      if (note.children && Array.isArray(note.children)) {
        modifyNote.children = addKey(note.children);
      }
      // console.log(modifyNote);
      return modifyNote;
    });
  });
  
  const handleLoadChildren = ({ isFavorite = false } = {}) => {
    const getChildren = async (noteId) => {
      const { result } = await noteAPI.getChildren(noteId);
      return result;
    };

    function updateTreeData(list, key, children) {
      return list.map((node) => {
        if (node.id === key) {
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

      const noteID = key;
      let newChildren = await getChildren(noteID);
      if (!newChildren.length)
        return;
      let origin = isFavorite ? favoriteNotes.data : topLevelNotes.data;
      let newTree = updateTreeData([...origin], key, newChildren);
      const setter = isFavorite ? setFavoriteNotes : setTopLevelNotes;
      // console.log('new tree', newTree);
      dispatch(setter({
        newData: newTree
      }))
    };
  };

  useEffect(() => {
    dispatch(fetchFavoriteNotes());
    dispatch(fetchTopLevelNotes());
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
            data={addKey(favoriteNotes.data)}
            isLoading={favoriteNotes.loading}
            handleLoad={handleLoadChildren({ isFavorite: true })}
          />

          <ListNote
            title="My Note"
            data={addKey(topLevelNotes.data)}
            isLoading={favoriteNotes.loading}
            handleLoad={handleLoadChildren()}
          />

          <Button
            className="add-btn"
            onClick={handleAddNewNote}
            icon={<PlusCircleOutlined />}
            label="Add Note"
          />

          <Button
            className="trash-btn"
            onClick={handleNavigateToTrash}
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
