import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import learnItLogo from '../../assets/logo.svg';
import logoutIcon from '../../assets/logout.svg';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';


const NavbarMenu = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem('currentUser');
  const logout = async () => {
    try {

      await api.logOutUser(auth);
      localStorage.clear();
      navigate('/login');

    } catch (error) {
      console.log(error)
    }
  }
  const login = () => {
    navigate('/login');
  }

  return (
    <Navbar expand='md' bg='info' variant='dark' className='shadow px-5'>
      <Navbar.Brand className='font-weight-bolder text-white'>
        <img
          src={learnItLogo}
          alt='learnItLogo'
          width='32'
          height='32'
          className='mr-2'
        />
        ToDoApp
      </Navbar.Brand>

      <Navbar.Toggle aria-controls='basic-navbar-nav' />

      <Navbar.Collapse id='basic-navbar-nav' className='justify-content-between'>
        <Nav className='mr-auto'>
          <Nav.Link
            className='font-weight-bolder text-white'
            to='/dashboard'
            as={Link}
          >
            Dashboard
          </Nav.Link>
        </Nav>

        {auth ?
          <Nav>
            <Nav.Link className='font-weight-bolder text-white' disabled>
              Welcome {JSON.parse(auth).username}
            </Nav.Link>
            <Button
              variant='secondary'
              className='font-weight-bolder text-white'
              onClick={logout}
            >
              <img
                src={logoutIcon}
                alt='logoutIcon'
                width='32'
                height='32'
                className='mr-2'
              />
              Logout
            </Button>
          </Nav>
          :
          <Nav>
            <Nav.Link className='font-weight-bolder text-white' disabled>
              Welcome
            </Nav.Link>
            <Button
              variant='secondary'
              className='font-weight-bolder text-white'
              onClick={login}
            >
              <img
                src={logoutIcon}
                alt='logoutIcon'
                width='32'
                height='32'
                className='mr-2'
              />
              Login
            </Button>
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarMenu;