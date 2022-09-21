import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import api from '../../api/api';
import { useDispatch } from 'react-redux';
import { addOne } from '../../Redux/postSlice';

const AddPostModal = ({ showAddModal, setShowAddModal, setShowToast }) => {

    // State
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })

    const dispatch = useDispatch();

    const onChangeNewPostForm = event =>
        setNewPost({ ...newPost, [event.target.name]: event.target.value })

    const closeDialog = () => {
        resetAddPostData()
    }

    const onSubmit = async event => {

        event.preventDefault();

        const { success, message, post } = await api.addPost(newPost);
        dispatch(addOne(post));
        resetAddPostData();

        setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
    }

    const resetAddPostData = () => {
        setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' })
        setShowAddModal(false)
    }

    return (
        <Modal show={showAddModal} onHide={() => closeDialog()}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className='mb-3'>
                        <Form.Control
                            type='text'
                            placeholder='Title'
                            name='title'
                            required
                            aria-describedby='title-help'
                            onChange={onChangeNewPostForm}
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
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Youtube Tutorial URL'
                            name='url'
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShowAddModal(false)}>
                        Cancel
                    </Button>
                    <Button variant='primary' type='submit'>
                        LearnIt!
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal >
    )
}

export default AddPostModal;