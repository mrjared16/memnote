import React, { useState, useCallback } from 'react';
import { Space, Typography, Input, Row, Tag, Col, Collapse } from 'antd';
import { HeartOutlined, DeleteOutlined, EditOutlined, SplitCellsOutlined, TagsOutlined, CloseOutlined, EyeOutlined, HeartFilled } from '@ant-design/icons';
import './NoteView.scss';
import MyButton from '../Button';
import ReactMarkdown from 'react-markdown';
import ContentEditable from "react-contenteditable";
import dateFormat from 'dateformat';
import Loading from '../Loading';
import noteAPI from '../../../../api/noteAPI';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ListTag from '../ListTag';
import ListNote from '../ListNote';

const { Text, Title } = Typography;
const { TextArea } = Input;

function NoteView(props) {
    const { note = {}, splitMode, handleChange, handleEvent, isLoading } = props;

    console.log(note);
    const {
        id,
        title,
        content,
        isFavorite,
        lastEdited,
        tags = [],
        children
    } = note;
    const noteID = id;

    const history = useHistory();
    const dispatch = useDispatch();

    const [previewMode, setPreviewMode] = useState(props.previewMode ? props.previewMode : false);
    const [isAsyncLoading, setIsAsyncLoading] = useState(false);

    const handleTogglePreviewMode = (e) => {
        setPreviewMode(!previewMode);
    }
    const { handleCloseSplitPane, handleOpenSplitPane } = handleEvent;
    const { handleTitleChange, handleContentChange, handleToggleFavorite } = handleChange;
    // console.log(props);
    const getFormatedDate = () => {
        return dateFormat(lastEdited, 'h:MM TT dd/mm/yyyy');
    }
    const onTitleChange = useCallback(
        (e) => {
            const newTitle = e.target.value;
            handleTitleChange(newTitle);
        }, []);

    const handleDeleteNote = () => {
        // const deleteNote = async () => {
        //     setIsAsyncLoading(true);
        //     await noteAPI.deleteNote(noteID);
        //     history.push('/');
        // }
        // deleteNote();
    }
    const handleSaveNote = () => {
        // const updateNote = async () => {
        //     setIsAsyncLoading(true);
        //     dispatch(updateNote());
        // }
        // updateNote();
    }
    const handleAddTag = () => {

    }
    const handleRemoveTag = (removedTag) => {
        // if (tag && filterTags.indexOf(tag) === -1) {
        //     setFilterTags([...filterTags, tag]);
        //     resetSearch();
        // }
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
                                            {isAsyncLoading && <Loading />}
                                        </Space>
                                    </Col>
                                    <Col flex='auto' className='viewer-tool-right'>
                                        <Space>
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
                                        <ListTag tags={tags} onAdd={handleAddTag} onRemove={handleRemoveTag} />
                                        {/* <Space className='tag-list'>
                                            {
                                                tags.map(({ id, name }) => {
                                                    return (
                                                        <Tag className='tag' key={id} closable onClose={handleRemoveTagFromNote(id, noteID)}>{name}</Tag>
                                                    )
                                                })
                                            }
                                        </Space> */}
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
                            <Row className='viewer-children'>
                                <Collapse bordered={false} defaultActiveKey={['1']}>
                                    <Collapse.Panel header="Children notes" key="1">
                                        <ListNote data={children} treeView={false}/>
                                    </Collapse.Panel>
                                </Collapse>
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