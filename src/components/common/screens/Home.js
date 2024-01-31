import React, { useEffect, useState } from "react";
import Bodycarosul from "./bodycarosul";
import "../stylecss/CommonCss.css";
import Header from "./header";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleUserState } from '../../../store/authSlice';
import { useLocation } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state == null) {
      let data = JSON.parse(localStorage.getItem('auth_user_data'));
      if (data?.userType === 'CUSTOMER') {
        handleCustomerLogin(data)
      }
      if (data?.userType === 'SELLER') {
        handleSellerLogin(data)
      }
    }

  }, []);

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
        navigate('/customer/home');
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
  
  return (
    <div>
      <div className="body-p1">
        <Header />
        <Bodycarosul />
      </div>
      <div className="body-p2">
        <div className="body-p2-div">
          <img
            src={require("../../../assets/images/veg-pic.jpg")}
            alt="veg"
            className="body-p2-img"
          />
          <p className="body-para-right">
            Discover the wholesome goodness of farm-fresh vegetables,
            Inviting you to savor the bounty of nature right at your doorstep.
            Embrace the vitality of locally sourced produce as we advocate
            for a healthier lifestyle and a stronger connection to the earth.
          </p>
        </div>
        <div className="body-p2-div">
          <p className="body-para-left">
            Inviting you to savor the exceptional quality of farm-to-table
            non-vegetarian products. Immerse yourself in the rich, savory
            experience of locally sourced meats, where every bite tells a story
            of ethical farming practices and unparalleled freshness.
          </p>
          <img
            src={require("../../../assets/images/non-veg.jpg")}
            alt="veg"
            className="body-p2-img"
          />
        </div>
      </div>
      <div className="body3-container">
        <div className="body3-header">
          <h3 >How Agro-Farm works?</h3>
        </div>
        <div className="body3-main">
          <div className="body3-div">
            <p >
              Experience the convenience of farm-fresh shopping like never
              before with our innovative app! We bring the farmer's market to
              your fingertips, allowing you to directly connect with local
              farmers and purchase their bountiful harvest without any
              intermediaries.
            </p>
            <img
              src={require("../../../assets/images/registerForm.jpg")}
              alt="veg"
              className="body3-img"
            />
          </div>
          <div className="body3-div body3-div-right">
            <img
              src={require("../../../assets/images/tracklocation.jpg")}
              alt="veg"
              className="body3-img"
            />
            <p >
              Through our user-friendly platform, you can engage in meaningful
              conversations with the growers, gaining insights into their
              sustainable practices and the story behind each product.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
