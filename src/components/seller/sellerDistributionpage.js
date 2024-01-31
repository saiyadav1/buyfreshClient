import React from 'react'
import { Link } from 'react-router-dom'
import b1 from '../../assets/images/b1.jpeg'

const SellerDistributionpage = () => {

  const Header = () => {
    return (
      <div style={{
        width: '100%',
        height: '8vh',
        backgroundColor: '#d0d0d0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px'
      }}>
        <div style={{ margin: 0, padding: 0 }}>
          <Link style={{ textDecoration: 'none', color: '#000', fontFamily: 'sans-serif', fontSize: '14px' }}
          to='/sellerhome'
          >
            Home
          </Link>
          <Link style={{ textDecoration: 'none', color: '#000', fontFamily: 'sans-serif', fontSize: '14px', marginLeft: '20px' }}>
            About
          </Link>
          <Link style={{ textDecoration: 'none', color: '#000', fontFamily: 'sans-serif', fontSize: '14px', marginLeft: '20px' }}>
            Contact Us
          </Link>
          <Link style={{ textDecoration: 'none', color: '#000', fontFamily: 'sans-serif', fontSize: '14px', marginLeft: '20px' }}>
            Contact
          </Link>
        </div>
        <div>
          <Link style={{ textDecoration: 'none', color: '#000', fontFamily: 'sans-serif', fontSize: '14px', marginLeft: '20px' }}>
            Contact
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Header />
      <div
        style={{
          width: '100%',
          height: '92vh',
          backgroundImage: `url(${require('../../assets/images/b2.avif')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '10px',
          position: 'relative'
        }}
      >
        <button style={{
          backgroundColor: '#00684a',
          color: '#fff',
          fontFamily: 'sans-serif',
          fontSize: '14px',
          borderWidth: 0,
          borderRadius: '30px',
          padding: '15px 20px',
          cursor: 'pointer'
        }}>
          Add new distribution
        </button>
        <div style={{
          width: '100%',
          height: '80%',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <p>Add new distribution House</p>
          <h4>Show case people where can they your products</h4>
        </div>
      </div>
      <div style={{
        width: '100%',
        padding: '20px'
      }}>
        <h4 style={{ color: '#22212f' }}>How it works?</h4>
        <p style={{ color: '#000', fontSize: '14px', textAlign: 'left' }}>
          Choosing to have your store featured on our website comes with a
          multitude of benefits that can significantly enhance your business
          visibility and success. Our platform provides a diverse and engaged user base,
          offering exposure to a wide audience of potential customers actively seeking products or services.
          With a user-friendly interface and effective search functionalities, customers can easily discover
          and explore your store, increasing the likelihood of conversion. Additionally, our website employs r
          obust marketing strategies, driving targeted traffic and amplifying your brand presence. Integration
          with our platform also grants you access to valuable analytics and customer insights, empowering you
          to refine your offerings and marketing strategies for optimal performance. Joining our platform not
          only extends the reach of your business but also connects you with a community of like-minded sellers
          and potential collaborations, fostering growth and success in the competitive digital marketplace.
        </p>
      </div>
    </div>
  )
}

export default SellerDistributionpage