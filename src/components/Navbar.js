import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom';
import { AccountContext } from '../context/AccountProvider';
import Cookies from 'universal-cookie/cjs/Cookies';
import prof from "../prof.png"
import { Avatar, IconButton, Badge } from '@mui/material';

function Navbar() {
  const {account} = useContext(AccountContext);
  const [numItems, setNItems] = useState(0);
  var cookie = new Cookies();
  var accCookie = cookie.get('uname');
  if(account.Uname || accCookie){
    fetch("http://localhost:8080/cartItems", {
        method: "POST",
        body: JSON.stringify({id: localStorage.getItem("accId")}),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => setNItems(data.length))
      .catch(err => console.log(err))
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <Link className="navbar-brand" to="/" style={{paddingLeft: "5vw"}}>Eateries</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav" style={{paddingLeft: "75vw"}}>
        <li className="nav-item active">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to="/shoppingCart">
            <IconButton aria-label="cart">
              <Badge badgeContent={numItems} color="primary">
                <i class="fas fa-shopping-cart"></i>
              </Badge>
            </IconButton>
          </Link>
          
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/Login">{account.Uname || accCookie?  <Avatar src={prof} alt='user profile'/>  : "Login"}</Link>
        </li>
      </ul>
    </div>
  </nav>
    )
}

export default Navbar;