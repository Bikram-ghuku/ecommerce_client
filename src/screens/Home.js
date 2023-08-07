import React, {useContext, useState} from 'react'
import Navbar from '../components/Navbar'
import { AccountContext } from '../context/AccountProvider';
import "./css/home.css"

function Home() {
  const {account} = useContext(AccountContext);
  const [respitem, setResitem] = useState([]);
  var res;
  if(account!==''){
    res = "Welcome "+account;
    fetch('http://localhost:8080/items', {method: "GET"})
    .then(response => response.json())
    .then(data => setResitem(data))
    .catch(err => console.log(err))
  }
  else{
    res = "Please login to continue";
  }
  return (
    <>
      <Navbar/>
      <h1>{res}</h1>
      <div className='itemsCont'>
        {respitem.map((items, index) => (
          <div className='card' style={{"width" : "18rem"}}>
            <img src={items.img} className='card-img-top' alt={items.pdtName}/>
            <div className='card-body'>
              <h5 className='card-title text-center'>{items.pdtName}</h5>
              <p className='card-text'>{items.desc}</p>
              <ul className='list-group list-group-flush'>
                {items.opts.map((optItem, optIndex)=>(
                  <li key={optIndex} className='list-group-item'>{optItem}</li>
                ))}
              </ul>
              <a href={items._id} className='btn btn-primary'>Add to ShoppingCart</a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home