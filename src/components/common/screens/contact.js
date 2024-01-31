import React, { useState } from 'react'
import Header from './header'
import contactCss from '../stylecss/contactCss.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Toast from 'react-bootstrap/Toast';
import axios from 'axios';
import { faSquareXTwitter, faSquareWhatsapp, faSquareFacebook } from '@fortawesome/free-brands-svg-icons'
const Contact = () => {
  const [Toastobj, setToastObj] = useState({
    showToast: false,
    toastMsg: '',
    color: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (formData.name === null || formData.name === undefined || formData.name === '') {
      alert('Enter valid Name');
    }
    else if (formData.email === null || formData.email === undefined || formData.email === '') {
      alert('Enter valid Email');
    }
    else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      alert('Enter valid Email');
    }
    else if (formData.mobileNumber === null || formData.mobileNumber === undefined || formData.mobileNumber === '') {
      alert('Enter valid mobileNumber');
    }
    else if (formData.mobileNumber.length != 10) {
      alert('mobile number should be atleast 10 characters')
    }
    else if (formData.subject === null || formData.subject === undefined || formData.subject === '') {
      alert('Enter Subject');
    }
    else if (formData.submessageject === null || formData.message === undefined || formData.message === '') {
      alert('Enter message')
    }
    else {
      try {
        const response = await axios.post('http://localhost:8000/contactmessage', {
          type: 'CUSTOMER',
          name: formData.name,
          email: formData.email,
          mobileNumber: formData.mobileNumber,
          subject: formData.subject,
          message: formData.message
        });
        console.log('response',response)
        if (response.data.status === 'Success') {
          setToastObj({
            showToast: true,
            toastMsg: 'User Message has been delivered to our team they will reach you soon!',
            color: 'green'
          });
          setFormData({
            name: '',
            email: '',
            mobileNumber: '',
            subject: '',
            message: ''
          })
        } else {
          alert('OOps, Unexpected error occured please try after sometime!')
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
  return (
    <div className='contact-main'>
      <div className='contact-header'>
        <Header />
      </div>
      <div className='contact-body'>
        <div className='contact-body-card'>
          <div className='contact-body-card-platform'>
            <h3>Reach us at</h3>
            <div style={{ display: 'flex', gap: 15, justifyContent: 'center' }}>
              <FontAwesomeIcon icon={faSquareXTwitter} style={{ fontSize: '25px' }} />
              <FontAwesomeIcon icon={faSquareWhatsapp} color={'#4ed95e'} style={{ fontSize: '25px' }} />
              <FontAwesomeIcon icon={faSquareFacebook} color={'#4867aa'} style={{ fontSize: '25px' }} />
            </div>
          </div>
          <input
            className='contact-form-input'
            type="text"
            placeholder="Enter Your Name"
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className='contact-form-input'
            type="text"
            placeholder="Enter Mobile Number"
            name='mobileNumber'
            value={formData.mobileNumber}
            onChange={handleChange}
          />
          <input
            className='contact-form-input'
            type="email"
            placeholder="Enter Your Email"
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className='contact-form-input'
            type="text"
            placeholder="Enter Subject"
            name='subject'
            value={formData.subject}
            onChange={handleChange}
          />
          <textarea
            className='contact-form-input'
            placeholder="Enter Message"
            name='message'
            value={formData.message}
            onChange={handleChange}
            rows="4"
            cols="50">

          </textarea>
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center'

          }}>
            <button className='contact-form-btn' onClick={handleSubmit}>
              SUBMIT
            </button>
          </div>

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

export default Contact;

