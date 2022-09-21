import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg';

import { useDispatch } from 'react-redux';
import { deletePost, findPost } from '../../Redux/postSlice';

import api from '../../api/api';

const PostCard = ({ post, setShowUpdateModal }) => {

    const dispatch = useDispatch();

    const handleDeletePost = async (id) => {
        try {
            const response = await api.deletePost(id);

            if (response.success) {
                dispatch(deletePost(response.post));
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleUpdatePost = (post) => {
        dispatch(findPost(post));
        setShowUpdateModal(true);
    }

    return (
        <Card
            className='shadow'
            border={
                post.status === 'LEARNED'
                    ? 'success'
                    : post.status === 'LEARNING'
                        ? 'warning'
                        : 'danger'
            }
        >
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className='post-title'>{post.title}</p>
                            <Badge
                                pill
                                className={
                                    post.status === 'LEARNED'
                                        ? 'bg-success'
                                        : post.status === 'LEARNING'
                                            ? 'bg-warning'
                                            : 'bg-danger'
                                }
                            >
                                {post.status}
                            </Badge>
                        </Col>
                        <Col className='text-right'>
                            <a className='post-button' href={`http://${post.url}`} target='_blank'>
                                <img src={playIcon} alt='play' width='32' height='32' />
                            </a>
                            <button className='post-button' onClick={() => handleUpdatePost(post)}>
                                <img src={editIcon} alt='edit' width='24' height='24' />
                            </button>
                            <button className='post-button' onClick={() => handleDeletePost(post._id)}>
                                <img src={deleteIcon} alt='delete' width='24' height='24' />
                            </button>
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>{post.description}</Card.Text>
            </Card.Body>
        </Card >
    )
}

export default PostCard