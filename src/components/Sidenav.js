import React from 'react'
import { Box, DialogTitle, Drawer, List, ListItem, ListItemText, ListItemIcon, ListItemButton } from '@mui/material'
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';



function Sidenav() {
    const [open, setOpen] = React.useState(true);

    const toggleDrawer = (inOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(inOpen);
    };
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
                    <DialogTitle>Menu</DialogTitle>
                    <List>
                        {[[<Home/>, 'Dashboard'], [<SaveAltIcon/> , 'Orders'], [<Inventory2Icon/>, 'Products'], [<MonetizationOnIcon/>, 'Revenue']].map((text, index) => (
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