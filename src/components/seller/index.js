import React from 'react'
import { Outlet } from "react-router-dom"
import SellerHeader from './sellerheader'
const SellerIndex = () => {
    return (
        <div>
            <div className="sellerhome-header">
                <SellerHeader />
            </div>
            <Outlet />
        </div>
    )
}

export default SellerIndex