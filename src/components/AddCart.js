import React from 'react'
import { redirect, useParams } from 'react-router-dom';
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
      Successfully Added to cart
    </>
  )

}

export default AddCart;