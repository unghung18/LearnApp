import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Col from 'react-bootstrap/Col';
import PostCard from '../PostCard/PostCard';
import AddModal from '../Modal/AddModal';
import UpdateModal from '../Modal/UpdateModal';
import addIcon from '../../assets/plus-circle-fill.svg';
import api from '../../api/api';
import { useSelector, useDispatch } from 'react-redux';
import { addAll } from '../../Redux/postSlice';
import { useNavigate } from 'react-router-dom';
import logoutIcon from '../../assets/logout.svg';


const Dashboard = () => {

  const dispatch = useDispatch();
  const posts = useSelector(state => state.post).items;
  const navigate = useNavigate();

  const auth = localStorage.getItem('currentUser');

  const [postsLoading, setPostsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: ''
  });


  const getPosts = async () => {
    setPostsLoading(true)
    try {
      const response = await api.getAllPosts();
      dispatch(addAll(response));
    } catch (error) {
      console.log(error)
    }
    setPostsLoading(false);
  }

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (!auth) {
      navigate('/login')
    }
  }, []);

  let body = null

  if (postsLoading) {
    body = (
      <div className='spinner-container'>
        <Spinner animation='border' variant='info' />
      </div>
    )
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className='text-center mx-5 my-5'>
          <Card.Header as='h1'>Hi {auth && JSON.parse(auth).username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button
              variant='primary'
              onClick={() => setShowAddModal(true)}
            >
              LearnIt!
            </Button>
          </Card.Body>
        </Card>
      </>
    )
  } else {
    body = (
      <>
        <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
          {posts.map(post => (
            <Col key={post._id} className='my-2'>
              <PostCard post={post} setShowUpdateModal={setShowUpdateModal} />
            </Col>
          ))}
        </Row>


        {/* Open Add Post Modal */}

        <OverlayTrigger
          placement='left'
          overlay={<Tooltip>Add a new thing to learn</Tooltip>}
        >
          <button
            className='btn-floating'
            onClick={() => setShowAddModal(true)}
          >
            <img src={addIcon} alt='add-post' width='60' height='60' />
          </button>
        </OverlayTrigger>
      </>
    )
  }

  return (
    <>
      {auth &&
        <>
          {body}
          <AddModal showAddModal={showAddModal} setShowAddModal={setShowAddModal} setShowToast={setShowToast} />

          <UpdateModal setShowUpdateModal={setShowUpdateModal} showUpdateModal={showUpdateModal} setShowToast={setShowToast} />
          {showToast.show && <Toast
            show={showToast.show}
            style={{ position: 'fixed', top: '20%', right: '10px' }}
            className={`bg-${showToast.type} text-white`}
            onClose={() => setShowToast(false)}
            delay={3000}
            autohide
          >
            <Toast.Body>
              <strong>{showToast.message}</strong>
            </Toast.Body>
          </Toast>
          }
        </>
      }
    </>
  )
}

export default Dashboard;