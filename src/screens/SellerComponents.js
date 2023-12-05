import { TableRow, Table, TableCell, TableHead, TableBody, Box } from '@mui/material'
import React, { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';

function Dashboard() {
    return (
        <div>Dashboard</div>
    )
}

function Orders() {
    const [orders, setOrders] = React.useState([]);
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_ADD+'getOrders', {
            method: "POST",
            body: JSON.stringify({uid: localStorage.getItem('accId')}),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((data) => {
            setOrders(data)
            var orderCP = data;
            for(var i = 0; i < orderCP.length; i++) {
                if(orderCP[i].status === 'Pending') {
                    orderCP[i].status = <Box sx={{color: 'warning.main'}}>Pending</Box>
                } else if(orderCP[i].status === 'delivered') {
                    orderCP[i].status = <Box sx={{color: 'success.main'}}>Delivered</Box>
                } else if(orderCP[i].status === 'cancelled') {
                    orderCP[i].status = <Box sx={{color: 'error.main'}}>cancelled</Box>
                } else if(orderCP[i].status === 'shipped') {
                    orderCP[i].status = <Box sx={{color: 'info.main'}}>Shipped</Box>
                }
            }
            setOrders(orderCP);
        });
        
    }, [])
    return (
        <div className='sd-p-main'>
            <div className="sd-p">
                <div className="sd-p-header">
                    <div className="sd-p-header-title">Orders</div>
                </div>
                <br/><br/>
                <div className="sep"><div className="hRule"></div></div>
                <div className="sd-p-table-wrap">
                    <div className="sd-p-table">
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>OrderId</b></TableCell>
                                    <TableCell><b>Product Name</b></TableCell>
                                    <TableCell><b>Quantity</b></TableCell>
                                    <TableCell><b>Status</b></TableCell>
                                    <TableCell><b>Address</b></TableCell>
                                    <TableCell><b>User</b></TableCell>
                                    <TableCell><b>Actions</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order._id}>
                                        <TableCell>{order._id}</TableCell>
                                        <TableCell>{order.pdtName}</TableCell>
                                        <TableCell>{order.qty}</TableCell>
                                        <TableCell>{order.status}</TableCell>
                                        <TableCell>{order.address}</TableCell>
                                        <TableCell>{order.user}</TableCell>
                                        <TableCell>
                                            <div className='btn btn-primary'>Update status</div>
                                            <div className='btn btn-danger'>Delete order</div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Products() {
    const [products, setProducts] = React.useState([]);
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_ADD+'getProducts', {
            method: "POST",
            body: JSON.stringify({uid: localStorage.getItem('accId')}),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => setProducts(data));
        
    }, [])
    return (
        <div className='sd-p-main'>
            <div className="sd-p">
                <div className="sd-p-header">
                    <div className="sd-p-header-title">Products</div>
                    <div className="sd-p-header-btn btn btn-primary"><AddIcon/> Add Product</div>
                </div>
                <br/><br/>
                <div className="sep"><div className="hRule"></div></div>
                <div className="sd-p-table-wrap">
                    <div className="sd-p-table">
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Image</b></TableCell>
                                    <TableCell><b>Product Name</b></TableCell>
                                    <TableCell><b>Product Description</b></TableCell>
                                    <TableCell><b>Price</b></TableCell>
                                    <TableCell><b>Actions</b></TableCell>
                                    <TableCell><b>Display</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product._id}>
                                        <TableCell><img src={product.img} alt="" width='100px'/></TableCell>
                                        <TableCell>{product.pdtName}</TableCell>
                                        <TableCell>{product.desc}</TableCell>
                                        <TableCell>{'₹' + product.cost}</TableCell>
                                        <TableCell><div className="btn btn-danger">Delete</div></TableCell>
                                        <TableCell>{product.dispType}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Revenue() {
    return ( 
        <div>Revenue</div>
    )
}

function Reviews() {
    return (
        <div>Review</div>
    )
}


export {Dashboard, Orders, Products, Revenue, Reviews}