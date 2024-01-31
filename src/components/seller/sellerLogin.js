import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { handleUserId } from '../../store/authSlice';
import './styles/sellerloginCss.css';
import { handleUserState } from '../../store/authSlice';

const SellerLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {stateName,api} = useSelector(state => state.authdata);
    const [allStateName, setAllStateName] = useState([]);
    const [registerorlogin, setRegisterorLogin] = useState('register');
    const [Toastobj, setToastObj] = useState({
        showToast: false,
        toastMsg: '',
        color: ''
    });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        farmName: '',
        farmLocation: '',
        password: '',
        repassword: '',
        remberMe: false
    });

    useEffect(() => {
        setAllStateName([...stateName])
    }, [stateName])

    const handleChange = (e) => {
        if (e.target.name == 'mobileNumber' && e.target.value.length > 10) {
            return
        }
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
        else if (formData.mobileNumber === null || formData.mobileNumber === undefined || formData.mobileNumber === '' || formData.mobileNumber.length != 10) {
            alert('Enter valid Mobile Number');
        }
        else if (formData.mobileNumber[0] < 6) {
            alert('Enter valid Mobile Number');
        }
        else if (formData.farmName === null || formData.farmName === undefined || formData.farmName === '') {
            alert('Enter valid farm Name');
        }
        else if (formData.farmLocation === null || formData.farmLocation === undefined || formData.farmLocation === '') {
            alert('Enter valid farm Location');
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
        else if (formData.repassword !== formData.password) {
            alert('Re password not matching password')
        }
        else {
            try {
                const response = await axios.post(`${api}/sellerRegistration`, {
                    type: 'SELLER',
                    name: formData.name,
                    email: formData.email,
                    mobileNumber: formData.mobileNumber,
                    farmName: formData.farmName,
                    farmLocation: formData.farmLocation,
                    password: formData.password,
                });
                if (response.data.status === 'Success') {
                    if (formData.remberMe) {
                        let obj = {
                            userType: 'SELLER',
                            userEmail: formData.email,
                            userPassword: formData.password,
                            userAccessToken: response.data.acessToken,
                            userId: response.data.user_id
                        }
                        localStorage.setItem('auth_user_data', JSON.stringify(obj));
                    }
                    let userDetails = {
                        user_token_id: response.data.acessToken,
                        user_id: response.data.user_id,
                        user_type: 'SELLER',
                        name: response.data.name,
                        mobileNumber: response.data.mobileNumber,
                        farmName: response.data.farmName,
                        farmLocation: response.data.farmLocation,
                    }
                    dispatch(handleUserState(userDetails))
                    setToastObj({
                        showToast: true,
                        toastMsg: 'Account successfully created!',
                        color: 'green'
                    });
                    navigate('/seller/home');
                } else if (response.data.response === 'Accounted already present') {
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
                const response = await axios.post(`${api}/sellerlogin`, {
                    type: 'SELLER',
                    email: formData.email,
                    password: formData.password
                });
                if (response.data.status === 'Success') {
                    if (formData.remberMe) {
                        let obj = {
                            userType: 'SELLER',
                            userEmail: formData.email,
                            userPassword: formData.password,
                            userAccessToken: response.data.acessToken,
                            userId: response.data.user_id
                        }
                        localStorage.setItem('auth_user_data', JSON.stringify(obj));
                    }

                    let userDetails = {
                        user_token_id: response.data.acessToken,
                        user_id: response.data.user_id,
                        user_type: 'SELLER',
                        name: response.data.name,
                        mobileNumber: response.data.mobileNumber,
                        farmName: response.data.farmName,
                        farmLocation: response.data.farmLocation,
                    }
                    dispatch(handleUserState(userDetails));
                    setToastObj({
                        showToast: true,
                        toastMsg: 'Login Sucessfull!',
                        color: 'green'
                    });
                    navigate('/seller/home');
                } else if (response.data.response === 'Password wrong') {
                    setToastObj({
                        showToast: true,
                        toastMsg: 'Enter correct password!',
                        color: 'red'
                    });
                } else if (response.data.response === 'No such user exist') {
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
            <div className='login-img'> </div>
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
                                <label >Name</label>
                                <input
                                    type='text'
                                    placeholder="Enter full name"
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-div'>
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-div'>
                                <label>Mobile Number</label>
                                <input
                                    type="number"
                                    placeholder="Enter mobile number"
                                    name='mobileNumber'
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-div'>
                                <label>Farm Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your farm name"
                                    name='farmName'
                                    value={formData.farmName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-div'>
                                <label>Farm Location</label>
                                <select 
                                name="farmLocation"
                                value={formData.farmLocation}
                                placeholder='Select farm Location'
                                onChange={handleChange}>
                                    {
                                        allStateName.map((item, index) => {
                                            return (
                                                <option
                                                    key={item.name}
                                                    value={item.name}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                           
                            </div>
                            <div className="form-div" >
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-div" >
                                <label >Re-Enter Password</label>
                                <input
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
                                                : <div
                                                    style={{
                                                        border: '1px solid #15589b',
                                                        width: '14px',
                                                        height: '14px',
                                                        color: '#15589b',
                                                        borderRadius: '4px',
                                                    }}  ></div>
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
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <button className='form-btn'>
                                    Register
                                </button>
                            </div>

                        </Form>
                    ) : <Form className='form-container' onSubmit={handlesubmit}>
                        <div style={{ width: '100%' }}>
                            <h3 style={{
                                textAlign: 'center',
                                color: '#87986A',
                                fontFamily: 'poppins',
                                fontSize: 26
                            }}>Login</h3>
                        </div>
                        <div className='form-div'>
                            <label >Email address</label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-div" >
                            <label>Enter Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                name='password'
                                value={formData.password}
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
                                            : <div
                                                style={{
                                                    border: '1px solid #15589b',
                                                    width: '14px',
                                                    height: '14px',
                                                    color: '#15589b',
                                                    borderRadius: '4px',
                                                }}  ></div>
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
                                    cursor: 'pointer',
                                    fontSize: 12, color: '#15589b'
                                }}
                            >
                                Don't have an account? Signup
                            </button>
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <button className='form-btn'>
                                Login
                            </button>
                        </div>
                    </Form>
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

export default SellerLogin;
