import { TableRow, Table, TableCell, TableHead, TableBody, Box, TextField, Select, MenuItem, InputLabel, FormControl, CircularProgress, Button } from '@mui/material'
import React, { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

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
                        {orders.length === 0 ? <CircularProgress sx={{height: "90vh"}}/> : ""}
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
        }).then(res => res.json()).then((data) => {
            setProducts(data)
            var productCP = data;
            for(var i = 0; i < productCP.length; i++) {
                if(productCP[i].dispType === 'featured') {
                    productCP[i].dispType = <Box sx={{color: 'success.main'}}>Featured</Box>
                } else if(productCP[i].dispType === 'normal') {
                    productCP[i].dispType = <Box sx={{color: 'primary.main'}}>Normal</Box>
                }else{
                    productCP[i].dispType = <Box sx={{color: 'error.main'}}>Private</Box>
                }
            }
        });
        
    }, [])
    return (
        <div className='sd-p-main'>
            <div className="sd-p">
                <div className="sd-p-header">
                    <div className="sd-p-header-title">Products</div>
                    <div className="sd-p-header-btn btn btn-primary">
                        <Link to='/sellerDash/addProduct'>
                            <font style={{color:'white', textDecoration: 'none'}}><AddIcon/> Add Product</font>
                        </Link>
                    </div>
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
                        {products.length === 0 ? <CircularProgress sx={{height: "90vh"}}/> : ""}
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

function AddProducts() {
    const [products, setProducts] = React.useState({pdtName: '', desc: '', cost: '', img: '', dispType: '', uid: localStorage.getItem('accId')});
    const [status, setStatus] = React.useState('');
    const handleChange = (e) => {
        setProducts({...products, [e.target.name]: e.target.value});
        console.log(products);
    }

    const handleSubmit = () => {
        setStatus('Adding Product...');
        fetch(process.env.REACT_APP_SERVER_ADD+'addProduct', {
            method: "POST",
            body: JSON.stringify(products),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((data) => {
            setStatus(data.status);
        });
    }

    return (
        <div className='sd-p-main'>
            <div className="sd-p">
                <div className="sd-p-header">
                    <div className="sd-p-header-title">Add Products</div>
                </div>
            </div>
            <br/><br/>
            <div className="sep"><div className="hRule"></div></div>
            <div className="sd-ap-grid">
                <div className="sd-inp-label">Product Name: </div>
                <div className='sd-inp-field'>
                    <TextField id="outlined-basic" label="Product Name" variant="outlined" sx={{width:'95%'}} name='pdtName' onChange={handleChange}/>
                </div>
                <div className="sd-inp-label" style={{gridRow:'2/span 2'}}>Product Description: </div>
                <div className='sd-inp-field' style={{gridRow:'2/span 2', height:'100%'}}>
                    <TextField id="outlined-basic" label="Product Description" variant="outlined" sx={{width:'95%'}} multiline rows={3} name='desc' onChange={handleChange}/>
                </div>
                <div className="sd-inp-label">Product Price: </div>
                <div className='sd-inp-field'>
                    <TextField id="outlined-basic" label="Price" variant="outlined" sx={{width:'95%'}} name='cost' onChange={handleChange}/>
                </div>
                <div className="sd-inp-label">Product Image: </div>
                <div className='sd-inp-field'>
                    <TextField id="outlined-basic" label="Image URL" variant="outlined" sx={{width:'95%'}} name='img' onChange={handleChange}/>
                </div>
                <div className="sd-inp-label">Product Display Type: </div>
                <div className='sd-inp-field'>
                    <FormControl sx={{width:'95%'}}>
                        <InputLabel id="selectLabel">Display Type</InputLabel>
                        <Select label='Display Typ'  labelId='selectLabel' defaultValue={"private"} name='dispType' onChange={handleChange}>
                            <MenuItem value={"normal"}>Normal</MenuItem>
                            <MenuItem value={"featured"}>Featured</MenuItem>
                            <MenuItem value={"private"}>Private</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <Button variant="contained" onClick={() => handleSubmit()}>Add Product</Button>
            <div className="sd-ap-stat">{status}</div>
        </div>
    )
}


export {Dashboard, Orders, Products, Revenue, Reviews, AddProducts}