import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './styles/sellerheaderCss.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { handleUserState } from '../../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';


const SellerHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signOutModal, setSignOutModal] = useState(false);
    const handleToggle = () => {
    const links = document.querySelector('.sellerheader-div');

        if(links){
            links.classList.toggle('sellershow-links')
        }
    }

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
        <div className="sellerheader-div-main" >
            <div className="sellerheader-div-mobile">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Link to='/' state={'from seller'}>
                        <img className="sellerheader-logo" src={require('../../assets/images/agrofarm-logo.jpg')} alt='logo' />
                    </Link>
                </div>
                <button className="sellerheader-toggle" onClick={handleToggle}>
                    <FontAwesomeIcon icon={faBars} fontSize={20} />
                </button>
            </div>
            <div className="sellerheader-div" >
                <Link className="sellerheader-btn" to='/seller/home' onClick={handleToggle}>
                    <p>Home</p>
                </Link>
                <Link className="sellerheader-btn" to='/seller/orders' onClick={handleToggle}>
                    <p>My orders</p>
                </Link>
                <Link className="sellerheader-btn" to='/seller/about' onClick={handleToggle}>
                    <p>About Us</p>
                </Link>
                <Link className="sellerheader-btn" to='/seller/contact' onClick={handleToggle}>
                    <p>Contact Us</p>
                </Link>
                <button className="sellerheader-btn" onClick={() => {
                    handleToggle()
                    setSignOutModal(true)
                }}>
                    <p>Sign Out</p>
                </button>
            </div>
            <Modal show={signOutModal} onHide={handlemodalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Out?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really wanna sign out!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handlemodalClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleSignout}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SellerHeader