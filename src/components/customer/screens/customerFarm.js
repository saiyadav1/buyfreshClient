import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios';
import FarmCard from './farmCard';
import '../stylecss/customerfarmCss.css'
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
const CustomerFarm = () => {
  let params = useParams();
  const [FarmData, setFarmData] = useState(null);
  const [productsArr, setProductsArr] = useState([]);
  const { user_state,api } = useSelector(state => state.authdata);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [buyedArrData, BetbuyedArrData] = useState([]);
  const [orderAmount,setOrderAmount]=useState(0);
  function handleOderConfirlModal() {
    setShowOrderDetails(false);
  }
  useEffect(() => {
    getfarmDetails();
  }, [])

  let date = new Date();

  async function getfarmDetails() {
    try {
      const response = await axios.get(`${api}/getfarmdata`, {
        params: {
          farm_name: params.id
        }
      });
      if (response.data.status == 'Success') {

        let ArrData = response.data.data[0].my_products.map(element => {
          element.broughtQuantity = 0;
          return element;
        });
        setFarmData(response.data.data[0]);
        setProductsArr([...ArrData])
      } else {
        console.log('somegthing went wrong')
      }
    }
    catch (e) {
      console.log('error1', e)
    }
  }

  const handleIncrement = (index) => {
    if (productsArr[index].broughtQuantity < productsArr[index].availableQuantity) {
      productsArr[index].broughtQuantity += 1;
      setProductsArr([...productsArr])
    }
  }

  const handleDecrement = (index) => {
    if (productsArr[index].broughtQuantity > 0) {
      productsArr[index].broughtQuantity -= 1;
      setProductsArr([...productsArr]);
    }
  }

  const handleBuyProduct = async () => {
    let dummyArr = [];
    let totalAmount=0;
    productsArr.forEach(item => {
      if (item.broughtQuantity > 0) {
        let obj = {
          productname: item.productName,
          broughtQuantity: item.broughtQuantity,
          productPrice: item.priceperQuantity
        }
        totalAmount+=item.broughtQuantity*item.priceperQuantity;
        dummyArr.push(obj)
      }
    })
    setOrderAmount(totalAmount)
    BetbuyedArrData([...dummyArr]);
    setShowOrderDetails(true)
  }
  async function ConfirmOrder() {
    if (buyedArrData.length == 0) {
      alert('Add atleast a single product to move forward');
    }
    else {
      try {
        const response = await axios.post(`${api}/customerNewOrder`, {
          customerEmail: user_state.name,
          customer_id: user_state.user_id,
          customerLocation:user_state.user_location,
          orderData: buyedArrData,
          orderAmount:orderAmount,
          orderTime: date.toUTCString(),
          farmer_id: FarmData.farmer_id,
          orderStatus:'open'
        });
        // console.log('response', response);
        if (response.data.status === 'Success') {
          console.log('success');
          handleOderConfirlModal()

        } else {
          console.log('failure');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
  return (
    <div className='customerFarm-container'>
      <h6 style={{
        marginTop: '10px',
        fontFamily: 'monospace',
        color: '#000',
        fontSize: 18,
        marginLeft: 5
      }}>{params.id}</h6>
      <div className='customerfarmproductCard-container'>
        {
          productsArr.map((item, index) => {
            return (
              <FarmCard
                item={item}
                index={index}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
              />
            )
          })
        }
      </div>
      <div style={{
        marginTop: '20px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <button className='form-btn' onClick={handleBuyProduct}>
          Add to Cart
        </button>
      </div>

      <Modal show={showOrderDetails} onHide={handleOderConfirlModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p style={{
              fontFamily: 'monospace',
              fontSize: 18,
              color: '#000'
            }}>
              Confirm Order
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div >
            <div className='orderConfirm-container'>
              <div style={{ width: '50%', marginTop: 5 }}>
                <p style={{
                  fontFamily: 'monospace',
                  fontSize: 14,
                  color: '#000',
                  margin: 0,
                  fontWeight:600
                }}>
                  Product Name
                </p>
              </div>
              <div style={{ width: '50%', margin: 5 }}>
                <p style={{
                  fontFamily: 'monospace',
                  fontSize: 14,
                  color: '#000',
                  margin: 0,
                  fontWeight:600
                }}>
                  Quantity * Price
                </p>
              </div>
            </div>
            {
              buyedArrData.map((item) => {
                return (
                  <div className='orderConfirm-container'>
                    <div style={{ width: '50%', marginTop: 5 }}>
                      <p style={{
                        fontFamily: 'monospace',
                        fontSize: 14,
                        color: '#000',
                        margin: 0
                      }}>
                        {item.productname}
                      </p>
                    </div>
                    <div style={{ width: '50%', margin: 5 }}>
                      <p style={{
                        fontFamily: 'monospace',
                        fontSize: 14,
                        color: '#000',
                        margin: 0,
                      }}>
                        {item.broughtQuantity}{' '}*{' '}{item.productPrice}
                      </p>
                    </div>
                  </div>
                )
              })
            }
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div style={{ width: '50%' }}>
              </div>
              <div style={{ width: '50%', }}>
                <p style={{
                  // width:'auto',
                  display: 'flex',
                  fontFamily: 'monospace',
                  fontSize: 14,
                  color: '#000',
                  margin: 0,
                  borderTop: '1px solid #ccc'
                }}>
                  Total Amount:{' '}{orderAmount}
                </p>
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <button className='form-btn' onClick={ConfirmOrder}>
              Confirm Order
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CustomerFarm