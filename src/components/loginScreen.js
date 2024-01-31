import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const Login = () => {
    const {stateName,api} = useSelector(state => state.authdata);
    const navigate = useNavigate();
    const [registerorlogin, setRegisterorLogin] = useState('register');
    const [Toastobj, setToastObj] = useState({
        showToast: false,
        toastMsg: '',
        color: ''
    });
    let auth = ''
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        repassword: '',
        remberMe: false
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function handlesubmit(e) {
        e.preventDefault();
        if (registerorlogin === 'register') {
            handleRegistration()
        } else {
            handleLogin()
        }
    }

    async function handleRegistration() {
        if (formData.name === null || formData.name === undefined || formData.name === '') {
            alert('Enter valid Name');
        }
        else if (formData.email === null || formData.email === undefined || formData.email === '') {
            alert('Enter valid Email');
        }
        else if (!formData.email.includes('@') || !formData.email.includes('.')) {
            alert('Enter valid Email');
        }
        else if (formData.password === null || formData.password === undefined || formData.password === '') {
            alert('Enter valid Password');
        }
        else if (formData.password.length < 8) {
            alert('password should be atleast 8 characters')
        }
        else if (formData.repassword === null || formData.repassword === undefined || formData.repassword === '') {
            alert('Enter Repassword');
        }
        else if (formData.repassword != formData.password) {
            alert('Re password not matching password')
        }
        else {
            try {
                const response = await axios.post(`${api}/customerregistraion`, {
                    type: 'CUSTOMER',
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });
                if (response.data.status == 'Success') {
                    auth = response.data.acessToken;
                    if (formData.remberMe && auth) {
                        localStorage.setItem('authToken', response.data.acessToken);
                    }
                    setToastObj({
                        showToast: true,
                        toastMsg: 'Account successfully created!',
                        color: 'green'
                    });
                    navigate('/customerHome');
                } else if (response.data.response == 'Accounted already present') {
                    alert('Already an account exist with this username, create new or else login!')
                } else {
                    alert('OOps, Unexpected error occured please try after sometime!')
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    async function handleLogin() {
        if (formData.email === null || formData.email === undefined || formData.email === '') {
            alert('Enter valid Email');
        }
        else if (!formData.email.includes('@') || !formData.email.includes('.')) {
            alert('Enter valid Email');
        } else if (formData.password.length < 8) {
            alert('password wrong')
        } else {
            try {
                const response = await axios.post(`${api}/customerLogin`, {
                    type: 'CUSTOMER',
                    email: formData.email,
                    password: formData.password
                });
                if (response.data.status == 'Success') {
                    auth = response.data.acessToken;
                    if (formData.remberMe && auth) {
                        localStorage.setItem('authToken', response.data.acessToken);
                    }
                    setToastObj({
                        showToast: true,
                        toastMsg: 'Login Sucessfull!',
                        color: 'green'
                    });
                    navigate('/customerHome');
                } else if (response.data.response == 'Password wrong') {
                    setToastObj({
                        showToast: true,
                        toastMsg: 'Enter correct password!',
                        color: 'red'
                    });
                } else if (response.data.response == 'No such user exist') {
                    setToastObj({
                        showToast: true,
                        toastMsg: 'No such user exist, try different email!',
                        color: 'red'
                    });
                } else {
                    setToastObj({
                        showToast: true,
                        toastMsg: 'OOps, something went wrong!',
                        color: 'red'
                    });
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }



    return (
        <div className='login-container'>
            <div className='login-img'>

            </div>
            <div className='login-form'>
                {
                    registerorlogin === 'register' ? (
                        <Form className='form-container' onSubmit={handlesubmit}>
                            <div style={{ width: '100%' }}>
                                <h3 style={{
                                    textAlign: 'center',
                                    color: '#87986A',
                                    fontFamily: 'poppins',
                                    fontSize: 26
                                }}>Register</h3>
                            </div>
                            <div className='form-div'>
                                <label className='form-label'>Name</label>
                                <input
                                    className='form-input'
                                    type='text'
                                    placeholder="Enter Full Name"
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-div'>
                                <label className='form-label'>Email address</label>
                                <input
                                    className='form-input'
                                    type="email"
                                    placeholder="Enter email"
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-div" >
                                <label className='form-label'>Enter Password</label>
                                <input
                                    className='form-input'
                                    type="password"
                                    placeholder="Password"
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-div" >
                                <label className='form-label'>Re-Enter Password</label>
                                <input
                                    className='form-input'
                                    type="password"
                                    placeholder="Password"
                                    name='repassword'
                                    value={formData.repassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }} >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div
                                        onClick={() => { setFormData((prevData) => ({ ...prevData, 'remberMe': !formData.remberMe })) }}>
                                        {
                                            formData.remberMe ?
                                                <FontAwesomeIcon icon={faSquareCheck}
                                                    style={{ color: '#15589b', margin: 0, padding: 0 }} />
                                                : <FontAwesomeIcon icon={faSquare} style={{ color: '#15589b' }} size={25} />
                                        }
                                    </div>
                                    <div
                                        style={{
                                            marginLeft: '10px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: '#15589b',
                                            fontSize: 14
                                        }}>
                                        Remember me
                                    </div>
                                </div>
                                <button onClick={() => {
                                    setRegisterorLogin('login')
                                    setFormData({
                                        name: '',
                                        email: '',
                                        password: '',
                                        repassword: '',
                                        remberMe: false
                                    })
                                }}
                                    style={{
                                        backgroundColor: 'transparent',
                                        borderWidth: 0,
                                        cursor: 'pointer',
                                        fontSize: 12, color: '#15589b'
                                    }}
                                >

                                    Already have a account? Login
                                </button>
                            </div>
                            <button className='form-btn'>
                                Register
                            </button>
                        </Form>
                    ) :
                        (<Form className='form-container' onSubmit={handlesubmit}>
                            <div style={{ width: '100%' }}>
                                <h3 style={{
                                    textAlign: 'center',
                                    color: '#87986A',
                                    fontFamily: 'poppins',
                                    fontSize: 26
                                }}>Login</h3>
                            </div>
                            <div className='form-div'>
                                <label className='form-label'>Email address</label>
                                <input
                                    className='form-input'
                                    type="email"
                                    placeholder="Enter email"
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-div" >
                                <label className='form-label'>Enter Password</label>
                                <input
                                    className='form-input'
                                    type="password"
                                    placeholder="Password"
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }} >
                                <button onClick={() => {
                                    setRegisterorLogin('register')
                                    setFormData({
                                        name: '',
                                        email: '',
                                        password: '',
                                        repassword: '',
                                        remberMe: false
                                    })
                                }}
                                    style={{
                                        backgroundColor: 'transparent',
                                        borderWidth: 0,
                                        cursor: 'pointer'
                                    }}
                                >
                                    <p style={{ fontSize: 12, color: '#15589b' }}>
                                        Don't have an accout? SignUp
                                    </p>
                                </button>
                            </div>
                            <button className='form-btn'>
                                Login
                            </button>
                        </Form>)
                }

                <Toast
                    style={{
                        position: 'absolute',
                        bottom: 0
                    }}
                    onClose={() => setToastObj({
                        showToast: false,
                        toastMsg: ''
                    })} show={Toastobj.showToast} delay={3000} autohide>
                    <Toast.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <p style={{ color: Toastobj.color }}>{Toastobj.toastMsg}</p>
                    </Toast.Body>
                </Toast>
            </div>

        </div >
    )
}

export default Login;


