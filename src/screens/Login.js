import React, {useState, useContext} from 'react'
import Cookies from 'universal-cookie/cjs/Cookies';
import {Link} from 'react-router-dom';
import Navbar from '../components/Navbar'
import './css/Login.css'
import { AccountContext } from '../context/AccountProvider';

function Login() {
  const [errMsg, setMsg] = useState();
  const [remMe, setRemMe] = useState(false);
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
      localStorage.setItem("accId", data.id)
      setAccount({"Uname":data.name, "type": data.type});
      if(remMe){
        const cookie = new Cookies();
        cookie.set('uname', data.name, {path: "/"})
        cookie.set('type', data.type, {path: "/"})
      }
      setMsg("Login successful")
    }

  }

  const handleSave = (e) =>{
    setRemMe(e.target.checked);
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
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="reMe" onChange={handleSave}/>
                <label class="form-check-label" for="exampleCheck1">Remember me</label>
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