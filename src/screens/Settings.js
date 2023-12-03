import React from 'react'
import Navbar from '../components/Navbar'
import { Button, Tab, Table, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import './css/settings.css'
import HomeIcon from '@mui/icons-material/Home';
import { CheckBox } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

function Settings() {
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
                        <TextField label="Address" required variant="outlined" className='s-address s-inp'/>
                        <TextField label="Pincode" required variant="outlined" className='s-pincode s-inp'/>
                        <TextField label="City" required variant="outlined" className='s-city s-inp'/>
                        <TextField label="State" required variant="outlined" className='s-state s-inp'/>
                        <TextField label="Country" required variant="outlined" className='s-country s-inp'/>
                        <TextField label="Phone" required variant="outlined" className='s-phone s-inp'/>
                        <Button variant="contained" className='s-add-btn'><AddIcon/> Add</Button>
                    </div>
                </div>
                <div className="sep"><div className='hRule'></div></div>
                <div className="s-table-wrapper">
                    <div className="s-table">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding='checkbox'>
                                        <CheckBox/>
                                    </TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Pincode</TableCell>
                                    <TableCell>City</TableCell>
                                    <TableCell>State</TableCell>
                                    <TableCell>Country</TableCell>
                                    <TableCell>Phone</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Settings