import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

function Payment() {
	const [stripePromise, setStripePromise] = useState();
    const [clientSecret, setClientSecret] = useState("");
    localStorage.setItem("funCalled", false);

    useEffect(() => {
		fetch(process.env.REACT_APP_SERVER_ADD+"stripeConfig",)
		.then(async (t) => {
			const publicKey  = await t.json();
			setStripePromise(loadStripe(publicKey.key));
		}).catch((err) => {
			console.log(err);
		});

        fetch(process.env.REACT_APP_SERVER_ADD+"createPaymentIntent", {
            method: "POST",
            body: JSON.stringify({uid: localStorage.getItem('accId')}),
            headers:{
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then((data) => {
              setClientSecret(data.clientSecret);
              console.log(data.clientSecret);
          })
          .catch(err => console.log(err))
    }, [])

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className='bodyD'>
            <h1>React Stripe and the Payment Element</h1>
            {stripePromise && clientSecret && (
                <Elements stripe={ stripePromise } options={options}>
                    <CheckoutForm/>
                </Elements>
            )}
        </div>
    )
}

export default Payment