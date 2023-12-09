import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


function AddCart() {
  const {itemId} = useParams();
  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_ADD+"addCartItems", {
      method: "POST",
      body: JSON.stringify({"uid": localStorage.getItem('accId'), "pid": itemId}),
      headers:{
        'Content-Type': 'application/json'
    }
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return(
    <>
      <Navbar/>
      <div style={{display:"flex", justifyContent: "center", alignItems:"center", height:"90vh", flexDirection:"column"}}>
        <div style={{borderRadius:"2vh", outline: "solid #989898", backgroundColor: "#ffffff", boxShadow:"5px 10px 18px #888888"}}>
          <div style={{height: "20vh", width:"40vw", backgroundColor: "#4ded80"}}>
            <br/><br/>
            <CheckCircleOutlineIcon fontSize='large'/>
            <h5>Successfully Added to cart</h5>
          </div>
          <br/><br/>
          <Link to='/ShoppingCart'><button className='btn btn-success'>Goto Cart</button></Link>
          <br/><br/>
        </div>
      </div>
    </>
  )

}

export default AddCart;