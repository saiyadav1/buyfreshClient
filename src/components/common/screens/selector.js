import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import selectorCss from '../stylecss/selectorCss.css';
import { useNavigate } from 'react-router-dom';

const Selector = () => {
    const navigate = useNavigate();
    return (
        <div className='selector-container'>
            <div className='selector-section buyer'>
                <div className='selector-section-header'>
                    <img
                        src={require('../../../assets/images/pineapple.jpeg')}
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '30px',
                            backgroundSize: 'contain'
                        }}
                    />
                </div>
                <h4>Register as Buyer</h4>
                <div className='selector-section-body' >
                    <p>
                        Discover the freshest veggies and fruits straight from local farms at unbeatable prices.
                        Walk through the fields, pick your favorites, and support local farmers while enjoying
                        top-quality produce. Elevate your meals with delicious, farm-fresh goodness!
                    </p>
                    <Link to='/customer/login' className='selector-button buyer'>
                        Let's Go
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                </div>
            </div>

            <div className='selector-section seller'>
                <div className='selector-section-header'>
                    <img
                        src={require('../../../assets/images/pineapple.jpeg')}
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '30px',
                            backgroundSize: 'contain'
                        }}
                    />
                </div>
                <h4>Register as Seller</h4>
                <div className='selector-section-body' >
                    <p>
                        Easily sell your farm-fresh veggies directly to customers with a few taps on your mobile.
                        Showcase your produce, set prices, and arrange hassle-free delivery. No middleman, just
                        fresh veggies from your farm to their doorstep!
                    </p>
                    <Link onClick={()=>navigate('/seller/login')} className='selector-button seller' >
                        Let's Go
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Selector;
