import React, {useContext, useState} from 'react'
import Navbar from '../components/Navbar'
import { AccountContext } from '../context/AccountProvider';

function ShoppingCart() {
    const {account} = useContext(AccountContext);
    const [items, setItems]  = useState([]);
    var res;
    if(account!==''){
      res = "Welcome "+account;  
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