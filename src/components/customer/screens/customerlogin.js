import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import customerloginCss from '../stylecss/customerloginCss.css';
import { useSelector, useDispatch } from 'react-redux';
import { handleUserState } from '../../../store/authSlice';

const CustomerLogin = () => {
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
    let auth = ''
    const [formData, setFormData] = useState({
        name: '',
        userLocation: '',
        email: '',
        password: '',
        repassword: '',
        remberMe: false
    })

    useEffect(() => {
        setAllStateName([...stateName])
    }, [stateName])

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
        else if (formData.userLocation === null || formData.userLocation === undefined || formData.userLocation === '') {
            alert('Please select a location');
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
        else if (formData.repassword !== formData.password) {
            alert('Re password not matching password')
        }
        else {
            try {
                const response = await axios.post(`${api}customerregistraion`, {
                    type: 'CUSTOMER',
                    userLocation: formData.userLocation,
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });
                if (response.data.status === 'Success') {
                    if (formData.remberMe) {
                        let obj = {
                            userType: 'CUSTOMER',
                            userEmail: formData.email,
                            userPassword: formData.password,
                            userAccessToken: response.data.acessToken
                        }
                        localStorage.setItem('auth_user_data', JSON.stringify(obj));
                    }
                    let userDetails = {
                        user_token_id: response.data.acessToken,
                        user_id: response.data.user_id,
                        user_type: 'CUSTOMER',
                        name: response.data.name,
                        user_location: response.data.user_location,
                    }
                    dispatch(handleUserState(userDetails));
                    setToastObj({
                        showToast: true,
                        toastMsg: 'Account successfully created!',
                        color: 'green'
                    });
                    navigate('/customer/home');
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
                // let config = {
                //     headers: {
                //         "Access-Control-Allow-Origin": "*",
                //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                //         "credentials": "false"
                //       }
                //   }

                const response = await axios.post(`${api}/customerLogin`, {
                    type: 'CUSTOMER',
                    email: formData.email,
                    password: formData.password
                });
                console.log('response',response)
                if (response.data.status === 'Success') {
                    if (formData.remberMe) {
                        let obj = {
                            userType: 'CUSTOMER',
                            userEmail: formData.email,
                            userPassword: formData.password,
                            userAccessToken: response.data.acessToken
                        }
                        localStorage.setItem('auth_user_data', JSON.stringify(obj));
                    }

                    let userDetails = {
                        user_token_id: response.data.acessToken,
                        user_id: response.data.user_id,
                        user_type: 'CUSTOMER',
                        name: response.data.name,
                        user_location: response.data.user_location,
                    }
                    dispatch(handleUserState(userDetails));
                    setToastObj({
                        showToast: true,
                        toastMsg: 'Login Sucessfull!',
                        color: 'green'
                    });
                    navigate('/customer/home');
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

    // async function handleLogin() {
    //     try {
    //         const response = await axios.post('https://farmtohome.onrender.com/customerLogin', {
    //             type: 'CUSTOMER',
    //             email: formData.email,
    //             password: formData.password
    //         });
    
    //         console.log('response', response);
    
    //         if (response.data.status === 'Success') {
    //             // Perform actions on successful login, e.g., redirect to another page
    //             console.log('Login successful!');
    
    //         } else {
    //             setToastObj({
    //                 showToast: true,
    //                 toastMsg: 'Oops, something went wrong!',
    //                 color: 'red'
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         // Handle specific error scenarios or show a generic error message to the user
    //         setToastObj({
    //             showToast: true,
    //             toastMsg: 'An error occurred during login. Please try again later.',
    //             color: 'red'
    //         });
    //     }
    // }
    

    return (
        <div className='login-container'>
            <div className='login-img'>

            </div>
            <div className='login-form'>
                {
                    registerorlogin === 'register' ? (
                        <Form className='form-container' onSubmit={handlesubmit}>
                            <h3 >Register as Buyer</h3>
                            <div className='form-div'>
                                <label >Name</label>
                                <input
                                    type='text'
                                    placeholder="Enter Full Name"
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-div'>
                                <label>Your Location</label>
                                <select name="userLocation" onChange={handleChange}>
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
                                <label >Enter Password</label>
                                <input
                                    type="password"
                                    placeholder="Password"
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
                                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
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
                                        <p style={{ margin: 0, padding: 0 }}> Remember me</p>
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
                    ) :
                        (<Form className='form-container' onSubmit={handlesubmit}>
                            <h3>Login</h3>
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
                                <label >Enter Password</label>
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
                                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                        onClick={() => { setFormData((prevData) => ({ ...prevData, 'remberMe': !formData.remberMe })) }}>
                                        {
                                            formData.remberMe ?
                                                <FontAwesomeIcon icon={faSquareCheck}
                                                    style={{ color: '#15589b', margin: 0, padding: 0 }} />
                                                : <div icon={faSquare}
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
                                        <p style={{ margin: 0, padding: 0 }}> Remember me</p>
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
                                    Already have a account? Login
                                </button>

                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <button className='form-btn'>
                                    Login
                                </button>
                            </div>
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

export default CustomerLogin;


// console.log('`Bearer ${auth}', `Bearer ${auth}ss`)
// axios.get('http://localhost:8000/posts',
//     { headers: { "Authorization": `Bearer ${auth}` } })
//     .then(res => console.log(res))
//     .catch(err => console.log(err))