import { createSlice } from '@reduxjs/toolkit'

export const AuthSlice = createSlice({
  name: 'authdata',
  initialState: {
    user_id: '',
    user_state: {},
    api:'https://farmtohome.onrender.com',
    // api:'http://localhost:8000',
    stateName: [
      {
        "key": "AN",
        "name": "Andaman and Nicobar Islands"
      },
      {
        "key": "AP",
        "name": "Andhra Pradesh"
      },
      {
        "key": "AR",
        "name": "Arunachal Pradesh"
      },
      {
        "key": "AS",
        "name": "Assam"
      },
      {
        "key": "BR",
        "name": "Bihar"
      },
      {
        "key": "CG",
        "name": "Chandigarh"
      },
      {
        "key": "CH",
        "name": "Chhattisgarh"
      },
      {
        "key": "DH",
        "name": "Dadra and Nagar Haveli"
      },
      {
        "key": "DD",
        "name": "Daman and Diu"
      },
      {
        "key": "DL",
        "name": "Delhi"
      },
      {
        "key": "GA",
        "name": "Goa"
      },
      {
        "key": "GJ",
        "name": "Gujarat"
      },
      {
        "key": "HR",
        "name": "Haryana"
      },
      {
        "key": "HP",
        "name": "Himachal Pradesh"
      },
      {
        "key": "JK",
        "name": "Jammu and Kashmir"
      },
      {
        "key": "JH",
        "name": "Jharkhand"
      },
      {
        "key": "KA",
        "name": "Karnataka"
      },
      {
        "key": "KL",
        "name": "Kerala"
      },
      {
        "key": "LD",
        "name": "Lakshadweep"
      },
      {
        "key": "MP",
        "name": "Madhya Pradesh"
      },
      {
        "key": "MH",
        "name": "Maharashtra"
      },
      {
        "key": "MN",
        "name": "Manipur"
      },
      {
        "key": "ML",
        "name": "Meghalaya"
      },
      {
        "key": "MZ",
        "name": "Mizoram"
      },
      {
        "key": "NL",
        "name": "Nagaland"
      },
      {
        "key": "OR",
        "name": "Odisha"
      },
      {
        "key": "PY",
        "name": "Puducherry"
      },
      {
        "key": "PB",
        "name": "Punjab"
      },
      {
        "key": "RJ",
        "name": "Rajasthan"
      },
      {
        "key": "SK",
        "name": "Sikkim"
      },
      {
        "key": "TN",
        "name": "Tamil Nadu"
      },
      {
        "key": "TS",
        "name": "Telangana"
      },
      {
        "key": "TR",
        "name": "Tripura"
      },
      {
        "key": "UK",
        "name": "Uttar Pradesh"
      },
      {
        "key": "UP",
        "name": "Uttarakhand"
      },
      {
        "key": "WB",
        "name": "West Bengal"
      }],
    user_auth_data: {}
  },
  reducers: {
    handleUserId: (state, action) => {
      state.user_id = action.payload
    },
    handleUserState: (state, action) => {
      state.user_state = action.payload
    },
    handleUserAuthData: (state, action) => {
      state.user_auth_data = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { handleUserId, handleUserState,handleUserAuthData } = AuthSlice.actions

export default AuthSlice.reducer