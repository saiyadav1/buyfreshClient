import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../stylecss/customerfarmcardCss.css';

const FarmCard = ({ item, index, handleDecrement, handleIncrement }) => {

    return (
        <div className='farmproductcard-container'>
            <div className='farmproductcard-container-header'>
                <p >{item.productName}</p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '8px',
                    width: '80%'
                }}>
                    <button style={{
                        textDecoration: 'none',
                        border: 0,
                        backgroundColor: 'transparent',
                        border: '1px solid #e3e3e3',
                        borderRadius: '20px',
                        boxShadow: ' 5px 5px 6px #00000026',
                    }}
                        onClick={() => {
                            handleDecrement(index)
                        }}
                    >
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <p
                            style={{
                                margin: 0,
                                padding: 4,
                                fontSize: '14px',
                                fontFamily: 'monospace',

                            }}
                        >
                            {item.broughtQuantity}
                        </p>
                        <p
                            style={{
                                margin: 0,
                                padding: 4,
                                fontSize: '14px',
                                fontFamily: 'monospace',

                            }}
                        >
                            {item.quantityType}
                        </p>
                    </div>

                    <button style={{
                        textDecoration: 'none',
                        border: 0,
                        backgroundColor: 'transparent',
                        border: '1px solid #e3e3e3',
                        borderRadius: '20px',
                        boxShadow: ' 5px 5px 6px #00000026',
                    }}
                        onClick={() => {
                            handleIncrement(index)
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>
            <img src={item.imgUrl} />
            <div className='farmproductcard-details' style={{ marginTop: '10px' }}>
                <p >Available Quantity</p>
                <p >{item.availableQuantity} {item.quantityType}</p>
            </div>
            <div className='farmproductcard-details'>
                <p >Price Mentioned</p>
                <p >{item.priceperQuantity}/ {item.quantityType}</p>
            </div>
            <div className='farmproductcard-details'>
                <p >Product Type</p>
                <p >{item.productType}</p>
            </div>
            <div className='farmproductcard-details'>
                <p >Description :&nbsp;&nbsp;{item.description}</p>
            </div>

        </div>
    )


}

export default FarmCard