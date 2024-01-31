import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import SellerProductCard from './sellerProductCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './styles/sellerproductCss.css';
import Toast from 'react-bootstrap/Toast';
const SellerProducts = () => {
    const { user_id, user_state,api } = useSelector((state) => state.authdata);
    const navigate = useNavigate();
    const [products, setProdroducts] = useState([]);
    const [Toastobj, setToastObj] = useState({
        showToast: false,
        toastMsg: '',
        color: ''
    });
    
    useEffect(() => {
        handlegetUserProducts()
    }, []);


    async function handlegetUserProducts() {
        try {
            const response = await axios.get(`${api}/getproductsdata`, {
                params: {
                    type: 'SELLER',
                    user_id: user_state.user_id
                }
            });
            if (response.data.status == 'Success') {
                console.log('esponse.data.data[0]', response.data.data[0])
                setProdroducts([...response.data.data[0]['my_products']])
            } else {

            }
        }
        catch (e) {
            console.log('error', e)
        }
    }

    //deleting an product
    const handleDelete = async (item,index) => {
        try {
            const response = await axios.post(`${api}/deleteproduct`, {
                productName:item.productName,
                user_state:user_state
            });
           
            if (response.data.status == 'Success') {
                setProdroducts(products.filter((ele,index1)=>index1!=index))
                setToastObj({
                    showToast: true,
                    toastMsg: 'Product removed successfully!',
                    color: 'green'
                });
            }  else {
                setToastObj({
                    showToast: true,
                    toastMsg: response.data.response,
                    color: 'red'
                });
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='sellerproduct-container'>
            <div className='sellerproduct-top-btn'>
                <button 
                    onClick={() => {
                        navigate('/seller/AddNewProduct');
                    }}
                >
                    Add Product
                    <FontAwesomeIcon icon={faPlus} style={{ marginLeft: 5 }} />
                </button>
                {/* <button style={{
                    border: 0,
                    backgroundColor:
                        '#00ED64',
                    color: '#000',
                    fontFamily: 'monospace',
                    padding: '10px 30px',
                    position: 'relative'
                }}
                    onClick={() => { navigate('/sellerDistributionpage') }}
                >
                    <div style={{
                        display: 'flex',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundColor: 'yellow',
                        padding: 2,
                        borderBottomRightRadius: 50
                    }}>
                        <p style={{ margin: 0, color: '#000', transform: 'rotate(315deg)', fontSize: 12 }}>new</p>
                    </div>
                    Open Distribution
                    <FontAwesomeIcon icon={faPlus} style={{ marginLeft: 5 }} />
                </button> */}
            </div>

            <div >
                <h6 style={{
                    marginTop: '10px',
                    fontFamily: 'monospace',
                    color: '#000',
                    fontSize: 18,
                    marginLeft: 5
                }}>My Products</h6>
                <div className='sellerproductCard-container'>
                    {
                        products.map((item, index) => {
                            return (
                                <SellerProductCard 
                                item={item} 
                                index={index}
                                handleDelete={handleDelete}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <Toast
                    style={{
                        position: 'absolute',
                        bottom: 0
                    }}
                    onClose={() => setToastObj({
                        showToast: false,
                        toastMsg: ''
                    })} show={Toastobj.showToast} delay={3000} autohide>
                    <Toast.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <p style={{ color: Toastobj.color }}>{Toastobj.toastMsg}</p>
                    </Toast.Body>
                </Toast>
        </div>
    )
}

export default SellerProducts