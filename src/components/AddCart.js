import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';


function AddCart() {
	const {itemId} = useParams();
	const [success, setSuccess] = React.useState();
	useEffect(() => {
    	fetch(process.env.REACT_APP_SERVER_ADD+"cart/addCartItems", {
      		method: "POST",
      		body: JSON.stringify({"uid": localStorage.getItem('accId'), "pid": itemId}),
      		headers:{
        		'Content-Type': 'application/json'
    		}
    	})
    	.then(resp => resp.json())
    	.then(data =>{ 
			if(data.code !== "ok"){
				setSuccess(data.code)
			}else{
				setSuccess("")
			}
		})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  	const style = {
		height:"20vh",
		width:"40vw",
		backgroundColor: success === "" ? "#4ded80" : "#ff0000",
		borderRadius:"2vh 2vh 0 0",
	}
	return(
    <>
    	<Navbar/>
    	<div style={{display:"flex", justifyContent: "center", alignItems:"center", height:"90vh", flexDirection:"column"}}>
        	<div style={{borderRadius:"2vh", outline: "solid #989898", backgroundColor: "#ffffff", boxShadow:"5px 10px 18px #888888"}}>
          		<div style={style}>
            		<br/><br/>
					{success === "" ? <CheckCircleOutlineIcon fontSize='large'/> : <CancelIcon fontSize='large'/>}
            		{success === "" ? <h5>Successfully Added to cart</h5> : <h5>Error : {success} </h5>}
          		</div>
          		<br/><br/>
				{success === "" ? <>
					<Link to='/ShoppingCart'>
						<button className='btn btn-success'>Goto Cart</button>
					</Link>
				</> : <>
				<Link to='/'>
						<button className='btn btn-danger'>Goto Home</button>
					</Link>
				</>}
          		<br/><br/>
        	</div>
      	</div>
    </>
  )

}

export default AddCart;