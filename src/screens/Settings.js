import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Button, TableBody, Table, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import './css/settings.css'
import HomeIcon from '@mui/icons-material/Home';
import { CheckBox } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

function Settings() {

    const [addresses, setAddresses] = React.useState([]);

    useEffect(() => {
    const res = fetch(process.env.REACT_APP_SERVER_ADD+'getAddress', {
        method: "POST",
        body: JSON.stringify({uid: localStorage.getItem('accId')}),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(data => setAddresses(data));
    }, [])


    const [formData, setFormData] = React.useState({address:'', pincode:'', city:'', state:'', country:'', phone:'', uid: localStorage.getItem('accId')});

    const handleTFChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const addAddress = () => {
        const response = fetch(process.env.REACT_APP_SERVER_ADD+'addAddress',{
            method: "POST",
            body: JSON.stringify(formData),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((data) => {
            if(data.code === 'ok'){
                alert('Address added successfully');
                window.location.reload();
            }
            else{
                alert('Error adding address');
            }
        });
    }

    return (
        <div>
            <Navbar/>
            <div className="s-wrapper">
                <div className="s">
                    <h1 className='s-title'>Settings</h1>
                    <div className="sep"><div className='hRule'></div></div>
                    <h2 className='s-subtitle' style={{paddingTop:'2vh'}}><HomeIcon/> Address</h2>
                    <div className='s-subtitle' style={{paddingBottom:'5vh'}}>Add or remove address</div>
                    <div className="sep"><div className='hRule'></div></div>
                    <div className="s-input-wrapper">
                        <div className="s-input">
                            <TextField label="Address" required variant="outlined" className='s-address s-inp' onChange={handleTFChange} name='address'/>
                            <TextField label="City" required variant="outlined" className='s-city s-inp' onChange={handleTFChange} name='city'/>
                            <TextField label="Pincode" required variant="outlined" className='s-pincode s-inp' onChange={handleTFChange} name='pincode'/>
                            <TextField label="State" required variant="outlined" className='s-state s-inp' onChange={handleTFChange} name='state'/>
                            <TextField label="Country" required variant="outlined" className='s-country s-inp' onChange={handleTFChange} name='country'/>
                            <TextField label="Phone" required variant="outlined" className='s-phone s-inp' onChange={handleTFChange} name='phone'/>
                            <Button variant="contained" className='s-add-btn' onClick={() => addAddress()}><AddIcon/> Add</Button>
                        </div>
                    </div>
                    <div className="sep"><div className='hRule'></div></div>
                    <div className="s-table-wrapper">
                        <div className="s-table">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'><b>Address</b></TableCell>
                                        <TableCell align='center'><b>Pincode</b></TableCell>
                                        <TableCell align='center'><b>City</b></TableCell>
                                        <TableCell align='center'><b>State</b></TableCell>
                                        <TableCell align='center'><b>Country</b></TableCell>
                                        <TableCell align='center'><b>Phone</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {addresses.map((row) => (
                                        <TableRow key={row._id}>
                                            <TableCell align='center'>{row.address}</TableCell>
                                            <TableCell align='center'>{row.city}</TableCell>
                                            <TableCell align='center'>{row.pin}</TableCell>
                                            <TableCell align='center'>{row.state}</TableCell>
                                            <TableCell align='center'>{row.country}</TableCell>
                                            <TableCell align='center'>{row.phone}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings