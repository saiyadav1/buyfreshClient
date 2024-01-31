import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import './styles/sellerorderCss.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faCircle } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const CustomerMyOrder = () => {
  const navigate = useNavigate();
  const { user_state,api } = useSelector(state => state.authdata);
  const [orderData, setOrderData] = useState(null);
  const [orderCountDetials, setOrderCountDetails] = useState({
    openOrders: 0,
    acceptedOrders: 0,
    rejectedOrders: 0
  })
  useEffect(() => {
    if (user_state) {
      getmyorders()
    }
  }, [user_state])

  async function getmyorders() {
    try {
      const response = await axios.get(`${api}/customergetMyOrders`, {
        params: {
          type: 'SELLER',
          customer_id: user_state.user_id,
        }
      });
      console.log('response',response)
      if (response.data.status === 'Success') {
        let openCount = 0;
        let acceptedCount = 0;
        let rejectedCount = 0;
        response.data.data.forEach(element => {
          console.log('data', element);
          if (element.orderStatus == 'open') {
            openCount += 1
          } else if (element.orderStatus == 'rejected') {
            rejectedCount += 1;
          } else {
            acceptedCount += 1;
          }
        });
        setOrderCountDetails({
          openOrders: openCount,
          acceptedOrders: acceptedCount,
          rejectedOrders: rejectedCount
        })
        setOrderData([...response.data.data])
      } else {
        console.log('failure');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <div className='orderDetails-container'>
      <h3>
        <FontAwesomeIcon icon={faBox} />{' '}
        Your Orders
      </h3>
      <div className='orderDetials-statusDetails'>
        <p>Total Order:{' '}{orderData && orderData.length}</p>
        <p><FontAwesomeIcon icon={faCircle} color='orange' />{' '}Open Order:{' '}{orderCountDetials && orderCountDetials.openOrders}</p>
        <p><FontAwesomeIcon icon={faCircle} color='green' />{' '}Accepted Order:{' '}{orderCountDetials && orderCountDetials.acceptedOrders}</p>
        <p><FontAwesomeIcon icon={faCircle} color='#d11a14' />{' '}Rejected Order:{' '}{orderCountDetials && orderCountDetials.rejectedOrders}</p>
      </div>
      <h4>Order Details</h4>
      <div className='orderDetails-body-container'>
        {orderData && orderData.map(item => {
          return (
            <div className='orderDetails-body' onClick={() => navigate(`/customer/order/${item.orderId}`)}>
              <div className='orderDetails-body-left'>
                <p>
                  <FontAwesomeIcon icon={faCircle}
                    color={item.orderStatus == 'open' ? 'orange' : item.orderStatus == 'rejected' ? '#d11a14' : 'green'} />
                  {'  '}{item.customerEmail}
                </p>
                <p>
                  <FontAwesomeIcon icon={faCircle}
                    color='#fff' />
                  {'  '}{item.customerLocation}
                </p>
                <p>
                  <FontAwesomeIcon icon={faCircle}
                    color='#fff' />
                  {'  '}{item.orderTime}
                </p>
              </div>
              <button className='orderDetails-body-right'>
                View
              </button>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default CustomerMyOrder