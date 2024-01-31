import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../stylecss/customerproductcardCss.css';
import { useNavigate } from 'react-router-dom';

const CustomerProductCard = ({ item }) => {
    const navigate = useNavigate();
    console.log('item',item)
    return (
        <div className='customerproductcard-container' onClick={()=>{navigate(`/customer/farm/${item.farmName}`)}}>
            <img src={item.my_products[0].imgUrl} />
            <p >{item.farmName}</p>
            <div className='customerproductcard-details' style={{ marginTop: '10px' }}>
                <p >Owner Name</p>
                <p >{item.name}</p>
            </div>
        </div>
    )


}

export default CustomerProductCard