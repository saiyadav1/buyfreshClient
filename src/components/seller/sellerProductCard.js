import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import './styles/sellerproductcardCss.css';

const SellerProductCard = ({ item,index,handleDelete }) => {
 
    
    return (
        <div className='sellerproductcard-container'>
            <div className='sellerproductcard-container-header'>
                <p >{item.productName}</p>
                <FontAwesomeIcon icon={faTrash}
                    style={{ cursor: 'pointer' }}
                    onClick={() => { handleDelete(item,index) }}
                />
            </div>
            <img src={item.imgUrl} />
            <div className='sellerproductcard-details' style={{ marginTop: '10px' }}>
                <p >Available Quantity</p>
                <p >{item.availableQuantity} {item.quantityType}</p>
            </div>
            <div className='sellerproductcard-details'>
                <p >Price Mentioned</p>
                <p >{item.priceperQuantity}/ {item.quantityType}</p>
            </div>
            <div className='sellerproductcard-details'>
                <p >Product Type</p>
                <p >{item.productType}</p>
            </div>
            <div className='sellerproductcard-details'>
                <p >Description :&nbsp;&nbsp;{item.description}</p>
            </div>
            {/* <div style={{
                position: 'absolute',
                bottom: 10,
                width: '90%',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <FontAwesomeIcon icon={faPenToSquare} />
                <FontAwesomeIcon icon={faTrash} />
            </div> */}
        </div>
    )


}

export default SellerProductCard