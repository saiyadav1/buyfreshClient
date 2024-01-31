import React, { useState } from 'react'
import customerheaderCss from '../stylecss/customerheaderCss.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { handleUserState } from '../../../store/authSlice';


const CustomerHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleToggle = () => {
        const ele = document.querySelector('.header-links');
        ele.classList.toggle('show-links')
    }
    const [signOutModal, setSignOutModal] = useState(false);

    function handlemodalClose() {
        setSignOutModal(false);
    }

    function handleSignout() {
        let obj = {
            userType: '',
            userEmail: '',
            userPassword: '',
            userAccessToken: ''
        }
        localStorage.setItem('auth_user_data', JSON.stringify(obj));

        let userDetails = {
            user_token_id: '',
            user_id: '',
            user_type: '',
            name: '',
            user_location: '',
        }
        dispatch(handleUserState(userDetails));
        navigate('/')
    }
    return (
        <div className="header-container" >
            <div className='header-logo-div'>
                <Link to='/'>
                <img className="header-logo"
                    src={require('../../../assets/images/agrofarm-logo.jpg')} alt='logo' />
                </Link>
           
                <button className="header-togglebtn" onClick={handleToggle}>
                    <FontAwesomeIcon icon={faBars} fontSize={20} />
                </button>
            </div>
            <div className="header-links" >
                <Link className="header-link-btn" to='/customer/home' onClick={handleToggle}>
                    <p>Home</p>
                </Link>
                <Link className="header-link-btn" to='/customer/about' onClick={handleToggle}>
                    <p>About Us</p>
                </Link>
                <Link className="header-link-btn" to='/customer/contact' onClick={handleToggle}>
                    <p>Contact Us</p>
                </Link>
                <Link className="header-link-btn" to='/customer/myorders' onClick={handleToggle}>
                    <p>My Orders</p>
                </Link>
                <button className="header-link-btn" onClick={() => { setSignOutModal(true) }}>
                    <p>Sign Out</p>
                </button>
            </div>
            <Modal show={signOutModal} onHide={handlemodalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Out?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really wanna sign out!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleSignout}>
                        Yes
                    </Button>
                    <Button variant="primary" onClick={handlemodalClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CustomerHeader