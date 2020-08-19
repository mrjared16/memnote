import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import NoteView from '../../components/NoteView';
import './NoteViewer.scss';
import { fetchNote, setNoteData } from '../../noteSlice';

function NoteViewer(props) {
    const dispatch = useDispatch();
    const noteData = useSelector(state => state.note.notesInView[0]);
    // console.log(noteData);
    const { id } = useParams();
    useEffect(() => {
        dispatch(fetchNote(id));
    }, [id]);
    const setNote = (pair) => dispatch(setNoteData(pair));
    console.log('note-viewer note id = ', id);
    // const [leftNote, setLeftNote] = useState({
    //     id: 'id1',
    //     title: 'Title',
    //     content: `# abc`,
    //     isFavorite: true,
    //     lastEdited: Date.now(),
    //     tags: [{ id: '1', name: 'tag' }, { id: '1', name: 'tag' }],
    //     children: ['id1', 'id2'],
    // });
    // const [rightNote, setRightNote] = useState({});

    const handleContentChange = (setter) => (e) => {
        const newContent = e.target.value;
        const field = 'content';
        const newValue = newContent;
        setter([{ field, newValue }]);
    }
    const handleToggleFavorite = (setter) => (e) => {
        const { isFavorite } = noteData.data;
        const field = 'isFavorite';
        const newValue = !isFavorite;
        setter([{ field, newValue }]);
    }
    const handleTitleChange = (setter) => (string) => {
        // console.log('change1');
        const newTitle = string;
        const field = 'title';
        const newValue = newTitle;
        setter([{ field, newValue }]);

    }
    // const [activePane, setActivePane] = useState(null);
    // const [rightNote, setRightNote] = useState(null);

    // useEffect(() => {
    //     // console.log('load note', id1);
    // }, []);
    const [splitMode, setSplitMode] = useState(false);
    const handleCloseSplitPane = (e) => {
        setSplitMode(false);
    }
    const handleOpenSplitPane = (e) => {
        setSplitMode(true);
        // setRightNote({ ...leftNote });
    }
    const handleLeftNoteContentChange = handleContentChange(setNote);
    // const handleRightNoteContentChange = handleContentChange(setNote);

    const handleLeftNoteTitleChange = handleTitleChange(setNote);
    // const handleRightNoteTitleChange = handleTitleChange(setNote);

    const handleLeftNoteToggleFavorite = handleToggleFavorite(setNote);
    // const handleRightNoteToggleFavorite = handleToggleFavorite(setNote);
    return (
        <Row style={{ height: '100%' }} gutter={[5]}>
            <Col className='viewer-container'>
                <NoteView
                    note={noteData.data}
                    isLoading={noteData.loading}
                    splitMode={splitMode}
                    handleEvent={{
                        handleCloseSplitPane,
                        handleOpenSplitPane
                    }}
                    handleChange={{
                        handleContentChange: handleLeftNoteContentChange,
                        handleTitleChange: handleLeftNoteTitleChange,
                        handleToggleFavorite: handleLeftNoteToggleFavorite
                    }} />
            </Col>
            {splitMode &&
                <Col className='viewer-container'>

                    <NoteView
                        note={noteData.data}
                        isLoading={false}
                        splitMode={splitMode}
                        handleEvent={{
                            handleCloseSplitPane
                            // handleOpenSplitPane
                        }}
                        handleChange={{
                            handleContentChange: handleLeftNoteContentChange,
                            handleTitleChange: handleLeftNoteTitleChange,
                            handleToggleFavorite: handleLeftNoteToggleFavorite
                        }} />
                </Col>
                // <Col className='viewer-container'>
                //     <NoteView
                //         note={rightNote}
                //         splitMode={splitMode}
                //         handleEvent={{
                //             handleCloseSplitPane
                //         }}
                //         handleChange={{
                //             handleContentChange: handleRightNoteContentChange,
                //             handleTitleChange: handleRightNoteTitleChange,
                //             handleToggleFavorite: handleRightNoteToggleFavorite
                //         }} />
                // </Col>
            }
        </Row>
    );
}

export default NoteViewer;