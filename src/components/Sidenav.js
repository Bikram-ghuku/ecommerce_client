import React from 'react'
import { Box, DialogTitle, Drawer, List, ListItem, ListItemText, ListItemIcon, ListItemButton } from '@mui/material'
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';



function Sidenav() {
    const open = true;
    const options = [
        [<Home/>, 'Dashboard'], 
        [<SaveAltIcon/> , 'Orders'], 
        [<Inventory2Icon/>, 'Products'], 
        [<MonetizationOnIcon/>, 'Revenue'], 
        [<RateReviewIcon/>, 'Reviews'],
        [<AddCircleOutlineIcon/>, 'addProduct']];
    return (
        <div className='drawer' style={{display:'flex', backgroundColor: 'red', width:'13vw'}}>
            <Drawer
                sx={{
                    '& .MuiDrawer-root': {
                        position: 'relative',
                        height: '92vh'
                    },
                    '& .MuiPaper-root': {
                        position: 'relative',
                        height: '92vh',
                        border: 'solid 1px #000000'
                    }
                }}
                variant='permanent'
                anchor='left'
                open={open}
            >
                <Box sx={{ width: 250 }} role="presentation">
                    <DialogTitle>Seller Menu</DialogTitle>
                    <List>
                        {options.map((text, index) => (
                            <ListItem key={index}>
                                <Link to={'/sellerDash/'+text[1]} style={{textDecoration: 'none', color: 'black'}}>
                                    <ListItemButton>
                                        <ListItemIcon>{text[0]}</ListItemIcon>
                                        <ListItemText primary={text[1]} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    )
}

export default Sidenav