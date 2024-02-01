import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import CustomerHeader from './customerheader'
import CustomerCarosul from './customercarosul';
import customerhomeCss from '../stylecss/customerhomeCss.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faLocationCrosshairs, faFilter, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import CustomerProductCard from './customerProductCard';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const CustomerHome = () => {
  const user_state = useSelector((state) => state.authdata.user_state);
  const [customerData, setCustomerData] = useState(null);
  const [allProducts, setAllProducts] = useState(null);
  const [filterProducts, setFilterProducts] = useState(null);
  const [searchProduct, setSearchProduct] = useState("");
  const {stateName,api} = useSelector(state => state.authdata);
  function handlescroll() {
    let ele = document.querySelector('.customerhome-filter-container');
    ele.scrollIntoView()
  }

  useEffect(() => {
    if (user_state) {
      getData();
      setCustomerData(user_state)
    }
  }, [user_state]);

  React.useEffect(() => {
    const getData = setTimeout(() => {
      let resultArr=[];
      allProducts?.forEach(element => {
        let elementPresent=false;
        element.my_products.forEach((ele2)=>{
         if(ele2.productName.toLowerCase().includes(searchProduct.toLowerCase())){
          elementPresent=true;
         }
        })
        if(elementPresent){
          resultArr.push(element) ;
        }
      });
      setFilterProducts([...resultArr]);
    }, 0)

    return () => clearTimeout(getData)
  }, [searchProduct])

  async function getData() {
    try {
      const response = await axios.get(`${api}/getProductsnearme`, {
        params: {
          user_Location: user_state.user_location
        }
      });
      if (response.data.status == 'Success') {
        setAllProducts([...response.data.data]);
        setFilterProducts([...response.data.data]);
      } else {

      }
    }
    catch (e) {
      console.log('error1', e)
    }
  }

  const handleChange = (e) => {
    setSearchProduct(e.target.value)
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3" style={{ fontFamily: 'monospace' }}>Wanna change Location?</Popover.Header>
      <Popover.Body style={{ fontFamily: 'initial' }}>
        You can change your location anytime by going to <strong>setting</strong>.
      </Popover.Body>
    </Popover>
  );


  return (
    <div>
      {/* <CustomerHeader /> */}
      <div className='customerhome-instruction'>
        <div className='customerhome-left'>
          <p>
            Discover the joy of farm-fresh goodness right at your fingertips!
            ndulge in the crisp flavors and nutritional benefits of locally grown vegetables
            by buying directly from the nearest farm. Our platform connects you with nearby farmers,
            ensuring you have access to a wide array of fresh produce at affordable prices. By eliminating
            intermediaries, we prioritize both your health and your wallet, bringing you the best quality
            vegetables directly from the source. Embrace the simplicity and sustainability of supporting
            local farmers while relishing the unmatched taste and nutritional value of freshly harvested
            vegetables—all at prices that make healthy eating an accessible delight. Experience the farm-to-table
            journey and savor the difference with every bite!
          </p>
          <button onClick={handlescroll}>
            Buy Now
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <img
          src={require('../../../assets/images/veg-pic.jpeg')}
        />
      </div>
      <div className='customerhome-filter-container'>
        <div className='customerhome-filter'>
          <div className='customerhome-locationdiv'>
            <p>Your Location</p>
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
              <FontAwesomeIcon icon={faCircleInfo}
                style={{ fontSize: 14, color: '#d0d0d0', transform: 'translateY(0%)' }}
              />
            </OverlayTrigger>
          </div>
          <div className='customerhome-locationdiv filter'>
            <p>{customerData?.user_location}</p>
            <FontAwesomeIcon icon={faLocationCrosshairs} color='#079203' />
          </div>
        </div>

        <div className='customerhome-filter customerhome-filter-right' >
          <div className='customerhome-locationdiv'>
            <p>Search for products </p>
          </div>
          <div className='customerhome-locationdiv'>
            <input
              type='text'
              value={searchProduct}
              placeholder='Search for products'
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className='productCard-container'>
        {
          filterProducts && filterProducts.map((item, index) => {
            return (
              <CustomerProductCard item={item} />
            )
          })
        }
      </div>
    </div>
  )
}

export default CustomerHome