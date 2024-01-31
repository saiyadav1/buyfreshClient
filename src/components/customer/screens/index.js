import React from 'react'
import { Outlet } from "react-router-dom"
import CustomerHeader from './customerheader'
const CustomerIndex = () => {
    return (
        <div>
            <CustomerHeader />
            <Outlet />
        </div>
    )
}

export default CustomerIndex;