import React from 'react'
import Navbar from '../components/Navbar'
import Sidenav from '../components/Sidenav'
import { useParams } from 'react-router-dom';


function Sellerdash() {
    const {page} = useParams();
    return (
        <div>
            <Navbar/>
            <Sidenav/>
            {page}
        </div>
    )
}

export default Sellerdash