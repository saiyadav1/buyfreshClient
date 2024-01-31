import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from 'react-router-dom';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from '../../Firebase/firebase';
import { useSelector, useDispatch } from 'react-redux'
import addnewproductCss from './styles/addnewproductCss.css'

const AddNewProduct = () => {
  const navigate = useNavigate();
  const { user_state,api } = useSelector((state) => state.authdata);
  const [quantityoptions, setQuantityOptions] = useState([
    { name: 'Kg', value: 'Kg' },
    { name: 'dozen', value: 'dozen' },
    { name: 'piece', value: 'piece' }
  ]);
  const [productTypeOptions, setProductTypeOptions] = useState([
    { name: 'Organic', value: 'Organic' },
    { name: 'In-Organic', value: 'In-Organic' },
  ]);

  const dispatch = useDispatch();
  const [addproductData, setAddproductData] = useState({
    name: '',
    imgUrl: '',
    productType: 'Organic',
    availableQuantity: '',
    priceperQuantity: '',
    quantityType: 'Kg',
    description: '',
    imgName: ''
  });
  const [Toastobj, setToastObj] = useState({
    showToast: false,
    toastMsg: '',
    color: ''
  });

  const handleChange = (e) => {
    setAddproductData({ ...addproductData, [e.target.name]: e.target.value });
  };

  const handleConvertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setAddproductData((prevData) => ({
        ...prevData, imgUrl: reader.result,
        imgName: e.target.value.split('C:\\fakepath\\')[1].split('.')[0]
      }))
    }
    reader.onerror = error => {
      console.log("Error:", error)
    }
  }

  async function handlesubmit(e) {
    e.preventDefault();
    if (addproductData.name === null || addproductData.name === undefined || addproductData.name === '') {
      alert('Enter product Name');
    }
    else if (addproductData.productType === null || addproductData.productType === undefined || addproductData.productType === '') {
      alert('Enter Product Type')
    }
    else if (addproductData.availableQuantity === null || addproductData.availableQuantity === undefined || addproductData.availableQuantity === '') {
      alert('Enter Available Quantity')
    }
    else if (addproductData.priceperQuantity === null || addproductData.priceperQuantity === undefined || addproductData.priceperQuantity === '') {
      alert('Enter Price Per Quantity')
    }
    else if (addproductData.description === null || addproductData.description === undefined || addproductData.description === '') {
      alert('Enter Description')
    }
    else if (addproductData.imgUrl === null || addproductData.imgUrl === undefined || addproductData.imgUrl === '') {
      alert('Select an Image')
    }
    else {
      try {
        const storageRef = ref(storage, addproductData.imgName);
        uploadString(storageRef, addproductData.imgUrl, 'data_url').then((snapshot) => {
          getDownloadURL(ref(storage, addproductData.imgName))
            .then(async (url) => {
              const response = await axios.post(`${api}/addproduct`, {
                type: 'SELLER',
                productName: addproductData.name,
                imgUrl: url,
                productType: addproductData.productType,
                availableQuantity: addproductData.availableQuantity,
                priceperQuantity:addproductData.priceperQuantity,
                quantityType:addproductData.quantityType,
                description: addproductData.description,
                user_state: user_state
              });
              if (response.data.status == 'Success') {
                setToastObj({
                  showToast: true,
                  toastMsg: 'Product added successfully!',
                  color: 'green'
                });
                navigate('/seller/home');
              } else if (response.data.response == 'Already Product exist') {
                setToastObj({
                  showToast: true,
                  toastMsg: 'Enter New product!',
                  color: 'red'
                });
              } else {
                setToastObj({
                  showToast: true,
                  toastMsg: 'OOps, something went wrong!',
                  color: 'red'
                });
              }
            })
            .catch((error) => {
            });
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  return (
    <div className='addnewproduct-container'>
      <Form className='form-container' style={{ padding: '0 20px' }} onSubmit={handlesubmit}>
        <h3>Complete Details</h3>
        <div className='form-div'>
          <label >Product Name</label>
          <input
            type='text'
            placeholder="Enter Name"
            name='name'
            value={addproductData.name}
            onChange={handleChange}
          />
        </div>
        <div className='form-div'>
          <label >Product Type</label>
          <select
            name="productType"
            value={addproductData.productType}
            placeholder='Select Quantity Type'
            onChange={handleChange}>
            {
              productTypeOptions.map((item, index) => {
                return (
                  <option
                    key={item.name}
                    value={item.value}>{item.name}</option>
                )
              })
            }
          </select>
        </div>
        <div className="form-div" >
          <label >Available Quantity</label>
          <div className="form-div"
            style={{
              marginTop: 0,
              marginBottom: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <input
              style={{ width: '79%' }}
              type="number"
              placeholder="Available Quantity"
              name='availableQuantity'
              value={addproductData.availableQuantity}
              onChange={handleChange}
            />
            <select
              style={{ width: '19%' }}
              name="quantityType"
              value={addproductData.quantityType}
              placeholder='Select Quantity Type'
              onChange={handleChange}>
              {
                quantityoptions.map((item, index) => {
                  return (
                    <option
                      key={item.name}
                      value={item.value}>{item.name}</option>
                  )
                })
              }
            </select>
          </div>

        </div>
        <div className="form-div" >
          <label >Price Per Quantity</label>
          <input
            type="number"
            placeholder="Available Quantity"
            name='priceperQuantity'
            value={addproductData.priceperQuantity}
            onChange={handleChange}
          />
        </div>
        <div className='form-div'>
          <label >Add Image:</label>
          <label
            style={{
              width: '140px',
              backgroundColor: '#0b4ddf',
              color: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'sans-serif',
              fontSize: 13,
              padding: '10px 10px',
              borderRadius: 20,
              cursor: 'pointer'
            }}>
            Choose File
            <input
              type='file'
              name='imgUrl'
              onChange={handleConvertToBase64}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <div className="form-div" >
          <label >Description</label>
          <input
            type="text"
            placeholder="Description"
            name='description'
            value={addproductData.description}
            onChange={handleChange}
            multiple={true}
          />
        </div>
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button className='form-btn'>
            Add product
          </button>
        </div>
      </Form>
    </div>
  )
}

export default AddNewProduct