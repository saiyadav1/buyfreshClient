import React from 'react';
import aboutCss from '../../common/stylecss/aboutCss.css';


const CustomerAbout = () => {

    return (
        <div className='about-main'>
            <div className='about-body'>
                <h3>
                    About US
                </h3>
                <div className='about-body-inner'>
                    <p>
                        Welcome to Agro Farm, Your Direct Link to Fresh and Local Produce!
                        We understand the importance of fostering a direct connection between consumers and farmers,
                        eliminating unnecessary intermediaries. Our platform serves as a bridge,
                        connecting customers directly with farmers to procure the freshest and highest-quality goods.
                        Tired of navigating through multiple channels to reach your desired produce? Look no further!
                        Our user-friendly interface allows customers to effortlessly browse through a diverse range of farm-fresh products.
                        On the flip side, farmers have the opportunity to showcase their offerings by registering on our platform,
                        reaching a broader audience and ensuring a fair and transparent exchange. At Agro Farm,
                        we believe in supporting local agriculture, fostering community bonds, and making the process of acquiring farm goods simple,
                        efficient, and mutually beneficial for both customers and farmers alike.
                        Join us in cultivating a direct connection to the source of your food and enjoy the bounty of locally grown goodness!
                    </p>
                    <img
                        src={require('../../../assets/images/farmerandcustomer.jpg')}
                        alt='Agro-logo-About-us'
                    />
                </div>
            </div>
        </div>
    )
}

export default CustomerAbout;

