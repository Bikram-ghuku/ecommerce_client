import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import './css/Myorders.css'
import { Box, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

function cancelOrder(id) {
    fetch(process.env.REACT_APP_SERVER_ADD+"order/cancelOrder", {
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
        fetch(process.env.REACT_APP_SERVER_ADD+"order/myOrders", {
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
                    if(orderCP[i].status.toLowerCase() === 'pending') {
                        orderCP[i].stat = <Box sx={{color: 'warning.main'}}>Pending</Box>
                    } else if(orderCP[i].status.toLowerCase() === 'delivered') {
                        orderCP[i].stat = <Box sx={{color: 'success.main'}}>Delivered</Box>
                    } else if(orderCP[i].status.toLowerCase() === 'cancelled') {
                        orderCP[i].stat = <Box sx={{color: 'error.main'}}>Cancelled</Box>
                    } else if(orderCP[i].status.toLowerCase() === 'delivering') {
                        orderCP[i].stat = <Box sx={{color: 'info.main'}}>Delivering</Box>
                    }else{
                        orderCP[i].stat = <Box sx={{color: 'primary.main'}}>Preparing</Box>
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
                                        <TableCell>{order.stat}</TableCell>
                                        <TableCell>{order.address}</TableCell>
                                        <TableCell>{order.qty}</TableCell>
                                        <TableCell>{'₹'+order.price}</TableCell>
                                        <TableCell>
                                            {order.status === "delivering"? <button className="btn btn-success">Track</button> : null}
                                            {order.status === "Pending" ? <button className="btn btn-danger" onClick={() => cancelOrder(order._id)}>Cancel</button> : null}
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