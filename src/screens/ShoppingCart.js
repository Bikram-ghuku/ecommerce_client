import React, {useContext, useState} from 'react'
import Navbar from '../components/Navbar'
import Cookies from 'universal-cookie/cjs/Cookies';
import { AccountContext } from '../context/AccountProvider';

function ShoppingCart() {
    const {account} = useContext(AccountContext);
    const [items, setItems]  = useState([]);
    var res;
    var cookie = new Cookies();
    var accCookie = cookie.get('uname');
    if(account.Uname || accCookie){
      res = account.Uname ? "Welcome "+account.Uname : "Welcome "+ accCookie; 
      fetch("http://localhost:8080/items", {
          method: "GET"
        })
        .then(response => response.json())
        .then(data => setItems(data))
        .catch(err => console.log(err))
    }
    else{
        res = "Please Login to continue";
    }

    return (
        <>
            <Navbar/>
            <h1>{res}</h1>
            <ul>
              {items.map((list, index) => (
                <li key={index}>{list.dec} | {list.pdtName}</li>
              ))}
            </ul>
        </>
    )
}

export default ShoppingCart;