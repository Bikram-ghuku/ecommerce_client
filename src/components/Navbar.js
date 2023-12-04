import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom';
import { AccountContext } from '../context/AccountProvider';
import Cookies from 'universal-cookie/cjs/Cookies';
import { Avatar, IconButton, Badge, Menu, MenuItem, ListItemIcon, Tooltip, Paper, DialogTitle } from '@mui/material';
import Logout from '@mui/icons-material/Logout'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Settings } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import './css/Navbar.css'

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
  var accType = account.type || cookie.get('type');
  if(accVar || accCookie){
    fetch(process.env.REACT_APP_SERVER_ADD+"cartItems", {
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
      <ul className="navbar-nav" style={{paddingLeft: "70vw"}}>
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to="/shoppingCart">
            <IconButton aria-label="cart">
              <Badge badgeContent={numItems} color="primary">
                <Tooltip title="Open Cart"><ShoppingCartOutlinedIcon/></Tooltip>
              </Badge>
            </IconButton>
          </Link>
        </li>
        {accType==='Seller' ? <><li className="nav-item">
          <Link className='nav-link' to="/sellerDash/Dashboard">
            <Tooltip title="Seller Dashboard"><DashboardIcon/></Tooltip>
          </Link>
        </li>
        </> : null}
        <li className="nav-item">
          <IconButton aria-label="Notifications">
            <Badge badgeContent={0} color="primary">
              <Tooltip title="Notifications"><NotificationsNoneOutlinedIcon/></Tooltip>
            </Badge>
          </IconButton>
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
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClick={handleClose} onClose={handleClose} >
          <DialogTitle id="simple-dialog-title">{accVar || accCookie}</DialogTitle>
          <MenuItem>
            <Link to="/settings" style={{color:"inherit", textDecoration:"none"}}>
              <ListItemIcon>
                <Settings fontSize='small'/>
              </ListItemIcon>
              Settings
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/logout" style={{color:"inherit", textDecoration:"none"}}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </Link>
          </MenuItem>
          
        </Menu>
      </Paper>
    </div>
  </nav>
  )
}

export default Navbar;