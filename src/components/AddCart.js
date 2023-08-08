import React from 'react'
import { useParams } from 'react-router-dom';

function AddCart() {
  const {itemId} = useParams();
  console.log(itemId)
  return (
    <div>addCart</div>
  )
}

export default AddCart;