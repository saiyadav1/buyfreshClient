import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import SellerBodyCarosul from "./sellerBodyCarosul";
import "./styles/sellerhomeCss.css";
import { Link } from 'react-router-dom';
import SellerProducts from './sellerProducts';
import { faXTwitter, faWhatsapp, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import SellerHeader from "./sellerheader";


const SellerHome = () => {
  const user_id = useSelector((state) => state.authdata.user_id);
  const [modalVisible, setModleVisible] = useState(false)
  const handleToggle = () => {
    setModleVisible(true)
  }


  return (
    <div className="sellerhome-container">
      {/* <div className="sellerhome-header">
        <SellerHeader />
      </div> */}
      <SellerProducts />
    </div>
  );
};

export default SellerHome;
