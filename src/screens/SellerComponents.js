import { TableRow, Table, TableCell, TableHead, TableBody, Box, TextField, Select, MenuItem, InputLabel, FormControl, CircularProgress, Button } from '@mui/material'
import React, { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { LineChart } from '@mui/x-charts';

function Dashboard() {
    const [totOrders, setTotOrders] = React.useState(0);
    const [totProducts, setTotProducts] = React.useState(0);
    const [totRevenue, setTotRevenue] = React.useState(0);
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_ADD+'getOrders', {
            method: "POST",
            body: JSON.stringify({sid: localStorage.getItem('accId')}),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((data) => {
            setTotOrders(data.length);
        }).catch((err) => {
            console.log(err)
        })
    })
    return (
        <div>
            <div className="sd-dash">
                <div className="sd-dash-header">
                    <h1 className="sd-dash-header-title">Dashboard</h1>
                </div>
                <div className="sep"><div className="hRule"></div></div>
                <div className="sd-dash-body">
                    <div className="sd-dash-body-card">
                        <div className="sd-dash-body-card-title">Total Orders</div>
                        <div className="sd-dash-body-card-value">{totOrders}</div>
                    </div>
                    <div className="sd-dash-body-card">
                        <div className="sd-dash-body-card-title">Total Products</div>
                        <div className="sd-dash-body-card-value">{totProducts}</div>
                    </div>
                    <div className="sd-dash-body-card">
                        <div className="sd-dash-body-card-title">Total Revenue</div>
                        <div className="sd-dash-body-card-value">{totRevenue}</div>
                    </div>
                </div>
                <div className="sep"><div className="hRule"></div></div>
                <div className="sd-dash-graph">
                    <LineChart 
                        sx={{
                            '& .MuiLineElement-root': {
                              strokeDasharray: '10 5',
                              strokeWidth: 4,
                            },
                            '& .MuiAreaElement-series-series1': {
                              fill: "url('#myGradient')",
                            },
                        }}
                        xAxis={[{data:[1, 2, 3]}]}
                        series={[{
                            id: 'series1',
                            data:[10, 11, 13],
                            area: true
                        }]}
                        height={500}
                        width={1000}
                    >
                        <defs>
                            <linearGradient id="myGradient" gradientTransform="rotate(90)">
                            <stop offset="5%" stopColor="#4adede" />
                            <stop offset="95%" stopColor="#787ff6" />
                            </linearGradient>
                        </defs>
                    </LineChart>
                </div>
            </div>
        </div>
    )
}

function delPdt(id) {
    fetch(process.env.REACT_APP_SERVER_ADD+'delProduct', {
        method: "POST",
        body: JSON.stringify({pid: id}),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then((data) => {
        if(data.code === 'ok') {
            window.location.reload();
        }
    });
}

function deleteOrder(id) {
    fetch(process.env.REACT_APP_SERVER_ADD+'delOrder', {
        method: "POST",
        body: JSON.stringify({oid: id}),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then((data) => {
        if(data.code === 'ok') {
            window.location.reload();
        }
    });
}

function Orders() {
    const [orders, setOrders] = React.useState([]);
    const [gotOrders, setGotOrders] = React.useState(false);
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_ADD+'getOrders', {
            method: "POST",
            body: JSON.stringify({uid: localStorage.getItem('accId')}),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((data) => {
            setOrders(data)
            setGotOrders(true);
            var orderCP = data;
            for(var i = 0; i < orderCP.length; i++) {
                if(orderCP[i].status === 'Pending') {
                    orderCP[i].stat = <Box sx={{color: 'warning.main'}}>Pending</Box>
                } else if(orderCP[i].status === 'delivered') {
                    orderCP[i].stat = <Box sx={{color: 'success.main'}}>Delivered</Box>
                } else if(orderCP[i].status.toLowerCase() === 'cancelled') {
                    orderCP[i].stat = <Box sx={{color: 'error.main'}}>cancelled</Box>
                } else if(orderCP[i].status === 'shipped') {
                    orderCP[i].stat = <Box sx={{color: 'info.main'}}>Shipped</Box>
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
                                        <TableCell>{order.stat}</TableCell>
                                        <TableCell>{order.address}</TableCell>
                                        <TableCell>{order.user}</TableCell>
                                        <TableCell>
                                            {order.status.toLowerCase() === "cancelled" ? <></> : <button className='btn btn-primary' >Update status</button> }
                                            <button className='btn btn-danger' onClick={() => deleteOrder(order._id)}>Delete order</button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {!gotOrders ? <CircularProgress sx={{height: "90vh"}}/> : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}

function Products() {
    const [products, setProducts] = React.useState([]);
    const [gotPdts, setGotPdts] = React.useState(false);
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_ADD+'getProducts', {
            method: "POST",
            body: JSON.stringify({uid: localStorage.getItem('accId')}),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((data) => {
            setProducts(data)
            setGotPdts(true);
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
                                        <TableCell><button className="btn btn-danger" onClick={() => delPdt(product._id)}>Delete</button></TableCell>
                                        <TableCell>{product.dispType}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {!gotPdts ? <CircularProgress sx={{height: "90vh"}}/> : ""}
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