import React, { useEffect} from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { CheckCircleOutline } from '@mui/icons-material';

function confirmOrder(paymentIntent){
    fetch(process.env.REACT_APP_SERVER_ADD+"/order/addOrder", {
		method: "POST",
		body: JSON.stringify({uid: localStorage.getItem("accId"), address: localStorage.getItem("address"), paymentIntent:paymentIntent}),
		headers:{
			  'Content-Type': 'application/json'
		}
	  })
	  .then(response => response.json())
	  .then((data) => {
		if(data.code === "ok"){
			alert("Order placed successfully");
		}
	})
	  .catch(err => console.log(err))
}


function Completion() {
	const [searchParams] = useSearchParams();
	const paymentIntent = searchParams.get("payment_intent");
	useEffect(() => {
		if(paymentIntent && localStorage.getItem("funCalled") !== "true"){
			confirmOrder(paymentIntent);
			localStorage.setItem("funCalled", true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
            <Navbar/>
            <div style={{display:"flex", justifyContent: "center", alignItems:"center", height:"90vh", flexDirection:"column"}}>
                <div style={{borderRadius:"2vh", outline: "solid #989898", backgroundColor: "#ffffff", boxShadow:"5px 10px 18px #888888"}}>
                <div style={{height: "20vh", width:"40vw", backgroundColor: "#4ded80"}}>
                    <br/><br/>
                    <CheckCircleOutline fontSize='large'/>
                    <h5>Order success</h5>
					<h6>Payment ID: {searchParams.get("payment_intent")}</h6>
                </div>
                <br/><br/>
                <Link to='/'><button className='btn btn-success'>Goto home</button></Link>
                <br/><br/>
                </div>
            </div>
        </>
  	)
}

export default Completion