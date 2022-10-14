import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AlertMessage from '../Alert/Alert';
import api from '../../api/api';
import background from '../../assets/backgroundAuth.jpg';

const LoginForm = () => {

    const auth = localStorage.getItem('currentUser');

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] = useState(null)

    const navigate = useNavigate();

    const onChangeLoginForm = event =>
        setUser({ ...user, [event.target.name]: event.target.value })

    const login = async event => {
        event.preventDefault();

        try {
            const loginData = await api.logInUser(user);
            console.log(loginData)
            localStorage.setItem('currentUser', JSON.stringify(loginData));
            navigate('/');
        } catch (error) {
            setAlert({ type: 'danger', message: error.response.data.message })
            setTimeout(() => setAlert(null), 5000)
        }
    }

    useEffect(() => {
        if (auth) {
            navigate('/');
        }
    }, []);

    return (
        <>
            <div className='d-flex justify-content-center align-items-center vw-100 vh-100' style={{ backgroundImage: `url(${background})`, backgroundPosition: "center center", backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                <div className='w-50 text-center'>
                    <Form onSubmit={login}>
                        {alert && <AlertMessage info={alert} />}

                        <Form.Group className='mb-3'>
                            <Form.Control
                                type='text'
                                placeholder='Username'
                                name='username'
                                required
                                onChange={onChangeLoginForm}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control
                                type='password'
                                placeholder='Password'
                                name='password'
                                required
                                onChange={onChangeLoginForm}
                            />
                        </Form.Group>
                        <Button variant='success' type='submit'>
                            Login
                        </Button>
                    </Form>
                    <p className='mt-4 text-light'>
                        Don't have an account?
                        <Link to='/register'>
                            <Button variant='info' size='sm' className='ml-2'>
                                Register
                            </Button>
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default LoginForm;