import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../Redux/postSlice';
import api from '../../api/api';

const UpdateModal = ({ setShowUpdateModal, showUpdateModal, setShowToast }) => {

    const post = useSelector(state => state.post).findPost;
    const dispatch = useDispatch();

    const [updatePostValue, setUpdatePostValue] = useState(post);

    const { title, description, url, status } = updatePostValue;

    const onChangeUpdatedPostForm = event => {
        setUpdatePostValue(prev => {
            return {
                ...prev, [event.target.name]: event.target.value
            }
        })
    }

    const closeDialog = () => {
        setShowUpdateModal(false)
    }

    const onSubmit = async event => {
        event.preventDefault()
        const { success, message } = await api.updatePost(updatePostValue);
        dispatch(updatePost(updatePostValue));
        setShowUpdateModal(false);
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
    }

    useEffect(() => setUpdatePostValue(post), [post])
    return (
        <Modal show={showUpdateModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Making progress?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className='mb-3'>
                        <Form.Control
                            type='text'
                            placeholder='Title'
                            name='title'
                            value={title}
                            required
                            aria-describedby='title-help'
                            onChange={onChangeUpdatedPostForm}
                        />
                        <Form.Text id='title-help' muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            placeholder='Description'
                            name='description'
                            value={description}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control
                            type='text'
                            placeholder='Youtube Tutorial URL'
                            name='url'
                            value={url}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control
                            as='select'
                            name='status'
                            value={status}
                            onChange={onChangeUpdatedPostForm}
                        >
                            <option value='TO LEARN'>TO LEARN</option>
                            <option value='LEARNING'>LEARNING</option>
                            <option value='LEARNED'>LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant='primary' type='submit'>
                        LearnIt!
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdateModal;