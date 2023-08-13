import React, {useContext, useState} from 'react'
import Navbar from '../components/Navbar'
import Cookies from 'universal-cookie/cjs/Cookies';
import { AccountContext } from '../context/AccountProvider';
import "./css/home.css"
import { Link } from 'react-router-dom';

function Home() {
  const {account} = useContext(AccountContext);
  const [respitem, setResitem] = useState([]);
  var res;
  var cookie = new Cookies();
  var accCookie = cookie.get('uname');
  if(account.Uname || accCookie){
    res = account.Uname ? "Welcome "+account.Uname : "Welcome "+ accCookie;
    fetch(process.env.REACT_APP_SERVER_ADD+'items', {method: "GET"})
    .then(response => response.json())
    .then(data => setResitem(data))
    .catch(err => console.log(err))
  }
  else{
    res = "Please Login to continue";
  }
  return (
    <>
      <Navbar/>
      <h1>{res}</h1>
      <div className='itemsCont'>
        {respitem.map((items, index) => (
          <div className='card' style={{width : "18rem", display: "flex", justifyContent: "center", alignItems:"center"}}>
            <img src={items.img} className='card-img-top' alt={items.pdtName} style={{height:"10vh", width: "10vw"}}/>
            <div className='card-body'>
              <h5 className='card-title text-center'>{items.pdtName}</h5>
              <p className='card-text'>{items.desc}</p>
              <ul className='list-group list-group-flush'>
                {items.opts.map((optItem, optIndex)=>(
                  <li key={optIndex} className='list-group-item'>{optItem}</li>
                ))}
              </ul>
              <p className='card-text'><h5>{'$'+items.cost}</h5></p>
              <Link to={"addCart/"+items._id} className='btn btn-primary'>Add to ShoppingCart</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home