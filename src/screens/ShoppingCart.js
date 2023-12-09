import React, {useContext, useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Cookies from 'universal-cookie/cjs/Cookies';
import { AccountContext } from '../context/AccountProvider';
import './css/shoppingCart.css'
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

function deletePdt(id, index){
  	fetch(process.env.REACT_APP_SERVER_ADD+"removeCart", {
    	method: "POST",
    	body: JSON.stringify({pid: id, uid: localStorage.getItem("accId")}),
    	headers:{
      		'Content-Type': 'application/json'
    	}
  	})
  	.then(response => response.json())
  	.then(data => window.location.reload())
  	.catch(err => console.log(err))
}

function ShoppingCart() {
    const [promoCode, setPromoCode] = useState();
    const [addresses, setAddresses] = React.useState([]);
    const [discount, setDiscount] = useState(0);
    const {account} = useContext(AccountContext);
    const [items, setItems]  = useState([]);
    const [currAdd, setCurrAdd] = useState(0);
	const [gotItems, setGotItems] = useState(false);
	const navigate = useNavigate();
    var res;
    var totItems, totSum = 0;
    var cookie = new Cookies();
    var accCookie = cookie.get('uname');
    if(account.Uname || accCookie){
      res = account.Uname ? "Welcome "+account.Uname : "Welcome "+ accCookie; 
      
    }
    else{
        res = "Please Login to continue";
    }

    useEffect(() => {
      fetch(process.env.REACT_APP_SERVER_ADD+"cartItems", {
          method: "POST",
          body: JSON.stringify({id: localStorage.getItem("accId")}),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then((data) => {
			setItems(data)
			setGotItems(true)
		})
        .catch(err => console.log(err))

        fetch(process.env.REACT_APP_SERVER_ADD+'getAddress', {
          method: "POST",
          body: JSON.stringify({uid: localStorage.getItem('accId')}),
          headers:{
              'Content-Type': 'application/json'
          }
      }).then(res => res.json()).then(data => setAddresses(data));

      }, []);
    
    totItems = items.length
    for(var i = 0; i < totItems; i++){
      	totSum+=parseInt(items[i].cost)
    }

    const handlePCChange = (e) =>{
    	setPromoCode(e.target.value)
    }

    const applyPC = () =>{
    	if(promoCode === "69420"){
        	setDiscount(2000);
      	}
      	else{
        	setDiscount(0);
      	}
    }

    const handleSADD = (e) =>{
      	e.preventDefault();
      	setCurrAdd(e.target.value);
    }


    const orderItems = () =>{
      	if(currAdd === 0){
        	alert("Please select an address");
        	return;
      	}

		navigate('/payment');
		
		localStorage.setItem('address', currAdd);
    }

    return (
        <>
            <Navbar/>
        	<h1>{res}</h1>
            <div className='mainDiv'>
                <div className='backDiv'>
                    <div className='itemsDiv'>
                    	<div className='titleDiv'>
                    		<div className='lTitle'><h3>Shopping Cart</h3></div>
                        	<div className='rTitle'><h3>{items.length} items</h3></div>
                    	</div>
                    	<div className='sep'>
                        	<div className='hRule'></div>
                      	</div>
                      	<div className='itemListCont'>
                        	<div className='itemsList'>
                          		<table className='table table-bordered'>
                            		<thead>
                              			<tr>
                                			<th scope='col'>Item no.</th>
                                			<th scope='col'>Item Info</th>
                                			<th scope='col'>Price</th>
                                			<th scope='col'>Delete</th>
                              			</tr>
                            		</thead>
									{!gotItems ? <CircularProgress/> : <></>}
                            		<tbody>
                            			{items.map((itemD, index)=>(
                              				<tr key={index}>
                                				<td>{index + 1}</td>
                                				<td>{itemD.pdtName}</td>
                                				<td>{"₹"+itemD.cost}</td>
                                				<td><button className='btn btn-danger' onClick={() => deletePdt(itemD._id, index)}>Delete</button></td>
                              				</tr>
                            			))}
                            		</tbody>
                          		</table>
                        	</div>
                      	</div>
                      	<div className='itemsFooter'>
                    		<Link to="/"><i className="fa-solid fa-arrow-left"></i> Go back to shopping </Link>
                      	</div>
                    </div>
                    <div className='totDiv'>
                    	<div className='ltitleDiv'>
                        	<h3>Order Summary</h3>
                      	</div>
                      	<div className='sep'>
                        	<div className='hRule'></div>
                      	</div>
                      	<div className='totDet'>
                        	<div className='totDetA'>
                            	<h5>ITEMS {totItems}</h5>
                        	</div>
                        	<div className='totDetB'>
                          		<h5>{"₹"+totSum}</h5>
                        	</div>
                      	</div>
                      	<div className='promoCode'>
                        	<div className='pcTitle'><h5>SHIPPING ADDRESS</h5></div>
                        	<div className='shipInp'>
                          		<FormControl style={{width: "20vw"}}>
                            		<InputLabel id="shipAddLabel">Shipping Address</InputLabel>
                            		<Select label='Select address' labelId='shipAddLabel' onChange={handleSADD} defaultValue={0}>
                              			<MenuItem key={0} value={0}>Select an address</MenuItem>
                              			{addresses.map((row) => (
                                			<MenuItem key={row._id} value={row._id}>{row.address+', '+row.pin}</MenuItem>
                              			))}
                              			{addresses.length === 0 ? <Link to='/settings'>
                                			<MenuItem value={0}>
                                  				<div  style={{textDecoration:"none", color:"inherit"}}> 
                                    				<AddIcon/>
                                    				Add Address
                                  				</div>
                                			</MenuItem>
                                			</Link> : <div></div>}
                            		</Select>
                          		</FormControl>
                    		</div>
                        	<div className='pcTitle'><h5>PROMO CODE</h5></div>
                        	<div className='pcInp'>
                          		<TextField variant='outlined' label="Enter promo code" className='pcInpF' onChange={handlePCChange}/>
                        	</div>
                        	<div className='applyPCBtn'>
                          		<button className='btn btn-primary' onClick={applyPC}>APPLY</button>
                        	</div>
                      	</div>
                      	<div className='sep'>
                        	<div className='hRule'></div>
                      	</div>
                      	<div className='finalCheck'>
                          	<div className='finalAmtL'><h5>TOTAL COST</h5></div>
                          	<div className='finalAmtR'><h5>₹{totSum > discount ? totSum - discount : totSum}</h5></div>
                          	<div className='checkOutBtn'>
                            	<button className='btn btn-secondary' style={{width: "100%", backgroundColor:"#1e2f97"}} onClick={() => orderItems()} disabled={totSum==0}>
                              		<h5>CHECKOUT</h5>
                            	</button>
                          	</div>
                      	</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShoppingCart;