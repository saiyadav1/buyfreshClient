import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
// import './styles/sellerordercartCss.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const CustomerIndividualOrder = () => {
    const {stateName,api} = useSelector(state => state.authdata);
    let params = useParams();
    const [orderDetails, setOrderDetails] = useState({});

    useEffect(() => {
        if (params.id) {
            getOrderDetails()
        }
    }, [params])

    async function getOrderDetails() {
        try {
            const response = await axios.get(`${api}/sellergetMyOrderbyID`, {
                params: {
                    type: 'SELLER',
                    order_id: params.id,
                }
            });
            if (response.data.status === 'Success') {
                setOrderDetails(response.data.data)
            } else {
                console.log('failure');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }



    return (
        <div className='sellerOrderCart-container'>
            {
                orderDetails && <div className='sellerOrderCart-main'>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}>
                        <p>
                            Order Status:{' '} <FontAwesomeIcon icon={faCircle}
                                color={orderDetails.orderStatus == 'open' ? 'orange' : orderDetails.orderStatus == 'rejected' ? '#d11a14' : 'green'} />
                        </p>
                    </div>

                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                        <p><b>Order From:{' '}</b> {orderDetails.customerEmail}</p>
                        <p><b>Delivery Location:{' '}</b> {orderDetails.customerLocation}</p>
                        <p style={{ fontWeight: 600, borderBottom: '1px solid green' }}>Order Details</p>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0 20px 0 20px'
                        }}>
                            <p style={{ borderBottom: '1px solid #ccc' }}><b>Product Name</b></p>
                            <p style={{ borderBottom: '1px solid #ccc' }}><b>Brought Quantity * Price</b></p>
                        </div>
                        {
                            orderDetails && orderDetails.orderData && orderDetails.orderData.map((item, index) => {
                                return (
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '0 20px 0 20px'
                                    }}>
                                        <p>{index + 1}:) {item.productname}</p>
                                        <p>{item.broughtQuantity} * {item.productPrice}</p>
                                    </div>
                                )
                            })
                        }
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            padding: '0 20px 0 20px'
                        }}>
                            <p style={{ borderTop: '1px solid #ccc' }}><b>Total Amount{' '}{orderDetails.orderAmount}</b></p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CustomerIndividualOrder