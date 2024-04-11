import React from 'react'
import Navbar from '../components/Navbar'
import Sidenav from '../components/Sidenav'
import { useParams } from 'react-router-dom';
import './css/Sellerdash.css'
import {Dashboard, Orders, Products, Revenue, Reviews, AddProducts} from './SellerComponents'



function Sellerdash() {
    const {page} = useParams();
    return (
        <div>
            <Navbar/>
            <Sidenav/>
            <div className="sd-main">
                {page === "Dashboard" ? <Dashboard/> : <></>}
                {page === "Orders" ? <Orders/> : <></>}
                {page === "Products" ? <Products/> : <></>}
                {page === "Revenue" ? <Revenue/> : <></>}
                {page === "Reviews" ? <Reviews/> : <></>}
                {page === undefined ? <Dashboard/> : <></>}
                {page === "addProduct" ? <AddProducts/> : <></>}
            </div>
        </div>
    )
}

export default Sellerdash