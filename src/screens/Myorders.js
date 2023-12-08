import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import './css/Myorders.css'
import { Box, CircularProgress, Tab, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

function cancelOrder(id) {
    fetch(process.env.REACT_APP_SERVER_ADD+"cancelOrder", {
        method: "POST",
        body: JSON.stringify({oid: id}),
        headers:{
          'Content-Type': 'application/json'
        }
        })
        .then(response => response.json())
        .then((data) => {
            window.location.reload();
        })
        .catch(err => console.log(err))
}


function Myorders() {
    const [orders, setOrders] = useState([]);
    const [gotOrders, setGotOrders] = useState(false);
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_ADD+"myOrders", {
            method: "POST",
            body: JSON.stringify({uid: localStorage.getItem("accId")}),
            headers:{
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then((data) => {
                setGotOrders(true)
                setOrders(data)
                var orderCP = data;
                for(var i = 0; i < orderCP.length; i++) {
                    if(orderCP[i].status === 'Pending') {
                        orderCP[i].status = <Box sx={{color: 'warning.main'}}>Pending</Box>
                    } else if(orderCP[i].status === 'delivered') {
                        orderCP[i].status = <Box sx={{color: 'success.main'}}>Delivered</Box>
                    } else if(orderCP[i].status.toLowerCase() === 'cancelled') {
                        orderCP[i].status = <Box sx={{color: 'error.main'}}>cancelled</Box>
                    } else if(orderCP[i].status === 'shipped') {
                        orderCP[i].status = <Box sx={{color: 'info.main'}}>Shipped</Box>
                    }
                }
            setOrders(orderCP);
          })
          .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <Navbar/>
            <div className="mo-main-wrap">
                <div className="mo-main">
                    <h1 className='mo-head'>My Orders</h1>
                    <div className="sep"><div className="hRule"></div></div>
                    <div className="mo-tabel">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Order Status</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow>
                                        <TableCell>{order._id}</TableCell>
                                        <TableCell>{order.pdtName}</TableCell>
                                        <TableCell>{order.status}</TableCell>
                                        <TableCell>{order.address}</TableCell>
                                        <TableCell>{order.qty}</TableCell>
                                        <TableCell>{order.price}</TableCell>
                                        <TableCell>
                                            <button className="btn btn-success">Track</button>
                                            <button className="btn btn-danger" onClick={() => cancelOrder(order._id)}>Cancel</button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {!gotOrders ? <CircularProgress/> : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Myorders