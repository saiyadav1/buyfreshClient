import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { handleUserState } from '../../../store/authSlice';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCustomerLogin = async (obj) => {
        try {
            const response = await axios.post('http://localhost:8000/customerLogin', {
                type: 'CUSTOMER',
                email: obj.userEmail,
                password: obj.userPassword
            });
            if (response.data.status === 'Success') {
                let userDetails = {
                    user_token_id: response.data.acessToken,
                    user_id: response.data.user_id,
                    user_type: 'CUSTOMER',
                    name: response.data.name,
                    user_location: response.data.user_location,
                }
                dispatch(handleUserState(userDetails));
                navigate('/customerHome');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleSellerLogin = async (obj) => {
        try {
            const response = await axios.post('http://localhost:8000/sellerlogin', {
                type: 'SELLER',
                email: obj.userEmail,
                password: obj.userPassword
            });
            if (response.data.status === 'Success') {
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
                navigate('/seller/home');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleToggle = () => {
        const links = document.querySelector('.header-div');
        if(links){
            links.classList.toggle('show-links')
        }
    }

    const handleSignIn = () => {
        let data = JSON.parse(localStorage.getItem('auth_user_data'));
        console.log('data',data)
        if (data?.userType === 'CUSTOMER') {
            handleCustomerLogin(data)
        }else if (data?.userType === 'SELLER') {
            handleSellerLogin(data)
        }else{
            navigate('/selector')
        }
    }

    
    return (
        <div className="header-div-main" >
            <div className="header-div-mobile">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img className="header-logo" src={require('../../../assets/images/agrofarm-logo.jpg')} alt='logo' />
                </div>
                <button className="header-toggle" onClick={handleToggle}>
                    <FontAwesomeIcon icon={faBars} fontSize={20} />
                </button>
            </div>
            <div className="header-div" >
                <Link className="header-btn" to='/'>
                    <p>Home</p>
                </Link>
                <Link className="header-btn" to='/about'>
                    <p>About Us</p>
                </Link>
                <Link className="header-btn" to='/contact'>
                    <p>Contact Us</p>
                </Link>
                <Link className="header-btn" onClick={handleSignIn}>
                    <p>Sign In</p>
                </Link>
            </div>
        </div>
    )
}

export default Header