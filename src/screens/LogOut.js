import React, { useContext } from 'react'
import Cookies from 'universal-cookie/cjs/Cookies';
import { Link} from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Navbar from '../components/Navbar';
import { AccountContext } from '../context/AccountProvider';

function LogOut() {
    var cookie = new Cookies();
    if(cookie.get('uname')) cookie.remove('uname');
    
    if(cookie.get('type')) cookie.remove('type');

    return(
        <>
            <Navbar/>
            <div style={{display:"flex", justifyContent: "center", alignItems:"center", height:"90vh", flexDirection:"column"}}>
                <div style={{borderRadius:"2vh", outline: "solid #989898", backgroundColor: "#ffffff", boxShadow:"5px 10px 18px #888888"}}>
                <div style={{height: "20vh", width:"40vw", backgroundColor: "#4ded80"}}>
                    <br/><br/>
                    <CheckCircleOutlineIcon fontSize='large'/>
                    <h5>Successfully Logged Out</h5>
                </div>
                <br/><br/>
                <Link to='/Login'><button className='btn btn-success'>Goto Login</button></Link>
                <br/><br/>
                </div>
            </div>
        </>
  )

}

export default LogOut;