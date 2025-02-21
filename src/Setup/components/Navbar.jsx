import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { 
    AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, 
    BottomNavigation, BottomNavigationAction, Collapse, 
    Divider,
    Avatar,
    MenuItem,
    Menu,
    Fade,
    Slide,
    Zoom,
    Tooltip,  
} from "@mui/material";
import 'animate.css';
import { setAdminUser, setEditorScreenSize, setIsTablet, setLarge, setMobile } from '../../actions/actions';
import { useNavigate } from 'react-router';
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";

function Navbar({ routeTo }) {
  const dispatch = useDispatch();
  const siteConfigurations = useSelector((state) => state.siteConfigurations);
  const editorScreenSize = useSelector(state => state.editorScreenSize); 
  const siteColors = useSelector((state) => state.siteColors);
  const adminUser = useSelector((state) => state.adminUser);
  const containerRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
      setAnchorEl(event.currentTarget);
  };
  
  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName[0].toUpperCase() : "";
    const lastInitial = lastName ? lastName[0].toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  const handleCloseMenu = (x) => {
    setAnchorEl(null);
    if (x) {
        dispatch(setAdminUser({}))
        Cookies.remove('adminToken');
        navigate('/Dashboard');
    }
  };

  return (
    <AppBar sx={{ backgroundColor: '#004268', overflow: 'hidden'}} position="static" ref={containerRef}> 
        <Toolbar>
            
            <Typography variant="h4" style={{ flexGrow: 1, color: '#e8f8ff'}}>
                Reactor
            </Typography>
            
        </Toolbar>
    </AppBar>
  );
}

export default Navbar;
