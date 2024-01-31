import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import customercarosulCss from '../stylecss/customercarosulCss.css'
const CustomerCarosul = () => {
    const carosoulData = [
        {
            bcgImgpath: require('../../../assets/images/agrobackground.jpeg'),
            bodyHeading: 'Buy Products',
            bodyText: `Discover the joy of farm-fresh goodness right at your fingertips! 
            Indulge in the crisp flavors and nutritional benefits of locally grown vegetables by buying directly 
            from the nearest farm. Our platform connects you with nearby farmers, ensuring you have access to a 
            wide array of fresh produce at affordable prices.`,
            bodyTextFontSize: '14px',
            fontColor: '#fff'
        },
        // {
        //     bcgImgpath: require('../../../assets/images/grapes.jpeg'),
        //     bodyHeading: 'Grape FARM',
        //     bodyText: 'AGRO COMPANY',
        //     bodyTextFontSize: '4vw',
        //     fontColor: '#fff'
        // },
        // {
        //     bcgImgpath: require('../../../assets/images/pineapple.jpeg'),
        //     bodyHeading: 'Pineapple FARM',
        //     bodyText: 'AGRO COMPANY',
        //     bodyTextFontSize: '4vw',
        //     fontColor: '#718355'
        // },
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (carosoulData && carosoulData.length > 1) {
            const intervalId = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carosoulData.length);
            }, 3000);

            // Clear the interval when the component unmounts to avoid memory leaks
            return () => clearInterval(intervalId);
        }
    }, []);

    const currentImageData = carosoulData[currentImageIndex];

    return (
        <div
            className="curosul-body"
            style={{
                backgroundImage: `url(${currentImageData.bcgImgpath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
            }}
        >
            <h4
                style={{
                    fontSize: '9vw',
                    fontFamily: 'poppins,sans-sheriff',
                    letterSpacing: '5px',
                    margin: 0,
                    color: currentImageData.fontColor,
                }}
            >
                {currentImageData.bodyHeading}
            </h4>
            <p
                style={{
                    color: currentImageData.fontColor,
                    fontSize: currentImageData.bodyTextFontSize,
                    fontFamily: 'sans-serif',
                    textAlign: 'justify',
                    margin: 0,
                    letterSpacing: '2px',
                    padding: '0 20px'
                }}
            >
                {currentImageData.bodyText}
            </p>
            {
                carosoulData && carosoulData.length > 1 ? <div
                    style={{
                        width: '100%',
                        position: 'absolute',
                        bottom: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: '10px'
                    }}
                >
                    {carosoulData.map((item, index) => {
                        return (
                            <div key={index}>
                                {currentImageIndex === index ? (
                                    <FontAwesomeIcon icon={faCircle} color="yellow" />) : (
                                    <FontAwesomeIcon icon={faCircle} color="#fff" />
                                )}
                            </div>)
                    })
                    }
                </div> : null
            }

        </div>
    );
};

export default CustomerCarosul;
