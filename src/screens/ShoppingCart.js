import React, {useContext, useState} from 'react'
import Navbar from '../components/Navbar'
import Cookies from 'universal-cookie/cjs/Cookies';
import { AccountContext } from '../context/AccountProvider';
import './css/shoppingCart.css'
import { Link } from 'react-router-dom';

function ShoppingCart() {
    const {account} = useContext(AccountContext);
    const [items, setItems]  = useState([]);
    var res;
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
                              <tr>
                                <td>{index + 1}</td>
                                <td>{itemD.pdtName}</td>
                                <td>{itemD.cost}</td>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShoppingCart;