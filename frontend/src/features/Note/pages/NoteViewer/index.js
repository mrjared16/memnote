import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import NoteView from '../../components/NoteView';
import './NoteViewer.scss';

function NoteViewer(props) {
    // const dispatch = useDispatch();
    // const { id1 } = useParams();
    const [leftNote, setLeftNote] = useState({
        id: 'id1',
        title: 'Title',
        content: `# abc`,
        isFavorite: true,
        lastEdited: Date.now(),
        tags: [{ id: '1', name: 'tag' }, { id: '1', name: 'tag' }],
        children: ['id1', 'id2'],
    });
    const [rightNote, setRightNote] = useState({});
    // const changeTitleHandle = (e) => {
    //     const newTitle = e.target.value;
    //     setLeftNote(origin => ({
    //         ...origin,
    //         title: newTitle
    //     }));
    // }


    const handleContentChange = (setter) => (e) => {
        const newContent = e.target.value;
        setter(origin => ({
            ...origin,
            content: newContent
        }));
    }
    const handleToggleFavorite = (setter) => (e) => {
        setter(origin => ({
            ...origin,
            isFavorite: !origin.isFavorite
        }));
    }
    const handleTitleChange = (setter) => (string) => {
        console.log('change1');
        const newTitle = string;
        setter(origin => ({
            ...origin,
            title: newTitle
        }));
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
        setRightNote({ ...leftNote });
    }
    const handleLeftNoteContentChange = handleContentChange(setLeftNote);
    const handleRightNoteContentChange = handleContentChange(setRightNote);

    const handleLeftNoteTitleChange = handleTitleChange(setLeftNote);
    const handleRightNoteTitleChange = handleTitleChange(setRightNote);

    const handleLeftNoteToggleFavorite = handleToggleFavorite(setLeftNote);
    const handleRightNoteToggleFavorite = handleToggleFavorite(setRightNote);
    return (
        <Row style={{ height: '100%' }} gutter={[5]}>
            <Col className='viewer-container'>
                <NoteView
                    note={leftNote}
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
                        note={rightNote}
                        splitMode={splitMode}
                        handleEvent={{
                            handleCloseSplitPane
                        }}
                        handleChange={{
                            handleContentChange: handleRightNoteContentChange,
                            handleTitleChange: handleRightNoteTitleChange,
                            handleToggleFavorite: handleRightNoteToggleFavorite
                        }} />
                </Col>
            }
        </Row>
    );
}

export default NoteViewer;