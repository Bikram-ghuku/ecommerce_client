import React, {useContext} from 'react'
import Navbar from '../components/Navbar'
import { AccountContext } from '../context/AccountProvider';

function Home() {
  const {account} = useContext(AccountContext);
  const res = account!=''?"Welcome "+account : "Please Login to continue"
  return (
    <>
    <Navbar/>
      <h1>{res}</h1>
    </>
  )
}

export default Home