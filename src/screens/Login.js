import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import Navbar from '../components/Navbar'
import './css/Login.css'

function Login() {
  const [form, setForm] = useState({
      email: '',
      pswd: ''
  });

  const handleInp = (e) =>{
    setForm({
      ...form, [e.target.id]:e.target.value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch('localhost:8080/login',{
      method: "POST",
      body: JSON.stringify(form),
      headers:{
          'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    console.log(data);
  }
  return (
    <div>
        <Navbar/>
        <div className='formFlex'>
        <h2>Login Form</h2>
        <div className='formArea'>
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleInp}/>
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="pswd" placeholder="Password" onChange={handleInp}/>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
            <br/>
            <label className='info-box'>Don't have an account? <Link to="/register">Click Here</Link></label>
          </form>
        </div>
        </div>
    </div>
  )
}

export default Login