import React, { useState, useEffect } from 'react';
import { Row, Col, List, Typography } from 'antd';
import { DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import MyButton from '../../components/Button';
import './TrashNote.scss';
import noteAPI from '../../../../api/noteAPI';

const { Title } = Typography;

function TrashNote(props) {
    const [deletedNotes, setDeletedNotes] = useState([]);
    const [initLoading, setInitLoading] = useState(true);
    const handlePermanentlyDeleteNote = (item) => () => {
        console.log(item);
    }
    const handleRecoverNote = (item) => () => {
        console.log(item);
    }
    useEffect(() => {
        const loadDeletedNotes = async () => {
            const { result } = await noteAPI.getDeleteNotes();
            setDeletedNotes(result);
            setInitLoading(false);
        }
        loadDeletedNotes()
    }, []);
    return (
        <div className='trash-note'>
            <Row className='trash-header'>
                <Col flex='auto'>
                    <Title><DeleteOutlined />  Trash</Title>
                </Col>
                <Col>
                    <MyButton label='Empty trash' onClick={() => { }}></MyButton>
                </Col>
            </Row>
            <Row className='trash-list'>
                <List
                    loading={initLoading}
                    itemLayout="horizontal"
                    dataSource={deletedNotes}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <MyButton label='Recover' onClick={handleRecoverNote(item)} popover={true} icon={<UndoOutlined />} />,
                                <MyButton label='Permanently delete' onClick={handlePermanentlyDeleteNote(item)} popover={true} icon={<DeleteOutlined />} />
                            ]}
                        >
                            <Col span={18}>{item.title}</Col>
                        </List.Item>
                    )}
                />
            </Row>
        </div>
    );
}

export default TrashNote;