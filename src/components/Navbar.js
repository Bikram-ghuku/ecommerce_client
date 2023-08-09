import React, { useContext } from 'react'
import {Link} from 'react-router-dom';
import { AccountContext } from '../context/AccountProvider';
import Cookies from 'universal-cookie/cjs/Cookies';
import prof from "../prof.png"


function Navbar() {
  const {account} = useContext(AccountContext);
  var cookie = new Cookies();
  var accCookie = cookie.get('uname');
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <Link className="navbar-brand" to="/">Eateries</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav text-sm-end">
        <li className="nav-item active">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to="/shoppingCart">Shopping Cart</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/Login">{account.Uname || accCookie?  <img src={prof} style={{"height": "3vh"}}/> : "Login"}</Link>
        </li>
      </ul>
    </div>
  </nav>
    )
}

export default Navbar;