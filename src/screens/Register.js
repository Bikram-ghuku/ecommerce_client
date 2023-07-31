import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import Navbar from '../components/Navbar'
import './css/Login.css'

function Register() {
    const [form, setForm] = useState({
        email: '',
        pswd: '',
        name: ''
    });

    const handleInp = (e) =>{
        setForm({
            ...form, [e.target.id]:e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch('http://localhost:8080/register',{
            method: "POST",
            body: JSON.stringify(form),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if(data.code!=='ok') alert(data.code);
    }

    return (
        <div>
            <Navbar/>
            <div className='formFlex'>
                <h2>Register Form</h2>
                <div className='formArea'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-goup'>
                            <label for="exampleInputPassword1">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Enter your name" onChange={handleInp}/>
                        </div>
                        <br/>
                        <div className="form-group">
                            <label for="InputEmail">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleInp}/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="pswd" placeholder="Password" onChange={handleInp}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                        <br/>
                        <label className='info-box'>Already have an account? <Link to="/login">Login</Link></label>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register