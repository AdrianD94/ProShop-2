import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        console.log(email, password)
        try {
            const res = await register({ email, password, name }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || error.error)
        }
    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword' className='my-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='name' className='my-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>Sign Up</Button>
                {isLoading && <Loader />}
            </Form>
            <Row className='py-3'><Col>Already have an account? Login <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>here</Link></Col></Row>
        </FormContainer>
    )
}

export default RegisterScreen
