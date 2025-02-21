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
    <AppBar sx={{ backgroundColor: siteColors.navbar_background, overflow: 'hidden'}} position="static" ref={containerRef}> 
        <Toolbar>
            
            <Typography variant="h4" style={{ flexGrow: 1, color: siteColors.navbar_title }}>
                {siteConfigurations.site_appName} CMS
            </Typography>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                <Tooltip title="Mobile View">
                <IconButton
                    sx={{color: editorScreenSize === '599px' ? siteColors.navbar_linkActive : siteColors.navbar_link}}
                    onClick={() => {
                        dispatch(setEditorScreenSize("599px"))
                        dispatch(setMobile(true));
                        dispatch(setIsTablet(false));
                        dispatch(setLarge(false));
                    }}
                >
                    <PhoneIphoneIcon />
                </IconButton>
                </Tooltip>

                <Tooltip title="Tablet View">
                <IconButton
                    sx={{color: editorScreenSize === '991px' ? siteColors.navbar_linkActive : siteColors.navbar_link}}
                    onClick={() => {
                        dispatch(setEditorScreenSize("991px"))
                        dispatch(setIsTablet(true));
                        dispatch(setMobile(false));
                        dispatch(setLarge(false));
                    }}
                >
                    <TabletMacIcon />
                </IconButton>
                </Tooltip>

                <Tooltip title="Desktop View">
                <IconButton
                    sx={{color: editorScreenSize === '100%' ? siteColors.navbar_linkActive : siteColors.navbar_link}}
                    onClick={() => {
                        dispatch(setEditorScreenSize('100%'))
                        dispatch(setLarge(true));
                        dispatch(setIsTablet(false));
                        dispatch(setMobile(false));
                    }}
                >
                    <DesktopWindowsIcon />
                </IconButton>
                </Tooltip>
            </div>
            {adminUser.email && (
                <>
                    <IconButton sx={{padding: '0px', marginLeft: '1rem'}} onClick={handleOpenMenu}>
                        
                            <Slide
                                container={containerRef.current}
                                direction={siteConfigurations.navbar_avatarAnimationDirection || 'left'}
                                in={true}
                                timeout={{ enter: 500, exit: 500 }}
                            >
                                <Avatar>
                                    {getInitials(adminUser.firstName, adminUser.lastName)}
                                </Avatar>
                            </Slide>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => handleCloseMenu(false)}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    >
                        <MenuItem onClick={() => handleCloseMenu(true)}>Logout</MenuItem>
                    </Menu>
                </>
            )}
        </Toolbar>
    </AppBar>
  );
}

export default Navbar;
