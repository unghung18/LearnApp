/* import { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    })

    const onValueChange = (e) => {
        setUser(prev => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8080/api/auth/register', user);
            navigate('/login');
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className="register-container">
            <div className="register-title"> Sign up </div>
            <form onSubmit={handleSubmit}>
                <label>EMAIL</label>
                <input type="text" placeholder="Enter your email" name='email' onChange={(e) => onValueChange(e)} />
                <label>USERNAME</label>
                <input type="text" placeholder="Enter your username" name='username' onChange={(e) => onValueChange(e)} />
                <label>PASSWORD</label>
                <input type="password" placeholder="Enter your password" name='password' onChange={(e) => onValueChange(e)} />
                <button type="submit"> Create account </button>
            </form>
        </section>

    );
}

export default Register; */


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AlertMessage from '../Alert/Alert';
import api from '../../api/api';
import background from '../../assets/backgroundAuth.jpg';
import axios from 'axios';

const RegisterForm = () => {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate();
    const [alert, setAlert] = useState(null)

    const onChangeRegisterForm = event =>
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })

    const register = async event => {
        event.preventDefault();

        if (user.password !== user.confirmPassword) {
            setAlert({ type: 'danger', message: 'Passwords do not match' })
            setTimeout(() => setAlert(null), 5000)
            return
        }

        try {
            await axios.post('http://localhost:8080/api/auth/register', user);
            navigate('/login')
        } catch (error) {
            if (!error.response.data.success) {
                setAlert({ type: 'danger', message: error.response.data.message })
                setTimeout(() => setAlert(null), 5000)
            }
        }
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center vh-100 vw-100' style={{ backgroundImage: `url(${background})`, backgroundPosition: "center center", backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                <div className='text-center w-50'>
                    <Form className='my-4' onSubmit={register}>
                        <AlertMessage info={alert} />
                        <Form.Group className='mb-3'>
                            <Form.Control
                                type='text'
                                placeholder='Username'
                                name='username'
                                required
                                onChange={onChangeRegisterForm}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control
                                type='text'
                                placeholder='Email'
                                name='email'
                                required
                                onChange={onChangeRegisterForm}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control
                                type='password'
                                placeholder='Password'
                                name='password'
                                required
                                onChange={onChangeRegisterForm}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Control
                                type='password'
                                placeholder='Confirm Password'
                                name='confirmPassword'
                                required
                                onChange={onChangeRegisterForm}
                            />
                        </Form.Group>
                        <Button variant='success' type='submit'>
                            Register
                        </Button>
                    </Form>
                    <p className='text-light'>
                        Already have an account?
                        <Link to='/login'>
                            <Button variant='info' size='sm' className='ml-3'>
                                Login
                            </Button>
                        </Link>
                    </p>
                </div>
            </div>

        </>
    )
}

export default RegisterForm;