import React from 'react'
import Navbar from '../components/Navbar'
import { Box, DialogTitle, Drawer, List, ListItem, ListItemText, ListItemIcon, ListItemButton } from '@mui/material'
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Home } from '@mui/icons-material';

function Sellerdash() {
    const [open, setOpen] = React.useState(true);

    const toggleDrawer = (inOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(inOpen);
    };
  return (
    <>
        <Navbar/>
        <div className='drawer' style={{display:'flex'}}>
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
                                <ListItemButton>
                                    <ListItemIcon>{text[0]}</ListItemIcon>
                                    <ListItemText primary={text[1]} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    </>
  )
}

export default Sellerdash