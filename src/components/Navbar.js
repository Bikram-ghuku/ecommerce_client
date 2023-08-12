import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom';
import { AccountContext } from '../context/AccountProvider';
import Cookies from 'universal-cookie/cjs/Cookies';
import { Avatar, IconButton, Badge, Menu, MenuItem, ListItemIcon, Tooltip, Paper } from '@mui/material';
import Logout from '@mui/icons-material/Logout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Settings } from '@mui/icons-material';


function stringAvatar(name) {
  return {
    sx: {
      bgcolor: "#0dcaf0",
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function Navbar() {
  const [anchorEl, setAnchor] = useState(null);

  const handleClick = (e) =>{
    setAnchor(e.currentTarget)
  }

  const handleClose = () =>{
    setAnchor(null);
  }
  const {account} = useContext(AccountContext);
  const [numItems, setNItems] = useState(0);
  var cookie = new Cookies();
  var accCookie = cookie.get('uname');
  var accVar = account.Uname
  if(accVar || accCookie){
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
                <Tooltip title="Open Cart"><ShoppingCartIcon/></Tooltip>
              </Badge>
            </IconButton>
          </Link>
          
        </li>
        <li className="nav-item">
        {accVar || accCookie?  <Tooltip title="Account Settings">
            <IconButton onClick={handleClick}>
              <Avatar alt='user profile' {...stringAvatar(accVar ? accVar : accCookie)}/>
            </IconButton>
          </Tooltip>  
          :
           <Link className="nav-link" to="/Login">Login</Link>}
        </li>
      </ul>
      <Paper style={{backgroundColor: "#0dcaf0"}}>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClick={handleClose} onClose={handleClose}>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize='small'/>
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
          
        </Menu>
      </Paper>
    </div>
  </nav>
    )
}

export default Navbar;