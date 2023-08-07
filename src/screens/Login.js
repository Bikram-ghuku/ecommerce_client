import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom';
import Navbar from '../components/Navbar'
import './css/Login.css'
import { AccountContext } from '../context/AccountProvider';

function Login() {
  const [errMsg, setMsg] = useState();
  const [form, setForm] = useState({
      email: '',
      pswd: ''
  });

  const {setAccount } = useContext(AccountContext);

  const handleInp = (e) =>{
    setForm({
      ...form, [e.target.id]:e.target.value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch('http://localhost:8080/login',{
      method: "POST",
      body: JSON.stringify(form),
      headers:{
          'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    if(data.code!=='ok'){
      setMsg(data.code);
    }
    else{
      setAccount(data.name);
      setMsg("Login successful")
    }

  }
  return (
      <div>
          <Navbar/>
          <div className='formFlex'>
          <h2>Login Form</h2>
          <div className='formArea'>
          <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleInp}/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label >Password</label>
              <input type="password" className="form-control" id="pswd" placeholder="Password" onChange={handleInp}/>
            </div>
            <div className='form-group'>
              {errMsg}
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <br/>
            <label className='info-box'>Don't have an account? <Link to="/register">Click Here</Link></label>
          </form>
        </div>
        </div>
      </div>
  )
}

export default Login