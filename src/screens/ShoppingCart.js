import React, {useContext, useState} from 'react'
import Navbar from '../components/Navbar'
import Cookies from 'universal-cookie/cjs/Cookies';
import { AccountContext } from '../context/AccountProvider';
import './css/shoppingCart.css'
import { Link } from 'react-router-dom';
import { FormControl, InputLabel, Select, TextField } from '@mui/material';

function ShoppingCart() {
    const [promoCode, setPromoCode] = useState();
    const [discount, setDiscount] = useState(0);
    const {account} = useContext(AccountContext);
    const [items, setItems]  = useState([]);
    var res;
    var totItems, totSum = 0;
    var cookie = new Cookies();
    var accCookie = cookie.get('uname');
    if(account.Uname || accCookie){
      res = account.Uname ? "Welcome "+account.Uname : "Welcome "+ accCookie; 
      fetch("http://localhost:8080/cartItems", {
          method: "POST",
          body: JSON.stringify({id: localStorage.getItem("accId")}),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => setItems(data ))
        .catch(err => console.log(err))
    }
    else{
        res = "Please Login to continue";
    }
    
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
                              </tr>
                            </thead>
                            <tbody>
                            {items.map((itemD, index)=>(
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{itemD.pdtName}</td>
                                <td>{"$"+itemD.cost}</td>
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
                          <h5>{"$"+totSum}</h5>
                        </div>
                      </div>
                      <div className='promoCode'>
                        <div className='pcTitle'><h5>SHIPPING ADDRESS</h5></div>
                        <div className='shipInp'>
                          <FormControl style={{width: "20vw"}}>
                            <InputLabel id="shipAddLabel">Shipping Address</InputLabel>
                            <Select label='Select address' labelId='shipAddLabel'></Select>
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
                          <div className='finalAmtR'><h5>${totSum > discount ? totSum - discount : totSum}</h5></div>
                          <div className='checkOutBtn'>
                            <button className='btn btn-secondary' style={{width: "100%", backgroundColor:"#1e2f97"}}>
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