import { TableRow, Table, TableCell, TableHead, TableBody } from '@mui/material'
import React, { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';

function Dashboard() {
    return (
        <div>Dashboard</div>
    )
}

function Orders() {
    return (
        <div>Orders</div>
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
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Product Description</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Actions</TableCell>
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