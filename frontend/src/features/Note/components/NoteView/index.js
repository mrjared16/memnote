import React, { useState, useCallback } from 'react';
import { Space, Typography, Input, Row, Tag, Col } from 'antd';
import { HeartOutlined, DeleteOutlined, EditOutlined, SplitCellsOutlined, TagsOutlined, CloseOutlined, EyeOutlined, HeartFilled } from '@ant-design/icons';
import './NoteView.scss';
import MyButton from '../Button';
import ReactMarkdown from 'react-markdown';
import ContentEditable from "react-contenteditable";
import dateFormat from 'dateformat';
import Loading from '../Loading';

const { Text, Title } = Typography;
const { TextArea } = Input;

function NoteView(props) {
    const { note = {}, splitMode, handleChange, handleEvent, isLoading } = props;

    const {
        id,
        title,
        content,
        isFavorite,
        lastEdited,
        tags = [],
        children
    } = note;
    
    console.log(note);
    const noteID = id;

    const [previewMode, setPreviewMode] = useState(props.previewMode ? props.previewMode : false);
    const handleTogglePreviewMode = (e) => {
        setPreviewMode(!previewMode);
    }
    const { handleCloseSplitPane, handleOpenSplitPane } = handleEvent;
    const { handleTitleChange, handleContentChange, handleToggleFavorite } = handleChange;
    // console.log(props);
    const getFormatedDate = () => {
        return dateFormat(lastEdited, 'h:MMTT dd/mm/yyyy');
    }
    const onTitleChange = useCallback(
        (e) => {
            const newTitle = e.target.value;
            handleTitleChange(newTitle);
        }, []);
    const handleDeleteNote = () => {

    }
    const handleSaveNote = () => {

    }
    const handleAddTag = () => {

    }
    const handleRemoveTagFromNote = (tagID, noteID) => () => {

    }
    return (
        <>
            {isLoading ?
                <Loading className='viewer-main' /> :
                (<>
                    {id
                        ?
                        <div className='viewer'>
                            <div className='viewer-header'>
                                <Row>
                                    <Col flex='auto' className='viewer-tool-left'>
                                        <Space>
                                            <MyButton className={isFavorite && 'active'}
                                                label='Favorite'
                                                onClick={handleToggleFavorite}
                                                popover={true}
                                                icon={isFavorite ?
                                                    <HeartFilled /> :
                                                    <HeartOutlined />} />
                                            <MyButton label='Delete' onClick={handleDeleteNote} popover={true} icon={<DeleteOutlined />} />
                                            <Text className='text'>Last edited: {getFormatedDate()} </Text>
                                        </Space>
                                    </Col>
                                    <Col flex='auto' className='viewer-tool-right'>
                                        <Space >
                                            <MyButton label='Save' className='save-btn' onClick={handleSaveNote} />
                                            {
                                                previewMode ?
                                                    <MyButton label={'Edit'} onClick={handleTogglePreviewMode} popover={true} icon={<EditOutlined />} /> :
                                                    <MyButton label={'Preview'} onClick={handleTogglePreviewMode} popover={true} icon={<EyeOutlined />} />
                                            }

                                            {splitMode ?
                                                <MyButton label='Close' onClick={handleCloseSplitPane} popover={true} icon={<CloseOutlined />} /> :
                                                <MyButton label='Split' onClick={handleOpenSplitPane} popover={true} icon={<SplitCellsOutlined />} />
                                            }
                                        </Space>
                                    </Col>
                                </Row>
                                <Row className='tags'>
                                    <Space>
                                        <MyButton label='Tags' className='add-tag-btn' onClick={handleAddTag} icon={<TagsOutlined />} />
                                        <Space className='tag-list'>
                                            {
                                                tags.map(({ id, name }) => {
                                                    return (
                                                        <Tag className='tag' key={id} closable onClose={handleRemoveTagFromNote(id, noteID)}>{name}</Tag>
                                                    )
                                                })
                                            }
                                        </Space>
                                    </Space>
                                </Row>
                            </div>

                            <Row className='viewer-main'>
                                <Col flex='auto'></Col>
                                <Col flex={splitMode ? '6' : '3'}>

                                    <h1 className='title-content ant-typography'>
                                        <ContentEditable
                                            html={`${title}`}
                                            onChange={onTitleChange}
                                        />
                                    </h1>

                                    {previewMode ?
                                        <ReactMarkdown className='note-content reset' source={content} /> :
                                        <TextArea className='note-content' autoSize={true} value={content} bordered={false} onChange={handleContentChange} />
                                    }
                                </Col>
                                <Col flex='auto'></Col>
                            </Row>
                        </div >
                        :
                        <>
                            <Text>Note not found</Text>
                        </>
                    }
                </>
                )
            }
        </>
    );
}

export default NoteView;