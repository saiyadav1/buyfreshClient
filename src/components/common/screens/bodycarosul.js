import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const Bodycarosul = () => {
    const carosoulData = [
        {
            bcgImgpath: require('../../../assets/images/agrobackground.jpeg'),
            bodyHeading: 'AGRO FARM',
            bodyText: 'AGRO COMPANY',
            bodyTextFontSize: '4vw',
            fontColor: '#fff'
        },
        {
            bcgImgpath: require('../../../assets/images/grapes.jpeg'),
            bodyHeading: 'Grape FARM',
            bodyText: 'AGRO COMPANY',
            bodyTextFontSize: '4vw',
            fontColor: '#fff'
        },
        {
            bcgImgpath: require('../../../assets/images/pineapple.jpeg'),
            bodyHeading: 'Pineapple FARM',
            bodyText: 'AGRO COMPANY',
            bodyTextFontSize: '4vw',
            fontColor: '#718355'
        },
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carosoulData.length);
        }, 3000);

        // Clear the interval when the component unmounts to avoid memory leaks
        return () => clearInterval(intervalId);
    }, []);

    const currentImageData = carosoulData[currentImageIndex];

    return (
        <div
            className="main-body"
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
                    textAlign: 'center',
                    margin: 0,
                    letterSpacing: '20px',
                }}
            >
                {currentImageData.bodyText}
            </p>
            <div
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
            </div>
        </div>
    );
};

export default Bodycarosul;
