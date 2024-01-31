import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import './styles/sellerordercartCss.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';

const SellerindividualOrder = () => {
    const {stateName,api} = useSelector(state => state.authdata);
    let params = useParams();
    const [orderDetails, setOrderDetails] = useState({});
    const [rejectedModal, setrejectedModal] = useState(false);
    const [acceptedModal, setAcceptedModal] = useState(false);
    const handleRejectedModalClose = () => {
        setrejectedModal(false)
    }

    const handleAcceptedModalClose = () => {
        setAcceptedModal(false)
    }
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

    async function handleRejectOrder() {
        try {
            const response = await axios.put(`${api}/sellerChangeOrderStatus`, {
                // params: {
                type: 'SELLER',
                order_id: params.id,
                order_status: 'rejected'
                // }
            });
            console.log('response', response)
            if (response.data.status === 'Success') {
                setrejectedModal(false);
                orderDetails.orderStatus = 'rejected'
                setOrderDetails(orderDetails)
            } else {
                console.log('failure');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function handleAcceptOrder() {
        console.log('btn clicked')
        try {
            const response = await axios.put(`${api}/sellerChangeOrderStatus`, {
                type: 'SELLER',
                order_id: params.id,
                order_status: 'confirmed'
            });
            console.log('response', response)
            if (response.data.status === 'Success') {
                handleAcceptedModalClose(false);
                orderDetails.orderStatus = 'confirmed'
                setOrderDetails(orderDetails)
            } else {
                console.log('failure');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    console.log('orderDetails', orderDetails)
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
                            <p style={{ borderBottom: '1px solid #ccc' }}>Product Name</p>
                            <p style={{ borderBottom: '1px solid #ccc' }}>Brought Quantity * Price</p>
                        </div>
                        {
                            orderDetails && orderDetails.orderData && orderDetails.orderData.map((item) => {
                                return (
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '0 20px 0 20px'
                                    }}>
                                        <p>{item.productname}</p>
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
                            <p style={{ borderTop: '1px solid #ccc' }}>Total Amount{' '}{orderDetails.orderAmount}</p>
                        </div>
                    </div>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center'
                    }}>
                        <button
                            disabled={orderDetails.orderStatus == 'open' ? false : true}
                            className='btn1'
                            style={{ backgroundColor: orderDetails.orderStatus == 'open' ? '#349a6b' : '#ccc' }}
                            onClick={() => { setrejectedModal(true) }}
                        >
                            <p style={{ margin: 0, }} >
                                Reject Order
                            </p>
                        </button>
                        <button
                            disabled={orderDetails.orderStatus == 'open' ? false : true}
                            className='btn1'
                            style={{ backgroundColor: orderDetails.orderStatus == 'open' ? '#349a6b' : '#ccc' }}
                            onClick={() => { setAcceptedModal(true) }}
                        >
                            <p style={{ margin: 0 }}>
                                Accept Order
                            </p>
                        </button>
                    </div>
                </div>
            }

            <Modal show={rejectedModal} onHide={handleRejectedModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really wanna reject order!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleRejectOrder}>
                        Yes
                    </Button>
                    <Button variant="primary" onClick={handleRejectedModalClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={acceptedModal} onHide={handleAcceptedModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Once Confirmed order cant be cancelled again!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAcceptedModalClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleAcceptOrder}>
                        Confirm Order
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SellerindividualOrder