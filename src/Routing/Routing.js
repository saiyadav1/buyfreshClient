import React, { useEffect } from 'react'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import axios from 'axios';
import Home from '../components/common/screens/Home';
import SellerLogin from '../components/seller/sellerLogin';
import SellerHome from '../components/seller/sellerhome';
import AddNewProduct from '../components/seller/addNewProduct'
import SellerDistributionpage from '../components/seller/sellerDistributionpage';
import About from '../components/common/screens/about';
import Contact from '../components/common/screens/contact';
import Selector from '../components/common/screens/selector';
import CustomerLogin from '../components/customer/screens/customerlogin';
import CustomerHome from '../components/customer/screens/customerhome';
import SellerIndex from '../components/seller';
import SellerAbout from '../components/seller/about';
import SellerContact from '../components/seller/contact';
import CustomerIndex from '../components/customer/screens';
import CustomerAbout from '../components/customer/screens/customerAbout';
import CustomerContact from '../components/customer/screens/customerContect';
import CustomerFarm from '../components/customer/screens/customerFarm';
import SellerOrders from '../components/seller/sellerOrders';
import SellerindividualOrder from '../components/seller/sellerindividualOrder';
import CustomerMyOrder from '../components/customer/screens/customerMyOrder';
import CustomerIndividualOrder from '../components/customer/screens/customerIndividualOrder';
const Routing = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "about",
            element: <About />,
        },
        {
            path: "contact",
            element: <Contact />,
        },
        {
            path: "selector",
            element: <Selector />,
        },

        //customer screens
        {
            path: 'customer',
            element: <CustomerIndex />,
            children: [

                {
                    path: "home",
                    element: <CustomerHome />,
                },
                {
                    path: "about",
                    element: <CustomerAbout />,
                },
                {
                    path: "contact",
                    element: <CustomerContact />,
                },
                {
                    path: "farm/:id",
                    element: <CustomerFarm />,
                },
                {
                    path: "myorders",
                    element: <CustomerMyOrder />,
                },
                {
                    path: 'order/:id',
                    element: <CustomerIndividualOrder />
                }
            ]
        },
        {
            path: "/customer/login",
            element: <CustomerLogin />,
        },
        //seller screens
        {
            path: 'seller',
            element: <SellerIndex />,
            children: [
                // {
                //     path: 'login',
                //     element: <SellerLogin />
                // },
                {
                    path: 'home',
                    element: <SellerHome />
                }, {
                    path: 'AddNewProduct',
                    element: <AddNewProduct />
                },
                {
                    path: 'sellerDistributionpage',
                    element: <SellerDistributionpage />
                },
                {
                    path: 'orders',
                    element: <SellerOrders />
                },
                {
                    path: 'about',
                    element: <SellerAbout />
                },
                {
                    path: 'contact',
                    element: <SellerContact />
                },
                {
                    path: 'order/:id',
                    element: <SellerindividualOrder />
                }
            ]
        },
        {
            path: '/seller/login',
            element: <SellerLogin />
        },



    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default Routing