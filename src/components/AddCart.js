import React from 'react'
import { Link, redirect, useParams } from 'react-router-dom';
import Navbar from './Navbar'


function AddCart() {
  const {itemId} = useParams();
  console.log(itemId)
  fetch('http://localhost:8080/addCartItems', {
    method: "POST",
    body: JSON.stringify({"uid": localStorage.getItem('accId'), "pid": itemId}),
    headers:{
      'Content-Type': 'application/json'
  }
  })
  .then(resp => resp.json())
  .then(data => console.log(data))
  return(
    <>
      <Navbar/>
      <h1>Successfully Added to cart</h1>
      <Link to='/ShoppingCart'>Goto Cart</Link>
    </>
  )

}

export default AddCart;